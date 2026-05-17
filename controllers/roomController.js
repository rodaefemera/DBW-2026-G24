const Room = require('../models/roomModel');

// GET /roomlist — mostra salas públicas organizadas por modo
const renderRoomlist = async (req, res, next) => {
    try {
        const rooms = await Room.find({ access: 'public' });
        res.render('roomlist', { title: 'Rooms - MATRIOSCA', rooms });
    } catch (err) {
        next(err);
    }
};

// GET /roombase — página do jogo
const renderRoombase = (req, res) => {
    const mode     = req.query.mode     || 'time_attack';
    const roomCode = req.query.roomCode || 'LOBBY';
    res.render('roombase', { title: 'Room - MATRIOSCA', mode, roomCode });
};

// GET /createroom — página de criação de sala
const renderCreateroom = (req, res) => {
    res.render('createroom', { title: 'Create Room - MATRIOSCA' });
};

// POST /createroom — cria sala no MongoDB e redireciona
const createRoom = async (req, res, next) => {
    try {
        const { gameMode, playersLimit, privacy } = req.body;

        const room = await Room.create({
            code:       '',
            access:     privacy,
            type:       gameMode,
            maxPlayers: parseInt(playersLimit) || 8,
            users:      [req.user.username],
        });

        res.redirect(`/roombase?mode=${gameMode}&players=${playersLimit}&privacy=${privacy}&roomCode=${room._id}`);
    } catch (err) {
        next(err);
    }
};

module.exports = { renderRoomlist, renderRoombase, renderCreateroom, createRoom };
