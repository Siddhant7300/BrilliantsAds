require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(url); // No extra options needed
    console.log("✅ Connected to MongoDB Successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
