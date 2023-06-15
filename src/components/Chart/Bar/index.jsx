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

export const URL = process.env.REACT_APP_API;

const Barchart = () => {
  const [mealData, setMealData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL_PieBreakfast = `${URL}/api/statistic/meal-attend?type=`;
        const response = await axios.get(URL_PieBreakfast);
        const responseData = response.data.data;
        setMealData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const resizeChart = () => {
  //     if (chartRef.current) {
  //       const chartInstance = chartRef.current.chartInstance;
  //       if (chartInstance) {
  //         chartInstance.resize();
  //       }
  //     }
  //   };

  //   window.addEventListener("resize", resizeChart);

  //   return () => {
  //     window.removeEventListener("resize", resizeChart);
  //   };
  // }, []);

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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "350px",
        backgroundColor: "white",
        // border: "1px solid black",
        borderRadius: "10px",
        boxShadow: "1px 1px 6px 1px gray",
      }}
    >
      <Bar ref={chartRef} options={options} data={data} />
    </div>
  );
};

export default Barchart;
