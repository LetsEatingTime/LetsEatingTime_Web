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
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

export const URL = process.env.REACT_APP_API;

const Piechart = () => {
  const [mealData, setMealData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL_Pie = `${URL}/api/statistic/meal-application`;
        const response = await axios.get(URL_Pie);
        const data = response.data.data;
        setMealData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const resizeChart = () => {
      if (chartRef.current) {
        const chartInstance = chartRef.current.chartInstance;
        if (chartInstance) {
          chartInstance.resize();
        }
      }
    };

    window.addEventListener("resize", resizeChart);

    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, []);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "급식 신청율",
      },
    },
  };

  const data = {
    labels: ["급식 미신청", "급식 신청"],
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
    <div style={{ position: "relative", width: "100%", height: "300px" }}>
      <Pie ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default Piechart;
