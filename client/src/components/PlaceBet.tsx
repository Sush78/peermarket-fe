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
import PlaceBetForm from "./PlaceBetForm";
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

const PlaceBet = () => {
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
    <div className="flex  min-h-screen">
      <div className="w-1/2 h-auto p-2 m-6 border border-black-900">
        <Bar data={data} />
        <div className="m-2 p-2 flex flex-col">
          <div className=""> Yes: {truePercentage.toFixed(2)}%</div>
          <div> No: {falsePercentage.toFixed(2)}%</div>
          <div> Total Size: {totalCount}</div>
        </div>
      </div>
      <div className="w-1/2 border border-black-900 p-2 m-6">
        <PlaceBetForm />
      </div>
    </div>
  );
};

export default PlaceBet;
