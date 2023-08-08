import React, { useState, useRef } from "react";
import Calendar from "react-calendar";
import "./Calendar.css"; // css import

export const Calender = () => {
  const [value, setValue] = useState(new Date());
  const calendarRef = useRef(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(formatDate(newValue));
  };

  const handleButtonClick = () => {
    const newDate = new Date(); // You can replace this with the logic you need
    setValue(newDate);
    calendarRef.current.onChange(newDate);
  };

  return (
    <div>
      <Calendar ref={calendarRef} onChange={handleChange} value={value} />
      <button onClick={handleButtonClick}>오늘로 설정</button>
    </div>
  );
};
