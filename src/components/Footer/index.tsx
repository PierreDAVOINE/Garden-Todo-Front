import { NavLink } from 'react-router-dom';
import './style.scss'

function Footer() {
  return (
    <div className='footer'>
      <NavLink
        to="/mentions-legales"
        className='link--io link'
      >
        Mentions légales
      </NavLink>
      <NavLink
        to="/a-propos"
        className='link--io link'
      >
        À propos
      </NavLink>
    </div>
  );
}

export default Footer;