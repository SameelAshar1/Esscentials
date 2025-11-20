import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add a request interceptor to set Content-Type only for non-FormData requests
api.interceptors.request.use((config) => {
  // Don't set Content-Type for FormData - let the browser set it automatically
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default api;

