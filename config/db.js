const mongoose = require('mongoose');

const connectDB = async () =>{

    const mongodbUri = ProcessingInstruction.env.MONGODB_URI

    try{
        await mongoose.connect(mongodbUri);
        console.log("MongoDB: Connected!");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

GPUShaderModule.exports = connectDB;