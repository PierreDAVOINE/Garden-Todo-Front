import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './style.scss';
import { axiosInstance } from '../../utils/axios';
import {
  AtSign,
  CheckCircle,
  Edit3,
  Lock,
  MapPin,
  Sun,
  User,
  XCircle,
} from 'react-feather';
import ModaleDeleteUser from '../../components/DeleteUserModal';
import { useNavigate } from 'react-router-dom';
import { removeUserDataFromLocalStorage } from '../../utils/user';
import validator from 'validator';
import { AccountProps, Userdataprops } from '../../../src/@types/user';

function Account({ userId, setIsLogged, isLogged }: AccountProps) {
  const navigate = useNavigate();

  // LES STATES --------------------------------------------------
  // State pour les données utilisateur
  const [userData, setUserData] = useState<Userdataprops>({
    id: 0,
    name: '',
    city: '',
    email: '',
    password: '',
  });

  // State pour savoir si on édite ou pas
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditVille, setIsEditVille] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  // un state pour définir si les mots de passe sont egaux
  const [isPasswdEqual, setIsPasswdEqual] = useState(false);

  // state pour la confirmation de password
  const [passwordConfirm, setPasswordConfirm] = useState('');
  //un state pour gérer la modale et son affichage pour la suppression de compte
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // un state pour définir un message d'erreur écrit
  const [errMessage, setErrMessage] = useState('');
  // LE CRUD ------------------------------------------------------

  // GET Etape 1 : Récupération des données de l'utilisateur grâce à son ID
  useEffect(() => {
    const getUser = async () => {
      // Si le userId contient autre chose que 0, ca veut dire qu'un utilisateur est connecté
      if (userId !== 0 || userId !== undefined) {
        // Alors on récupère ses données à l'API via cet ID
        const response = await axiosInstance.get(`/users/${userId}`);
        console.log(response.data[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setUserData({
          id: response.data[0].id,
          name: response.data[0].user_name,
          city: response.data[0].city,
          email: response.data[0].email,
          password: '', // on évite d'afficher le password, on ne le demande pas pour une maj de nouveau password
        });
        //Si la réponse de l'API est différente de 200, alors il y a eu une erreur lors de la création de compte
        if (response.status != 200) {
          console.log(
            "Une erreur est survenue lors de la récupération de l'utilisateur."
          );
          setIsLogged(false);
        }
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  const handleChangeForm = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Userdataprops
  ): void => {
    const updatedUserData = { ...userData };
    console.log(updatedUserData, ' updatedUserData');
    updatedUserData[field] = e.target.value;
    setUserData(updatedUserData);
  };

  useEffect(() => {
    if (userData.password.length > 0 && passwordConfirm.length > 0) {
      console.log(
        'mdp: ',
        userData.password,
        ' / mdp confirm : ',
        passwordConfirm
      );
      if (passwordConfirm === userData.password) {
        //console.log('passwords et confirm password sont egaux');
        setIsPasswdEqual(true);
        setErrMessage('');
      } else {
        setIsPasswdEqual(false);
        setErrMessage('Mots de passe non identiques.');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordConfirm]);

  // Etape 3 : Gestion du submit du formulaire

  // UPDATE USER -------------------------------------------------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('début du submit');

    // ! ON TESTE LES DONNEES AVANT ENVOI AU BACK
    if (
      userData.password.length > 1 &&
      (userData.password.length < 6 || userData.password !== passwordConfirm)
    ) {
      setErrMessage('Le password doit faire plus de 6 caractères');
    } else if (!userData.name.match(/^[\p{L}\p{M}'-]+$/u)) {
      setErrMessage('Ton nom ne doit pas contenir de caractère spéciaux.');
    } else if (userData.name.length < 3) {
      setErrMessage('Ton nom doit faire plus de deux lettres.');
    } else if (
      userData.city &&
      !userData.city.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]*$/u)
    ) {
      setErrMessage(
        'La ville contient des caractère spéciaux non autorisé ou a un nom trop court.'
      );
    } else if (!validator.isEmail(userData.email)) {
      setErrMessage('Ton adresse email est incomplète');
    } else {
      const patchResponse = await axiosInstance.patch(`/users/${userId}`, {
        id: userData.id,
        user_name: userData.name,
        email: userData.email,
        city: userData.city,
        user_password: userData.password,
      });
      console.log('status de la reponse update : ', patchResponse.status);
      if (patchResponse.status != 200) {
        console.log(
          "Une erreur est survenue lors de la mise à jour de l'utilisateur."
        );
        setErrMessage(
          "Une erreur est survenue lors de la mise à jour de l'utilisateur."
        );
      } else {
        console.log("Tout s'est bien déroulé dans l'update");
        setIsEditName(false);
        setIsEditVille(false);
        setIsEditEmail(false);
        setIsEditPassword(false);
      }
    }
  };

  // DELETE USER -------------------------------------------------------------
  const handleDeleteUser = async () => {
    const deleteResponse = await axiosInstance.delete(`/users/${userId}`);
    if (deleteResponse.status != 200) {
      console.log(
        "Une erreur est survenue lors de la suppression de l'utilisateur."
      );
    } else {
      removeUserDataFromLocalStorage(); // fonction pour retirer le token jwt
      setIsLogged(false);
      setIsDeleteModalOpen(false);
      console.log(`utilisateur ${userData.name} supprimé`);
      navigate('/'); // redirect ne fonctionne pas ici
    }
  };

  return (
    <div className="account">
      {isLogged === false ? (
        <>
          <h2>
            <XCircle /> Oups tu as du te planter !
          </h2>
          <h3>Tu dois d'abord te connecter pour accéder à ton compte !</h3>
        </>
      ) : (
        <>
          {isDeleteModalOpen && (
            <ModaleDeleteUser
              handleDeleteUser={handleDeleteUser}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          )}

          <h2>
            <Sun className="rotate" /> {`Bienvenue`}{' '}
            <span className="name">{`${userData.name}`}</span>
          </h2>
          <h3>Vos informations :</h3>
          <div className="account__container">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="content__container">
                <span className="label-item">
                  <User /> Prénom{' '}:{' '}
                </span>
                {!isEditName && (
                  <span className={isEditName ? 'hide' : 'user-infos'}>
                    {' '}
                    {userData.name}
                  </span>
                )}
                {isEditName && (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleChangeForm(e, 'name')}
                  />
                )}
                <div className="wrapper-btn">
                  <button
                    type="button"
                    title="Éditer mon nom"
                    onClick={() => {
                      setIsEditName(!isEditName);
                    }}
                  >
                    <Edit3 /> Éditer
                  </button>
                  {isEditName && (
                    <button type="submit" title="Valider les modifications">
                      <CheckCircle /> Valider
                    </button>
                  )}
                </div>
              </div>

              <div className="content__container">
                <span className="label-item">
                  <MapPin /> Ville{' '}:{' '}
                </span>
                {!isEditVille && (
                  <span className="user-infos">
                    {' '}
                    {userData.city}
                  </span>
                )}
                {isEditVille && (
                  <input
                    type="text"
                    value={userData.city}
                    onChange={(e) => handleChangeForm(e, 'city')}
                  />
                )}
                <div className="wrapper-btn">
                  <button
                    type="button"
                    title="Éditer ma ville"
                    onClick={() => {
                      setIsEditVille(!isEditVille);
                    }}
                  >
                    <Edit3 /> Éditer
                  </button>
                  {isEditVille && (
                    <button type="submit" title="Valider les modifications">
                      <CheckCircle /> Valider
                    </button>
                  )}
                </div>
              </div>

              <div className="content__container">
                <span className="label-item">
                  <AtSign /> Email{' '}:{' '}
                </span>
                {!isEditEmail && (
                  <span className="user-infos">
                    {' '}
                    {userData.email}
                  </span>
                )}
                {isEditEmail && (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleChangeForm(e, 'email')}
                  />
                )}
                <div className="wrapper-btn">
                  <button
                    type="button"
                    title="Éditer mon email"
                    onClick={() => {
                      setIsEditEmail(!isEditEmail);
                    }}
                  >
                    <Edit3 /> Éditer
                  </button>
                  {isEditEmail && (
                    <button type="submit" title="Valider les modifications">
                      <CheckCircle /> Valider
                    </button>
                  )}
                </div>
              </div>

              {
                // GESTION DES CSS AVEC CONDITIONS
              }
              <div className="content__container password-element">
                <span className="label-item">
                  <Lock />
                  {' '}Mot de passe {' '}:{' '}
                </span>
                {!isEditPassword && (
                  <span className="user-infos">
                    {' '}
                    {'********'}
                  </span>
                )}
                {isEditPassword && (
                  <div className="password-check__container">
                    <div>
                      <label>Nouveau mot de passe :</label>
                      <input
                        type="password"
                        className={isPasswdEqual ? 'input-validated' : ''}
                        placeholder="Nouveau mot de passe"
                        value={userData.password}
                        onChange={(e) => handleChangeForm(e, 'password')}
                      />
                    </div>
                    <div>
                      <label>Confirmation :</label>
                      <input
                        type="password"
                        className={isPasswdEqual ? 'input-validated' : ''}
                        placeholder="Confirmer le mot de passe"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div className="wrapper-btn">
                  <button
                    type="button"
                    title="Éditer mon mot de passe"
                    onClick={() => {
                      setIsEditPassword(!isEditPassword);
                    }}
                  >
                    <Edit3 /> Éditer
                  </button>
                  {isEditPassword && (
                    <button
                      type="submit"
                      title="Valider les modifications"
                      disabled={!passwordConfirm ? true : false}
                    >
                      <CheckCircle /> Valider
                    </button>
                  )}
                </div>
              </div>
              {errMessage && <span className="error-msg">{errMessage}</span>}
            </form>
          </div>
          {
            //GESTION DE LA SUPPRESSION DU COMPTE > fonction et modale de validation avec state
          }
          <button
            onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
            className="yes"
          >
            <XCircle />
            SUPPRIMER MON COMPTE
          </button>
        </>
      )}
    </div>
  );
}

export default Account;
