const mongoose = require('mongoose');

// Define the appointment schema with an added 'doctor' field
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },            // Name of the person booking the appointment
  age: { type: Number, required: true },             // Age of the person
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, // Gender
  diseaseType: { type: String, required: true },     // Type of disease (e.g., Fever, Cold)
  appointmentDate: { type: Date, required: true },   // Appointment date
  appointmentTime: { type: String, required: true }, // Appointment time (e.g., 10:00 AM)
  reason: { type: String },                          // Reason or description (optional)
  doctor: { type: String, required: true },          // Selected doctor (e.g., General Doctor, Pediatrician)
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
