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
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import PlaceBetForm from "./PlaceBetForm";

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

const socket = io("http://localhost:3001");

const PlaceBet = () => {
  const [data, setData] = useState(initialData);
  const [truePercentage, setTruePercentage] = useState(0);
  const [falsePercentage, setFalsePercentage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  console.log(data);
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        const totalCount = data?.true + data?.false;
        setTotalSize(totalCount);
        setTruePercentage((data?.true / totalCount) * 100);
        setFalsePercentage((data?.false / totalCount) * 100);
        setData({
          labels: ["Yes", "No"],
          datasets: [
            {
              backgroundColor: ["green", "red"],
              data: [
                (data?.true / totalCount) * 100,
                (data?.false / totalCount) * 100,
              ],
            },
          ],
        });
      });

      socket.emit("msg", "Thanks for connecting!");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div className="flex  min-h-screen">
      <div className="w-1/2 h-auto p-2 m-6 border border-black-900">
        <Bar data={data} />
        <div className="m-2 p-2 flex flex-col">
          <div className=""> Yes: {truePercentage.toFixed(2)}%</div>
          <div> No: {falsePercentage.toFixed(2)}%</div>
          <div> Total Size: {totalSize}</div>
        </div>
      </div>
      <div className="w-1/2 border border-black-900 p-2 m-6">
        <PlaceBetForm />
      </div>
    </div>
  );
};

export default PlaceBet;
