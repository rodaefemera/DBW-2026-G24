const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { renderLeaderboard } = require('../controllers/leaderboardController');

router.get('/', ensureAuthenticated, renderLeaderboard);

module.exports = router;