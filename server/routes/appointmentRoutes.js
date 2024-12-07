const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Import the Appointment model

// Route to handle booking an appointment
router.post('/', async (req, res) => { // Notice the '/' for the POST handler
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
      doctor,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

module.exports = router;
