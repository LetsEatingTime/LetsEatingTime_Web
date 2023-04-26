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
    const userData = response.data;
    if(userData.status === 200) {
      const userType = response.data.data.user.userType;
      return userType === 'T';
    } else {
      console.log('서버 에러');
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}