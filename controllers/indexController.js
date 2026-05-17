// Controller responsável por fazer a ponte entre os dados e as views

const renderIndex = (req, res) => {
    res.render('index', { title: 'MATRIOSCA' });
};

module.exports = {
    renderIndex,
};
