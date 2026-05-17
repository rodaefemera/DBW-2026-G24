const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { renderFriends, searchAddFriend } = require('../controllers/friendsController');

router.get('/', ensureAuthenticated, renderFriends);
router.get('/search', ensureAuthenticated, searchAddFriend);

module.exports = router;