import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import MySpace from './MySpace';
import Plants from './Plants';
import Plant from './Plant';
import Error404 from './Error404';
import Notice from './Notice';
import Account from './Account';
import Us from './Us';
import { PagesProps } from '../../src/@types/pages';

function Pages({
  setIsLoginModalOpen,
  setIsSignup,
  setIsLogged,
  isLogged,
  hasPlant,
  setHasPlant,
  userId,
  tasks,
  setTasks,
  addNewNotification,
}: PagesProps) {
  return (
    <>
      <Routes>
        {/* Route page d'accueil */}
        <Route
          path="/"
          element={
            <Home
              setIsLoginModalOpen={setIsLoginModalOpen}
              setIsSignup={setIsSignup}
              isLogged={isLogged}
            />
          }
        />

        {/* Route liste des plantes */}
        <Route
          path="/plantes"
          element={
            <Plants
              isLogged={isLogged}
              setHasPlant={setHasPlant}
              hasPlant={hasPlant}
              userId={userId}
              addNewNotification={(newMessage, status) =>
                addNewNotification(newMessage, status)
              }
            />
          }
        />

        {/* Route fiche plante */}

        <Route
          path="/plantes/:slug_name"
          element={
            <Plant
              isLogged={isLogged}
              userId={userId}
              setHasPlant={setHasPlant}
              hasPlant={hasPlant}
              addNewNotification={(newMessage, status) =>
                addNewNotification(newMessage, status)
              }
            />
          }
        />

        {/* Route espace utilisateur avec jardin et todo */}
        <Route
          path="/mon-espace-vert"
          element={
            <MySpace
              setIsLogged={setIsLogged}
              isLogged={isLogged}
              setHasPlant={setHasPlant}
              hasPlant={hasPlant}
              userId={userId}
              tasks={tasks}
              setTasks={setTasks}
              addNewNotification={(newMessage, status) =>
                addNewNotification(newMessage, status)
              }
              setIsLoginModalOpen={setIsLoginModalOpen}
              setIsSignup={setIsSignup}
            />
          }
        />

        {/* Route espace compte utilisateur */}
        <Route
          path="/mon-compte"
          element={
            <Account
              userId={userId}
              isLogged={isLogged}
              setIsLogged={setIsLogged}
            />
          }
        />

        {/* Route a propos */}
        <Route
          path="/a-propos/"
          element={
            <Us isLogged={isLogged} setIsLoginModalOpen={setIsLoginModalOpen} />
          }
        />

        {/* Route mentions légales */}
        <Route path="/mentions-legales" element={<Notice />} />

        {/* Les autres routes sont redirigées vers notre page 404 */}
        <Route path="/*" element={<Error404 />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default Pages;
