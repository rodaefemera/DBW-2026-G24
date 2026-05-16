// Definição das rotas URL e métodos HTTP
const express = require('express');
const router = express.Router();

const {
    renderIndex,
    renderFriends,
    renderRoomlist,
    renderCreateroom,
    renderRoombase,
} = require('../controllers/indexController');

// Rotas GET para cada página
router.get('/', renderIndex);
router.get('/friends', renderFriends);
router.get('/roomlist', renderRoomlist);
router.get('/createroom', renderCreateroom);
router.get('/roombase', renderRoombase);

module.exports = router;