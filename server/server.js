const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // for cookie parsing
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');  // Import auth routes
const appointmentRoutes = require('./routes/appointmentRoutes');  // Import appointment routes

const app = express(); // Initialize app here first

// Middleware to parse incoming requests
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,  // Allow cookies to be sent with requests
}));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Register routes
app.use('/api/auth', authRoutes);  // Register authentication routes
app.use('/api/appointments', appointmentRoutes); // Register appointment routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
