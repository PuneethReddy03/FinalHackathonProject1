const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Define the Appointment schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  diseaseType: String,
  appointmentDate: String,
  appointmentTime: String,
  reason: String,
});

// Define the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// API route to fetch appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments
    res.json(appointments); // Return appointments in JSON format
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
