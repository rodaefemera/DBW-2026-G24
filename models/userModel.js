const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    scoreTime: { type: Number, required: true, unique: false },     // Pontuação total no Time Attack, a que vai ser adicionada no fim de uma ronda
    score123: { type: Number, required: true, unique: false },     // Pontuação total no 1st 2 3, a que vai ser adicionada no fim de uma ronda
    profilePic: { type: String, required: true, unique: false, default: '' },
    friends: { type: Array, required: true, unique: false },
});

// Adiciona automaticamente os campos username, hash e salt
userSchema.plugin(passportLocalMongoose);

// Busca todos os utilizadores
userSchema.statics.fetchAll = function () {
    return this.find({});
};

// Busca um utilizador por ID.
userSchema.statics.fetchById = async function (id) {
    const user = await this.findById(id);
    if (!user) {
        const error = new Error('Utilizador não encontrado');
        error.name = 'NotFoundError';
        throw error;
    }
    return user;
};

const User = mongoose.model('User', userSchema);

// Registers new user
function registerUser(userData, password) {
    const newUser = new User(userData);
    return new Promise((resolve, reject) => {
        User.register(newUser, password, (err, user) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
}

// Authenticates user using Passport
function authenticateUser(req, res, next) {
    const passport = require('passport');
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next);
}

module.exports = {
    User,
    registerUser,
    authenticateUser
};
