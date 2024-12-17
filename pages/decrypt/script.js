// Fonction de déchiffrement César
function dechiffrementCesar (text, cle) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let resultat = "";

    for (let char of text) {
        if (alphabet.includes(char.toLowerCase())) {
            let index = alphabet.indexOf(char.toLowerCase());
            let indexDechiffre = (index - cle + alphabet.length) % alphabet.length;
            let charDechiffre = alphabet[indexDechiffre];
            resultat += char === char.toUpperCase() ? charDechiffre.toUpperCase() : charDechiffre;
        } else {
            resultat += char; // Garder les espaces et ponctuations
        }
    }

    return resultat;
}

// Gérer le clic sur le bouton "Déchiffrer"
document.getElementById('btn-dechiffrer').addEventListener('click', () => {
    const texteChiffre = document.getElementById('text-chiffre').textContent;
    const cleInput = document.getElementById('cle').value;

    // Vérifier si une clé a été saisie
    if (cleInput === "") {
        document.getElementById('text-dechiffre').textContent = "Veuillez entrer une clé.";
        document.dispatchEvent(new CustomEvent('decrypt-error'));
        return;
    }

    const cle = parseInt(cleInput);

    // Vérifier si la clé est valide
    if (isNaN(cle) || cle < 0 || cle > 25) {
        document.getElementById('text-dechiffre').textContent = "Clé invalide. Entrez un nombre entre 0 et 25.";
        document.dispatchEvent(new CustomEvent('decrypt-error'));
        return;
    }

    // Déchiffrer et afficher le message
    const texteDechiffre = dechiffrementCesar(texteChiffre, cle);
    document.getElementById('text-dechiffre').textContent = texteDechiffre;
    document.dispatchEvent(new CustomEvent('decrypt-success'));
    if (texteDechiffre === 'lesbananescestlavie') {
        document.getElementById('redirect').style.display = '';

    }
});



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Dimensions du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caractères utilisés pour l'effet
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ+-*/99";
const fontSize = 16;  // Taille de la police
const columns = canvas.width / fontSize;  // Nombre de colonnes pour l'effet de défilement

// Créer un tableau de "y positions" pour chaque colonne
let drops = Array(Math.floor(columns)).fill(0);

// Fonction pour dessiner les caractères
function draw () {
    // Fond noir pour chaque frame (assure que le fond ne change pas)
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Remplir chaque colonne avec des caractères aléatoires
    ctx.fillStyle = "#ec6834";  // Couleur des caractères (OrangeMNS)
    ctx.font = fontSize + "px monospace";

    // Dessiner les caractères pour chaque colonne
    for (let i = 0; i < drops.length; i++) {
        let char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Remise à zéro des positions de y pour les caractères
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Augmenter la position de y pour le défilement
        drops[i]++;
    }
}

// Animation
setInterval(draw, 75); // 30 fps, ajustez si nécessaire

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = Array(Math.floor(columns)).fill(0);  // Réinitialiser les positions des gouttes
});


