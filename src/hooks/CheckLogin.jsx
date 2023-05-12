import axios from "axios";

export const URL = process.env.REACT_APP_API;

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

const refreshAccessToken = async () => {
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
};

export const CheckLogin = async (accessToken) => {
    const URL_Profile = `${URL}/api/user/profile`;

    try {
        const response = await axios.get(URL_Profile, {
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
        console.error(error.response);
        if (error.response.status === 401) {
            // 토큰 재발급
            const accessToken = await refreshAccessToken();
            // 요청 다시 보내기
            try {
                const response = await axios.get(URL_Profile, {
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
            }
        }
    }
};
