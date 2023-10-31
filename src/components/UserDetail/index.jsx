import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "./Calendar.css"; // css import

import Style from "../../style/UserDetail_style.module.css";

import StudentCard from "../../image/StudentCard.svg";

export const URL = process.env.REACT_APP_API;

const UserDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState("");

  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);

  const [value, setValue] = useState(new Date());
  const calendarRef = useRef(null);

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
          setUserData(data.data);
          const mealTime = data.data.mealType;
          if (mealTime) {
            setBreakfast(mealTime.includes("breakfast"));
            setLunch(mealTime.includes("lunch"));
            setDinner(mealTime.includes("dinner"));
          } else {
            console.log("데이터 없음");
            setBreakfast(false);
            setLunch(false);
            setDinner(false);
          }
        } else {
          console.log("서버 에러");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };
    user();
  }, [location, navigate]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = async (newValue) => {
    setValue(newValue);
    const userId = location.state.UserId;
    const URL_UserEat = `${URL}/api/user/meal-entry?id=${userId}&date=${formatDate(newValue)}`;
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(URL_UserEat, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      if (data.status === 200) {
        const mealTime = data.data;
        if (mealTime) {
          const hasBreakfast = mealTime.some((entry) => entry.info === "breakfast");
          const hasLunch = mealTime.some((entry) => entry.info === "lunch");
          const hasDinner = mealTime.some((entry) => entry.info === "dinner");
          setBreakfast(hasBreakfast);
          setLunch(hasLunch);
          setDinner(hasDinner);
        } else {
          console.log("데이터 없음");
          setBreakfast(false);
          setLunch(false);
          setDinner(false);
        }
      } else {
        console.log("서버 에러");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <div className={Style.card}>
            <div className={Style.leftbox}>
              <div className={Style.CardBasicInformation}>
                <img className={Style.CardBox} src={StudentCard} alt="ProfileCard" />
                <img className={Style.CardImage} src={`${URL}/api/user/image/${userData.user.image}`} alt="Profile" />
                <div className={Style.BaseOfStudent}>
                  <h1 className={Style.UserCardName}>{userData.user.name} </h1>
                  <div className={Style.baseForm}>
                    <p className={Style.UserCardBasicInformation}>{userData.user.grade} 학년</p>
                    <p className={Style.UserCardBasicInformation}>{userData.user.className} 반</p>
                    <p className={Style.UserCardBasicInformation}>{userData.user.classNo} 번</p>
                    <p className={Style.UserCardBasicInformation}> {userData.user.name}</p>
                  </div>
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
              <div>
                <Calendar ref={calendarRef} onChange={handleChange} value={value} />
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
