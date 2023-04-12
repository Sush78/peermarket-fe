import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartType,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const initialData = {
  labels: ["Yes", "No"],
  datasets: [
    {
      backgroundColor: ["green", "red"],
      data: [0, 0],
    },
  ],
};

const BarChart = (props: any) => {
  const [data, setData] = useState(initialData);
  const chartData = useSelector((store: any) => store.chart.chartData);
  const totalCount = chartData?.true + chartData?.false;
  const truePercentage = (chartData?.true / totalCount) * 100;
  const falsePercentage = (chartData?.false / totalCount) * 100;

  useEffect(() => {
    setData({
      labels: ["Yes", "No"],
      datasets: [
        {
          backgroundColor: ["green", "red"],
          data: [truePercentage, falsePercentage],
        },
      ],
    });
  }, [chartData]);

  return (
    <div className="w-96 h-17 p-2 m-6 border border-black-900 flex flex-col items-center shadow-lg">
      <h2 className="text-lg font-bold">Pool {props.id}</h2>
      <Bar data={data} />
      <Link to={"/placeBet"}>
        <button className="p-2 m-2 bg-slate-100 shadow-lg w-64 text-base font-bold">
          Place Bet
        </button>
      </Link>
    </div>
  );
};

export default BarChart;
