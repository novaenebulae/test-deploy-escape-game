// Liste des règles avec description, validation, et état
const rules = [
  {
    id: 1,
    text: "Votre mot de passe doit contenir au moins 5 caractères.",
    validate: password => password.length >= 5,
    validated: false,
    displayed: false, // Contrôle si la règle a déjà été affichée
  },
  {
    id: 2,
    text: "Votre mot de passe doit inclure un chiffre.",
    validate: password => /\d/.test(password),
    validated: false,
    displayed: false,
  },
  {
    id: 3,
    text: "Votre mot de passe doit inclure une lettre majuscule.",
    validate: password => /[A-Z]/.test(password),
    validated: false,
    displayed: false,
  },
  {
    id: 4,
    text: "Votre mot de passe doit inclure un caractère spécial.",
    validate: password => /[!@#$%^&*()\-=+]/.test(password),
    validated: false,
    displayed: false,
  },
  {
    id: 5,
    text: "Les chiffres de votre mot de passe doivent avoir une somme égale à 25.",
    validate: password => {
      const digits = password.match(/\d/g) || [];
      return digits.map(Number).reduce((a, b) => a + b, 0) === 25;
    },
    validated: false,
    displayed: false,
  },
  {
    id: 6,
    text: "Votre mot de passe doit inclure un mois de l'année.",
    validate: password => /(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i.test(password),
    validated: false,
    displayed: false,
  },
  {
    id: 7,
    text: "Votre mot de passe doit inclure un chiffre romain.",
    validate: password => /(I|V|X|L|C|D|M)/.test(password),
    validated: false,
    displayed: false,
  },
  {
    id: 8,
    text: "Votre mot de passe doit inclure l'un de nos sponsors.",
    validate: password => /(intel|amd|ibm)/.test(password),
    validated: false,
    displayed: false,
    images: ["./images/amd.png", "./images/intel.png", "./images/ibm.png"]
  },
  {
    id: 9,
    text: "Les chiffres romains dans votre mot de passe doivent avoir un produit égal à 35.",
    validate: password => {
      const romanValues = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

      function romanToInteger(roman) {
        let total = 0;
        let prevValue = 0;
        for (let i = roman.length - 1; i >= 0; i--) {
          const currentValue = romanValues[roman[i]];
          if (currentValue < prevValue) {
            total -= currentValue;
          } else {
            total += currentValue;
          }
          prevValue = currentValue;
        }
        return total;
      }

      const matches = password.match(/[IVXLCDM]+/g) || [];
      const product = matches.reduce((acc, roman) => acc * romanToInteger(roman), 1);
      return product === 35;
    },
    validated: false,
    displayed: false,
  },
  {
    id: 10,
    text: "Votre mot de passe doit inclure ce CAPTCHA.",
    validate: password => password.includes("imabot"),
    validated: false,
    displayed: false,
    images: ["./images/captcha.jpg"], 
  },
];