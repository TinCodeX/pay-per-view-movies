import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    if (authTokens) {
      config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
