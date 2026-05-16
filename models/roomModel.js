const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },           // Código do quarto
    access:  { type: String, required: true, unique: false },       // Public ou Private
    type: { type: String, required: true, unique: false },          // Casual, Time Attack, ou 123
    maxPlayers: { type: Number, required: true, unique: false },
    users: { type: Array, required: true, unique: false },
});

module.exports = mongoose.model('Room', roomSchema);
