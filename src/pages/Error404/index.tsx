import './style.scss';
import getRandomNumber from '../../utils/number';

function Error404() {
  // Récupére et stock dans randomImg un nombre aléatoire compris entre min et max passé en parametre de la fonction getRandomNumber
  // Ce nombre en concaténation de la balise img permet d'appeler une image stocké en le dossier /img/404/x.jpeg
  const randomImg = getRandomNumber(0, 4);
  const titles = ["Le site est tombé dans les pommes", "Il ne faut pas rester planté là !", "Ça sent le sapin", "Faut pas pousser mémé dans les orties"]
  return (
    <div className="error404">
      <div>
        <h2>{titles[randomImg]}</h2>
        <h3>Erreur 404 : La page que vous recherchez n'existe pas.</h3>
      </div>
      <img
        src={`/img/img404/${randomImg}.jpeg`}
        alt="Error 404"
        title="Error 404 - page non trouvée"
      />
    </div>
  );
}

export default Error404;
