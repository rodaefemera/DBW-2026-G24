const express = require('express');
const router = express.Router();
const { renderLeaderboard } = require('../controllers/leaderboardController');

router.get('/', renderLeaderboard);

module.exports = router;