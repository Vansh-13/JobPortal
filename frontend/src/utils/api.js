// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7000/api',
  withCredentials: true, // Only needed if using cookies (optional if using token)
});

// Automatically attach JWT token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach it
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Handle 401 globally (token expired or unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
