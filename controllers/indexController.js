// Controller responsible for bridging data and views

function renderIndex(req, res) {
    res.render('index', { title: 'MATRIOSCA' });
}

function renderLogin(req, res) {
    res.render('login', { title: 'Login - MATRIOSCA' });
}

function renderSignup(req, res) {
    res.render('signup', { title: 'Sign Up - MATRIOSCA' });
}

function renderProfile(req, res) {
    res.render('profile', { title: 'Profile - MATRIOSCA' });
}

function renderFriends(req, res) {
    res.render('friends', { title: 'Friends - MATRIOSCA' });
}

function renderRoomlist(req, res) {
    res.render('roomlist', { title: 'Rooms - MATRIOSCA' });
}

// Redirect to login if not authenticated
function renderCreateroom(req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('createroom', { title: 'Create Room - MATRIOSCA' });
}

// Redirect to login if not authenticated
function renderRoombase(req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('roombase', { title: 'Room - MATRIOSCA' });
}

function renderLeaderboards(req, res) {
    res.render('leaderboards', { title: 'Leaderboard - MATRIOSCA' });
}

function renderFeedback(req, res) {
    res.render('feedback', { title: 'Feedback - MATRIOSCA' });
}

module.exports = {
    renderIndex,
    renderLogin,
    renderSignup,
    renderProfile,
    renderFriends,
    renderRoomlist,
    renderCreateroom,
    renderRoombase,
    renderLeaderboards,
    renderFeedback,
};
