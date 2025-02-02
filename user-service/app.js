const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// User routes
app.use('/api/users', userRoutes);

// Connect to the database
connectDB();

module.exports = app;