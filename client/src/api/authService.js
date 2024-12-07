import axios from 'axios';
import { API_BASE_URL } from '../config'; // Import the base URL from the config file

const API_URL = `${API_BASE_URL}/auth`; // Construct the full API URL for authentication

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};

// Register function
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server Error' };
  }
};
