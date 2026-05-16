// *get elements from HTML*
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const answersList = document.getElementById("answersList");

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");

const scoreText = document.getElementById("scoreText");
const gameMode = document.getElementById("gameMode");
const modeInfo = document.getElementById("modeInfo");
const mainWord = document.getElementById("mainWord");

const playersList = document.getElementById("playersList");


//hardcoded words and their answers while theres no backend
const rounds = [
    {
        word: "PASSENGER",
        answers: ["pen", "age", "gear", "anger", "seen"]
    },
    {
        word: "LANGUAGE",
        answers: ["age", "lag", "gel", "angle", "lane"]
    },
    {
        word: "COMPUTER",
        answers: ["put", "core", "term", "come", "top"]
    },
    {
        word: "PROGRAM",
        answers: ["gram", "ram", "pro", "rag", "gap"]
    }
];


// players in the lobby
const roomPlayers = [
    { name: "Utilizador", score: 0, found: 0 },
    { name: "Ana", score: 100, found: 3 },
    { name: "Bruno", score: 90, found: 2 }
];


// current player 
const currentPlayerName = "Utilizador";


// initial state
let currentMode = "time_attack";
let currentRound = null;
let score = 0;
let foundAnswers = [];
let timer = null;
let timeLeft = 60;
let gameFinished = false;


// choose random round
function getRandomRound() {
    const randomIndex = Math.floor(Math.random() * rounds.length);
    return rounds[randomIndex];
}


// sort players by score
function sortPlayersByScore(list) {
    return [...list].sort((a, b) => b.score - a.score);
}


// render all players in the lobby
function renderPlayersList() {
    playersList.innerHTML = "";

    const sortedPlayers = sortPlayersByScore(roomPlayers);

    sortedPlayers.forEach((player, index) => {
        const card = document.createElement("div");
        card.className = "room-player-card";

        // highlight current player
        if (player.name === currentPlayerName) {
            card.classList.add("current-player");
        }

        card.innerHTML = `
            <p class="room-player-rank">#${index + 1}</p>
            <p class="room-player-name">${player.name}</p>
            <p class="room-player-points">${player.score} points</p>
            <p class="room-player-found">${player.found} words</p>
        `;

        playersList.appendChild(card);
    });
}

// update score on screen
function updateScore() {
    scoreText.textContent = "Score: " + score + " Points";
}


//update current player data inside lobby
function updateCurrentPlayer() {
    const playerInRoom = roomPlayers.find(player => player.name === currentPlayerName);

    if (playerInRoom) {
        playerInRoom.score = score;
        playerInRoom.found = foundAnswers.length;
    }

    renderPlayersList();
}


// clear answers list
function clearAnswers() {
    answersList.innerHTML = "";
}


// show valid answer on screen
function addAnswerToScreen(answer) {
    const newAnswer = document.createElement("span");
    newAnswer.textContent = answer;
    answersList.appendChild(newAnswer);
}


// normalize input text
function normalizeText(text) {
    return text.trim().toLowerCase();
}


// calculate points based on word size
function calculatePoints(answer) {
    return answer.length * 10;
}


// check if answer letters exist in the correct order*
// letters can have other letters in the middle*
function isValidSequence(masterWord, answer) {
    let answerIndex = 0;

    const word = masterWord.toLowerCase();
    const guess = answer.toLowerCase();

    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess[answerIndex]) {
            answerIndex++;
        }

        if (answerIndex === guess.length) {
            return true;
        }
    }

    return false;
}


// finish game
function finishGame(message) {
    gameFinished = true;
    guessInput.disabled = true;
    modeInfo.textContent = message;

    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}


// start timer for time attack mode
function startTimer() {
    if (timer !== null) {
        clearInterval(timer);
    }

    timeLeft = 60;
    modeInfo.textContent = "Tempo restante: " + timeLeft + "s";

    timer = setInterval(function () {
        timeLeft--;
        modeInfo.textContent = "Tempo restante: " + timeLeft + "s";

        if (timeLeft <= 0) {
            finishGame("Tempo esgotado!");
        }
    }, 1000);
}


// load selected mode and one random round*
function loadGame(mode) {
    currentMode = mode;
    currentRound = getRandomRound();

    score = 0;
    foundAnswers = [];
    gameFinished = false;

    guessInput.disabled = false;
    guessInput.value = "";

    clearAnswers();
    updateScore();

    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }

    // set mode text
    if (mode === "casual") {
        gameMode.textContent = "Casual";
        modeInfo.textContent = "Sem limite de tempo";
    }
    else if (mode === "time_attack") {
        gameMode.textContent = "Time Attack";
        startTimer();
    }
    else if (mode === "first_to_3") {
        gameMode.textContent = "1st 2 3";
        modeInfo.textContent = "Primeiro a acertar 3 palavras ganha";
    }

    //show random main word
    mainWord.textContent = currentRound.word;

    updateCurrentPlayer();
}


// validate and process one guess
function handleGuess(answer) {
    const masterWord = currentRound.word.toLowerCase();
    const validAnswers = currentRound.answers.map(item => item.toLowerCase());

    if (answer === "") {
        return;
    }

    // minimum length
    if (answer.length < 2) {
        modeInfo.textContent = "Resposta demasiado curta!";
        return;
    }

    // cannot repeat answer
    if (foundAnswers.includes(answer)) {
        modeInfo.textContent = "Palavra já encontrada!";
        return;
    }

    // must follow sequence rule
    if (!isValidSequence(masterWord, answer)) {
        modeInfo.textContent = "As letras não estão na sequência correta!";
        return;
    }

    // must exist in valid answers list
    if (!validAnswers.includes(answer)) {
        modeInfo.textContent = "Resposta inválida!";
        return;
    }

    // correct answer
    foundAnswers.push(answer);
    addAnswerToScreen(answer);

    score += calculatePoints(answer);
    updateScore();
    updateCurrentPlayer();

    // messages by mode
    if (currentMode === "casual") {
        modeInfo.textContent = "Boa! Palavra correta.";
    }
    else if (currentMode === "time_attack") {
        modeInfo.textContent = "Correto! Continua...";
    }
    else if (currentMode === "first_to_3") {
        const remaining = 3 - foundAnswers.length;

        if (foundAnswers.length >= 3) {
            finishGame("Objetivo completo! Ganhaste.");
            return;
        }
        else {
            modeInfo.textContent = "Faltam " + remaining + " palavras.";
        }
    }
}


// guess form submit
if (guessForm) {
    guessForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (gameFinished) {
            return;
        }

        const value = normalizeText(guessInput.value);
        handleGuess(value);

        guessInput.value = "";
    });
}


// chat form submit
if (chatForm) {
    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const value = chatInput.value.trim();

        if (value !== "") {
            const newMessage = document.createElement("p");
            newMessage.textContent = "[you]: " + value;
            chatBox.appendChild(newMessage);

            chatInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });
}


// read selected mode from URL
const params = new URLSearchParams(window.location.search);
const modeFromUrl = params.get("mode");

if (modeFromUrl === "casual" || modeFromUrl === "time_attack" || modeFromUrl === "first_to_3") {
    loadGame(modeFromUrl);
}
else {
    loadGame("time_attack");
}
