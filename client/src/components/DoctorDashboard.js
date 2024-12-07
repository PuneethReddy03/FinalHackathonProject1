import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';  // Add this line at the top of your DoctorDashboard.js file


const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user is logged in and has a token
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';  // Redirect to login if no token found
      return;
    }

    // Fetch appointments for the doctor
    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/appointments/doctor', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,  // Ensure token is passed correctly here
                },
              });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch appointments');
          }
      
          const data = await response.json();
          setAppointments(data.appointments); // Assuming the response contains appointments
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      

    fetchAppointments();
  }, []);

  return (
    <div className="doctor-dashboard">
      <h2>Doctor Dashboard</h2>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div>
          <h3>Patient Appointments</h3>
          <ul>
            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              appointments.map((appointment) => (
                <li key={appointment._id}>
                  <strong>Patient:</strong> {appointment.patient.name} <br />
                  <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()} <br />
                  <strong>Time:</strong> {appointment.appointmentTime} <br />
                  <strong>Status:</strong> {appointment.status || 'Pending'}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
