import React, { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');  // Default to patient
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      role,  // Include role in the login request
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);

      // Redirect based on role (patient or doctor)
      if (role === 'patient') {
        window.location.href = '/appointments';  // Redirect to appointments page for patient
      } else {
        window.location.href = '/doctor-dashboard';  // Redirect to doctor dashboard for doctor
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message);
    }
  };

  return (
    <div id="login" className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit">Login</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p className="switch-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
