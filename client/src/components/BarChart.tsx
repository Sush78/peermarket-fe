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

const BarChart = () => {
  const [data, setData] = useState(initialData);

  console.log(data);
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        const totalCount = data?.true + data?.false;
        const truePercentage = (data?.true / totalCount) * 100;
        const falsePercentage = (data?.false / totalCount) * 100;
        setData({
          labels: ["Yes", "No"],
          datasets: [
            {
              backgroundColor: ["green", "red"],
              data: [truePercentage, falsePercentage],
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
    <div className="w-96 h-2 p-2 m-6 border border-black-900 min-h-screen">
      <h2>Real-time Bar Chart</h2>
      <Bar data={data} />
      <Link to={"/placeBet"}>
        <button className="p-2 m-2 bg-slate-100 rounded-lg">Place Bet</button>
      </Link>
    </div>
  );
};

export default BarChart;
