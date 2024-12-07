import axios from 'axios';
import { API_BASE_URL } from '../config'; // Import base URL from config

const API_URL = `${API_BASE_URL}/appointments`; // Construct the full API URL for appointments

// Fetch all appointments
export const getAppointments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};

// Add a new appointment
export const addAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};

// Delete an appointment
export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};

// Update an appointment
export const updateAppointment = async (appointmentId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${appointmentId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};
