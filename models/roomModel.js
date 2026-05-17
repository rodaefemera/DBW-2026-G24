const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    access:  { type: String, required: true, unique: false },       // Public ou Private
    type: { type: String, required: true, unique: false },          // Casual, Time Attack, ou 123
    maxPlayers: { type: Number, required: true, unique: false },
    users: { type: Array, required: true, unique: false },
});

module.exports = mongoose.model('Room', roomSchema);
