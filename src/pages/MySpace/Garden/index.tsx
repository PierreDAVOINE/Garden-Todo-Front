import { Frown, PlusCircle } from 'react-feather';
import './style.scss';
import { Link } from 'react-router-dom';
import PlantCardGarden from '../../../components/plants_card/gardenCards/gardenCard';
import { useState } from 'react';
import ModalPlant from './modalPlant';
import { GardenPropsType, Iwatering } from '../../../@types/plants';

function Garden({ isLogged, hasPlant, setHasPlant, userId, addNewNotification }: GardenPropsType) {
  // Un state pour savoir si la modale plante est ouverte
  const [isPlantModalOpen, setIsPlantModalOpen] = useState<boolean>(false);

  // Un state pour savoir quelle plante a été cliquée
  const [whichPlantClicked, setWhichPlantClicked] = useState<Iwatering>({
    id: 0,
    plant_name: '',
    plant_id: 0,
    latin_plant_name: '',
    url_image: '',
    slug_name: '',
    last_watering: '',
    watering_interval: 0,
    plant_type: '',
    is_plant_ext: false,
    origin: '',
    is_perennial: true,
    is_rustic: true,
    sunshine: '',
    toxicity: '',
    is_edible: true,
    seed_month_planting: '',
    harvest_time: 0,
    fertilizer_frequency: 0,
    repotting_interval: 0,
    watering_frequency: '',
    color: '',
    soil_type: '',
    humidity: 0,
    plant_description: '',
    min_temp: 0,
    max_temp: 0,
    max_height: 0,
    user_id: 0,
  });

  return (
    <div className="garden">
      {
        //Lancement de la modale pour consulter une plante si on clique sur le bouton dans le jardin
      }
      {isPlantModalOpen && (
        <ModalPlant
          setHasPlant={setHasPlant}
          hasPlant={hasPlant}
          setIsPlantModalOpen={setIsPlantModalOpen}
          whichPlantClicked={whichPlantClicked}
          userId={userId}
          addNewNotification={(newMessage, status) => addNewNotification(newMessage, status)}
        />
      )}
      <h2>Mon espace vert</h2>

      {/* Si l'utilisateur est connecté ET n'a aucune plante */}
      {isLogged && hasPlant.length === 0 && (
        <div>
          <p>
            Oh non votre jardin est vide ! <Frown />
          </p>
          <Link to="/plantes">
            <PlusCircle />
            Ajouter une plante
          </Link>
        </div>
      )}
      <div className="wrapper-plants">
        {/* Si l'utilisateur est connecté ET a une ou des plantes */}
        {isLogged &&
          hasPlant &&
          hasPlant.map((plant) => (
            <PlantCardGarden
              plant={plant}
              key={plant.plant_name}
              isLogged={isLogged}
              hasPlant={hasPlant}
              setHasPlant={setHasPlant}
              setIsPlantModalOpen={setIsPlantModalOpen}
              setWhichPlantClicked={setWhichPlantClicked}
              userId={userId}
            />
          ))}
      </div>
    </div>
  );
}
export default Garden;
