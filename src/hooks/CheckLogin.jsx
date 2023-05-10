import axios from "axios";
import api from "./Api";

// 쿠키를 가져오는 함수
function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

const refreshAccessToken  = async () => {
    const RefreshURL = `${URL}/api/account/refresh.do`;
    const refreshToken = getCookie("refreshToken");
    try {
        const response = await axios.post(
            RefreshURL,
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );
        const GetaccessToken = response.data.data.accessToken;
        const GetrefreshToken = response.data.data.refreshToken;
        localStorage.setItem("accessToken", GetaccessToken);
        document.cookie = `refreshToken=${GetrefreshToken}`;
        return GetaccessToken;
    } catch (error) {
        return null;
    }
}

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
        } else if (userData.status === 401) {
            //작업수행
            refreshAccessToken(); //TODO
        }
        else {
            console.log("서버 에러");
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};
