const User = require('../models/User');

async function updateProfilePic(req, res) {
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
    updateProfilePic
};
