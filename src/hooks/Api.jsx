// import axios from "axios";

// export const URL = process.env.REACT_APP_API;

// // 쿠키를 가져오는 함수
// function getCookie(name) {
//     const nameEQ = `${name}=`;
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//         let cookie = cookies[i];
//         while (cookie.charAt(0) === " ") {
//             cookie = cookie.substring(1, cookie.length);
//         }
//         if (cookie.indexOf(nameEQ) === 0) {
//             return cookie.substring(nameEQ.length, cookie.length);
//         }
//     }
//     return null;
// }

// // access token이 유효한지 확인하는 API 요청을 보내는 함수
// async function checkAccessToken() {
//     const API_URL = `${URL}/api/user/profile`;
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//         const response = await axios.get(API_URL, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         const data = response.data;
//         if (data.status === 200) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (error) {
//         return false;
//     }
// }

// // access token을 갱신하는 API 요청을 보내는 함수
// async function refreshAccessToken() {
//     const RefreshURL = `${URL}/api/account/refresh.do`;
//     const refreshToken = getCookie("refreshToken");
//     try {
//         const response = await axios.post(
//             RefreshURL,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${refreshToken}`,
//                 },
//             }
//         );
//         const GetaccessToken = response.data.data.accessToken;
//         const GetrefreshToken = response.data.data.refreshToken;
//         localStorage.setItem("accessToken", GetaccessToken);
//         document.cookie = `refreshToken=${GetrefreshToken}`;
//         return GetaccessToken;
//     } catch (error) {
//         return null;
//     }
// }

// // Axios 인스턴스 생성
// const api = axios.create({
//     baseURL: URL,
// });

// // Axios 인터셉터 등록
// api.interceptors.request.use(async (config) => {
//     // access token이 있는 경우, 요청 헤더에 추가
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     // access token이 유효하지 않은 경우, refresh token을 사용하여 access token을 갱신
//     if (accessToken && !(await checkAccessToken())) {
//         const newAccessToken = await refreshAccessToken();
//         if (newAccessToken) {
//             config.headers.Authorization = `Bearer ${newAccessToken}`;
//         }
//     }

//     return config;
// });

// export default api;
