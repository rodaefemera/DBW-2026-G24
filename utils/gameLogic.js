'use strict';

const { generate } = require('random-words');
const englishWords = require('an-array-of-english-words');
const WORD_SET = new Set(englishWords);

const isSubsequence = (master, guess) => {
    let gi = 0;
    const m = master.toLowerCase();
    const g = guess.toLowerCase();
    for (let i = 0; i < m.length && gi < g.length; i++) {
        if (m[i] === g[gi]) gi++;
    }
    return gi === g.length;
};

const isRealWord = (word) => WORD_SET.has(word.toLowerCase());

const calculatePoints = (word) => word.length * 10;

const countValidAnswers = (mainWord) => {
    let count = 0;
    for (const word of englishWords) {
        if (word.length >= 2 && word.length <= mainWord.length && isSubsequence(mainWord, word)) {
            if (++count >= 15) break;
        }
    }
    return count;
};

const generateMainWord = (minLength = 7, maxLength = 11) => {
    for (let i = 0; i < 50; i++) {
        const [word] = generate({ exactly: 1, minLength, maxLength });
        const upper = word.toUpperCase();
        if (countValidAnswers(upper) >= 10) return upper;
    }
    return 'PASSENGER';
};

const validateGuess = (mainWord, guess, foundSoFar = []) => {
    const g = guess.trim().toLowerCase();
    if (g.length < 2)
        return { ok: false, reason: 'Word is too short (min 2 letters).' };
    if (foundSoFar.map(w => w.toLowerCase()).includes(g))
        return { ok: false, reason: 'You already found that word!' };
    if (!isSubsequence(mainWord, g))
        return { ok: false, reason: 'Letters are not in the correct order.' };
    if (!isRealWord(g))
        return { ok: false, reason: 'Not a valid English word.' };
    return { ok: true, points: calculatePoints(g) };
};

const createRoom = (roomCode, mode = 'time_attack', maxPlayers = 8) => ({
    roomCode,
    mode,
    maxPlayers,
    mainWord:     generateMainWord(),
    players:      {},
    timerStarted: false,
    finished:     false,
    timeLeft:     60,
    _timer:       null,
});

const addPlayer = (room, socketId, username) => {
    room.players[socketId] = { username, score: 0, foundWords: [] };
};

const removePlayer = (room, socketId) => {
    delete room.players[socketId];
};

const getScoreboard = (room) =>
    Object.values(room.players).sort((a, b) => b.score - a.score);

module.exports = {
    generateMainWord,
    validateGuess,
    createRoom,
    addPlayer,
    removePlayer,
    getScoreboard,
};
