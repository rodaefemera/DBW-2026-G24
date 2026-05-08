// Definição das rotas URL e métodos HTTP
import express from 'express';
const router = express.Router();
import {
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
} from '../controllers/indexController.js';

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

export default router;