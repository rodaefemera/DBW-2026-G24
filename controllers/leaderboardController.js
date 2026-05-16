const { User } = require('../models/userModel');

/**
 * Leaderboard Controller
 * Responsável pelo display da leaderboard, utilizando o modelo dos Utilizadores.
 * 
 */

const renderLeaderboard = async (req, res, next) => {
    try {
        // Não quero que isto dê erro ou torne-se n'alguma coisa estranha no meio de do funcionamento disto tudo.
        // Se utilizasse if else, teria que usar o let para poder atribuir o valor. Quero o fazer constante. 
        const mode = req.query.mode === '123' ? '123' : 'time';                 // Modo da leaderboard 
        const scoreField = mode === '123' ? 'score123' : 'scoreTime';           // Escolhe a pontuação que queremos dependendo do modo

        // Dados dos utilizadores
        const users = await User.find()
            .sort({ [scoreField]: -1 })         // Ordem descendente 
            .limit(50)                          // Tabela só vai até 50 utilizadores
            .select(`username ${scoreField}`);  // Queremos apenas o username e a pontuação

        // Render
        res.render('leaderboards', {
            title: 'Leaderboard - MATRIOSCA',
            users: users,
            mode: mode
        });
    } catch (err) {
        next(err)
    }
}

module.exports = { renderLeaderboard };