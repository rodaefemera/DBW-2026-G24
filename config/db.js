const mongoose = require('mongoose');

const connectDB = async () => {
    const mongodbUri = process.env.MONGODB_URI;

    try {
        await mongoose.connect(mongodbUri);
        console.log("MongoDB: Connected!");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = connectDB;