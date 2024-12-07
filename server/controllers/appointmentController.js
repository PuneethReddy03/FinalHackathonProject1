import React, { useState } from 'react';
import './Appointments.css';
import axios from 'axios';

const AppointmentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diseaseType, setDiseaseType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [doctor, setDoctor] = useState(''); // New state to store selected doctor

  // List of doctors based on disease type
  const doctorOptions = {
    Fever: ['General Doctor', 'Pediatrician'],
    Cold: ['General Doctor', 'ENT Specialist'],
    Cough: ['Pulmonologist', 'General Doctor'],
    Headache: ['Neurologist', 'General Doctor'],
    Stomachache: ['Gastroenterologist', 'General Doctor'],
    Other: ['General Doctor'],
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      age,
      gender,
      diseaseType,
      appointmentDate,
      appointmentTime,
      reason,
      doctor, // Include the selected doctor
    };

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
      console.log('Appointment booked successfully:', response.data);
      // You can clear form or show a success message
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle error
    }
  };

  return (
    <div id="appointments" className="appointments-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={diseaseType}
          onChange={(e) => {
            setDiseaseType(e.target.value);
            setDoctor(''); // Reset the doctor when the disease changes
          }}
          required
        >
          <option value="" disabled>Select Type of Disease</option>
          <option value="Fever">Fever</option>
          <option value="Cold">Cold</option>
          <option value="Cough">Cough</option>
          <option value="Headache">Headache</option>
          <option value="Stomachache">Stomachache</option>
          <option value="Other">Other</option>
        </select>

        {/* Conditionally render the doctor select dropdown based on disease type */}
        {diseaseType && (
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          >
            <option value="" disabled>Select Doctor</option>
            {doctorOptions[diseaseType].map((doc, index) => (
              <option key={index} value={doc}>{doc}</option>
            ))}
          </select>
        )}

        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />

        {/* Conditionally render the time picker if a date is selected */}
        {appointmentDate && (
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        )}

        <textarea
          placeholder="Symptoms"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
