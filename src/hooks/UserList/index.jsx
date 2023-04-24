import axios from 'axios';
export const API_URL = process.env.REACT_APP_API;

const URL = `${API_URL}/api/teacher/get/user?id=`;
const UserList = async (accessToken) => {
    try {
        const response = await axios.post(URL, null, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        // console.log(response.data)
        const data = response.data.data
        return data
    } catch (error) {
        console.error(error);
    }
}

export default UserList;