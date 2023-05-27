import './style.scss';
import { useState, useEffect } from 'react';
import { Check, PlusCircle } from '../../../node_modules/react-feather/dist/index';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
// creation de PlanProps pour éviter les erreurs undifined pour les données suivantes
import { OnePlantProps, PlantAllProps } from '../../../src/@types/plants'


function Plant({ isLogged, userId, hasPlant, setHasPlant }: OnePlantProps) {
  const navigate = useNavigate();

  //ajout d'un useState pour gérer le déploiement onclick d'un élément button du reste de ma div caracs
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // useStats pour la valeur des données de plantes
  const [plant, setPlant] = useState<PlantAllProps>();

  // Un state pour vérifier que la plante n'est pas déjà dans le jardin
  const [isAddableToGarden, setIsAddableToGarden] = useState(true);
  // un useEffect pour vérifier que la plante n'est pas déjà dans le jardin au démarrage de la page
  useEffect(() => {
    if (plant) {
      const plantAlreadyHere = hasPlant.find((p) => p.plant_id === plant.id);
      if (plantAlreadyHere) {
        setIsAddableToGarden(false);
      }
    }
  }, [plant, hasPlant]);

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
              <div className='plant__caracs__column__1'>
                <p><span className='plant__caracs_specs'>Type : </span>{plant.plant_type}</p>
                <p><span className='plant__caracs_specs'>Habitat : </span> {plant.is_plant_ext ? 'Extérieur' : 'Intérieur'}</p>
                <p><span className='plant__caracs_specs'>Origine : </span>{plant.origin}</p>
                <p><span className='plant__caracs_specs'>Vivace : </span>{plant.is_perennial ? 'Oui' : 'Non'}</p>
                <p><span className='plant__caracs_specs'>Rustique : </span>{plant.is_rustic ? 'Oui' : 'Non'}</p>
                <p><span className='plant__caracs_specs'>Ensoleillement : </span>{plant.sunshine}</p>
                <p><span className='plant__caracs_specs'>Toxique : </span>{plant.toxicity}</p>
                <p><span className='plant__caracs_specs'>Comestible : </span>{plant.is_edible ? 'Oui' : 'Non'}</p>
                <p><span className='plant__caracs_specs'>Période de plantation : </span>{plant.seed_month_planting}</p>
                <p><span className='plant__caracs_specs'>Période de récolte : </span>{plant.harvest_time} jours</p>
              </div>
              <div className='plant__caracs__column'>
                <p><span className='plant__caracs_specs'>Fréquence engrais : </span>{plant.fertilizer_frequency} jours</p>
                <p><span className='plant__caracs_specs'>Intervalle de rempottage : </span> {plant.repotting_interval} jours</p>
                <p><span className='plant__caracs_specs'>Intervalle d'arrosage : </span> {plant.watering_interval} jours</p>
                <p><span className='plant__caracs_specs'>Fréquence d'arrosage : </span> {plant.watering_frequency}</p>
                <p><span className='plant__caracs_specs'>Couleur :</span> {plant.color}</p>
                <p><span className='plant__caracs_specs'>Type de sol : </span> {plant.soil_type}</p>
                <p><span className='plant__caracs_specs'>Humidité : </span> {plant.humidity} </p>
                <p><span className='plant__caracs_specs'>Température minimale : </span> {plant.min_temp} °</p>
                <p><span className='plant__caracs_specs'>Température maximale : </span> {plant.max_temp} °</p>
                <p><span className='plant__caracs_specs'>Taille maximale : </span> {plant.max_height} cm</p></div><div></div>
              <button onClick={handleClick}>
                {isOpen ? '▲ Réduire ▲ ' : '▼ Agrandir ▼ '}
                {/* Mise en place d'un handleClick sur un bouton dans la div caracs, qui gère la réduction ou l'augmentation de la taille de ma div, en relation avec isOpen */}
              </button>
            </div>
          </div>
        </>
      )
      }

      {
        isLogged && isAddableToGarden && (
          <div>
            <button className="plant__button" onClick={handleAddPlant}>
              <PlusCircle />
              Ajouter à mon Jardin
            </button>
          </div>
        )
      }
      {isLogged && !isAddableToGarden && (

        <button
          className="add-plant-btn in-garden"
          title="Retirer une plante à mon espace vert"
          onClick={() => navigate('/mon-espace-vert')}
        >
          <Check />
          PLANTE DEJA DANS MON JARDIN
        </button>

      )
      }
    </div >
  );
}

export default Plant;
