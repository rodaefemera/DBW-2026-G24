const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;
const sanitizeHtml = require('sanitize-html');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 15,
        set: function (value) { return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }); }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: function (value) { return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }); }
    },
    scoreTime: { type: Number, default: 0 },     // Pontuação total no Time Attack, a que vai ser adicionada no fim de uma ronda
    score123: { type: Number, default: 0 },     // Pontuação total no 1st 2 3, a que vai ser adicionada no fim de uma ronda
    profilePic: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' },
    friends: { type: Array, default: [] },
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
async function registerUser(userData, password) {
    const newUser = new User(userData);
    return await User.register(newUser, password);
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
