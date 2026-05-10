const User = require('../models/User');
const passport = require('passport');

// POST /signup — regista um novo utilizador e faz login automático
function postSignup(req, res) {
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
}

// POST /login — autentica o utilizador
const postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
});

// GET /logout — termina a sessão
function getLogout(req, res) {
    req.logout((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
}

module.exports = { postSignup, postLogin, getLogout };
