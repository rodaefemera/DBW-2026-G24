require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const User = require('./models/User');

// Ligar à base de dados
connectDB();

const app = express();

// View engine e middlewares
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Sessões
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

// Passar o user a todas as views automaticamente
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Rotas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Iniciar servidor
app.listen(3000, (err) => {
    if (err)
        console.error(err);
    else
        console.log('Server listening on PORT', 3000);
});
