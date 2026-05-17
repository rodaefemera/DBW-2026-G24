'use strict';

const socket = io();

// ── DOM refs ──────────────────────────────────────────────────────────────────
const mainWordEl  = document.getElementById('mainWord');
const gameModeEl  = document.getElementById('gameMode');
const modeInfoEl  = document.getElementById('modeInfo');
const answersEl   = document.getElementById('answersList');
const playersEl   = document.getElementById('playersList');
const guessForm   = document.getElementById('guessForm');
const guessInput  = document.getElementById('guessInput');
const chatForm    = document.getElementById('chatForm');
const chatInput   = document.getElementById('chatInput');
const chatBox     = document.getElementById('chatBox');
const roomCodeEl  = document.getElementById('roomCodeDisplay');

// ── State ─────────────────────────────────────────────────────────────────────
let myFoundWords    = [];
let gameFinished    = false;
let myUsername      = null;
let currentMode     = null;
let roomMaxPlayers  = 20;

// ── Read URL params ───────────────────────────────────────────────────────────
const params      = new URLSearchParams(window.location.search);
const roomCode    = params.get('roomCode') || 'LOBBY';
const modeFromUrl = params.get('mode')     || 'time_attack';
const maxPlayers  = params.get('players')  || '20';

// Show real room code
if (roomCodeEl) roomCodeEl.textContent = 'Room Code: #' + roomCode;

// ── UI helpers ────────────────────────────────────────────────────────────────
const setInfo = (text) => {
    if (modeInfoEl) modeInfoEl.textContent = text;
};

const addAnswerBadge = (word) => {
    const span = document.createElement('span');
    span.textContent = word;
    answersEl.appendChild(span);
};

const updatePlayerCount = (scoreboard) => {
    const el = document.getElementById('playerCount');
    if (el) el.textContent = `(${scoreboard.length}/${roomMaxPlayers})`;
};

const renderScoreboard = (scoreboard) => {
    if (!playersEl) return;
    playersEl.innerHTML = '';
    scoreboard.forEach((player, i) => {
        const card = document.createElement('div');
        card.className = 'room-player-card';
        if (player.username === myUsername) card.classList.add('current-player');
        card.innerHTML = `
            ${currentMode !== 'casual' ? `<p class="room-player-rank">#${i + 1}</p>` : ''}
            <p class="room-player-name">${player.username}</p>
            ${currentMode !== 'casual' ? `<p class="room-player-points">${player.score} pts</p>` : ''}
            <p class="room-player-found">${player.foundWords.length} words found</p>
        `;
        playersEl.appendChild(card);
    });
    updatePlayerCount(scoreboard);
};

const addChatMessage = (username, message) => {
    const p = document.createElement('p');
    p.textContent = `[${username}]: ${message}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
};

const finishGame = (message) => {
    gameFinished = true;
    if (guessInput) guessInput.disabled = true;
    setInfo(message);
};

const setModeLabel = (m) => {
    const labels = { casual: 'Casual', time_attack: 'Time Attack', first_to_3: '1st 2 3' };
    if (gameModeEl) gameModeEl.textContent = labels[m] || m;
};

// ── Join room ─────────────────────────────────────────────────────────────────
socket.emit('join-room', { roomCode, mode: modeFromUrl, maxPlayers });

// ── Socket events ─────────────────────────────────────────────────────────────
socket.on('game-state', ({ mainWord, mode: m, scoreboard, username: u, maxPlayers: mp }) => {
    currentMode    = m;
    roomMaxPlayers = mp || 20;
    if (u) myUsername = u;
    if (mainWordEl) mainWordEl.textContent = mainWord;
    setModeLabel(m);
    renderScoreboard(scoreboard);
    if (m === 'casual')      setInfo('No time limit — find as many words as you can!');
    if (m === 'first_to_3')  setInfo('First to find 3 words wins!');
    if (m === 'time_attack') setInfo('Get ready...');
});

socket.on('timer-tick', ({ timeLeft }) => {
    if (!gameFinished) setInfo('Time left: ' + timeLeft + 's');
});

socket.on('player-joined', ({ username, scoreboard }) => {
    renderScoreboard(scoreboard);
    addChatMessage('ROOM', username + ' joined the room');
});

socket.on('player-left', ({ username, scoreboard }) => {
    renderScoreboard(scoreboard);
    addChatMessage('ROOM', username + ' left the room');
});

socket.on('guess-result', ({ ok, reason, word, points, score, foundWords }) => {
    if (!ok) { setInfo(reason); return; }
    myFoundWords = foundWords;
    addAnswerBadge(word);
    if (currentMode === 'casual')      setInfo('Nice word!');
    if (currentMode === 'time_attack') setInfo('Correct! +' + points + ' pts');
    if (currentMode === 'first_to_3') {
        const left = 3 - foundWords.length;
        setInfo(left > 0 ? left + ' word(s) to go!' : '');
    }
});

socket.on('scoreboard-update', ({ scoreboard }) => renderScoreboard(scoreboard));

socket.on('game-over', ({ reason, scoreboard }) => {
    finishGame(reason);
    renderScoreboard(scoreboard);
    addChatMessage('ROOM', 'Game over — ' + reason);
});

socket.on('error-msg', (msg) => alert(msg));

socket.on('chat-message', ({ username, message }) => addChatMessage(username, message));

// ── Forms ─────────────────────────────────────────────────────────────────────
if (guessForm) {
    guessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (gameFinished) return;
        const guess = (guessInput.value || '').trim();
        if (!guess) return;
        socket.emit('guess', { guess });
        guessInput.value = '';
    });
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = (chatInput.value || '').trim();
        if (!msg) return;
        socket.emit('chat-message', { message: msg });
        chatInput.value = '';
    });
}
