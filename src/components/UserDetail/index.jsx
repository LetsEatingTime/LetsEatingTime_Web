import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Style from "../../style/UserDetail_style.module.css";

import StudentCard from "../../image/StudentCard.svg";

export const URL = process.env.REACT_APP_API;

const UserDetail = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(false);
    const [userProfile, setUserProfile] = useState("");

    const [breakfast, setBreakfast] = useState(false);
    const [lunch, setLunch] = useState(false);
    const [dinner, setDinner] = useState(false);

    useEffect(() => {
        const user = async () => {
            const userId = location.state.UserId;
            const URL_UserDetail = `${URL}/api/teacher/get/user?id=${userId}`;

            const accessToken = localStorage.getItem("accessToken");
            try {
                const response = await axios.get(URL_UserDetail, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = response.data;
                if (data.status === 200) {
                    // const user = data.data;
                    setUserData(data.data);
                    const mealTime = data.data.mealTime;
                    mealTime.includes("breakfast") ? setBreakfast(true) : setBreakfast(false);
                    mealTime.includes("lunch") ? setLunch(true) : setLunch(false);
                    mealTime.includes("dinner") ? setDinner(true) : setDinner(false);
                } else {
                    console.log("서버 에러");
                }
            } catch (error) {
                console.error(error);
                navigate("/");
            }
        };

        // console.log(mealTime);
        user();
    }, [location, navigate]);

    return (
        <div>
            {userData ? (
                <div>
                    <div className={Style.card}>
                        <div className={Style.leftbox}>
                            <img className={Style.CardBox} src={StudentCard} />
                            <img className={Style.CardStudentImage} src={userData.user.idx} />
                            <div className={Style.CardBasicInformation}>
                                <h1 className={Style.UserCardName}>{userData.user.name} </h1>
                                <div className={Style.BaseOfStudent}>
                                    <p className={Style.UserCardBasicInformation}>
                                        학년: {userData.user.grade}{" "}
                                    </p>
                                    <p className={Style.UserCardBasicInformation}>
                                        반: {userData.user.className}{" "}
                                    </p>
                                    <p className={Style.UserCardBasicInformation}>
                                        번호: {userData.user.classNo}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightbox}>
                            <h1>{userData.user.name} </h1>
                            <p>학년: {userData.user.grade} </p>
                            <p>반: {userData.user.className} </p>
                            <p>번호: {userData.user.classNo} </p>
                            <span>아침: {breakfast ? <>✅</> : <>❌</>}</span>
                            <br />
                            <span>점심: {lunch ? <>✅</> : <>❌</>}</span>
                            <br />
                            <span>저녁: {dinner ? <>✅</> : <>❌</>}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDetail;
