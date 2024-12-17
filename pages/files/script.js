document.getElementById("enigme-form1").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    const userAnswer = document.getElementById("answer1").value.trim().toLowerCase();
    const correctAnswer = "code modifiable";

    const resultDiv = document.getElementById("result");

    if (userAnswer === correctAnswer) {

        // Transition entre container1 et container2
        document.getElementById("container1").style.opacity = 0; // Début du fondu
        setTimeout(function () {
            document.getElementById("container1").style.visibility = "hidden"; // Cacher le container1 après le fondu
            document.getElementById("container2").style.visibility = "visible"; // Afficher container2
            document.getElementById("container2").style.opacity = 1; // Fin du fondu
        }, 500); // Réduit le délai à 500ms

        // Utilisation de l'événement transitionend pour appliquer le focus après la transition
        document.getElementById("container2").addEventListener("transitionend", function () {
            document.getElementById("answer2").focus();
        }, { once: true }); // S'assure que l'événement est déclenché une seule fois
    } else {
        resultDiv.style.color = "red";
        resultDiv.textContent = "Faux ! Réessayez.";
    }
});


document.getElementById("enigme-form2").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    const userAnswer = document.getElementById("answer2").value.trim().toLowerCase();
    const correctAnswer = "variable = vrai"; // La somme des nombres de 1 à 11 sauf 9

    const resultDiv = document.getElementById("result2");

    if (userAnswer === correctAnswer) {
        resultDiv.textContent = "";

        // Affiche le bouton "Passer à l'étape suivante"
        const goNextButton = document.getElementById("goNext");
        goNextButton.style.display = "block";

        // Désactive le bouton et l'entrée de la 2ème énigme
        const button2 = document.getElementById("button2");
        button2.style.display = "none";
        button2.style.cursor = "default";
        document.getElementById("answer2").disabled = true;
    } else {
        resultDiv.style.color = "red";
        resultDiv.textContent = "Faux ! Réessayez.";
    }
});

function goNext () {
    window.location.href = "../end/index.html"; // Redirige vers l'énigme suivante
}