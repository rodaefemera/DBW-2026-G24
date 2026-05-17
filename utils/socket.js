'use strict';

const gameLogic = require('./gameLogic');
const { User } = require('../models/userModel');
const Room = require('../models/roomModel');

const rooms = {};
const TIME_ATTACK_DURATION = 60;

module.exports = (io) => {

    io.on('connection', (socket) => {
        const sess = socket.request.session;
        const username = sess?.passport?.user || 'Guest_' + socket.id.slice(0, 4);

        console.log(`[socket] connected: ${username} (${socket.id})`);

        // join-room
        socket.on('join-room', ({ roomCode, mode, maxPlayers }) => {
            if (!rooms[roomCode]) {
                const max = parseInt(maxPlayers) || 8;
                rooms[roomCode] = gameLogic.createRoom(roomCode, mode || 'time_attack', max);
            }

            const room = rooms[roomCode];

            if (Object.keys(room.players).length >= room.maxPlayers) {
                socket.emit('error-msg', 'Room is full.');
                return;
            }

            gameLogic.addPlayer(room, socket.id, username);
            socket.join(roomCode);
            socket.data.roomCode = roomCode;

            // Sync with MongoDB
            Room.findByIdAndUpdate(roomCode, { $addToSet: { users: username } }).catch(() => {});

            socket.emit('game-state', {
                mainWord:   room.mainWord,
                mode:       room.mode,
                roomCode:   room.roomCode,
                scoreboard: gameLogic.getScoreboard(room),
                username:   username,
                maxPlayers: room.maxPlayers,
            });

            io.to(roomCode).emit('player-joined', {
                username,
                scoreboard: gameLogic.getScoreboard(room),
            });

            // Start timer for time_attack on first player
            if (room.mode === 'time_attack' && !room.timerStarted) {
                room.timerStarted = true;
                room.timeLeft = TIME_ATTACK_DURATION;

                const tick = setInterval(() => {
                    room.timeLeft--;
                    io.to(roomCode).emit('timer-tick', { timeLeft: room.timeLeft });

                    if (room.timeLeft <= 0) {
                        clearInterval(tick);
                        room.finished = true;
                        endGame(room, roomCode, io, "Time's up!");
                    }
                }, 1000);

                room._timer = tick;
            }
        });

        // guess
        socket.on('guess', ({ guess }) => {
            const roomCode = socket.data.roomCode;
            const room = rooms[roomCode];
            if (!room || room.finished) return;

            const player = room.players[socket.id];
            if (!player) return;

            const result = gameLogic.validateGuess(room.mainWord, guess, player.foundWords);

            if (!result.ok) {
                socket.emit('guess-result', { ok: false, reason: result.reason });
                return;
            }

            const word = guess.trim().toLowerCase();
            player.foundWords.push(word);

            if (room.mode !== 'casual') {
                player.score += result.points;
            }

            const scoreboard = gameLogic.getScoreboard(room);

            socket.emit('guess-result', {
                ok:         true,
                word,
                points:     room.mode === 'casual' ? 0 : result.points,
                score:      player.score,
                foundWords: player.foundWords,
            });

            io.to(roomCode).emit('scoreboard-update', { scoreboard });

            if (room.mode === 'first_to_3' && player.foundWords.length >= 3) {
                room.finished = true;
                if (room._timer) clearInterval(room._timer);
                endGame(room, roomCode, io, `${username} found 3 words first!`);
            }
        });

        // chat
        socket.on('chat-message', ({ message }) => {
            const roomCode = socket.data.roomCode;
            if (!roomCode) return;
            const clean = (message || '').trim().slice(0, 200);
            if (!clean) return;
            io.to(roomCode).emit('chat-message', { username, message: clean });
        });

        // disconnect
        socket.on('disconnect', () => {
            const roomCode = socket.data.roomCode;
            if (!roomCode || !rooms[roomCode]) return;

            const room = rooms[roomCode];
            gameLogic.removePlayer(room, socket.id);

            // Sync with MongoDB
            Room.findByIdAndUpdate(roomCode, { $pull: { users: username } }).catch(() => {});

            io.to(roomCode).emit('player-left', {
                username,
                scoreboard: gameLogic.getScoreboard(room),
            });

            if (Object.keys(room.players).length === 0) {
                if (room._timer) clearInterval(room._timer);
                Room.findByIdAndDelete(roomCode).catch(() => {});
                delete rooms[roomCode];
                console.log(`[room] ${roomCode} deleted (empty)`);
            }
        });
    });

};

// Save scores to DB when game ends (not for casual)
const endGame = async (room, roomCode, io, reason) => {
    const scoreboard = gameLogic.getScoreboard(room);
    io.to(roomCode).emit('game-over', { reason, scoreboard });

    if (room.mode === 'casual') return;

    const scoreField = room.mode === 'first_to_3' ? 'score123' : 'scoreTime';

    for (const player of Object.values(room.players)) {
        if (!player.score || player.username.startsWith('Guest_')) continue;
        try {
            await User.findOneAndUpdate(
                { username: player.username },
                { $inc: { [scoreField]: player.score } }
            );
        } catch (err) {
            console.error(`Failed to save score for ${player.username}:`, err);
        }
    }
};
