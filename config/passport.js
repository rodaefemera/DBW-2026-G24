const { User } = require('../models/userModel');

// Passport configuration
function configurePassport(passport) {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}

module.exports = configurePassport;
