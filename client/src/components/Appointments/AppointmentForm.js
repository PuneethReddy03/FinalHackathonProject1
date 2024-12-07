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
  const [doctor, setDoctor] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const doctorOptions = {
    Fever: ['General Doctor', 'Pediatrician'],
    Cold: ['General Doctor', 'ENT Specialist'],
    Cough: ['Pulmonologist', 'General Doctor'],
    Headache: ['Neurologist', 'General Doctor'],
    Stomachache: ['Gastroenterologist', 'General Doctor'],
    Other: ['General Doctor'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      age,
      gender,
      diseaseType,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', appointmentData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Appointment booked successfully:', response.data);

      setSuccessMessage('Appointment booked successfully!');

      setName('');
      setAge('');
      setGender('');
      setDiseaseType('');
      setAppointmentDate('');
      setAppointmentTime('');
      setReason('');
      setDoctor('');

      setTimeout(() => setSuccessMessage(''), 5000); // Clear success message after 5 seconds
    } catch (error) {
      console.error('Error booking appointment:', error.response || error.message);
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
            setDoctor('');
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
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
