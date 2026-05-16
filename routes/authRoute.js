const express = require('express');
const router = express.Router();

const {
    postSignup,
    postLogin,
    getLogout
        } = require('../controllers/authController');


router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/logout', getLogout);

module.exports = router;