const { registerUser, authenticateUser } = require('../models/userModel');
const passport = require('passport');

// POST /signup — register new user 
async function postSignup(req, res) {
    try {
        const { username, email, password } = req.body;
        await registerUser({ username, email }, password);
        // Auto-login após registo
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    } catch (err) {
        console.error(err);
        res.render('signup', { title: 'Sign Up - MATRIOSCA', error: err.message });
    }
}

// POST /login — authenticate user
const postLogin = authenticateUser;

// GET /logout — termina a sessão
const getLogout = (req, res) => {
    req.logout((err) => {
        if (err) console.error(err);
        res.redirect('/');
    });
};

module.exports = { postSignup, postLogin, getLogout };
