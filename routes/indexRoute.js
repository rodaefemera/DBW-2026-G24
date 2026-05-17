const express = require('express');
const router = express.Router();

const {
    renderIndex,
    renderFriends,
} = require('../controllers/indexController');

router.get('/', renderIndex);
router.get('/friends', renderFriends);

module.exports = router;
