import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import Pages from '../pages';
import {
  getUserDataFromLocalStorage,
  removeUserDataFromLocalStorage,
} from '../utils/user';
import './style.scss';
import { useEffect, useState } from 'react';
import { LoginResponse } from '../@types/user';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../utils/axios';
import { TaskType } from '../../src/@types/tasks'
import { Iwatering } from "../../src/@types/plants";
import { NotificationsInfo } from "../../src/@types/notifications";

function App() {


  // isLogged permet de savoir si l'utilisateur est connecté
  const [isLogged, setIsLogged] = useState(false);

  // idUser permet de stocker l'id de l'utilisateur actuellement connecté
  const [userId, setUserId] = useState(0);

  // isLoginModalOpen permet de savoir si la modale de connexion/inscription doit être affichée ou non
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // isSignup permet de savoir si la modale est en mode "Inscription" ou "connexion".
  // A true, l'utilisateur a déjà un compte et souhaite donc se connecter et non s'inscrire.
  const [isSignup, setIsSignup] = useState(false);

  // Un state définir pour les messages de notification et leur type (erreur ou normal)
  const [notifications, setNotifications] = useState<NotificationsInfo[] | []>([]);

  // tasks contient les tâches de la todolist de l'utilisateur
  const [tasks, setTasks] = useState<TaskType[]>([]);

  // hadPlant contient les plantes du jardin de l'utilisateur
  // const [hasPlant, setHasPlant] = useState<HasPlantProps[]>([]);
  const [hasPlant, setHasPlant] = useState<Iwatering[]>([]);

  // un state pour fermer les notifications
  const [notificationIsOn, setnotificationIsOn] = useState(true);

  let userData = {} as LoginResponse | null;

  // Au chargemement de APP on effectue les vérifications d'authentification
  useEffect(() => {
    // Je récupère les données stockées dans le localStorage
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userData = getUserDataFromLocalStorage();
    if (userData) {
      try {
        // Si un token existe, on vérifie s'il n'est pas expiré
        const { id, exp } = jwtDecode(userData.token) as {
          id: number;
          exp: number;
        };
        // On calcule le timestamp de la date et heure actuelle
        const now = Math.floor(Date.now() / 1000);
        // Si le token est expiré, on passe isLogged à false et on supprime les données du LocalStorage avec la fonction removeUserDataFromLocalStorage
        if (now >= exp) {
          setIsLogged(false);
          removeUserDataFromLocalStorage();
        } else {
          // S'il y a un token encore valide, on passer isLogged à true.
          setIsLogged(userData.logged);
          //console.log("récupération de l'id");
          setUserId(id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  // getTodo() permet de récupérer les taches de todolist grâce a l'id de l'utilisateur
  const getTodo = async () => {
    //utilisation d'une async pour fetch
    try {
      console.log("fetch syur l'id : ", userId);
      const response = await axiosInstance.get(
        `/tasks/${userId}` //fetch des datas sur cet url
      );
      if (response.status !== 200) {
        console.error('problème interne');
      } else {
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // getGarden() permet de récupérer les plantes d'un utiliseur grâce à son ID
  const getGarden = async () => {
    const response = await axiosInstance.get(`/garden/${userId}`);
    if (response.status !== 200) {
      console.log('Un probleme est survenue');
    } else {
      console.log(response.data);
      setHasPlant(response.data);
    }
  };

  const addNewNotification = (newMessage: string, status = false) => {
    const notifyArray = [...notifications]; // on crée une copie du contenu du state
    notifyArray.push({ message: newMessage, isError: status }); // On ne peut pas ajouter directement le nouveau contenu au spread operator, il faut décomposer
    setnotificationIsOn(true)
    setNotifications(notifyArray)
    setTimeout(() => {
      setNotifications([])
      setnotificationIsOn(false)
    }, 5000);
    setNotifications(notifyArray); // On ajoute l'ancien et le nouveau contenu au state
  }

  // Si isLogged devient true, on récupère les données de l'utilisateur
  useEffect(() => {
    if (isLogged) {
      getTodo();
      getGarden();
      addNewNotification("Bonjour bienvenue ! ", false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return (
    <div className="app">
      {isLoginModalOpen && (
        <LoginModal
          isSignup={isSignup}
          setIsSignup={setIsSignup}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsLogged={setIsLogged}
          setUserId={setUserId}
        />
      )}
      <Header
        isLogged={isLogged}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsSignup={setIsSignup}
        notifications={notifications}
        setNotifications={setNotifications}
        setIsLogged={setIsLogged}
        setnotificationIsOn={setnotificationIsOn}
        notificationIsOn={notificationIsOn}
      />
      <Pages
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsSignup={setIsSignup}
        userId={userId}
        setIsLogged={setIsLogged}
        isLogged={isLogged}
        hasPlant={hasPlant}
        setHasPlant={setHasPlant}
        tasks={tasks}
        setTasks={setTasks}
        addNewNotification={(newMessage, status) => addNewNotification(newMessage, status)}
      />
      <Footer />
    </div>
  );
}

export default App;
