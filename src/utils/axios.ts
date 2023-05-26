import axios from 'axios';
import { getUserDataFromLocalStorage } from './user';

// Je créer une instance d'axios me permettant d'enregistrer
// une configuration de base
//baseURL: 'http://garden-todo-back-production.up.railway.app/',
export const axiosInstance = axios.create({
  baseURL: 'https://garden-todo-back-production.up.railway.app/',
});

// Je peux agir avant qu'une requête soit envoyé
axiosInstance.interceptors.request.use((config) => {
  // Je récupère les données utilisateur
  const userData = getUserDataFromLocalStorage();

  // Si mon utilisateur est connecté, je lui ajoute un header Authorization
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = userData ? `Bearer ${userData.token}` : null;

  return config;
});
