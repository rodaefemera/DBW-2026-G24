// Controller responsável por fazer a ponte entre os dados e as views

const renderIndex = (req, res) => {
    res.render('index', { title: 'MATRIOSCA' });
};

const renderFriends = (req, res) => {
    res.render('friends', { title: 'Friends - MATRIOSCA' });
};

const renderRoomlist = (req, res) => {
    res.render('roomlist', { title: 'Rooms - MATRIOSCA' });
};

const renderCreateroom = (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.render('createroom', { title: 'Create Room - MATRIOSCA' });
};

const renderRoombase = (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    const mode     = req.query.mode     || 'time_attack';
    const roomCode = req.query.roomCode || 'LOBBY';
    res.render('roombase', { title: 'Room - MATRIOSCA', mode, roomCode });
};

module.exports = {
    renderIndex,
    renderFriends,
    renderRoomlist,
    renderCreateroom,
    renderRoombase,
};
