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


// Modal
// Obtener elementos del modal
const shareModal = document.getElementById("share-modal");
const confirmShare = document.getElementById("confirm-share");
const closeModal = document.getElementById("close-modal");
const playerNameInput = document.getElementById("player-name");
const shareLinkContainer = document.getElementById("share-container");
const shareLinkInput = document.getElementById("share-link");
const copyLinkButton = document.getElementById("copy-link-button");
const gameId = document.getElementById("gameId");

// Abrir el modal al hacer clic en "COMPARTIR RESULTADO"
document.getElementById("share-button").addEventListener("click", function () {
    shareModal.style.display = "flex";
    shareLinkContainer.style.display = "none"; // Ocultar el contenedor del enlace al abrir el modal
    playerNameInput.value = ""; // Limpiar campo de nombre
});

// Cerrar modal sin hacer nada
closeModal.addEventListener("click", function () {
    shareModal.style.display = "none";
});

// Generar URL cuando se confirme el nombre
confirmShare.addEventListener("click", function () {
    let playerName = playerNameInput.value.trim();
    if (playerName === "") {
        playerNameInput.classList.add("input-error");
        shareLinkContainer.style.display = "none";
        setTimeout(() => {
            playerNameInput.classList.remove("input-error");
        }, 600);
        return;
    }

    let rateId = generateRateId(score); // Genera un número hexadecimal de 10 dígitos

    let shareUrl = `https://tudominio.com/game?gameId=${gameId}&name=${encodeURIComponent(playerName)}&rateId=${rateId}`;

    // Mostrar la URL en el input del modal
    shareLinkInput.value = shareUrl;
    shareLinkContainer.style.display = "flex"; // Hacer visible el contenedor del enlace
});

// Copiar el enlace al portapapeles
// Copiar el enlace al portapapeles y cambiar estilo del botón
copyLinkButton.addEventListener("click", function () {
    shareLinkInput.select();
    shareLinkInput.setSelectionRange(0, 99999); // Para móviles
    document.execCommand("copy");

    // Cambiar el botón a "¡Copiado!" con animación
    copyLinkButton.textContent = "¡Copiado!";
    copyLinkButton.classList.add("copied");

    // Restaurar el botón después de 2 segundos
    setTimeout(() => {
        copyLinkButton.textContent = "COPIAR";
        copyLinkButton.classList.remove("copied");
    }, 2000);
});

const MULTIPLIERS = [5, 7, 11, 13, 17, 19];
const OFFSET = 16; // Desplazamiento constante

// Función para generar un número hexadecimal aleatorio de 10 dígitos a partir de un puntaje
function generateRateId(score) {
    if (score < 0 || score > 5) return null; // Validación de entrada

    const hexChars = "0123456789abcdef";
    let hexPart = "";

    // Generamos 8 caracteres aleatorios (dejamos 2 para el valor codificado)
    for (let i = 0; i < 8; i++) {
        hexPart += hexChars[Math.floor(Math.random() * hexChars.length)];
    }

    // Calculamos el valor codificado SOLO con su número primo
    let encodedStar = ((score * MULTIPLIERS[score]) + OFFSET).toString(16).padStart(2, '0');

    // Insertamos en una posición pseudoaleatoria
    let insertPos = (score * 3 + 5) % 8; // La posición se elige dentro de 8 caracteres
    let rateId = hexPart.slice(0, insertPos) + encodedStar + hexPart.slice(insertPos);

    return rateId;
}

document.getElementById("start-button").addEventListener("click", function () {
    let startScreen = document.getElementById("start-screen");
    let questionScreen = document.getElementById("question-screen");
    let gameContainer = document.getElementById("game-container");

    // Desaparecer la pantalla de inicio
    startScreen.classList.add("fade-out");

    // Remover la imagen de fondo después de la animación
    setTimeout(() => {
        startScreen.style.display = "none";
        gameContainer.classList.remove("start-background"); // Quitar imagen de fondo
        questionScreen.style.display = "block";
        questionScreen.classList.add("fade-in");
    }, 800);
});

// Agregar la imagen de fondo solo en la pantalla inicial
document.getElementById("game-container").classList.add("start-background");