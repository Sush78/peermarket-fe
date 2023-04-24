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

const BarChart = (props: any) => {
  const [firstLabel, setFirstLabel] = useState(props.resultMap["0"]);
  const [secondLabel, setSecondLabel] = useState(props.resultMap["1"]);
  const [firstLabelValue, setFirstLabelValue] = useState(props.stats["0"]);
  const [secondLabelValue, setSecondLabelValue] = useState(props.stats["1"]);

  const totalCount = firstLabelValue + secondLabelValue;
  const truePercentage = (firstLabelValue / totalCount) * 100;
  const falsePercentage = (secondLabelValue / totalCount) * 100;

  const initialData = {
    labels: [firstLabel, secondLabel],
    datasets: [
      {
        backgroundColor: ["green", "red"],
        data: [truePercentage, falsePercentage],
      },
    ],
  };
  const [data, setData] = useState(initialData);

  return (
    <div className="w-96 h-17 p-2 m-6 border border-black-900 rounded-xl flex flex-col items-center shadow-lg">
      <h2 className="text-lg font-bold text-white">{props.name}</h2>
      <Link to={`/placeBet?poolId=${props._id}`} key={props._id}>
        <Bar data={data} />
        <div className="flex justify-center">
          <button className="p-2 m-2 bg-slate-100 shadow-lg rounded-xl w-64 text-base font-bold">
            Place Bet
          </button>
        </div>
      </Link>
    </div>
  );
};

export default BarChart;