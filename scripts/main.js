document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
    event.preventDefault();
  }

  if (event.metaKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
    event.preventDefault();
  }
});

window.addEventListener('wheel', function (event) {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });

let h1 = document.getElementById('h1');

let valeurDelay = 65;
let valeurDeleteSpeed = 10;

let valeurPauseLecture = 3000;
let valeurPause = 1200;

let bienvenue = "Bienvenue sur l'escape game des RAN-parts du Dev";
let indicationAccueil = "Pour entrer dans l'escape game, veuillez cliquer sur l'écran...";

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

let contexte = "Vous êtes dans une salle high-tech où un terminal central surveille les actions d'une IA malveillante. Cette IA menace de se propager dans les systèmes mondiaux pour provoquer le chaos et l'anéantissement des systèmes de sécurité sur Terre. Pour empêcher cela, vous devez résoudre l'énigme codée pour localiser et désactiver l'IA avant qu'elle n'atteigne son objectif. Le temps presse.";

let valeurDelayTypewriter2 = 25;

function showParagraph (contexte, valeurDelayTypewriter2) {
  let texte = document.getElementById('texte');

  let typewriter2 = new Typewriter(texte, {
    delay: valeurDelayTypewriter2,
  });

  typewriter2
    .pauseFor(valeurPause)
    .typeString(contexte)
    .start();
}

let timerClicAccueil = (bienvenue.length * valeurDelay) + (bienvenue.length * valeurDeleteSpeed) + (indicationAccueil.length * valeurDelay) + (valeurPause * 3) + valeurPauseLecture;

let timerAffichageBouton = contexte.length * valeurDelayTypewriter2 + (valeurPause * 2);

let accueil = document.getElementById('accueil');
let bouton = document.getElementById('button');

setTimeout(() => {
  accueil.addEventListener('click', function () {
    accueil.classList.add('hidden');
    showParagraph(contexte, valeurDelayTypewriter2);
    setTimeout(() => {
      bouton.classList.add("visible");
    }, timerAffichageBouton);
  });
}, timerClicAccueil);