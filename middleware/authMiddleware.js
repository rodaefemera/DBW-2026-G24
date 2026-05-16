// Middlewares de autenticação

// Bloqueia utilizadores não autenticados — redireciona para /login
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

// Impede utilizadores já logados de aceder a login/signup — redireciona para /
function ensureGuest(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/');
    next();
}

module.exports = { ensureAuthenticated, ensureGuest };
