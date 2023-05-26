// getRandomNumber() est une fonction qui prend deux parametres, une valeur minimum et une valeur maximum
// Elle retourne un entier compris entre ces deux valeurs
export default function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min); // Math.ceil arrondi à l'entier supérieur
  max = Math.floor(max); // Math.floor arrondi à l'entier inférieur
  return Math.floor(Math.random() * (max - min) + min);
}
