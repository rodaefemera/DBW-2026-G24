const { User, registerUser, authenticateUser } = require('../models/userModel');
const passport = require('passport');

// POST /signup — register new user 
async function postSignup(req, res) {
    try {
        const username = req.body.username.trim();
        const email = req.body.email.trim();
        const password = req.body.password;

        // Check empty fields
        if (!username || !email || !password) {
            return res.render('signup', { title: 'Sign Up - MATRIOSCA', error: 'All fields are required.' });
        }

        // Username max 15
        if (username.length > 15) {
            return res.render('signup', { title: 'Sign Up - MATRIOSCA', error: 'Username cannot exceed 15 characters.' });
        }

        // Password max 12
        if (password.length > 12) {
            return res.render('signup', { title: 'Sign Up - MATRIOSCA', error: 'Password cannot exceed 12 characters.' });
        }

        // Check repeated username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.render('signup', { title: 'Sign Up - MATRIOSCA', error: 'This username is already registered.' });
        }

        // Check repeated email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.render('signup', { title: 'Sign Up - MATRIOSCA', error: 'This email is already registered.' });
        }

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
