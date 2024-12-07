import React, { useState, useEffect } from 'react';
import './Appointments.css'; // Your CSS file for styling
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments'); // Backend endpoint
      setAppointments(response.data); // Set appointments to the fetched data
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Error fetching appointments');
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="appointments-list-container">
      <h2>Your Appointments</h2>
      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-item">
              <p><strong>Name:</strong> {appointment.name}</p>
              <p><strong>Age:</strong> {appointment.age}</p>
              <p><strong>Gender:</strong> {appointment.gender}</p>
              <p><strong>Disease Type:</strong> {appointment.diseaseType}</p>
              <p><strong>Appointment Date:</strong> {appointment.appointmentDate}</p>
              <p><strong>Appointment Time:</strong> {appointment.appointmentTime}</p>
              <p><strong>Reason:</strong> {appointment.reason}</p>
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
