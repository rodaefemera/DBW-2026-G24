// Definição das rotas URL e métodos HTTP
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const {
    renderIndex,
    renderFriends,
    renderRoomlist,
    renderCreateroom,
    renderRoombase,
} = require('../controllers/indexController');

// Rotas GET para cada página
router.get('/', renderIndex);
router.get('/friends', ensureAuthenticated, renderFriends);
router.get('/roomlist', renderRoomlist);
router.get('/createroom', ensureAuthenticated, renderCreateroom);
router.get('/roombase', ensureAuthenticated, renderRoombase);

module.exports = router;
