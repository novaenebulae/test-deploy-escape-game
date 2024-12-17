// popup.js - Script pour afficher les pop-ups des étapes

// Contenus des étapes
const stepsContent = {
  0: "Un étudiant de MNS a crée une IA, il l'a exécuté sur un des serveurs de l'école mais l'IA s'est rapidement répandue au sein de toutes les autres machines du batiment. Le chatbot de l'IA menace d'injecter son programme dans tout les serveurs mondiaux en accédant à internet, afin de prendre le contrôle de ceux-ci et gagner d'avantage en puissance.",
  1: "L'IA vous a déconnecté du réseau de l'école afin de se protéger, et elle a crypté l'adresse IP du routeur d'accès à celui-ci. Heureusement, vous parvenez à l'obtenir mais elle est au format binaire...",
  2: "Vous êtes connecté au réseau, mais l'IA a eu le temps de modifier le design de la page de de login. Vous avez un moyen de contourner cette page en utilisant une url alternative, mais le programme de l'IA a cachée celle-ci.",
  3: "Vous avez trouvé l'url alternative ! Vous devez maintenant vous connecter avec un mot de passe d'admin pour modifier les fichiers du serveur, mais comment faire pour le décrypter ?",
  4: "Le mot de passe déchiffré a une sécurité trop faible, et le site vous demande de changer celui-ci (comme si vous aviez le temps pour faire cela ...). Vous soupconnez un stratagème de l'IA pour vous ralentir d'avantage, dépéchez vous de passer cette étape.",
  5: "L'IA a enfin compris votre potentiel et tente de se protéger en utilisant une autre stratégie : tester vos connaissances dans le domaine de l'informatique. Resolvez son quizz pour corrompre ses défenses !",
  6: "Vous avez enfin réussi à accéder au code source de l'IA, il vous faut modifier celui-ci pour l'obliger à s'autodétruire et ainsi sauver l'internet mondial de sa propagation.",
};

// Fonction pour afficher une alerte stylisée
function popupMessage (messageId) {
  // Vérifier si une alerte existe déjà
  if (document.getElementById("custom-alert")) return;
  const message = stepsContent[messageId];
  // Créer le conteneur de l'alerte
  const alertContainer = document.createElement("div");
  alertContainer.id = "custom-alert";
  alertContainer.innerHTML = `
    <div class="alert-overlay"></div>
    <div class="alert-box">
      <pre id="alert-message"></pre>
      <button id="alert-close">OK</button>
    </div>
  `;

  // Ajouter au body
  document.body.appendChild(alertContainer);

  // Animation pour afficher le texte caractère par caractère
  const alertMessage = document.getElementById("alert-message");
  let i = 0;
  function typeWriter () {
    if (i < message.length) {
      alertMessage.textContent += message.charAt(i);
      i++;
      setTimeout(typeWriter, 20); // Délai entre chaque caractère
    }
  }
  typeWriter();

  // Ajouter au body
  document.body.appendChild(alertContainer);

  // Fermer l'alerte au clic sur le bouton
  document.getElementById("alert-close").addEventListener("click", () => {
    document.body.removeChild(alertContainer);
  });
}

// CSS pour le pop-up stylisé
const style = document.createElement("style");
style.textContent = `
  #custom-alert .alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
}
#custom-alert .alert-box {
  justify-content: space-between;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  height: 50%;
  width: 30%;
  max-width: 90%; /* Limite la largeur pour les petits écrans */
  max-height: 70%; /* Limite la hauteur pour éviter les dépassements */
  overflow: auto; /* Ajoute un défilement si le contenu dépasse */
  transform: translate(-50%, -50%);
  background: #0d1117;
  color: #00ff00 !important;
  font-family: 'Courier New', Courier, monospace !important;
  padding: 20px;
  border: 1px solid #00ff00;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  z-index: 1001;
  text-align: left;
  white-space: pre-wrap;
}
#custom-alert .alert-box pre {
  margin: 0;
  font-size: 1.2em;
  white-space: pre-wrap; /* Permet de conserver les sauts de ligne */
  word-wrap: break-word; /* Force les mots longs à passer à la ligne */
  word-break: break-word;
  color: #00ff00 !important;
  font-family: 'Courier New', Courier, monospace !important;
}
#custom-alert .alert-box button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #00ff00;
  color: #0d1117;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
#custom-alert .alert-box button:hover {
  background: #009900;
}

`;
document.head.appendChild(style);


//INSERTION SCRIPT HTML : <script src="/path/to/popup.js"></script>

//GENERER POP UP (INSERER DANS HTML) : 

{/* <script>
  document.addEventListener("DOMContentLoaded", () => {
    popupMessage(1); // Remplace le numéro par l'étape correspondante
  });
</script> */}
