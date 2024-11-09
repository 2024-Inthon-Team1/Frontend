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
    return response;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const uploadProfileImage = async file => {
  // FormData 객체 생성
  const formData = new FormData();
  formData.append('profileImage', file);

  // 서버에 multi-part 형식으로 전송
  const response = await apiClientIntercept.post('/auth/addProfile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
