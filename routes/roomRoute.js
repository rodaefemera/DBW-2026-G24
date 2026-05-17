const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { renderRoomlist, renderRoombase, renderCreateroom, createRoom } = require('../controllers/roomController');

router.get('/roomlist', renderRoomlist);
router.get('/roombase', ensureAuthenticated, renderRoombase);
router.get('/createroom', ensureAuthenticated, renderCreateroom);
router.post('/createroom', ensureAuthenticated, createRoom);

module.exports = router;