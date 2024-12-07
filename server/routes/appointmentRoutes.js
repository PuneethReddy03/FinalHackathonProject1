const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Import the Appointment model
const { authenticateToken } = require('../middleware/authMiddleware');  // Middleware to authenticate token

// Route to handle booking an appointment
router.post('/appointments', async (req, res) => {
  const { name, age, gender, diseaseType, appointmentDate, appointmentTime, reason, doctor } = req.body;

  try {
    const newAppointment = new Appointment({
      name,
      age,
      gender,
      diseaseType,
      appointmentDate,
      appointmentTime,
      reason,
      doctor,  // Store the selected doctor
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

// Route to get appointments for a specific doctor (this one)
router.get('/doctor', authenticateToken, async (req, res) => {
  try {
    const doctorId = req.user.id; // Extract doctor ID from the JWT token

    // Fetch all appointments where the doctor is assigned, with patient details populated
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name email')  // Populate patient details (name, email)
      .exec();

    res.status(200).json({ appointments });
  } catch (err) {
    console.error('Error fetching doctor appointments:', err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Route to get appointments for a doctor (simplified version)
router.get('/appointments/doctor', authenticateToken, async (req, res) => {
  try {
    const doctorId = req.user.id; // Get the doctor ID from the token

    // Fetch appointments for the doctor
    const appointments = await Appointment.find({ doctor: doctorId })
      .exec();

    res.json({ appointments }); // Send back the appointments for the doctor
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Additional route to get all appointments for a doctor with patient details
router.get('/doctor-details', authenticateToken, async (req, res) => {
  try {
    const doctorId = req.user.id; // Get the doctor ID from the token

    // Fetch appointments with patient details populated (name, email)
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('patient', 'name email')  // Populating patient details
      .exec();

    res.json({ appointments });
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
