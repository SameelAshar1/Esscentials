import axios from 'axios';

const ADMIN_TOKEN_KEY = 'adminToken';

const api = axios.create({
  baseURL: '/api',
});

// Add a request interceptor to set headers and attach auth token
api.interceptors.request.use((config) => {
  // Don't set Content-Type for FormData - let the browser set it automatically
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  const token = window.localStorage.getItem(ADMIN_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

