import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Style from "../../style/Meal_style.module.css";
import axios from "axios";

export const URL = process.env.REACT_APP_API;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Meal = () => {
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const today = year + month + day;

    const URL_Meal = `${URL}/api/openapi/meal?date=${today}`;
    axios
      .get(URL_Meal)
      .then((response) => {
        // console.log(response.data);
        const mealRequest = response.data;
        if (mealRequest.status === 200) {
          const mealToday = mealRequest.data;
          if (mealToday.exists) {
            const breakfastData = `${
              mealToday.breakfast ? mealToday.breakfast.menu.join("\n") : "아침이 없습니다."
            }`;
            const lunchData = `${
              mealToday.lunch ? mealToday.lunch.menu.join("\n") : "점심이 없습니다."
            }`;
            const dinnerData = `${
              mealToday.dinner ? mealToday.dinner.menu.join("\n") : "저녁이 없습니다."
            }`;
            setBreakfast(breakfastData);
            setLunch(lunchData);
            setDinner(dinnerData);
          } else {
            setBreakfast("아침이 없습니다.");
            setLunch("점심이 없습니다.");
            setDinner("저녁이 없습니다.");
          }
        } else {
          console.log("서버 에러");
        }
      })
      .catch((error) => {
        // console.log(error);
        setBreakfast("서버 에러");
        setLunch("서버 에러");
        setDinner("서버 에러");
      });
  }, []);
  return (
    <div className={Style.MainContainer}>
      <Flex>
        <div className={Style.box}>
          <h3>조식</h3>
          <pre>{breakfast}</pre>
        </div>
        <div className={Style.box}>
          <h3>중식</h3>
          <pre>{lunch}</pre>
        </div>
        <div className={Style.box}>
          <h3>석식</h3>
          <pre>{dinner}</pre>
        </div>
      </Flex>
    </div>
  );
};

export default Meal;
