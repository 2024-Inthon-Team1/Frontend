import axios from 'axios';

const getFindings = async () => {
  try {
    const response = await axios.get('https://122f-163-152-3-132.ngrok-free.app/users/finding');
    return response.data;
  } catch (error) {
    console.error('Error fetching findings:', error);
    throw error;
  }
};

export default getFindings;