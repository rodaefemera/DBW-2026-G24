const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: '' }
});

// Automatically add username, hash, and salt fields
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
