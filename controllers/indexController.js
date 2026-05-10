// Controller responsável por fazer a ponte entre os dados e as views

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

function renderCreateroom(req, res) {
    res.render('createroom', { title: 'Create Room - MATRIOSCA' });
}

function renderRoombase(req, res) {
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
