import axios from 'axios';
import { isTokenExpired, refreshingToken, getCookie } from './token';

const apiClientIntercept = axios.create({
  baseURL: 'https://122f-163-152-3-132.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClientIntercept.interceptors.request.use(
  async config => {
    if (isTokenExpired()) {
      try {
        const newAccessToken = await refreshingToken();
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      // 만료되지 않은 경우 기존 accessToken 사용
      const accessToken = getCookie('access_token');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClientIntercept;
