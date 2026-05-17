// Controller responsável por fazer a ponte entre os dados e as views

const renderIndex = (req, res) => {
    res.render('index', { title: 'MATRIOSCA' });
};

const renderFriends = (req, res) => {
    res.render('friends', { title: 'Friends - MATRIOSCA' });
};

module.exports = {
    renderIndex,
    renderFriends,
};
