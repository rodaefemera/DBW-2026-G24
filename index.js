// obtendo tudo...
require('dotenv').config();                             //para o ficheiro .env
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const user = require('./models/userModel');

// DNS porque deu-me (Rodrigo) erro por causa da minha rede. isto acabou por resolver.
const dns = require("dns")

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

// Ligar à base de dados
connectDB();

const app = express();

// View engine e middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Sessões
app.use(session({
    secret: 'matriosca-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(user.User.createStrategy());
passport.serializeUser(user.User.serializeUser());
passport.deserializeUser(user.User.deserializeUser());

// Passar o user a todas as views automaticamente
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});



// Erros

// Utilizador inválido
app.use((err, req, res, next) => {
    if (err.name === 'NotFoundError') {
        return res.status(404).render('userNotFound', {
            title: 'Utilizador não encontrado'
        });
    }

    next(err);
});

// Outros erros
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('error', {
        title: 'Erro interno'
    });
});


// Rotas
const indexRouter = require('./routes/indexRoute');
const feedbackRouter = require('./routes/feedbackRoute');
const leaderboardRouter = require('./routes/leaderboardRoute');
const authRouter = require('./routes/authRoute')
const profileRoute = require('./routes/profileRoute');

app.use('/', indexRouter);
app.use('/feedback', feedbackRouter);
app.use('/leaderboards', leaderboardRouter);
app.use('/', authRouter);
app.use('/', profileRoute);
// Iniciar servidor
app.listen(3000, (err) => {
    if (err)
        console.error(err);
    else
        console.log('Server listening on PORT', 3000);
});
