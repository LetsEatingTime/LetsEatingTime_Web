import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Style from "../../style/UserDetail_style.module.css";

import StudentCard from "../../image/StudentCard.svg";
import NavBar from "../NavBar";

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
            <NavBar />
            {userData ? (
                <div>
                    <div className={Style.card}>
                        <div className={Style.leftbox}>
                            <div className={Style.CardBasicInformation}>
                                <img className={Style.CardBox} src={StudentCard} />
                                {/* <img className={Style.CardStudentImage} src={userData.user.idx} /> */}
                                <h1 className={Style.UserCardName}>{userData.user.name} </h1>
                                <div className={Style.BaseOfStudent}>
                                    <p className={Style.UserCardBasicInformation}>
                                        {userData.user.grade} 학년
                                    </p>
                                    <p className={Style.UserCardBasicInformation}>
                                        {userData.user.className} 반
                                    </p>
                                    <p className={Style.UserCardBasicInformation}>
                                        {userData.user.classNo} 번
                                    </p>
                                    <p className={Style.UserCardBasicInformation}>
                                        {" "}
                                        {userData.user.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={Style.rightbox}>
                            <div className={Style.User}>
                                <p className={Style.UserGrade}>학년: {userData.user.grade} </p>
                                <p className={Style.UserClass}>반: {userData.user.className} </p>
                                <p className={Style.UserNum}>번호: {userData.user.classNo} </p>
                            </div>
                            <h1 className={Style.UserName}>{userData.user.name} </h1>
                            <div className={Style.Didyoueat}>
                                <span>{breakfast ? <>🟦</> : <>⬜️</>}</span>
                                <br />
                                <span>{lunch ? <>🟦</> : <>⬜️</>}</span>
                                <br />
                                <span>{dinner ? <>🟦</> : <>⬜️</>}</span>
                            </div>
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
