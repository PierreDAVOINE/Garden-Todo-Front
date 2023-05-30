import { useState } from 'react';
// import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { NavLink, Link } from 'react-router-dom';
import './style.scss';
import {
  UserX,
  User,
  Key,
} from '../../../node_modules/react-feather/dist/index';
import NotificationPopUp from '../NotificationPopUp';
import { removeUserDataFromLocalStorage } from '../../utils/user';
import { HeaderProps } from '../../../src/@types/header';
import { useNavigate } from 'react-router-dom';

function Header({
  isLogged,
  setIsLoginModalOpen,
  setIsSignup,
  setIsLogged,
  notifications,
  setNotifications,
  setnotificationIsOn,
  notificationIsOn,
}: HeaderProps) {
  const navigate = useNavigate();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleOpeningModal = (isAlreadyRegistered: boolean) => {
    setMenuIsOpen(false);
    isAlreadyRegistered ? setIsSignup(true) : setIsSignup(false);
    setIsLoginModalOpen(true);
  };

  function handleClickDisconnected(): void {
    setMenuIsOpen(false);
    removeUserDataFromLocalStorage();
    setIsLogged(false);
    navigate('/');
  }

  return (
    <header className="header">
      <button
        aria-label="Mobile menu"
        className={
          menuIsOpen
            ? 'hamburger hamburger--3dxy is-active'
            : 'hamburger hamburger--3dxy'
        }
        type="button"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        title="Menu mobile"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      {/* MENU MOBILE */}
      {menuIsOpen && (
        <div className="header__mobile-link-nav">
          <img
            className="header__mobile-link-nav-logo-img"
            src="/img/gardentodo-logo1.png"
            alt="Garden to do logo"
            title="GardenTodo"
          />
          <nav className="header__mobile-link-nav-main">
            <NavLink
              to="/"
              relative="path"
              className="link--io link"
              onClick={() => setMenuIsOpen(false)}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/plantes"
              relative="path"
              className="link--io link"
              onClick={() => setMenuIsOpen(false)}
            >
              Liste des plantes
            </NavLink>
            {isLogged && (
              <NavLink
                to="/mon-espace-vert"
                relative="path"
                className="link--io link"
                onClick={() => setMenuIsOpen(false)}
              >
                Mon espace vert
              </NavLink>
            )}
            <NavLink
              to="/a-propos"
              relative="path"
              className="link--io link"
              onClick={() => setMenuIsOpen(false)}
            >
              À propos
            </NavLink>
          </nav>

          {/* Si l'utilisateur n'est pas connecté on lui propose de se connecter ou de créer un compte */}
          {!isLogged && (
            <nav className="header__mobile-menu-user-links">
              <li>
                <button
                  onClick={() => handleOpeningModal(false)}
                  className="link--dia link"
                >
                  <User /> Inscription
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpeningModal(true)}
                  className="link--dia link"
                >
                  <Key /> Connexion
                </button>
              </li>
            </nav>
          )}

          {/* A l'inverse, si l'utilisateur est connecté on lui propose d'accéder à ses informations personnelles ou de se déconnecter */}
          {isLogged && (
            <nav className="header__mobile-menu-user-links">
              <li>
                {/* On laisse un link ici car "mon compte" et une page et il faudra une url */}
                <Link
                  to="/mon-compte"
                  relative="path"
                  className="link--dia link"
                  onClick={() => setMenuIsOpen(false)}
                >
                  <User /> Mon compte
                </Link>
              </li>
              <li>
                <button
                  className="link--dia link"
                  onClick={() => handleClickDisconnected()}
                >
                  <UserX /> Déconnexion
                </button>
              </li>
            </nav>
          )}
        </div>
      )}
      {isLogged && notificationIsOn && (
        <NotificationPopUp
          notifications={notifications}
          setNotifications={setNotifications}
          setnotificationIsOn={setnotificationIsOn}
          notificationIsOn={notificationIsOn}
        />
      )}
      <div className="header__logo">
        <Link to="/" relative="path">
          <img
            className="header__logo-img"
            src="/img/gardentodo-logo1.png"
            alt="Garden to do logo"
            title="GardenTodo"
          />
        </Link>
      </div>

      {/* MENU DEKSTOP */}
      {
        // Liens à changer pour l'inscription/connexion
      }
      {/* Si l'utilisateur n'est pas connecté on lui propose de se connecter ou de créer un compte */}
      {!isLogged && (
        <nav className="desktop-menu-user-links">
          <button
            onClick={() => handleOpeningModal(false)}
            className="link--dia link"
          >
            <User /> Inscription
          </button>

          <button
            onClick={() => handleOpeningModal(true)}
            className="link--dia link"
          >
            <Key /> Connexion
          </button>
        </nav>
      )}

      {/* A l'inverse, si l'utilisateur est connecté on lui propose d'accéder à ses informations personnelles ou de se déconnecter */}
      {isLogged && (
        <nav className="desktop-menu-user-links">
          <Link to="/mon-compte" relative="path" className="link--dia link">
            <User /> Mon compte
          </Link>
          <button
            className="link--dia link"
            onClick={() => handleClickDisconnected()}
          >
            <UserX /> Déconnexion
          </button>
        </nav>
      )}

      <nav className="desktop-menu">
        {/* <NavLink to="/" relative="path" className={({ isActive: any }) => isActive ? 'link--io link active' : 'link--io link'}> */}
        <NavLink to="/" relative="path" className="link--io link">
          Accueil
        </NavLink>
        <NavLink to="/plantes" relative="path" className="link--io link">
          Liste des plantes
        </NavLink>
        {isLogged && (
          <NavLink
            to="/mon-espace-vert"
            relative="path"
            className="link--io link"
          >
            Mon espace vert
          </NavLink>
        )}
        <NavLink to="/a-propos" relative="path" className="link--io link">
          À propos
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
