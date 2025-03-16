let score = 0;
let questionIndex = 0;
const totalQuestions = 2; // Aumentará al agregar más preguntas

const questions = [
    {
        question: "¿Cuál es el mejor jugador de FIFA International Soccer?",
        options: [
            { text: "a. Nombre A", correct: false },
            { text: "b. Nombre B", correct: true },
            { text: "c. Nombre C", correct: false }
        ]
    },
    {
        question: "¿Cuál es la peor selección del juego?",
        options: [
            { text: "a. Equipo A", correct: false },
            { text: "b. Equipo B", correct: false },
            { text: "c. Equipo C", correct: true }
        ]
    }
];

const scoreText = document.getElementById("score-text");
const progressFill = document.getElementById("progress-fill");
const nextButton = document.getElementById("next-button");
const questionTitle = document.querySelector("#question-screen h2");
const optionContainer = document.querySelector(".option-container");
const feedback = document.getElementById("feedback");

// Función para cargar una pregunta según el índice actual
function loadQuestion() {
    feedback.style.opacity = "0"; // Ocultar feedback de la pregunta anterior
    nextButton.style.display = "none"; // Ocultar botón continuar

    // Limpiar opciones anteriores
    optionContainer.innerHTML = "";

    // Cargar la nueva pregunta
    questionTitle.textContent = questions[questionIndex].question;

    // Generar opciones
    questions[questionIndex].options.forEach((option, i) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option.text;
        div.dataset.correct = option.correct;
        div.addEventListener("click", handleAnswer);
        optionContainer.appendChild(div);
    });
}

// Manejo de respuesta correcta/incorrecta
function handleAnswer(event) {
    const selectedOption = event.target;
    if (document.querySelector(".disabled")) return; // Evita múltiples selecciones

    let isCorrect = selectedOption.dataset.correct === "true";

    // Bloquear más clics y reducir opacidad en todas las opciones
    document.querySelectorAll(".option").forEach(opt => {
        opt.classList.add("disabled");
        opt.style.opacity = "0.6";
    });

    if (isCorrect) {
        score++; // Aumenta el puntaje si es correcta
        feedback.textContent = "CORRECTO";
        feedback.style.color = "var(--correct-color)";
        selectedOption.classList.add("correct");
    } else {
        feedback.textContent = "INCORRECTO";
        feedback.style.color = "var(--incorrect-color)";
        selectedOption.classList.add("wrong");

        // Resaltar la opción correcta
        document.querySelectorAll(".option").forEach(opt => {
            if (opt.dataset.correct === "true") {
                opt.classList.add("correct");
            }
        });
    }

    // Actualizar contador de puntaje
    scoreText.textContent = `Puntaje: ${score}/${totalQuestions}`;

    // Actualizar barra de progreso
    progressFill.style.width = `${(score / totalQuestions) * 100}%`;

    // Mostrar mensaje de feedback
    feedback.style.opacity = "1";

    // Mostrar el botón "CONTINUAR"
    nextButton.style.display = "block";
}

// Evento del botón "CONTINUAR"
nextButton.addEventListener("click", function () {
    questionIndex++; // Avanzar a la siguiente pregunta

    if (questionIndex < totalQuestions) {
        loadQuestion();
    } else {
        alert(`¡Juego terminado! Tu puntaje final es ${score}/${totalQuestions}`);
        nextButton.style.display = "none";
    }
});

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

        // Cargar la primera pregunta
        loadQuestion();
    }, 800);
});