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

        {/* !!!! FONCTIONNALITE AVANCEE !!!! */}
        {/* <a onClick={() => setsearchIsOpen(!searchIsOpen)} className={searchIsOpen ? "visible" : "invisible"}><Sliders />Voir tous les filtres</a> */}
      </div>

      {/* !!!! FONCTIONNALITE AVANCEE !!!! */}
      {/* {searchIsOpen && (
        <div className="wrapper">
          <div>
            <label htmlFor="Type de plante">Type de plante :</label>
            <br />
            <select id="plant-type" name="plant-type">
              <option value="Bulbe">Bulbe</option>
              <option value="Arbre">Arbre</option>
              <option value="Fleur">Fleur</option>
              <option value="Arbrisseau">Arbisseau</option>
              <option value="Plante verte">Plante verte</option>
              <option value="Aromates">Aromates</option>
              <option value="fruits et légumes">Fruits et légumes</option>
            </select>
          </div>

          <div>
            <label htmlFor="Type de sol">Type de sol :</label>
            <br />
            <select id="plant-soil-type" name="plant-soil-type">
              <option value="terreau-universel">Terreau universel</option>
              <option value="terreau-cactus">Terreau pour cacus</option>
              <option value="Sable">Sable</option>
              <option value="Tourbe">Tourbe</option>
              <option value="orchidees">Terreau pour orchidées</option>
            </select>
          </div>

          <div>
            <label htmlFor="Ensoleillement">Ensoleillement :</label>
            <br />
            <details>
              <summary>
                <Sun />
                Choisir un type d'ensoleillement
              </summary>
              <input
                type="checkbox"
                id="plein-soleil"
                name="plein-soleil"
                value="plein-soleil"
              />
              <label htmlFor="plein-soleil">Plein soleil</label>
              <br />
              <input
                type="checkbox"
                id="mi-ombre"
                name="mi-ombre"
                value="mi-ombre"
              />
              <label htmlFor="mi-ombre">Mi-ombre</label>
              <br />
              <input type="checkbox" id="ombre" name="ombre" value="ombre" />
              <label htmlFor="ombre">Ombre</label>
            </details>
          </div>

          <div>
            <label htmlFor="Couleur">Couleur :</label>
            <br />
            <details>
              <summary>Choisir une couleur</summary>
              <input type="checkbox" id="jaune" name="jaune" value="jaune" />
              <label htmlFor="jaune">jaune</label>
              <br />

              <input type="checkbox" id="orange" name="Orange" value="Orange" />
              <label htmlFor="Orange">Orange</label>
              <br />

              <input type="checkbox" id="rouge" name="rouge" value="rouge" />
              <label htmlFor="rouge">rouge</label>
              <br />

              <input type="checkbox" id="Rose" name="Rose" value="Rose" />
              <label htmlFor="Rose">Rose</label>
              <br />

              <input type="checkbox" id="Violet" name="Violet" value="Violet" />
              <label htmlFor="Violet">Violet</label>
              <br />

              <input type="checkbox" id="Bleu" name="Bleu" value="Bleu" />
              <label htmlFor="Bleu">Bleu</label>
              <br />

              <input type="checkbox" id="Vert" name="Vert" value="Vert" />
              <label htmlFor="Vert">Vert</label>
              <br />

              <input type="checkbox" id="Marron" name="Marron" value="Marron" />
              <label htmlFor="Marron">Marron</label>
              <br />

              <input type="checkbox" id="Blanc" name="Blanc" value="Blanc" />
              <label htmlFor="Blanc">Blanc</label>
              <br />

              <input type="checkbox" id="Noir" name="Noir" value="Noir" />
              <label htmlFor="Noir">Noir</label>
              <br />

              <input type="checkbox" id="Gris" name="Gris" value="Gris" />
              <label htmlFor="Gris">Gris</label>
              <br />
            </details>
          </div>

          <br />
        </div>
      )} */}
    </form>
  );
}
export default PlantForm;
