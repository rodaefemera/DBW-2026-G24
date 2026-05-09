const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
});

// Adiciona automaticamente os campos username, hash e salt
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
