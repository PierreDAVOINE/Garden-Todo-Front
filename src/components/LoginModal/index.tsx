import './style.scss';
import { X } from '../../../node_modules/react-feather/dist/index';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axios';
import jwtDecode from 'jwt-decode';
import { LoginModalProps, Userdatasignprops } from '../../../src/@types/user';
import {
  dataUserValidation,
  dataUserValidationLogin,
} from '../../utils/validate';

function LoginModal({
  isSignup,
  setIsSignup,
  setIsLoginModalOpen,
  setIsLogged,
  setUserId,
}: LoginModalProps) {
  // State pour les données utilisateur
  const [userData, setUserData] = useState<Userdatasignprops>({
    name: '',
    city: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // isSamePassword permet de gêrer le style des inputs des mots de passe, afin d'aider l'utilisateur a prendre conscience qu'il n'a pas saisie deux fois le même mot de passe
  const [isSamePassword, setIsSamePassword] = useState(false);

  // errorMessage permet de prévenir d'un problème survenu lors de la connexion ou de l'inscription par exemple un champ mal renseigné
  const [errorMessage, setErrorMessage] = useState('');

  // handleChangeInputValue() met à jour le state "en temps réel"
  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setErrorMessage('');
    const inputTarget = e.target.name;
    const inputValue = e.target.value;

    // On récupère les données utilisateur
    const newUserData = { ...userData };
    // On met à jour les données utilisateur
    newUserData[inputTarget] = inputValue;
    // On met à jour le state
    setUserData(newUserData);
  };

  // handleSubmit permet soit de gérer l'inscription soit la connexion du user
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Gestion de la connexion
    if (isSignup) {
      const errors = dataUserValidationLogin(userData);
      if (errors.length > 0) {
        setErrorMessage(errors[0]);
      } else {
        const response = await axiosInstance.post('/users/login', {
          email: userData.email,
          user_password: userData.password,
        });
        if (response.status !== 200) {
          response.data.message
            ? setErrorMessage(response.data.message)
            : setErrorMessage('Une erreur est survenue');
        } else if (response.data.logged) {
          setIsLogged(true);
          setIsLoginModalOpen(false);
          setUserData({
            name: '',
            city: '',
            email: '',
            password: '',
            passwordConfirm: '',
          });
          const { id } = jwtDecode(response.data.token) as { id: number };
          setUserId(id);

          // Pour sauvegarde mes informations, je transforme mon objet en chaine de caractère
          // Je stocke cette chaine de caractère dans le localStorage
          localStorage.setItem('user', JSON.stringify(response.data));
        }
      }
    } else {
      //* Gestion de l'inscription
      //! Avant de pouvoir envoyer les données à l'API on vérifie les informations du formulaire
      // Si certaines informations ne conviennent pas ou son manquante on le signale à l'utilisateur via errorMessage
      const errors = dataUserValidation(userData);
      if (errors.length > 0) {
        setErrorMessage(errors[0]);
      } else {
        // Si tout est ok on envoie les données utilisateurs à l'API
        const response = await axiosInstance.post('/users/signup', {
          user_name: userData.name,
          email: userData.email,
          user_password: userData.password,
          city: userData.city,
        });
        //Si la réponse de l'API est différente de 200, alors il y a eu une erreur lors de la création de compte
        if (response.status !== 200) {
          response.data.message
            ? setErrorMessage(response.data.message)
            : setErrorMessage(
                'Notre serveur à "planté" ! Essayez à nouveau dans quelques instant.'
              );
        } else {
          // Si tout est ok, on reset le formulaire d'inscription et on passe la modale en mode connexion
          setUserData({
            name: '',
            city: '',
            email: '',
            password: '',
            passwordConfirm: '',
          });
          setIsSignup(true);
        }
      }
    }
  };

  useEffect(() => {
    // Vérification des deux password en vue de mettre a jour le style des inputs
    if (
      userData.password.length > 0 &&
      userData.password === userData.passwordConfirm
    ) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }
  }, [userData.password, userData.passwordConfirm]);

  return (
    // Fond gris
    <div className="login-modal">
      {/* Fenêtre fond blanc */}
      <div className="login-modal__window">
        {/* Bouton de femeture de la modale */}
        <button
          className="login-modal__close"
          onClick={() => setIsLoginModalOpen(false)}>
          <X />
        </button>

        <img src="/img/gardentodo-logo1.png" alt="Gardern to do logo" />
        <h2>{isSignup ? 'Connexion' : 'Inscription'}</h2>
        <p>
          {isSignup ? 'Connectez-vous' : 'Inscrivez-vous'} afin d'accéder à
          votre jardin
        </p>

        {/* Switch pour passer de la modale "inscription" à la modale "connexion" et inversement */}
        <p>
          {isSignup ? 'Pas encore inscrit ?' : 'Déjà inscrit ?'}{' '}
          <button
            className="login-modal__link"
            onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>

        {/* ====Notification d'erreur==== */}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        {/* ====Formulaire==== */}
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* Si isSignup est false on affiche pas l'input name, city et passwordConfirm  */}
          {!isSignup && (
            <>
              <label htmlFor="name">Nom :</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ex : Dupont"
                value={userData.name}
                onChange={(e) => handleChangeInputValue(e)}
                required
              />
              <label htmlFor="city">Ville (optionnel) :</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Ex : Quimper"
                value={userData.city}
                onChange={(e) => handleChangeInputValue(e)}
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Ex : dupont@dupond.fr"
            value={userData.email}
            onChange={(e) => handleChangeInputValue(e)}
            required
          />
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={(e) => handleChangeInputValue(e)}
            required
          />

          {!isSignup && (
            <>
              <label htmlFor="confirmPassword">
                Confirmer votre mot de passe :
              </label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                value={userData.passwordConfirm}
                onChange={(e) => handleChangeInputValue(e)}
                // Si isSamePassword est false ET que l'input de confirmation n'est pas vide alors on met du rouge
                // Sinon si isSamePassword est true ET que l'input de confirmation n'est pas vide alors on met du vert
                // Sinon on n'applique pas de couleur particulière, on attend que l'utilisateur commence a saisir quelque chose.
                className={
                  !isSamePassword && userData.password.length > 0
                    ? 'inputError'
                    : isSamePassword && userData.passwordConfirm.length > 0
                    ? 'inputGood'
                    : ''
                }
              />
            </>
          )}

          <button type="submit">
            {isSignup ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
