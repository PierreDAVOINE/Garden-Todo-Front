import './style.scss';
import { HomeProps } from '../../../src/@types/home';

function Home({ setIsLoginModalOpen, setIsSignup, isLogged }: HomeProps) {
  const handleOpeningModal = (isAlreadyRegistered: boolean) => {
    isAlreadyRegistered ? setIsSignup(true) : setIsSignup(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="home">
      <div className="about">
        <div className="about__img"></div>
        <div className="about__content">
          <h1>Qui sommes nous ?</h1>
          <p>
            Destiné à tous les férus de plantes, Garden to-do est un service de
            to-do list accompagné de son jardin en ligne. Garden to-to vous
            permettra de suivre jour après jour les tâches à effectuer pour
            garder vos plantes en bonne santé. La todo list vous permet de créer
            des tâches. En vous connectant au site, vous recevrez les
            notifications des tâches à effectuer : arrosage, rempotage, semis...
            Vous pouvez ajouter à votre jardin toutes les plantes de votre
            choix, il suffit de les sélectionner dans la{' '}
            <a href="/plantes">liste des plantes</a>. D'autres fonctionnalités
            seront ajoutées très bientôt, n'hésitez pas à repasser nous voir !
          </p>
          <div className="about__button-wrap">
            {!isLogged && (
              <>
                <button onClick={() => handleOpeningModal(false)}>
                  S'inscrire
                </button>
                <button onClick={() => handleOpeningModal(true)}>
                  Se connecter
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="icones-container">
        <div className="icone-container-unity">
          <img
            className="icone"
            src="/img/icon-todo.svg"
            alt="icone to do list"
          />
          <p>To-do list</p>
        </div>

        <div className="icone-container-unity">
          <img
            className="icone"
            src="/img/icon-flower.svg"
            alt="icone de fleur"
          />
          <p>Jardin virtuel</p>
        </div>
        <div className="icone-container-unity">
          <img
            className="icone"
            src="/img/icon-book.svg"
            alt="icone de livre"
          />
          <p>Guide</p>
        </div>
      </div>
    </div>
  );
}
export default Home;
