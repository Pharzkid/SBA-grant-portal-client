import axios from 'axios';

// Set the base URL for the backend API
const api = axios.create({
  baseURL: 'https://sba-grant-portal-server.onrender.com/api', // Assumes your backend runs on port 5000
});

// Intercept requests to attach the token for authenticated routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;