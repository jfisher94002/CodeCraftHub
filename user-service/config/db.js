const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connect to the MongoDB database
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;