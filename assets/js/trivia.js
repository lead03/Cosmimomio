let score = 0;
let questionIndex = 0;
const questions = [
    {
        question: "1. ¿Cuál es el mejor jugador de FIFA International Soccer?",
        options: [
            { text: "a. Nombre A", correct: false },
            { text: "b. Nombre B", correct: true },
            { text: "c. Nombre C", correct: false }
        ]
    },
    {
        question: "2. ¿Cuál es la peor selección del juego?",
        options: [
            { text: "a. Equipo A", correct: false },
            { text: "b. Equipo B", correct: false },
            { text: "c. Equipo C", correct: true }
        ]
    },
    {
        question: "3. Pregunta 3?",
        options: [
            { text: "a. Nombre A", correct: false },
            { text: "b. Nombre B", correct: true },
            { text: "c. Nombre C", correct: false }
        ]
    },
    {
        question: "4. Pregunta 4?",
        options: [
            { text: "a. Nombre A", correct: false },
            { text: "b. Nombre B", correct: true },
            { text: "c. Nombre C", correct: false }
        ]
    },
    {
        question: "5. Pregunta 5?",
        options: [
            { text: "a. Nombre A", correct: false },
            { text: "b. Nombre B", correct: false },
            { text: "c. Nombre C", correct: true }
        ]
    }
];

const totalQuestions = questions.length;
const scoreText = document.getElementById("score-text");
const progressFill = document.getElementById("progress-fill");
const nextButton = document.getElementById("next-button");
const questionTitle = document.querySelector("#question-screen h2");
const optionContainer = document.querySelector(".option-container");
const feedback = document.getElementById("feedback");

// Función para cargar una pregunta según el índice actual
function loadQuestion() {
    feedback.style.opacity = "0";
    nextButton.style.display = "none";
    optionContainer.innerHTML = "";
    questionTitle.textContent = questions[questionIndex].question;
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
        feedback.textContent = "CORRECTO :D";
        feedback.style.color = "var(--correct-color)";
        selectedOption.classList.add("correct");
        this.style.opacity = "1";
    } else {
        feedback.textContent = "INCORRECTO :(";
        feedback.style.color = "var(--incorrect-color)";
        selectedOption.classList.add("wrong");
        this.style.opacity = "1";

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

function showFinalScreen() {
    // Ocultar la pantalla de preguntas
    document.getElementById("question-screen").style.display = "none";

    // Mostrar la pantalla final con transición
    const finalScreen = document.getElementById("final-screen");
    finalScreen.style.display = "flex";
    setTimeout(() => finalScreen.style.opacity = "1", 100);

    const finalScore = document.getElementById("final-score");

    let message = "";
    let celebrationImg = document.getElementById("celebration"); // Obtener la imagen

    // Definir la imagen según el puntaje obtenido
    switch (score) {
        case 5:
            message = "¡Increíble! Has acertado todas las preguntas";
            celebrationImg.src = "../assets/gif/trivia-5stars.gif";
            celebrationImg.style.display = "block";
            break;
        case 4:
            message = "¡Muy bien! Estuviste a un paso de la perfección";
            celebrationImg.src = "../assets/gif/trivia-4stars.gif";
            celebrationImg.style.display = "block";
            break;
        case 3:
            message = "¡Bien! Aún puedes mejorar";
            celebrationImg.src = "../assets/gif/trivia-3stars.gif";
            celebrationImg.style.display = "block";
            break;
        case 2:
            message = "¡Casi! Sigue practicando para mejorar";
            celebrationImg.src = "../assets/gif/trivia-2stars.gif";
            celebrationImg.style.display = "block";
            break;
        case 1:
            message = "¡Sigue intentándolo! Puedes hacerlo mejor";
            celebrationImg.src = "../assets/gif/trivia-1stars.gif";
            celebrationImg.style.display = "block";
            break;
        default:
            message = "Puedes mejorar. ¡Inténtalo de nuevo!";
            celebrationImg.src = "../assets/gif/trivia-0stars.gif";
            celebrationImg.style.display = "block";
    }

    document.getElementById("final-message").textContent = message;
    finalScore.textContent = `Tu puntaje final: ${score}/${totalQuestions}`;
}

// Evento del botón "CONTINUAR"
nextButton.addEventListener("click", function () {
    questionIndex++; // Avanzar a la siguiente pregunta

    if (questionIndex < totalQuestions) {
        loadQuestion();
    } else {
        showFinalScreen();
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

document.getElementById("restart-button").addEventListener("click", function () {
    score = 0;
    questionIndex = 0;

    // Reiniciar puntaje en la pantalla
    scoreText.textContent = `Puntaje: 0/${totalQuestions}`;
    progressFill.style.width = "0%";

    // Ocultar pantalla final y mostrar la primera pregunta
    document.getElementById("final-screen").style.display = "none";
    document.getElementById("question-screen").style.display = "block";
    loadQuestion();
});