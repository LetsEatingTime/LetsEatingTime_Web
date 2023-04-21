import axios from 'axios';

export const API_URL = process.env.REACT_APP_API;

export const CheckLogin = async (accessToken) => {
  const URL = `${API_URL}/api/user/profile`;
  try {
    const response = await axios.post(URL, null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    const userType = response.data.userType;
    return userType === 'T';
  } catch (error) {
    console.error(error);
    return false;
  }
}