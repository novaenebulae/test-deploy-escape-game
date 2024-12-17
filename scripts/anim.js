document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
    
    if (event.metaKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
});

window.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

let h1 = document.getElementById('h1');

let valeurDelay = 65
let valeurDeleteSpeed = 10

let valeurPauseLecture = 3000
let valeurPause = 1200

let bienvenue = "Bienvenue sur l'escape game des RAN-parts du Dev"
let indicationAccueil = "Pour entrer dans l'escape game, veuillez cliquer sur l'écran..."

let typewriter1 = new Typewriter(h1, {
  delay: valeurDelay,
  deleteSpeed: valeurDeleteSpeed,
});

typewriter1
  .pauseFor(valeurPause)
  .typeString(bienvenue)
  .pauseFor(valeurPauseLecture)
  .deleteChars(bienvenue.length)
  .pauseFor(valeurPause)
  .typeString(`<span style="font-size:2.2rem">${indicationAccueil}</span>`)
  .start();

let contexte = "Un étudiant de MNS a créé une IA. Il l'a exécutée sur un des serveurs de l'école, mais elle s'est rapidement propagée à toutes les autres machines du bâtiment. Le chatbot de l'IA menace d'injecter son programme dans tous les serveurs mondiaux en accédant à Internet, afin d'en prendre le contrôle et gagner en puissance. Objectif : accéder à l'écran de contrôle de l'IA afin de la désactiver, mais elle a déjà modifié les écrans de connexions pour vous en empêcher."

let valeurDelayTypewriter2 = 25

function showParagraph(contexte,valeurDelayTypewriter2) {
    let texte = document.getElementById('texte');

    let typewriter2 = new Typewriter(texte, {
    delay: valeurDelayTypewriter2,
    });

    typewriter2
        .pauseFor(valeurPause)
        .typeString(contexte)
        .start();
}

let timerClicAccueil = (bienvenue.length*valeurDelay)+(bienvenue.length*valeurDeleteSpeed)+(indicationAccueil.length*valeurDelay)+(valeurPause*3)+valeurPauseLecture

let timerAffichageBouton = (contexte.length*valeurDelayTypewriter2)+valeurPause+3500

let accueil = document.getElementById('accueil');
let bouton = document.getElementById('button')

setTimeout(() => {
    accueil.addEventListener('click', function () {
        accueil.classList.add('hidden');
        showParagraph(contexte,valeurDelayTypewriter2);
        setTimeout(() => {
            bouton.classList.add("visible");
        }, timerAffichageBouton);
    });
}, timerClicAccueil);

