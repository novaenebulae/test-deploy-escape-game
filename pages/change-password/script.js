const rulesContainer = document.querySelector(".rules");
const passwordInput = document.getElementById("password_input");
const saveButton = document.getElementById("submitButton");
const progressBar = document.getElementById("passwordStrengthBar");

// Fonction pour mettre à jour la barre de progression
function updateProgressBar() {
  const totalRules = rules.length;
  const validatedRules = rules.filter(rule => rule.validated).length;
  const progressPercentage = (validatedRules / totalRules) * 100;

  // Met à jour la largeur de la barre
  progressBar.style.width = `${progressPercentage}%`;

  // Change la couleur de la barre en fonction du pourcentage
  if (progressPercentage <= 33) {
    progressBar.style.backgroundColor = "red";
  } else if (progressPercentage <= 66) {
    progressBar.style.backgroundColor = "orange";
  } else {
    progressBar.style.backgroundColor = "green";
  }
}

function displayRules() {
  rulesContainer.innerHTML = "";
  const sortedRules = [
    ...rules.filter(rule => rule.displayed && !rule.validated),
    ...rules.filter(rule => rule.validated),
  ];
  sortedRules.forEach(rule => {
    const ruleElement = document.createElement("div");
    ruleElement.className = "rule-card";
    ruleElement.id = `rule-${rule.id}`;
    ruleElement.innerHTML = `
      <h3>Règle n°${rule.id}</h3>
      <p>${rule.text}</p>
      <div class="img-container">
      ${rule.image ? `<img src="${rule.image}" alt="CAPTCHA" class="rule-img captcha">` : ""}
      ${rule.images ? rule.images.map(img => `<img src="${img}" alt="Sponsor" class="rule-img">`).join("") : ""}
      </div>
    `;
    ruleElement.style.borderColor = rule.validated ? "green" : "red";
    rulesContainer.appendChild(ruleElement);
  });

  const allValidated = rules.every(rule => rule.validated);
  saveButton.style.display = allValidated ? "inline-block" : "none";

  // Met à jour la barre de progression
  updateProgressBar();
}

function validateRules(password) {
  rules.forEach((rule, index) => {
    if (!rule.displayed && (index === 0 || rules[index - 1].validated)) {
      rule.displayed = true;
    }
    if (rule.displayed) {
      rule.validated = rule.validate(password);
    }
  });
  displayRules();
}

passwordInput.addEventListener("input", e => validateRules(e.target.value));


displayRules();
