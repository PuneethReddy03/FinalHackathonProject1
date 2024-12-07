const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import appointment routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Register appointment routes
app.use('/api', appointmentRoutes); // Ensure this line is correct

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
