
// Traduction correcte
const correctAnswer = "172.16.248.2";

// Formulaire et éléments
const form = document.getElementById("binary-form");
const messageField = document.getElementById("message");
const responseDiv = document.getElementById("response");
const connectionStatusDiv = document.getElementById("connection-status");
const connectionEstablishedDiv = document.getElementById("connection-established");
const binaryTextElement = document.getElementById("binary-text"); // Correctement ciblé
const formElements = form.querySelectorAll("textarea, button");

// Texte binaire à écrire progressivement
const binaryText = "10101100.10000.11111000.10";

// Initialiser le formulaire masqué
form.style.opacity = "0";
form.style.transition = "opacity 1s ease";

// Variables pour l'effet d'écriture
let index = 0;

// Fonction pour afficher le texte binaire progressivement
function typeBinaryText () {
    if (index < binaryText.length) {
        binaryTextElement.textContent += binaryText[index]; // Ajouter caractère par caractère
        index++;
        setTimeout(typeBinaryText, 50); // Vitesse de l'animation
    } else {
        // Une fois terminé, faire apparaître le formulaire
        setTimeout(() => {
            form.style.opacity = "1"; // Transition d'apparition
        }, 500);
    }
}

// Lancer l'animation d'écriture au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    typeBinaryText();
});

// Permettre l'envoi avec la touche "Entrée" dans le textarea
messageField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Empêche l'ajout d'un saut de ligne
        form.dispatchEvent(new Event("submit")); // Déclenche la soumission du formulaire
    }
});

// Conteneur des indices
const hint1Button = document.getElementById("hint1");
const hint2Button = document.getElementById("hint2");
const hint3Button = document.getElementById("hint3");
const hintsContainer = document.getElementById("hints-container");

// Bouton de redirection
const redirectButton = document.getElementById("redirect-button");

// Messages d'indice
const hints = [
    "Indice 1 : Un nombre rempli de 0 et de 1 rappelle forcément un nombre binaire. Peut-être un lien vers l'adresse IP du réseau ?",
    "Indice 2 : Un nombre binaire peut être traduit en décimal.",
    "Indice 3 : Il faut bien traduire chaque nombre avant un point comme un décimal unique."
];

// Fonction pour activer un bouton après un délai
function enableHintButton (button, hintMessage, delay) {
    setTimeout(() => {
        button.disabled = false;
        button.style.backgroundColor = "#007BFF"; // Couleur normale
        button.style.cursor = "pointer";
        button.addEventListener("click", function () {
            alert(hintMessage);
        });
    }, delay);
}

// Activer les boutons avec un délai spécifique
enableHintButton(hint1Button, hints[0], 1 * 60 * 1000); // 1 minutes
enableHintButton(hint2Button, hints[1], 2 * 60 * 1000); // 2 minutes
enableHintButton(hint3Button, hints[2], 4 * 60 * 1000); // 4 minutes

// Fonction pour secouer le conteneur en cas de mauvaise réponse
function shakeContainer () {
    const container = document.getElementById("contact");
    container.classList.add("shake");
    setTimeout(() => {
        container.classList.remove("shake");
    }, 1000); // La secousse dure 1 seconde
}

// Événement de soumission du formulaire
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const userAnswer = messageField.value.trim(); // Récupère et nettoie la réponse

    if (userAnswer === correctAnswer) {
        responseDiv.textContent = "Adresse IP trouvée";
        responseDiv.style.color = "green";
        responseDiv.style.fontSize = "35px";

        form.style.display = "none";
        binaryTextElement.style.display = "none";

        // Effet de "Connexion en cours..."
        connectionStatusDiv.style.display = "block";
        let dotCount = 1;
        let dots = "";
        let dotInterval = setInterval(function () {
            dots = ".".repeat(dotCount);
            document.getElementById("connecting").textContent = "Connexion en cours" + dots;
            dotCount = (dotCount % 3) + 1;
        }, 500);

        // Après 3 secondes, arrêter l'effet et afficher "Connexion établie"
        setTimeout(() => {
            clearInterval(dotInterval);
            connectionStatusDiv.style.display = "none";
            connectionEstablishedDiv.style.display = "block";
            redirectButton.style.display = "block";
            hintsContainer.style.display = "none";
        }, 5000);
    } else {
        responseDiv.textContent = "Mauvaise adresse IP. Connexion réseau échouée.";
        responseDiv.style.color = "red";
        responseDiv.style.fontSize = "20px";

        // Appliquer l'effet de secousse
        shakeContainer();

        connectionStatusDiv.style.display = "none";
        connectionEstablishedDiv.style.display = "none";
    }
});
