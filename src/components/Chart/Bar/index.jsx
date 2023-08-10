import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SimpleDropdown } from "react-js-dropdavn";
import "react-js-dropdavn/dist/index.css";

export const URL = process.env.REACT_APP_API;

const Barchart = () => {
  const [mealData, setMealData] = useState([]);
  const [defaultDropDown, setDefaultDropDown] = useState(1); // 1: 전체, 2: 아침, 3: 점심, 4: 저녁
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (mealType = "") => {
    if (mealType === "") {
      setDefaultDropDown(1);
    } else if (mealType === "breakfast") {
      setDefaultDropDown(2);
    } else if (mealType === "lunch") {
      setDefaultDropDown(3);
    } else if (mealType === "dinner") {
      setDefaultDropDown(4);
    }
    try {
      const URL_PieBreakfast = `${URL}/api/statistic/meal-attend?type=${mealType}`;
      const response = await axios.get(URL_PieBreakfast);
      const responseData = response.data.data;
      setMealData(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "급식 참석율",
      },
    },
  };

  const data = {
    labels: ["급식 참석", "급식 미참석"],
    datasets: [
      {
        label: "급식",
        fill: false,
        data: mealData,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const DropDownData = [
    { label: "전체", value: 1 },
    { label: "아침", value: 2 },
    { label: "점심", value: 3 },
    { label: "저녁", value: 4 },
  ];

  const handleDropdown = async (value) => {
    let MealType = "";
    switch (value.value) {
      case 1:
        MealType = "";
        break;
      case 2:
        MealType = "breakfast";
        break;
      case 3:
        MealType = "lunch";
        break;
      case 4:
        MealType = "dinner";
        break;
      default:
        break;
    }
    fetchData(MealType);
  };

  return (
    <div>
      <div>
        <SimpleDropdown
          onChange={handleDropdown}
          options={DropDownData}
          defaultValue={defaultDropDown}
          configs={{ position: { y: "bottom", x: "center" } }}
        />
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "350px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "1px 1px 6px 1px gray",
        }}
      >
        <Bar ref={chartRef} options={options} data={data} />
      </div>
    </div>
  );
};

export default Barchart;
