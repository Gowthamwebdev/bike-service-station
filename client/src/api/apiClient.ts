import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://bike-service-station-server.vercel.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure credentials are sent
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;