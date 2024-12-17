// Matrix background effect
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
const fontSize = 20;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(10, 10, 26, 0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ffff";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function animateMatrix() {
  drawMatrix();
  requestAnimationFrame(animateMatrix);
}

// Quiz Questions
const questions = [
  {
    question: "Que signifie 'CSS' ?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    question: "QU'EST-QU'UN BON MOT DE PASSE ?",
    options: [
      "Le même que celui de ta moitié : moins de chance de l’oublier",
      "Un mot facile à retenir, comme « motdepasse »",
      "Une suite d’au moins 5 lettres ou 5 chiffres",
      "Un ensemble d'au moins 12 caractères, de types différents",
    ],
    correctAnswer: "Un ensemble d'au moins 12 caractères, de types différents",
  },
  {
    question: "QU'INDIQUE 'HTTPS' ?",
    options: [
      "Que le site a reçu le label « super »",
      "Que le site utilise un protocole de navigation sécurisé",
      "Que le site est en fait une réunion de plusieurs sites, d’où le « s » à la fin",
      "Que le site est le « seule » dans l'univers",
    ],
    correctAnswer: "Que le site utilise un protocole de navigation sécurisé",
  },
  {
    question: "UNE « CYBER ATTAQUE » C'EST :",
    options: ["Le titre du dernier Matrix", "Le nom d’une compile d’électro", "Une action malveillante en direction d’un système ou d’un réseau"],
    correctAnswer: "Une action malveillante en direction d’un système ou d’un réseau",
  },
  {
    question: "QU'EST-CE Q'UN RÉSEAU 'LAN' ?",
    options: [
      "Un réseau dans une zone géographique limitée",
      "Un réseau couvrant une vaste zone géographique",
      "Un réseau pirate errant à la dérive depuis des décennies",
    ],
    correctAnswer: "Un réseau dans une zone géographique limitée",
  },
  {
    question: "JE PEUX PROTÉGER L'ACCÈS À MON ORDINATEUR :",
    options: [
      "En ne l’utilisant qu’à la maison, avec ma connexion personnelle",
      "En l’équipant d’une housse de qualité",
      "En le mettant à jour régulièrement et en installant un anti-virus",
    ],
    correctAnswer: "En le mettant à jour régulièrement et en installant un anti-virus",
  },
  {
    question: "COMMENT ACCEDÉR À LA PAGE 'CHOCOLAT' ?",
    options: [
      " https://chocolateriemns-chocolat.fr/",
      "https://chocolateriemns.chocolat.fr/",
      "https://chocolateriemns/chocolat.fr/",
      "https://chocolateriemns.fr/chocolat/",
    ],
    correctAnswer: "https://chocolateriemns.fr/chocolat/",
  },
  {
    question: "QU'EST-CE QUI EST TRADUIT EN ADRESSE IP PAR UN SERVEUR DNS ?",
    options: ["Adresse IP", "DNS", "Nom de domaine", "Serveur primaire"],
    correctAnswer: "Nom de domaine",
  },
  {
    question: "C'EST QUOI UN 'ALGORITHME' ?",
    options: [
      "Une application informatique qui exécute des programmes automatiquement",
      "Suite d'étapes permettant d'obtenir un résultat à partir d'éléments fournis en entrée",
      "Un langage de programmation utilisé pour coder des logiciels",
      "Une base de données qui stocke des informations structurées",
    ],
    correctAnswer: "Suite d'étapes permettant d'obtenir un résultat à partir d'éléments fournis en entrée",
  },
  {
    question: "QUEL EST LE RÔLE DES SERVEURS 'DNS' ?",
    options: [
      "Ils définissent les normes de sécurité d'un réseau",
      "Ils traduisent des demandes de noms en adresses IP",
      "Ils relient les routeurs d'un réseau local entre eux",
      "Ils gèrent la protection des données d'un réseau",
    ],
    correctAnswer: "Ils traduisent des demandes de noms en adresses IP",
  },
];

const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const corruptionElement = document.getElementById("corruption-level");
const scoreTrackerElement = document.getElementById("score-tracker");
const questionContainer = document.getElementById("question-container");
const currentQuestionElement = document.getElementById("current-question");
const optionsContainer = document.getElementById("options-container");
const container = document.querySelector(".container");

let currentQuestionIndex = 0;
let timeLeft = 60;
let corruptionLevel = 0;
let correctAnswers = 0;
let timerInterval;

startButton.addEventListener("click", startQuiz);
animateMatrix();

function startQuiz() {
  introScreen.style.display = "none";
  quizScreen.style.display = "block";
  startTimer();
  displayQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `TEMPS RESTANT : ${timeLeft} SECONDES`;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  currentQuestionElement.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("quiz-option");
    button.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
    correctAnswers++;
    corruptionLevel += 10;
    corruptionElement.textContent = `CORRUPTION DE L'IA : ${corruptionLevel}%`;
    container.classList.add("anim-good-answer");
    setTimeout(() => {
      container.classList.remove("anim-good-answer");
    }, 1000);
  } else {
    container.classList.add("anim-wrong-answer");
    setTimeout(() => {
      container.classList.remove("anim-wrong-answer");
    }, 1000);
  }

  scoreTrackerElement.textContent = `SCORE : ${correctAnswers}/${questions.length}`;
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);

  // Calcul du pourcentage de réponses correctes
  const successPercentage = (correctAnswers / questions.length) * 100;

  // Masquer l'écran de quiz
  document.getElementById("quiz-screen").style.display = "none";

  // Condition de désactivation : 80% de réponses correctes
  if (successPercentage >= 80) {
    // Écran de succès
    const successScreen = document.getElementById("success-screen");
    successScreen.style.display = "block";
    document.getElementById("final-score").textContent = `SCORE FINAL : ${correctAnswers}/${questions.length} (${successPercentage.toFixed(0)}%)`;
  } else {
    // Écran d'échec
    const failureScreen = document.getElementById("failure-screen");
    failureScreen.style.display = "block";
    document.getElementById("failure-score").textContent = `SCORE : ${correctAnswers}/${questions.length} (${successPercentage.toFixed(0)}%)`;
  }
}
