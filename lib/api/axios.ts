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
  async (config) => {
    let token = null;

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('access_token');
    } else {
      // Server-side: try to get token from cookies
      try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        token = cookieStore.get('access_token')?.value;
        if (token) {
          console.log('[Axios Server] Token found in cookies');
        } else {
          console.log('[Axios Server] No token found in cookies');
        }
      } catch (error) {
        console.error('[Axios Server] Failed to get cookies:', error);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('[Axios] No token available for request:', config.url);
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
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        console.warn('🔒 Token expired or invalid. Redirecting to login...');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/login';
      } else {
        console.warn('🔒 Server-side 401: Unauthorized access');
      }
    }
    
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
