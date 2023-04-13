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
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getPoolById } from "../redux/slices/poolById";
import { AppDispatch } from "../redux/store";

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
  useEffect(() => {
    dispatch(getPoolById(poolId));
  }, []);
  const [data, setData] = useState(initialData);
  const dispatch = useDispatch<AppDispatch>();
  const poolDetails = useSelector((store: any) => store.getPoolById);

  const [searchParams] = useSearchParams();
  const poolId: any = searchParams.get("poolId");

  console.log(poolDetails.data, "--------");

  const topPools = useSelector((state: any) => state.topPools);
  const currentPool = topPools.data.filter(
    (pool: any) => pool._id === poolId
  )[0];

  const [firstLabel, setFirstLabel] = useState(currentPool.resultMap["0"]);
  const [secondLabel, setSecondLabel] = useState(currentPool.resultMap["1"]);
  const [firstLabelValue, setFirstLabelValue] = useState(
    currentPool.stats["0"]
  );
  const [secondLabelValue, setSecondLabelValue] = useState(
    currentPool.stats["1"]
  );

  const totalCount = firstLabelValue + secondLabelValue;
  const truePercentage = (firstLabelValue / totalCount) * 100;
  const falsePercentage = (secondLabelValue / totalCount) * 100;

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
  }, []);

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
      <div className="w-1/2 border border-black-900 p-2 m-6 flex flex-col ">
        <div className="text-xl py-2 font-bold">{currentPool?.name}</div>
        <PlaceBetForm />
        <div className="py-2">
          <span className="font-bold"> Description:</span>{" "}
          {currentPool?.Description}
        </div>
      </div>
    </div>
  );
};

export default PlaceBet;
