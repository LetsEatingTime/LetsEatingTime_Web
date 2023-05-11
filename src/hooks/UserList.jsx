import axios from "axios";

export const URL = process.env.REACT_APP_API;

const URL_UserList = `${URL}/api/teacher/get/user?id=`;

const UserList = async (accessToken) => {
    try {
        const response = await axios.get(URL_UserList, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            retry: 3, // 최대 3번까지 요청을 다시 시도하도록 설정
            retryDelay: 1000, // 1초마다 요청을 다시 시도하도록 설정
        });
        const data = response.data;
        if (data.status === 200) {
            return data.data;
        } else {
            console.log("서버 에러");
        }
    } catch (error) {
        console.error(error);
    }
};

export default UserList;
