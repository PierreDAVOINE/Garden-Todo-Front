import './style.scss';
import { X } from '../../../node_modules/react-feather/dist/index';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axios';
import jwtDecode from 'jwt-decode';
import validator from 'validator';
import { LoginModalProps } from '../../../src/@types/user';

function LoginModal({
  isSignup,
  setIsSignup,
  setIsLoginModalOpen,
  setIsLogged,
  setUserId,
}: LoginModalProps) {
  // Voici la liste des variables d'état qui vont chacune contenir le contenu des inputs du formulaire.
  const [inputName, setInputName] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState('');

  // isSamePassword permet de gêrer le style des inputs des mots de passe, afin d'aider l'utilisateur a prendre conscience qu'il n'a pas saisie deux fois le même mot de passe
  const [isSamePassword, setIsSamePassword] = useState(false);

  // errorMessage permet de prévenir d'un problème survenu lors de la connexion ou de l'inscription par exemple un champ mal renseigné
  const [errorMessage, setErrorMessage] = useState('');

  // handleChangeInputValue() met à jour le state "en temps réel"
  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setErrorMessage('');
    const inputTarget = e.target.name;
    const inputValue = e.target.value;

    switch (inputTarget) {
      case 'name':
        setInputName(inputValue);
        break;
      case 'city':
        setInputCity(inputValue);
        break;
      case 'email':
        setInputEmail(inputValue);
        break;
      case 'password':
        setInputPassword(inputValue);
        break;
      case 'confirmPassword':
        setInputPasswordConfirm(inputValue);
        break;

      default:
        break;
    }
  };

  // handleSubmit permet soit de gérer l'inscription soit la connexion du user
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Gestion de la connexion
    if (isSignup) {
      const response = await axiosInstance.post(
        '/login',
        {
          email: inputEmail,
          user_password: inputPassword,
        },
        {
          validateStatus: function (status) {
            // la requête résout tant que le code de sa réponse est inférieur à 500
            return status < 500;
          },
        }
      );
      if (response.status === 403) {
        setErrorMessage('Identifiants incorrects');
      } else if (response.data.logged) {
        setIsLogged(true);
        setInputEmail('');
        setInputPassword('');
        setIsLoginModalOpen(false);

        const { id } = jwtDecode(response.data.token) as { id: number };
        setUserId(id);

        // Pour sauvegarde mes informations, je transforme mon objet en chaine de caractère
        // Je stocke cette chaine de caractère dans le localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } else {
      //* Gestion de l'inscription
      //! Avant de pouvoir envoyer les données à l'API on vérifie les informations du formulaire
      // Si certaines informations ne conviennent pas ou son manquante on le signale à l'utilisateur via errorMessage
      if (inputName.length < 3) {
        setErrorMessage('Ton nom doit faire plus de 2 caractères');
      } else if (!inputName.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)) {
        setErrorMessage('Ton nom ne doit pas contenir de caractère spéciaux');
      } else if (
        inputCity &&
        !inputCity.match(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
      ) {
        setErrorMessage(
          'La ville contient des caractère spéciaux non autorisé'
        );
      } else if (inputEmail.length < 3) {
        setErrorMessage('Ton adresse email est incomplète');
      } else if (!validator.isEmail(inputEmail)) {
        setErrorMessage('Ton adresse email est incomplète');
      } else if (inputPassword.length < 6) {
        setErrorMessage(
          'Ton mot de passe doit comporter au moins 6 caractères'
        );
      } else if (inputPassword !== inputPasswordConfirm) {
        setErrorMessage(
          'Ton mot de passe de confirmation doit être identique à ton mot de passe'
        );
      } else {
        // Si tout est ok on envoie les données utilisateurs à l'API
        const response = await axiosInstance.post('/signup', {
          user_name: inputName,
          email: inputEmail,
          user_password: inputPassword,
          city: inputCity,
        });
        console.log(response);
        //Si la réponse de l'API est différente de 200, alors il y a eu une erreur lors de la création de compte
        if (response.status != 200) {
          setErrorMessage(
            'Notre serveur à "planté" ! Essayez à nouveau dans quelques instant.'
          );
        } else if (response.data === 'Cet email est déjà utilisé.') {
          setErrorMessage(response.data);
        } else {
          // Si tout est ok, on reset le formulaire d'inscription et on passe la modale en mode connexion
          setInputName('');
          setInputCity('');
          setInputEmail('');
          setInputPassword('');
          setInputPasswordConfirm('');
          setIsSignup(true);
        }
      }
    }
  };

  useEffect(() => {
    // Vérification des deux password en vue de mettre a jour le style des inputs
    if (inputPassword.length > 0 && inputPassword === inputPasswordConfirm) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }
  }, [inputPassword, inputPasswordConfirm]);

  return (
    // Fond gris
    <div className="login-modal">
      {/* Fenêtre fond blanc */}
      <div className="login-modal__window">
        {/* Bouton de femeture de la modale */}
        <button
          className="login-modal__close"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <X />
        </button>

        <img src="/img/gardentodo-logo1.png" alt="Gardern to do logo" />
        <h2>{isSignup ? 'Connexion' : 'Inscription'}</h2>
        <p>Inscrivez-vous afin d'accéder à votre jardin</p>

        {/* Switch pour passer de la modale "inscription" à la modale "connexion" et inversement */}
        <p>
          {isSignup ? 'Pas encore inscrit ?' : 'Déjà inscrit ?'}{' '}
          <button
            className="login-modal__link"
            onClick={() => setIsSignup(!isSignup)}
          >
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
                value={inputName}
                onChange={(e) => handleChangeInputValue(e)}
                required
              />
              <label htmlFor="city">Ville (optionnel) :</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Ex : Quimper"
                value={inputCity}
                onChange={(e) => handleChangeInputValue(e)}
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={inputEmail}
            onChange={(e) => handleChangeInputValue(e)}
            required
          />
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            id="password"
            value={inputPassword}
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
                name="confirmPassword"
                id="confirmPassword"
                value={inputPasswordConfirm}
                onChange={(e) => handleChangeInputValue(e)}
                // Si isSamePassword est false ET que l'input de confirmation n'est pas vide alors on met du rouge
                // Sinon si isSamePassword est true ET que l'input de confirmation n'est pas vide alors on met du vert
                // Sinon on n'applique pas de couleur particulière, on attend que l'utilisateur commence a saisir quelque chose.
                className={
                  !isSamePassword && inputPasswordConfirm.length > 0
                    ? 'inputError'
                    : isSamePassword && inputPasswordConfirm.length > 0
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
