import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Style from "../../style/UserDetail_style.module.css";
import api from "../../hooks/Api";

const UserDetail = (props) => {
    const location = useLocation();
    const [userData, setUserData] = useState(false);

    const [breakfast, setBreakfast] = useState(false);
    const [lunch, setLunch] = useState(false);
    const [dinner, setDinner] = useState(false);

    useEffect(() => {
        const user = async () => {
            const userId = location.state.UserId;

            const accessToken = localStorage.getItem("accessToken");
            try {
                const response = await api.get(`/api/teacher/get/user?id=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = response.data;
                if (data.status === 200) {
                    const users = data.data;
                    // console.log(users);
                    return users;
                } else {
                    console.log("서버 에러");
                }
            } catch (error) {
                console.error(error);
            }
        };
        user().then((data) => {
            setUserData(data);
            const mealTime = data.mealTime;
            mealTime.includes("breakfast") ? setBreakfast(true) : setBreakfast(false);
            mealTime.includes("lunch") ? setLunch(true) : setLunch(false);
            mealTime.includes("dinner") ? setDinner(true) : setDinner(false);
        });
        // console.log(mealTime);
    }, [location]);

    return (
        <div>
            {userData ? (
                <div>
                    <div className={Style.card}>
                        <h1>{userData.user.name}</h1>
                        <p>학년: {userData.user.grade}</p>
                        <p>반: {userData.user.className}</p>
                        <p>번호: {userData.user.classNo}</p>
                        <span>아침: {breakfast ? <>✅</> : <>❌</>}</span>
                        <br />
                        <span>점심: {lunch ? <>✅</> : <>❌</>}</span>
                        <br />
                        <span>저녁: {dinner ? <>✅</> : <>❌</>}</span>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDetail;
