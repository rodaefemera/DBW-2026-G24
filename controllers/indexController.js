// Controller responsável por fazer a ponte entre os dados e as views temporáriamente até o back-end for criado

function renderIndex(req, res) {
    res.render('index', { title: 'MATRIOSCA' });
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

module.exports = {
    renderIndex,
    renderFriends,
    renderRoomlist,
    renderCreateroom,
    renderRoombase,
};
