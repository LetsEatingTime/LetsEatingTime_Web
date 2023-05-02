import axios from "axios";
export const API_URL = process.env.REACT_APP_API;

const URL = `${API_URL}/api/teacher/get/user?id=`;
const UserList = async (accessToken) => {
    try {
        const response = await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        // console.log(response)
        const data = response.data;
        // console.log(data)
        if (data.status === 200) {
            const users = data.data;
            // console.log(users)
            return users;
        } else {
            console.log("서버 에러");
        }
    } catch (error) {
        console.error(error);
    }
};

export default UserList;
