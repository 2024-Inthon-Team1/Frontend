import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://43.203.78.52:3080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;
