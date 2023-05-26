import './style.scss';
import { Link } from 'react-router-dom';
import { Check, MinusCircle, PlusCircle } from 'react-feather';
import { axiosInstance } from '../../utils/axios';
import { HandlePlantProps } from "../../../src/@types/plants";
import { useEffect, useState } from 'react';

function PlantCard({
  plant,
  isLogged,
  setHasPlant,
  hasPlant,
  userId,
  addNewNotification
}: HandlePlantProps) {
  // Un state pour vérifier que la plante n'est pas déjà dans le jardin
  const [isAddableToGarden, setIsAddableToGarden] = useState(true);

  // un useEffect pour vérifier que la plante n'est pas déjà dans le jardin au démarrage de la page
  useEffect(() => {
    const plantAlreadyHere = hasPlant.find((p) => p.plant_id === plant.id);
    if (plantAlreadyHere) {
      setIsAddableToGarden(false);
    }
  }, [hasPlant]);

  // handleAddPlant() permet l'ajout d'une plante au jardin
  const handleAddPlant = async () => {
    // Si la plante n'est pas encore présente dans le jardin alors on l'ajoute
    const plantAlreadyHere = hasPlant.find((p) => p.plant_id === plant.id);
    if (!plantAlreadyHere) {
      //setIsAddableToGarden(false);
      const response = await axiosInstance.post(`/garden/${userId}`, {
        plantId: plant.id,
      });

      if (response.status === 403) {
        console.log('Identifiants incorrects');
      } else if (response.status !== 200) {
        console.log('Un probleme est survenue');
      } else {
        const plantListFromUserGarden = [...hasPlant, response.data];
        setHasPlant(plantListFromUserGarden);

      }
    } else {
      addNewNotification(`Plante ajoutée au jardin !`, false);
      setIsAddableToGarden(true);
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
          onClick={() => handleAddPlant()}
        >
          <PlusCircle />
          AJOUTER À MON JARDIN
        </button>
      )}

      {isLogged && !isAddableToGarden && (
        <a href="/mon-espace-vert/">
          <button
            className="add-plant-btn in-garden"
            title="Retirer une plante à mon espace vert"
          >
            <Check />
            PLANTE DEJA DANS MON JARDIN
          </button>
        </a>
      )
      }
    </div>
  );
}
export default PlantCard;