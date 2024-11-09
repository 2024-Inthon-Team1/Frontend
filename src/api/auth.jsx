import apiClient from './apiClient';
import apiClientIntercept from './apiClientIntercept';

export const authenticateWithKakao = async code => {
  try {
    const response = await apiClient.post('/auth/kakao', { code });

    if (response.status === 200) {
      console.log('Authentication successful, user created.');
      console.log(response);
      return response;
    } else {
      console.error('Authentication failed:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error authenticating with Kakao:', error);
    return null;
  }
};

export const signupUser = async userData => {
  try {
    const response = await apiClientIntercept.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};
