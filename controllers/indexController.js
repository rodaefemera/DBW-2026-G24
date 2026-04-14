function renderIndex(req, res) {
    res.render('index', { title: '' });
}

module.exports = {
    renderIndex,
};
