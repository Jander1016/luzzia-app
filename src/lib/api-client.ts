import axios from 'axios';
import { envConfig } from '../config/env';

export const apiClient = axios.create({
  baseURL: envConfig.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (envConfig.isDevelopment) {
      console.error('API Error Response:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);