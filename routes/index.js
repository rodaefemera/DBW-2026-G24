// Definição das rotas URL e métodos HTTP
const express = require('express');
const router = express.Router();

const {
    renderIndex,
    renderLogin,
    renderSignup,
    renderProfile,
    renderFriends,
    renderRoomlist,
    renderCreateroom,
    renderRoombase,
    renderLeaderboards,
    renderFeedback,
} = require('../controllers/indexController');

const { postSignup, postLogin, getLogout } = require('../controllers/authController');

// Rotas GET para cada página
router.get('/', renderIndex);
router.get('/login', renderLogin);
router.get('/signup', renderSignup);
router.get('/profile', renderProfile);
router.get('/friends', renderFriends);
router.get('/roomlist', renderRoomlist);
router.get('/createroom', renderCreateroom);
router.get('/roombase', renderRoombase);
router.get('/leaderboards', renderLeaderboards);
router.get('/feedback', renderFeedback);

// Rotas de autenticação
router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/logout', getLogout);

module.exports = router;