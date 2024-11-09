import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://b55b-163-152-3-132.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;
