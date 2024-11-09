import apiClientIntercept from './apiClientIntercept';

export const getUserProfile = async () => {
  try {
    const response = await apiClientIntercept.get('/users/profile');
    return response.data; // 데이터 그 자체를 반환
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // 에러를 상위 호출로 전달
  }
};

export const getUserProfileImage = async () => {
  try {
    const response = await apiClientIntercept.get('/users/profileImage');
    return response.data; // 이미지 데이터를 반환
  } catch (error) {
    console.error('Error fetching user profile image:', error);
    throw error; // 에러를 상위 호출로 전달
  }
};

export const addSongToCassette = async songData => {
  try {
    const response = await apiClientIntercept.post('/cassette', songData);
    return response.data;
  } catch (error) {
    console.error('Error adding song to cassette:', error);
    throw error;
  }
};
