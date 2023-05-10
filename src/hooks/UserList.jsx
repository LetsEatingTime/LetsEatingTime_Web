import api from "./Api";

const UserList = async (accessToken) => {
    try {
        const response = await api.get('/api/teacher/get/user?id=', {
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
