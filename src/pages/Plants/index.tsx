// liste des plantes au complet
import PlantCard from '../../components/plants_card';
import PlantForm from './form';
import './style.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axios';
import { PlantsListProps, PlantResponseApi } from '../../../src/@types/plants';

function Plants({
  isLogged,
  hasPlant,
  setHasPlant,
  userId,
  addNewNotification,
}: PlantsListProps) {
  /* Recupère la valeur de l'input pour la recherche de plante par nom */
  const [inputSearchbar, setinputSearchbar] = useState('');

  /* Un state pour récupérer les valeurs de la requête axios */
  const [plantsData, setplantsData] = useState<PlantResponseApi[] | []>([]);

  // isFetchError permet d'y stocker une erreur survenue lors du axios.get()
  const [searchResultMessage, setSearchResultMessage] = useState('');

  // fetchPlants() récupère toutes les plantes et les enregistre au state
  const fetchPlants = () => {
    axiosInstance.get(`/plants`).then((response) => {
      setplantsData(response.data);
    });
  };

  // on lance la requête à l'API pour récupérer la liste des plantes au premier chargement
  useEffect(() => {
    fetchPlants();
  }, []);

  // on lance la requête à l'API pour récupérer UNE plante si l'utilisateur utilise la recherche par nom
  const searchPlant = () => {
    // on vérifie que le state n'est pas vide
    // si rien n'est tapé dans l'input on récupère toutes les plantes
    if (inputSearchbar.length === 0) {
      setSearchResultMessage('');
      fetchPlants();
      return;
    }
    // On vide le state de plantes pour éviter les doublons
    setplantsData([]);
    axiosInstance.get(`/plants/search/${inputSearchbar}`).then((response) => {
      if (response.status !== 200) {
        setSearchResultMessage(response.data.message);
      } else {
        // Mise a jour du message de nombre de résultats trouvé
        setSearchResultMessage(
          `Nous avons trouvé ${response.data.length} résultat${
            response.data.length > 1 ? 's' : ''
          }`
        );
        // Mise à jour du state avec les plantes trouvées
        setplantsData(response.data);
      }
    });
  };

  return (
    <div className="plants">
      <h1>Liste des plantes</h1>
      <PlantForm
        fetchOnePlant={searchPlant}
        inputSearchbar={inputSearchbar}
        setinputSearchbar={setinputSearchbar}
      />
      {/* On affiche le nombre de plante trouvée ou on informe que la recherche n'a rien donnée */}
      {searchResultMessage && <h3>{searchResultMessage}</h3>}

      <section className="plant-results">
        {/* on affiche le résultat de toutes les plantes au lancement de la page */}
        {plantsData.map((plant) => (
          <PlantCard
            plant={plant}
            key={plant.id}
            isLogged={isLogged}
            hasPlant={hasPlant}
            setHasPlant={setHasPlant}
            userId={userId}
            addNewNotification={(newMessage, status) =>
              addNewNotification(newMessage, status)
            }
          />
        ))}
      </section>
    </div>
  );
}
export default Plants;
