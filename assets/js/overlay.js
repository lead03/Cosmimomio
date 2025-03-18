// Diccionario de nombres de juegos por gameId
const gameNames = {
    "47c2f3a3-d85b-4e51-8a48-e8ed61f5ba68": "FIFA International Soccer",
    "9183c74c-4be4-402b-9d63-906f9d97863a": "Super Mario Bros",
    "a2d4e6f8-9b10-11ec-b909-0242ac120002": "Street Fighter II",
    // Puedes agregar más juegos aquí
};

// Obtener parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("gameId");
const playerName = urlParams.get("name") || "Jugador";
const rateId = urlParams.get("rateId") || "0000000000";

// Elementos de la pantalla
const overlayGameTitle = document.getElementById("game-id-title");
const overlayMessage = document.getElementById("overlay-message");
const overlayScore = document.getElementById("overlay-score");
const overlayCelebration = document.getElementById("overlay-celebration");

// Mensajes e imágenes según el puntaje
const messages = [
    "Puedes mejorar. ¡Inténtalo de nuevo!",
    "¡Sigue intentándolo! Puedes hacerlo mejor",
    "¡Casi! Sigue practicando para mejorar",
    "¡Bien! Aún puedes mejorar",
    "¡Muy bien! Estuviste a un paso de la perfección",
    "¡Increíble! Has acertado todas las preguntas"
];

const images = [
    "./assets/gif/trivia-0stars.gif",
    "./assets/gif/trivia-1stars.gif",
    "./assets/gif/trivia-2stars.gif",
    "./assets/gif/trivia-3stars.gif",
    "./assets/gif/trivia-4stars.gif",
    "./assets/gif/trivia-5stars.gif"
];
// Función para decodificar un rateId y obtener el número de estrellas original
function getRateFromCode(rateId) {
    const MULTIPLIERS = [5, 7, 11, 13, 17, 19];
    const OFFSET = 16;
    for (let i = 0; i < rateId.length - 1; i++) {
        let possibleStar = parseInt(rateId.slice(i, i + 2), 16); // Extraemos dos caracteres hex

        if (!isNaN(possibleStar)) {
            for (let s = 0; s <= 5; s++) {
                if ((possibleStar - OFFSET) % MULTIPLIERS[s] === 0) {
                    let decodedStar = (possibleStar - OFFSET) / MULTIPLIERS[s];

                    if (decodedStar === s) return decodedStar; // Confirmamos que es correcto
                }
            }
        }
    }
    return -1; // Si no se encuentra un valor válido, devolver 0
}

// Verificar si el `gameId` existe en el diccionario
overlayGameTitle.textContent = gameNames[gameId] ? `${gameNames[gameId]}` : "Juego Desconocido";

// Mostrar la información en la pantalla
overlayMessage.textContent = `${playerName}, ${messages[getRateFromCode(rateId)]}`;
overlayScore.textContent = `Tu puntaje: ${getRateFromCode(rateId)}/5`;
overlayCelebration.src = images[getRateFromCode(rateId)];
overlayCelebration.style.display = "block";
