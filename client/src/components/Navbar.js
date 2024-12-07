import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">MedicalConsult</Link> {/* Clicking "ConsultPro" redirects to the homepage */}
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Login</Link> {/* Redirects to the Login page */}
        </li>
        <li>
          <Link to="/appointments">Appointments</Link> {/* Redirects to the Appointments page */}
        </li>
        <li>
          <Link to="/chatbot">Chatbot</Link> {/* Redirects to the Chatbot page */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
