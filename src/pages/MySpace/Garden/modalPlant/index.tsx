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
  addNewNotification,
}: HandlePlantModalProps) {
  // isNeedWater permet de savoir si la plante doit être arrosée
  const [isNeedWater, setIsNeedWater] = useState(false);

  // lastWatering et nextWatering permettent de savoir quand la plante a été arrosée pour la dernière fois et quand elle doit être arrosée
  const [lastWatering, setLastWatering] = useState('');
  const [nextWatering, setNextWatering] = useState('');

  // On détermine au chargement du composant si la plante doit être arrosée
  useEffect(() => {
    const oldLastWatering = new Date(
      whichPlantClicked.last_watering
    ).toLocaleDateString('fr-FR');
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
      response.data.message
        ? addNewNotification(response.data.message, true)
        : addNewNotification('Une erreur est survenue', true);
    } else {
      const newPlantList = [...hasPlant].map((p) =>
        p.plant_id === whichPlantClicked.plant_id
          ? {
              ...p,
              last_watering: new Date().toString(),
            }
          : p
      );
      setHasPlant(newPlantList);
      setIsNeedWater(false);
      addNewNotification(`La plante a été arrosée`, false);
      // On récupère la date du jour
      const now = new Date();
      // On ajoute le nombre de jours d'arrosage à la date du jour
      const theNextWatering = new Date();
      theNextWatering.setDate(
        theNextWatering.getDate() + whichPlantClicked.watering_interval
      );
      // On met à jour les states des dates d'arrosage
      setLastWatering(now.toLocaleDateString('fr-FR'));
      setNextWatering(theNextWatering.toLocaleDateString('fr-FR'));
    }
  };

  const handleRemovePlant = async () => {
    const response = await axiosInstance.delete(
      `/garden/${userId}/${whichPlantClicked.plant_id}`
    );
    if (response.status !== 200) {
      response.data.message
        ? addNewNotification(response.data.message, true)
        : addNewNotification('Une erreur est survenue', true);
    } else {
      setHasPlant(
        hasPlant.filter((p) => p.plant_id !== whichPlantClicked.plant_id)
      );
      addNewNotification(response.data.message, false);
      setIsPlantModalOpen(false);
    }
  };

  return (
    <div className="modal-plant">
      <div className="content-modal">
        <button
          title="Fermer"
          className="close-btn"
          onClick={() => setIsPlantModalOpen(false)}>
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
                onClick={handleUpdatePlant}>
                <Droplet /> J'AI ARROSÉ !
              </button>
              <button
                className="btn-action"
                title="Supprimer une plante de mon jardin"
                onClick={() => handleRemovePlant()}>
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
