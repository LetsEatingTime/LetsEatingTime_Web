import axios from 'axios';

export const CheckLogin = async (accessToken) => {
    try {
        const response = await axios.post('http://10.80.161.45:8080/api/user/profile', null, {
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