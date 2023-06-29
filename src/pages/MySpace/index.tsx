import Garden from './Garden';
import Todo from './Todo';
import './style.scss';
import { SpacePropsType } from '../../../src/@types/plants';

function MySpace({
  isLogged,
  hasPlant,
  setHasPlant,
  userId,
  tasks,
  setTasks,
  addNewNotification,
  setIsLoginModalOpen,
  setIsSignup,
}: SpacePropsType) {
  const handleOpeningModal = (isAlreadyRegistered: boolean) => {
    isAlreadyRegistered ? setIsSignup(true) : setIsSignup(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="my-space">
      {!isLogged && (
        <div className="my-space__not-connected">
          <h2 className="my-space__not-connected-title">
            Vous devez vous connecter pour accéder à votre jardin !{' '}
          </h2>
          <button
            className="my-space__not-connected-button"
            onClick={() => handleOpeningModal(false)}>
            S'inscrire
          </button>
          <button
            className="my-space__not-connected-button"
            onClick={() => handleOpeningModal(true)}>
            Se connecter
          </button>
        </div>
      )}
      {isLogged && (
        <>
          <Garden
            isLogged={isLogged}
            hasPlant={hasPlant}
            setHasPlant={setHasPlant}
            userId={userId}
            addNewNotification={(newMessage, status) =>
              addNewNotification(newMessage, status)
            }
          />
          <Todo
            userId={userId}
            tasks={tasks}
            setTasks={setTasks}
            addNewNotification={addNewNotification}
          />
        </>
      )}
    </div>
  );
}
export default MySpace;
