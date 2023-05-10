import api from "./Api";

export const CheckLogin = async (accessToken) => {
    try {
        const response = await api.get("/api/user/profile", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userData = response.data;
        if (userData.status === 200) {
            const userType = response.data.data.user.userType;
            return userType === "T";
        } else {
            console.log("서버 에러");
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};
