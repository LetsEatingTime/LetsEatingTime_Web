import axios from "axios";

export const URL = process.env.REACT_APP_API;

const URL_UserList = `${URL}/api/teacher/get/user?id=`;

const UserList = async (accessToken) => {
    let isSuccess = false;
    let users;
    while (!isSuccess) {
        try {
            const response = await axios.get(URL_UserList, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // console.log(response)
            const data = response.data;
            // console.log(data)
            if (data.status === 200) {
                isSuccess = true;
                users = data.data;
            } else {
                console.log("서버 에러");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return users;
};

export default UserList;
