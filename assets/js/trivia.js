
let score = 0;
let questionNumber = 1;
const totalQuestions = 5;
const scoreText = document.getElementById("score-text");
const progressFill = document.getElementById("progress-fill");
const nextButton = document.getElementById("next-button");

// Evento para iniciar el juego
document.getElementById("start-button").addEventListener("click", function () {
    let startScreen = document.getElementById("start-screen");
    let questionScreen = document.getElementById("question-screen");

    // Desaparecer la pantalla de inicio
    startScreen.classList.add("fade-out");

    // Mostrar la pantalla de la pregunta después de la animación
    setTimeout(() => {
        startScreen.style.display = "none";
        questionScreen.style.display = "block";
        questionScreen.classList.add("fade-in");
    }, 800);
});

// Manejo de respuesta correcta/incorrecta
document.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", function () {
        if (document.querySelector(".disabled")) return; // Evita múltiples selecciones

        let isCorrect = this.getAttribute("data-correct") === "true";
        let feedback = document.getElementById("feedback");

        // Bloquear más clics y reducir opacidad en todas las opciones
        document.querySelectorAll(".option").forEach(opt => {
            opt.classList.add("disabled"); // Bloquea las opciones
            opt.style.opacity = "0.6"; // Reduce la opacidad de todas las opciones
        });

        if (isCorrect) {
            score++; // Aumenta el puntaje si es correcta
            feedback.textContent = "CORRECTO";
            feedback.style.color = "var(--correct-color)";
            this.classList.add("correct");
            this.style.opacity = "1"
        } else {
            feedback.textContent = "INCORRECTO";
            feedback.style.color = "var(--incorrect-color)";
            this.classList.add("wrong");
            this.style.opacity = "1"

            // Resaltar la opción correcta
            document.querySelector("[data-correct='true']").classList.add("correct");
        }

        // Actualizar contador de puntaje
        scoreText.textContent = `Puntaje: ${score}/${totalQuestions}`;

        // Actualizar barra de progreso
        progressFill.style.width = `${(score / totalQuestions) * 100}%`;

        // Mostrar mensaje de feedback
        feedback.style.opacity = "1";

        // Mostrar el botón "CONTINUAR"
        nextButton.style.display = "block";
    });
});

// Evento del botón "CONTINUAR"
nextButton.addEventListener("click", function () {
    alert("Aquí iría la siguiente pregunta.");
    this.style.display = "none"; // Ocultar el botón nuevamente para la siguiente pregunta
});