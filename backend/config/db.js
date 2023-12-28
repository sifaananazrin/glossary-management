const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://shifananazrin15:lama@cluster0.22gdkf2.mongodb.net/ ", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database is connected!");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;