const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
console.log('MONGO_URI:', process.env.MONGO_URI);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {

        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
