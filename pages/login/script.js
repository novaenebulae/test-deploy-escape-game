// ON APPEL LES MOTS ----------------------------------------------------
const piscine = document.getElementById("dot-container");
function wordGen() {
  piscine.innerHTML += `
        <span id="piscine-mot1" class="piscine-mot">alternatif</span>
        <span id="piscine-mot2" class="piscine-mot">connexion</span>
        <span id="piscine-mot3" class="piscine-mot">portail</span>
`;
}
wordGen();

//  DEFINIT LE NOMBRE DE POINT ------------------------------
function DotGen() {
  ran = Math.floor(Math.random() * 3) + 1;
  const Dot = document.createElement("span");
  Dot.classList.add("dot");
  Dot.classList.add(`c${ran}`);
  piscine.appendChild(Dot);
}
// ON MODIFIE ICI LE NOMBRE DE POINTS EN AXE X ET Y
let dotNumbXcap = Math.round(piscine.clientWidth / 48);
let dotNumbYcap = Math.round(piscine.clientHeight / 41);

for (DotNumbY = 0; DotNumbY < dotNumbYcap; DotNumbY++) {
  DotGen();
  for (DotNumbX = 0; DotNumbX < dotNumbXcap; DotNumbX++) {
    DotGen();
  }
}

// DEFINIT LE RESPONSIVE DES POINTS ----------------------------------------
// setInterval(() => {
//   LastDot = document.body.lastElementChild;
//   if (DotNumbX < dotNumbXcap) {
//     DotGen();
//     DotNumb++;
//   }
//   if (DotNumbY > dotNumbYcap) {
//     document.body.removeChild(LastDot);
//     DotNumb--;
//   }
// }, 1000);

// DEFINIT LA POSITION DE CHAQUE POINTS ---------------------------------------
const DotContainer = document.getElementById("dot-container");
let Dots = DotContainer.querySelectorAll(".dot");

let dotDistX = window.innerWidth / dotNumbXcap;
let dotDistY = window.innerHeight / dotNumbYcap;
let NumberY = 0;
let NumberX = 0;
function scalePool() {
  Dots.forEach((dot) => {
    if (NumberX <= dotNumbXcap) {
      dotPosX = dotDistX * NumberX;
      dot.style.left = `${dotPosX - 15}px`;
      NumberX++;
    }
    if (NumberX == dotNumbXcap) {
      NumberX = 0;
      NumberY = NumberY + 1;
    }
    if (NumberY <= dotNumbYcap) {
      dotPosY = dotDistY * NumberY;
      dot.style.top = `${dotPosY - 80}px`;
    }
    if (NumberY == dotNumbYcap) {
      NumberY = dotNumbYcap;
    }
    dot.initialLeft = dot.offsetLeft;
    dot.initialTop = dot.offsetTop;
  });
}
scalePool();

let windowsWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth != windowsWidth) {
    DotContainer.innerHTML = "";
    wordGen();
    dotNumbXcap = Math.round(piscine.clientWidth / 48);
    dotNumbYcap = Math.round(piscine.clientHeight / 41);
    dotDistX = window.innerWidth / dotNumbXcap;
    dotDistY = window.innerHeight / dotNumbYcap;
    NumberY = 0;
    NumberX = 0;

    for (DotNumbY = 0; DotNumbY < dotNumbYcap; DotNumbY++) {
      DotGen();
      for (DotNumbX = 0; DotNumbX < dotNumbXcap; DotNumbX++) {
        DotGen();
      }
    }
    Dots = DotContainer.querySelectorAll(".dot");
    scalePool();
    windowsWidth = window.innerWidth;
  }
});

// DEFINIT LE COMPORTEMENT DE CHAQUE POINTS A LA SOURIS -------------------------------
let animationFrameId;
DotContainer.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(() => {
      Dots.forEach((dot) => {
        const dotPosLocX = dot.getBoundingClientRect().x + 30;
        const dotPosLocY = dot.getBoundingClientRect().y + 40;
        const deltaX = mouseX - dotPosLocX;
        const deltaY = mouseY - dotPosLocY;
        let maxDistance = 100;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        // ON MODIFIE ICI LA LARGEUR DU HALO DE SOURIS
        if (window.innerWidth > 1920) {
          maxDistance = 100 * (window.innerWidth / 1800);
        } else {
          maxDistance = 100;
        }

        if (distance < maxDistance) {
          const moveX = (deltaX / distance) * (maxDistance - distance);
          const moveY = (deltaY / distance) * (maxDistance - distance);
          dot.style.left = `${dot.initialLeft - moveX}px`;
          dot.style.top = `${dot.initialTop - moveY}px`;
        } else {
          dot.style.left = `${dot.initialLeft}px`;
          dot.style.top = `${dot.initialTop}px`;
        }
      });
    });
    animationFrameId = null;
  }
});

// LOGIQUE DE REVEAL DES MOTS ------------------------------------------

const revealMot1 = document.getElementById("reveal-mot1");
const revealMot2 = document.getElementById("reveal-mot2");
const revealMot3 = document.getElementById("reveal-mot3");

const solutionInput = document.getElementById("solution");

solutionInput.addEventListener("input", () => {
  if (solutionInput.value == "connexion") {
    revealMot1.innerHTML = "connexion";
  }
  if (solutionInput.value == "portail") {
    revealMot2.innerHTML = "portail";
  }
  if (solutionInput.value == "alternatif") {
    revealMot3.innerHTML = "alternatif";
  }
});
