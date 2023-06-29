import { Eye, MinusCircle } from 'react-feather';
import './style.scss';
import drops from '/img/drops.svg';
import { axiosInstance } from '../../../utils/axios';
import { useEffect, useState } from 'react';
import { handlePlantCardGardenProps } from '../../../../src/@types/plants';

function PlantCardGarden({
  setWhichPlantClicked,
  plant,
  isLogged,
  setHasPlant,
  hasPlant,
  setIsPlantModalOpen,
  userId,
  addNewNotification,
}: handlePlantCardGardenProps) {
  const [isNeedWater, setIsNeedWater] = useState(false);

  // On détermine au chargement du composant si la plante doit être arrosée
  useEffect(() => {
    const now = new Date();
    const nexWatering = new Date(plant.last_watering);
    nexWatering.setDate(nexWatering.getDate() + plant.watering_interval);
    if (now >= nexWatering) {
      setIsNeedWater(true);
    } else setIsNeedWater(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPlant]);

  const handleBtnClickOpenModal = () => {
    setWhichPlantClicked(plant);
    setIsPlantModalOpen(true);
  };

  const handleRemovePlant = async () => {
    const response = await axiosInstance.delete(
      `/garden/${userId}/${plant.plant_id}`
    );
    if (response.status !== 200) {
      response.data.message
        ? addNewNotification(response.data.message, true)
        : addNewNotification('Une erreur est survenue', true);
    } else {
      setHasPlant(hasPlant.filter((p) => p.plant_id !== plant.plant_id));
      addNewNotification('La plante a bien été supprimée', false);
    }
  };

  return (
    <div className="plant-card">
      <span className={isNeedWater ? 'droplets' : 'hide'}>
        <img
          src={drops}
          alt="Il est l'heure d'arroser !"
          title="Il est l'heure d'arroser !"
        />
      </span>

      <picture>
        <source srcSet={plant.url_image} media="(max-width: 840px)"></source>
        <img
          src={plant.url_image}
          alt={plant.plant_name}
          title={plant.plant_name}
          className="garden-plant-card-img"
        />
      </picture>
      <h3>{plant.plant_name}</h3>
      {
        //ajout du bouton pour supprimer une plante du jardin SI je suis connecté
      }
      {isLogged && hasPlant && (
        <div className="wrapper-btn">
          <button
            className="garden-plant-btn"
            onClick={handleBtnClickOpenModal}
            name={plant.plant_name}
            title="voir la plante">
            <Eye />
            CONSULTER
          </button>
          <button
            className="garden-plant-btn"
            title="Supprimer une plante de mon jardin"
            onClick={() => handleRemovePlant()}>
            <MinusCircle />
            SUPPRIMER
          </button>
        </div>
      )}
    </div>
  );
}
export default PlantCardGarden;
