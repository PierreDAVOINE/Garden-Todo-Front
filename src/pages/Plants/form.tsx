import { FormEvent } from 'react';
import { HandlePlanFormProps } from '../../../src/@types/plants';

function PlantForm({
  inputSearchbar,
  setinputSearchbar,
  fetchOnePlant,
}: HandlePlanFormProps) {
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setinputSearchbar(newValue);
  };

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    fetchOnePlant();
  }

  return (
    <form className="plant-form" onSubmit={(e) => handleSearchSubmit(e)}>
      <h2>Recherche :</h2>

      <div className="plant-main-searchbyname">
        <label htmlFor="input-plant-name">
          Nom de la plante :<br />
          <input
            type="text"
            name="input-plant-name"
            id="input-plant-name"
            placeholder="Ex : thym..."
            onChange={(e) => handleChangeInputValue(e)}
            value={inputSearchbar}
          />
        </label>
        <button className="button" type="submit">
          Envoyer
        </button>
      </div>
    </form>
  );
}
export default PlantForm;
