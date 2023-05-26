import { GitHub, Linkedin } from "react-feather";
import { Link } from "react-router-dom";
import './style.scss';
import { HandleUsProps } from "../../../src/@types/home"


function Us({ isLogged, setIsLoginModalOpen }: HandleUsProps) {
  return (
    <div className='us'>
      <h1>À propos de Garden to-do</h1>
      <div className="wrapper-content">
        <div className="content">
          <img src="https://res.cloudinary.com/dtzbumqvq/image/upload/c_fill,h_1062,w_1030/v1684239275/pexels-elle-hughes-2069425_dpbcvj.jpg" alt="Mur de plantes et de boutures" title="Mur de plantes et de boutures" />
        </div>
        <div className="content">
          <h2>Le projet</h2>
          <p>Passionnés de plantes, nous avons à coeur de proposer des services accessibles à tous, du plus débutant au spécialiste :</p>
          <ul>
            <li>Une to-do list personnalisée</li>
            <li>Un jardin où vous pouvez ajouter vos plantes</li>
          </ul>
          <p>
            Nous avons voulu créer un outil pour vous permettre de vous occuper de vos plantes au mieux
            si comme nous vous êtes tête en l'air et que les plannings d'arrosage de vos plantes ne correspondent pas selon leur type.
            De nombreuses améliorations sont prévues, n'hésitez pas à revenir nous voir régulièrement !</p>
          <p className={isLogged ? 'hide' : ''}>Pour bénéficier de toutes les fonctionnalités, n'hésitez pas à vous inscrire !</p>
          <button className={isLogged ? 'hide' : ''} title="S'inscrire" onClick={() => setIsLoginModalOpen(true)}>INSCRIPTION</button>
        </div>
      </div>
      <hr />
      <h2>L'équipe</h2>
      <div className="wrapper-team">
        <div className="card-profile">
          <img src="https://res.cloudinary.com/dtzbumqvq/image/upload/v1684237119/_2_bzv7vt.jpg" alt="Tournesol" title="Pierre est notre tournesol" />
          <h2>Pierre Davoine</h2>
          <h3>Lead dev & Scrum Master</h3>
          <Link to="https://github.com/PierreDAVOINE"><GitHub /> Github</Link>
          <Link to="https://www.linkedin.com/in/pierredavoine/"><Linkedin /> LinkedIn</Link>
        </div>

        <div className="card-profile">
          <img src="https://res.cloudinary.com/dtzbumqvq/image/upload/v1684237119/_3_tsoznt.jpg" alt="Dahlia" title="Léo le Dahlia" />
          <h2>Léo Verger</h2>
          <h3>Lead dev & ScrumMaster</h3>
          <Link to="https://github.com/BeoLeo2"><GitHub /> Github</Link>
          <Link to="https://www.linkedin.com/in/l%C3%A9o-verger-74bb18195/"><Linkedin /> LinkedIn</Link>
        </div>

        <div className="card-profile">
          <img src="https://res.cloudinary.com/dtzbumqvq/image/upload/v1684237119/_1_vmj3h0.jpg" alt="Echeveria" title="Maxime l'Echeveria" />
          <h2>Maxime Culliere</h2>
          <h3>Référent technique & Scrum Master</h3>
          <Link to="https://github.com/MaximeCulliere"><GitHub /> Github</Link>
          <Link to="https://www.linkedin.com/in/maxime-culliere-7676b9174/"><Linkedin /> LinkedIn</Link>
        </div>

        <div className="card-profile">
          <img src="https://res.cloudinary.com/dtzbumqvq/image/upload/v1684237119/_4_pwcvk3.jpg" alt="Fritillaire" title="Hélène la Fritillaire" />
          <h2>Hélène Tafrihi-Pousset</h2>
          <h3>Project owner & Scrum Master</h3>
          <Link to="https://github.com/helene-tafrihi-pousset"><GitHub /> Github</Link>
          <Link to="https://www.linkedin.com/in/helene-tafrihi-pousset/"><Linkedin /> LinkedIn</Link>
        </div>
      </div>
    </div >
  );
}

export default Us;