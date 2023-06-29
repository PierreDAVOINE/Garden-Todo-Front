import './style.scss';
import { Link } from 'react-router-dom';
import { Check, PlusCircle } from 'react-feather';
import { axiosInstance } from '../../utils/axios';
import { HandlePlantProps } from '../../../src/@types/plants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PlantCard({
  plant,
  isLogged,
  setHasPlant,
  hasPlant,
  userId,
  addNewNotification,
}: HandlePlantProps) {
  const navigate = useNavigate();

  // Un state pour vérifier que la plante n'est pas déjà dans le jardin
  const [isAddableToGarden, setIsAddableToGarden] = useState(true);

  // un useEffect pour vérifier que la plante n'est pas déjà dans le jardin au démarrage de la page
  useEffect(() => {
    const plantAlreadyHere = hasPlant.find((p) => p.plant_id === plant.id);
    if (plantAlreadyHere) {
      setIsAddableToGarden(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPlant]);

  // handleAddPlant() permet l'ajout d'une plante au jardin
  const handleAddPlant = async () => {
    // Si la plante n'est pas encore présente dans le jardin alors on l'ajoute
    if (!isAddableToGarden) {
      addNewNotification(`Cette plante est déjà dans votre jardin !`, false);
    } else {
      const response = await axiosInstance.post(`/garden/${userId}`, {
        plantId: plant.id,
      });
      if (response.status !== 200) {
        response.data.message
          ? addNewNotification(response.data.message, true)
          : addNewNotification('Une erreur est survenue', true);
      } else {
        const plantListFromUserGarden = [...hasPlant, response.data];
        setHasPlant(plantListFromUserGarden);
        addNewNotification(`Plante ajoutée au jardin !`, false);
        setIsAddableToGarden(false);
      }
    }
  };

  return (
    <div className="plant-card">
      <Link to={`/plantes/${plant.slug_name}`} relative="path">
        <picture>
          <source srcSet={plant.url_image} media="(max-width: 840px)"></source>
          <img
            src={plant.url_image}
            alt={plant.plant_name}
            title={plant.plant_name}
          />
        </picture>
        <h2>{plant.plant_name}</h2>
        <h4>{plant.latin_plant_name}</h4>
      </Link>
      {
        //ajout du bouton pour rajouter une plante à mon espace jardin SI je suis connecté
      }
      {isLogged && isAddableToGarden && (
        <button
          className="add-plant-btn"
          title="ajouter une plante à mon espace vert"
          onClick={() => handleAddPlant()}>
          <PlusCircle />
          AJOUTER À MON JARDIN
        </button>
      )}

      {isLogged && !isAddableToGarden && (
        <button
          className="add-plant-btn in-garden"
          title="Retirer une plante à mon espace vert"
          onClick={() => navigate('/mon-espace-vert')}>
          <Check />
          PLANTE DEJA DANS MON JARDIN
        </button>
      )}
    </div>
  );
}
export default PlantCard;
