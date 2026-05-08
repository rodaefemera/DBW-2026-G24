const mongoose = require("mongoose");

const tempSchema = new mongoose.Schema({
    title: {type: String, required: true},
})

tempSchema.statics.fetchAll = async function () {
    return this.find({});
}

module.exports = mongoose.model('Temp', tempSchema);