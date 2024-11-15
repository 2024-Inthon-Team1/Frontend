import apiClientIntercept from './apiClientIntercept';

export const getUserProfileImage = async () => {
  try {
    const response = await apiClientIntercept.get('/users/profileImage');
    return response.data; // 이미지 데이터를 반환
  } catch (error) {
    console.error('Error fetching user profile image:', error);
    throw error; // 에러를 상위 호출로 전달
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClientIntercept.get('/users/profile');
    return response.data; // 데이터 그 자체를 반환
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // 에러를 상위 호출로 전달
  }
};

export const getUserProfileById = async userId => {
  try {
    const response = await apiClientIntercept.get('/users/profile', {
      params: { userId },
    });
    return response.data; // 데이터 그 자체를 반환
  } catch (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    throw error; // 에러를 상위 호출로 전달
  }
};

export const getUserProfileImageById = async userId => {
  try {
    const response = await apiClientIntercept.get('/users/profileImage', {
      params: { userId },
    });
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

export const getCollection = async () => {
  try {
    const response = await apiClientIntercept.get('/cassette');
    return response.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};

export const getCollectionById = async userId => {
  try {
    const response = await apiClientIntercept.get('/cassette', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};

export const getRandom = async () => {
  try {
    const response = await apiClientIntercept.get('/users/finding');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error:', error);
  }
};
