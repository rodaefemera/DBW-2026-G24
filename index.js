require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const configurePassport = require('./config/passport');

// DNS porque deu-me (Rodrigo) erro por causa da minha rede. isto acabou por resolver.
const dns = require("dns");
dns.setServers(['1.1.1.1', '8.8.8.8']);

// Ligar à base de dados
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// View engine e middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Sessões
const sessionMiddleware = session({
    secret: 'matriosca-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60  // 1 hora
    }
});
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

// Passport
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// Passar o user a todas as views automaticamente
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Rotas
const indexRouter       = require('./routes/indexRoute');
const feedbackRouter    = require('./routes/feedbackRoute');
const leaderboardRouter = require('./routes/leaderboardRoute');
const authRouter        = require('./routes/authRoute');
const profileRoute      = require('./routes/profileRoute');

app.use('/', indexRouter);
app.use('/feedback', feedbackRouter);
app.use('/leaderboards', leaderboardRouter);
app.use('/', authRouter);
app.use('/', profileRoute);

// Socket.io
require('./utils/socket')(io);

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

// Iniciar servidor
server.listen(3000, (err) => {
    if (err)
        console.error(err);
    else
        console.log('Server listening on PORT', 3000);
});
