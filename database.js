require("dotenv").config();

const mongoose = require("mongoose");

try {
    mongoose.connect(process.env.DB_URI);
} catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    process.exit(1);
}

export default mongoose;
