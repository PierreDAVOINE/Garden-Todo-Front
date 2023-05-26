import './style.scss';

function Notice() {
  return (
    <div className="notice">
      <div className="notice__img"></div>
      <div className="notice__content">
        <h1>Mentions légales</h1>
        <p>
          1 - Édition du site : En vertu de l'article 6 de la loi n° 2004-575 du
          21 juin 2004 pour la confiance dans l'économie numérique, il est
          précisé aux utilisateurs du site internet GardenTodo l'identité des
          différents intervenants dans le cadre de sa réalisation et de son
          suivi: Propriétaires du site : Hélène TAFRIHI-POUSSET, Maxime CULLIERE
          , Léo VERGER, Pierre Davoine - Contact : davoine.pierre.pro@gmail.com
          - Hébergeur : Vercel
        </p>
        <p>
          2 - Propriété intellectuelle et contrefaçons : l'équipe détient les
          droits d’usage sur tous les éléments accessibles sur le site internet,
          notamment les textes, images, graphismes, logos, vidéos, architecture,
          icônes et sons. Toute reproduction, représentation, modification,
          publication, adaptation de tout ou partie des éléments du site, quel
          que soit le moyen ou le procédé utilisé, est interdite, sauf
          autorisation écrite préalable de l'équipe GardenTodo. Toute
          exploitation non autorisée du site ou de l’un quelconque des éléments
          qu’il contient sera considérée comme constitutive d’une contrefaçon et
          poursuivie conformément aux dispositions des articles L.335-2 et
          suivants du Code de Propriété Intellectuelle.
        </p>
        <p>
          3 - Limitations de responsabilité : GardenTodo ne pourra être tenu
          pour responsable des dommages directs et indirects causés au matériel
          de l’utilisateur, lors de l’accès au site GardenTodo. GardenTodo
          décline toute responsabilité quant à l’utilisation qui pourrait être
          faite des informations et contenus présents sur GardenTodo. L'équipe
          s’engage à sécuriser au mieux le site GardenTodo, cependant sa
          responsabilité ne pourra être mise en cause si des données
          indésirables sont importées et installées sur son site à son insu.
          {/* Des
          espaces interactifs (espace contact) sont à la disposition des
          utilisateurs. GardenTodo se réserve le droit de supprimer, sans mise
          en demeure préalable, tout contenu déposé dans cet espace qui
          contreviendrait à la législation applicable en France, en particulier
          aux dispositions relatives à la protection des données. Le cas
          échéant, GardenTodo se réserve également la possibilité de mettre en
          cause la responsabilité civile et/ou pénale de l’utilisateur,
          notamment en cas de message à caractère raciste, injurieux, diffamant,
          ou pornographique, quel que soit le support utilisé (texte,
          photographie …). */}
        </p>
        <p>
          4 - CNIL et gestion des données personnelles : Conformément aux
          dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l’utilisateur
          du site GardenTodo dispose d’un droit d’accès, de modification et de
          suppression des informations collectées. Pour exercer ce droit,
          envoyez un message à notre Délégué à la Protection des Données :
          GardenTodo - davoine.pierre.pro@gmail.com.
        </p>
        {/* <p>
          5 - Liens hypertextes et cookies : Le site GardenTodo contient des
          liens hypertextes vers d’autres sites et dégage toute responsabilité à
          propos de ces liens externes ou des liens créés par d’autres sites
          vers GardenTodo.
        </p> */}
        <p>
          5 - Droit applicable et attribution de juridiction : Tout litige en
          relation avec l’utilisation du site GardenTodo est soumis au droit
          français. En dehors des cas où la loi ne le permet pas, il est fait
          attribution exclusive de juridiction aux tribunaux compétents de
          Paris.
        </p>
      </div>
    </div>
  );
}

export default Notice;
