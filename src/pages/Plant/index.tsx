import './style.scss';
import { useState, useEffect } from 'react';
import { PlusCircle } from '../../../node_modules/react-feather/dist/index';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';
// creation de PlanProps pour éviter les erreurs undifined pour les données suivantes
import { OnePlantProps, PlantAllProps } from '../../../src/@types/plants'


function Plant({ isLogged, userId, hasPlant, setHasPlant }: OnePlantProps) {


  //ajout d'un useState pour gérer le déploiement onclick d'un élément button du reste de ma div caracs
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // useStats pour la valeur des données de plantes
  const [plant, setPlant] = useState<PlantAllProps>();


  //récupération du slug_name qui nous servira à récupérer les infos d'une plante spécifique
  const { slug_name } = useParams();

  // Utilisation d'un useEffect asynchrone
  useEffect(() => {
    const getData = async () => {
      //mise en place du fetch avec le lien du .env et du slug_name
      const response = await axiosInstance.get(`/plants/${slug_name}`); // pour voir si les données sont bien recues par le fetch
      setPlant(response.data); // mise a jour de la variable plant
    };
    getData(); // utilisé pour le  chargement des données dans le rendu initial
    // creation d'une tableau vide pour que les data soient rechhargées
  }, [slug_name]);

  const handleAddPlant = async () => {
    const response = await axiosInstance.post(`/garden/${userId}`, {
      plantId: plant?.id,
    });

    if (response.status === 403) {
      console.log('Identifiants incorrects');
    } else if (response.status !== 200) {
      console.log('Un probleme est survenue');
    } else {
      console.log(response.data);
      const plantListFromUserGarden = [...hasPlant, response.data];
      setHasPlant(plantListFromUserGarden);
    }
  };

  return (
    <div className="plant">
      {/* {console.log("fetch", plant)} */}
      {/* Rendu des données suivantes si plant existe */}
      {plant && (
        <>
          <h1>{plant.plant_name}</h1>
          <div className="desktop__fiche__plante__principale">
            <div className="desktop__fiche__plante__1">
              <img
                src={plant.url_image}
                alt={plant.plant_name}
                title={plant.plant_name}
              />
              <p className="plant__latin__name">{plant.latin_plant_name}</p>

              
            </div>
            <div className="plant__description">
                <p>{plant.plant_description}</p>
              </div>
            {/* Mise en place de la classe open sur plante_caracs pour gérer le maximum weight pour qu'une partie se cache  */}
            <div className={`plant__caracs ${isOpen ? 'open' : ''}`}>
              <div className='plant__caracs__column__1'><p>Type : {plant.plant_type}</p>
              <p>Habitat : {plant.is_plant_ext ? 'Extérieur' : 'Intérieur'}</p>
              <p>Origine : {plant.origin}</p>
              <p>Vivace : {plant.is_perennial ? 'Oui' : 'Non'}</p>
              <p>Rustique : {plant.is_rustic ? 'Oui' : 'Non'}</p>
              <p>Ensoleillement : {plant.sunshine}</p>
              <p>Toxique : {plant.toxicity}</p>
              <p>Comestible : {plant.is_edible ? 'Oui' : 'Non'}</p>
              <p>Période de plantation : {plant.seed_month_planting}</p>
              <p>Période de récolte : {plant.harvest_time} jours</p>
              </div>  <div className='plant__caracs__column'>  <p>Fréquence engrais : {plant.fertilizer_frequency} jours</p>
            <p>Intervalle de rempottage : {plant.repotting_interval} jours</p>
              <p>Intervalle d'arrosage : {plant.watering_interval} jours</p>
              <p>Fréquence d'arrosage : {plant.watering_frequency}</p>
              <p>Couleur : {plant.color}</p>
              <p>Type de sol : {plant.soil_type}</p>
              <p>Humidité : {plant.humidity} </p>
              <p>Température minimale : {plant.min_temp} °</p>
              <p>Température maximale : {plant.max_temp} °</p>
              <p>Taille maximale : {plant.max_height} cm</p></div><div></div>
              <button onClick={handleClick}>
                {isOpen ? '▲ Réduire ▲ ' : '▼ Agrandir ▼ '}
                {/* Mise en place d'un handleClick sur un bouton dans la div caracs, qui gère la réduction ou l'augmentation de la taille de ma div, en relation avec isOpen */}
              </button>
            </div>
          </div>
        </>
      )}

      {isLogged && (
        <div>
          <button className="plant__button" onClick={handleAddPlant}>
            <PlusCircle />
            Ajouter à mon Jardin
          </button>
        </div>
      )}
    </div>
  );
}

export default Plant;
