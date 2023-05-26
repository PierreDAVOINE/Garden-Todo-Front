import './style.scss';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { axiosInstance } from '../../utils/axios';
import { HandlePlantProps } from "../../../src/@types/plants";

function PlantCard({
  plant,
  isLogged,
  setHasPlant,
  hasPlant,
  userId,
  addNewNotification
}: HandlePlantProps) {
  // handleAddPlant() permet l'ajout d'une plante au jardin
  const handleAddPlant = async () => {
    // Si la plante n'est pas encore présente dans le jardin alors on l'ajoute
    const plantAlreadyHere = hasPlant.find((p) => p.plant_id === plant.id);
    if (!plantAlreadyHere) {
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
      //const plantListFromUserGarden = [...hasPlant, response.data]; // ne peut pas accéder à response qui est déclaré dans la condition au dessus
      //setHasPlant(plantListFromUserGarden);
      addNewNotification(`Plante ajoutée au jardin !`, false);
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
      {isLogged && (
        <button
          className="add-plant-btn"
          title="ajouter une plante à mon espace vert"
          onClick={() => handleAddPlant()}
        >
          <PlusCircle />
          AJOUTER À MON JARDIN
        </button>
      )}
    </div>
  );
}
export default PlantCard;
