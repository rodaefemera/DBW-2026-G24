const express = require('express');
const router = express.Router();

const {
    postSignup,
    postLogin,
    getLogout
        } = require('../controllers/authController');


// GET routes — render the login and signup pages
router.get('/login', (req, res) => {
    res.render('login', { title: 'Log In - MATRIOSCA' });
});
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up - MATRIOSCA' });
});

// POST routes — handle form submissions
router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/logout', getLogout);

module.exports = router;