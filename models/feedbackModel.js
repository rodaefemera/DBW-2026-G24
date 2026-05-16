const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    email: { type: String, required: false, unique: false },        // Campo opcional
    message: { type: String, required: true, unique: false },       
});

module.exports = mongoose.model('Feedback', feedbackSchema);
