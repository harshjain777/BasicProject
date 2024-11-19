const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database conneted");
        
    } catch (error) {
        console.log("database connection error ",error);
        process.exit(1); // Exit process with failure
        
    }
}
module.exports = connectDB;