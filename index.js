require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const User = require('./models/User');

// Connect to the database
connectDB();

const app = express();

// View engine and middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Sessions
app.use(session({
    secret: 'matriosca-secret-key',
    resave: false,
    saveUninitialized: false,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Automatically pass the user object to all views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start the server
app.listen(3000, (err) => {
    if (err)
        console.error(err);
    else
        console.log('Server listening on PORT', 3000);
});
