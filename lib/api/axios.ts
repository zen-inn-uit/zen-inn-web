import axios from 'axios';
import { API_CONFIG } from './config';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Backend wraps responses in { statusCode, message, data }
    // Extract the actual data from the wrapper
    return response.data?.data || response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', message);
    
    // Optional: Handle 401 Unauthorized globally
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // localStorage.removeItem('access_token');
      // window.location.href = '/login';
    }
    
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
