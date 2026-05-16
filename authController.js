const { User } = require('../models/userModel');
const passport = require('passport');

// POST /signup — register a new user and automatically log them in
const postSignup = (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });

    User.register(newUser, password, (err, user) => {
        if (err) {
            console.error(err);
            return res.render('signup', { title: 'Sign Up - MATRIOSCA', error: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });
};

// POST /login — authenticate the user
const postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
});

// GET /logout — end the session
const getLogout = (req, res) => {
    req.logout((err) => {
        if (err) console.error(err);
        res.redirect('/');
    });
};

module.exports = { postSignup, postLogin, getLogout };
