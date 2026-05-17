const { User } = require('../models/userModel');

// Mostra a página de um utilizador pretendido
const renderUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        res.render('profile', {
            title: `Profile`,
            user: user
        });
    } catch (err) {
        next(err);
    }
};

const renderOwnProfile = (req, res, next) => {
    // Redireciona para o perfil desse utilizador via ID
    res.redirect(`/profile/${req.user._id}`);
};

// Atualiza o pp do utilizador
const updateProfilePic = async (req, res) => {
    try {
        // Obter o URL submetido no formulário (name="profilePic")
        const { profilePic } = req.body;
        
        console.log("Recebido novo URL de imagem:", profilePic);
        
        // Obter o ID do utilizador atual (garantido pelo Passport se autenticado)
        const userId = req.user._id;
        
        // Atualizar o campo profilePic na base de dados
        const result = await User.findByIdAndUpdate(userId, { profilePic: profilePic }, { new: true });
        console.log("Imagem atualizada na base de dados com sucesso para:", result.profilePic);
        
        // Redirecionar de volta para o perfil
        res.redirect(`/profile/${req.user._id}`);
    } catch (err) {
        console.error("Erro a atualizar foto de perfil:", err);
        const user = await User.findById(req.user._id);
        res.render('profile', { title: 'Profile', user: user, error: 'Failed to update profile picture.' });
    }
}

// Username update
const updateUsername = async (req, res, next) => {
    try {
        const username = req.body.username.trim();

        if (username.length > 15 || username.length === 0) {
            console.error("Erro de Validação: Username cannot exceed 15 characters and cannot be empty.");
            const user = await User.findById(req.user._id);
            return res.render('profile', { title: 'Profile', user: user, error: 'Username cannot exceed 15 characters and cannot be empty.' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
            console.error("Erro de Validação: This username is already registered.");
            const user = await User.findById(req.user._id);
            return res.render('profile', { title: 'Profile', user: user, error: 'This username is already registered.' });
        }

        await User.findByIdAndUpdate(req.user._id, { username });

        // Fetch updated user
        const updatedUser = await User.findById(req.user._id);

        // Re-login user to update session
        req.login(updatedUser, (err) => {
            if (err) {
                console.error("Erro no re-login:", err);
                return res.redirect(`/profile/${req.user._id}`);
            }
            
            req.session.save((err) => {
                if (err) console.error("Erro ao guardar sessão:", err);
                res.redirect(`/profile/${req.user._id}`);
            });
        });
    } catch (err) {
        console.error("Erro a atualizar username:", err);
        const user = await User.findById(req.user._id);
        res.render('profile', { title: 'Profile', user: user, error: 'Failed to update username.' });
    }
}

module.exports = {
    renderUserProfile,
    updateProfilePic,
    updateUsername,
    renderOwnProfile
};
