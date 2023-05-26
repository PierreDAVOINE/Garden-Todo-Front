import { Droplet, MinusCircle, X } from 'react-feather';
import './style.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../utils/axios';
import { HandlePlantModalProps } from '../../../../@types/plants';

function ModalPlant({
  hasPlant,
  setHasPlant,
  setIsPlantModalOpen,
  whichPlantClicked,
  userId,
  addNewNotification
}: HandlePlantModalProps) {
  const [isNeedWater, setIsNeedWater] = useState(false);

  const [lastWatering, setLastWatering] = useState('');

  const [nextWatering, setNextWatering] = useState('');

  // On détermine au chargement du composant si la plante doit être arrosée
  useEffect(() => {
    const oldLastWatering = new Date(
      whichPlantClicked.last_watering
    ).toLocaleDateString('fr-FR');
    console.log('Récup du dernier watering !', typeof (whichPlantClicked.last_watering));
    setLastWatering(oldLastWatering);

    const now = new Date();

    const theNextWatering = new Date(whichPlantClicked.last_watering);
    theNextWatering.setDate(
      theNextWatering.getDate() + whichPlantClicked.watering_interval
    );
    setNextWatering(theNextWatering.toLocaleDateString('fr-FR'));
    if (now >= theNextWatering) {
      setIsNeedWater(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mise a jour du dernier arrosage d'une plante
  const handleUpdatePlant = async () => {
    const response = await axiosInstance.patch(
      `/garden/${userId}/${whichPlantClicked.plant_id}`
    );
    if (response.status !== 200) {
      console.log('Un probleme est survenu');
    } else {
      const newPlantList = [...hasPlant].map((p) =>
        p.plant_id === whichPlantClicked.plant_id
          ? {
            ...p,
            last_watering: new Date().toString(),
          }
          : p
      );
      addNewNotification("La plante a bien été ajoutée", false);
      console.log(newPlantList)
      // TODO : vérifier après merge erreur typage newPlantList ?
      setHasPlant(newPlantList);
      console.log(typeof newPlantList, 'newPlantList')
      setIsNeedWater(false);
      addNewNotification(`La plante a été arrosée`, false);
      const now = new Date();
      const theNextWatering = new Date();
      theNextWatering.setDate(
        theNextWatering.getDate() + whichPlantClicked.watering_interval
      );
      setLastWatering(now.toLocaleDateString('fr-FR'));
      setNextWatering(theNextWatering.toLocaleDateString('fr-FR'));
    }
  };

  // useEffect(() => console.log(new Date(hasPlant[0].last_watering)), [hasPlant]);

  return (
    <div className="modal-plant">
      <div className="content-modal">
        <button
          title="Fermer"
          className="close-btn"
          onClick={() => setIsPlantModalOpen(false)}
        >
          <X />
        </button>
        <h2>{whichPlantClicked.plant_name}</h2>
        <div className="plant-data-container">
          <div className="wrapper-img-notification">
            <div className={isNeedWater ? 'notification-watering' : 'hide'}>
              J'ai soif ! <Droplet />
            </div>

            <img
              src={whichPlantClicked.url_image}
              alt={whichPlantClicked.plant_name}
              title={whichPlantClicked.plant_name}
            />
            <h3>{whichPlantClicked.latin_plant_name}</h3>
          </div>
          <div className="plant-description-container">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a
              turpis lorem. Curabitur bibendum tellus nec risus maximus
              faucibus. Proin tincidunt dolor eu ante mollis, ac dictum eros
              consequat. Nulla finibus efficitur magna, sed varius augue
              porttitor eu. Duis rutrum ac libero at accumsan. Sed tincidunt
              efficitur eros sed facilisis. Proin a semper ante, non hendrerit
              risus. Aenean luctus dictum leo et egestas. Pellentesque molestie
              urna id est viverra molestie. Donec commodo dolor faucibus lectus
              porttitor, at hendrerit ipsum consequat.
            </p>

            <div className="plant-status">
              {lastWatering && <span>Dernier arosage : {lastWatering}</span>}{' '}
              {nextWatering && <span>Prochain arosage : {nextWatering}</span>}
            </div>

            <div className="wrapper-btn-action">
              <button
                className="btn-action"
                title="J'ai arrosé ma plante"
                onClick={handleUpdatePlant}
              >
                <Droplet /> J'AI ARROSÉ !
              </button>
              <button
                className="btn-action"
                title="Supprimer une plante de mon jardin"
                onClick={() => {
                  setHasPlant(
                    hasPlant.filter((p) => p.id !== whichPlantClicked.id)
                  );
                  setIsPlantModalOpen(false);
                }}
              >
                <MinusCircle /> SUPPRIMER DU JARDIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalPlant;
