import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AppointmentForm from './components/Appointments/AppointmentForm';
import AppointmentList from './components/Appointments/AppointmentList'; // Import AppointmentList
import Chatbot from './components/Chatbot/Chatbot';
import DoctorDashboard from './components/DoctorDashboard'; // Assuming this is for the doctor's dashboard

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Define routes for different components */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointments" element={<AppointmentForm />} />
          <Route path="/appointments/list" element={<AppointmentList />} />
          <Route path="/chatbot" element={<Chatbot />} />
          
          {/* Doctor's Dashboard Route */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

          {/* Redirect default path to login page */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
