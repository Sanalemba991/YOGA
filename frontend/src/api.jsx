// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust if your server runs on a different port

export const getClasses = async () => {
  const response = await axios.get(`${API_URL}/classes`);
  return response.data;
};

export const addClass = async (newClass) => {
  const response = await axios.post(`${API_URL}/new-class`, newClass);
  return response.data;
};

// Add more functions as needed for other endpoints
