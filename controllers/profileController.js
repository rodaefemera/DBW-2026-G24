const { User } = require('../models/userModel');

// Mostra a página de um utilizador pretendido
const renderUserProfile = async (req, res, next) => {
    try {
        const user = await User.fetchById(req.params.id);

        res.render('profile', {
            title: `Profile`,
            user: user
        });
    } catch (err) {
        next(err);
    }
};

const renderOwnProfile = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    // Redireciona para o perfil desse utilizador via ID
    res.redirect(`/profile/${req.user._id}`);
};

// Atualiza o pp do utilizador
const updateProfilePic = async (req, res) => {
    try {
        // Obter o URL submetido no formulário (name="profilePic")
        const { profilePic } = req.body;
        
        // Obter o ID do utilizador atual (garantido pelo Passport se autenticado)
        const userId = req.user._id;
        
        // Atualizar o campo profilePic na base de dados
        await User.findByIdAndUpdate(userId, { profilePic: profilePic });
        
        // Redirecionar de volta para o perfil
        res.redirect('/profile');
    } catch (err) {
        console.error("Erro a atualizar foto de perfil:", err);
        res.redirect('/profile');
    }
}

module.exports = {
    renderUserProfile,
    updateProfilePic,
    renderOwnProfile
};
