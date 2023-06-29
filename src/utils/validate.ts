import validator from 'validator';
import { Userdataprops, Userdatasignprops } from '../@types/user';

// Validation d'un nom
export const nameValidation = (name: string) => {
  // cette regex permet de vérifier que le nom contient au moins 2 caractères sans caractères spéciaux
  const regex = new RegExp('^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$');
  return regex.test(name);
};

// Validation d'une ville
export const cityValidation = (city: string) => {
  if (city) {
    // cette regex permet de vérifier que la ville ne contient pas de caractères spéciaux
    const regex = new RegExp("^[a-zA-ZÀ-ÖØ-öø-ÿ\\s'-]*$");
    return regex.test(city);
  }
  return true;
};

// Validation d'un email
export const emailValidation = (email: string) => {
  return validator.isEmail(email);
};

// Vdalidation d'un mot de passe
export const passwordValidation = (password: string) => {
  // cette regex permet de vérifier que le mot de passe contient au moins 6 caractères, une majuscule et un caractère spécial
  const regex = new RegExp(
    '^(?=.*[A-Z])(?=.*[!?@#$%^&*()_+])[a-zA-Z0-9!?@#$%^&*()_+-]{6,}$'
  );

  return regex.test(password);
};

// Validation de dataUser (inscription)
export const dataUserValidation = (dataUser: Userdatasignprops) => {
  const { name, city, email, password, passwordConfirm } =
    dataUser as Userdatasignprops;
  const errors = [];

  if (!nameValidation(name)) {
    errors.push(
      'Le nom doit contenir au moins 2 caractères, sans caractères spéciaux'
    );
  }

  if (!cityValidation(city)) {
    errors.push('La ville ne doit pas contenir de caractères spéciaux');
  }

  if (!emailValidation(email)) {
    errors.push("L'email n'est pas valide");
  }

  if (!passwordValidation(password)) {
    errors.push(
      'Le mot de passe doit contenir au moins 6 caractères, une majuscule et un caractère spécial'
    );
  }

  if (password !== passwordConfirm) {
    errors.push('Les mots de passe ne sont pas identiques');
  }

  return errors;
};

// Validation de dataUser (connexion)
export const dataUserValidationLogin = (dataUser: Userdatasignprops) => {
  const { email, password } = dataUser as Userdatasignprops;
  const errors = [];

  if (!emailValidation(email) || !passwordValidation(password)) {
    errors.push('Identifiants ou mot de passe incorrects');
  }

  return errors;
};

// Validation de dataUser (modification)
export const dataUserValidationUpdate = (dataUser: Userdataprops) => {
  const { name, city, email, password } = dataUser as Userdataprops;
  const errors = [];

  if (!nameValidation(name)) {
    errors.push(
      'Le nom doit contenir au moins 2 caractères, sans caractères spéciaux'
    );
  }

  if (!cityValidation(city)) {
    errors.push('La ville ne doit pas contenir de caractères spéciaux');
  }

  if (!emailValidation(email)) {
    errors.push("L'email n'est pas valide");
  }

  if (password && !passwordValidation(password)) {
    errors.push(
      'Le mot de passe doit contenir au moins 6 caractères, une majuscule et un caractère spécial'
    );
  }

  return errors;
};
