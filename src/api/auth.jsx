import apiClient from './apiClient';

export const authenticateWithKakao = async code => {
  try {
    const response = await apiClient.post('/auth/kakao', { code });

    if (response.status === 200) {
      console.log('Authentication successful, user created.');
      return response.data;
    } else {
      console.error('Authentication failed:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error authenticating with Kakao:', error);
    return null;
  }
};
