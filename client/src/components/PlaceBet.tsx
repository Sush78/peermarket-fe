import React, { useState, useEffect, useContext } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPoolById, updateStatsObj } from "../redux/slices/poolById";
import { AppDispatch } from "../redux/store";
import { io } from "socket.io-client";
import { PoolContext } from "../context/PoolContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const socket = io("http://localhost:9000");

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
  const { currentAccount, placeBet } = useContext(PoolContext);
  const poolDetails = useSelector((store: any) => store.getPoolById);

  // const [data, setData] = useState(initialData);
  let data = initialData;
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const poolId: any = searchParams.get("poolId");
  const currentPool = poolDetails?.data;

  // data = poolDetails?.data;

  useEffect(() => {
    dispatch(getPoolById(poolId));

    socket.on("newBet", (data) => {
      console.log("+++++", data);
      // append the data to actual data
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [choice, setChoice] = useState("");

  let removeDisabledClass =
    amount > 0 && choice.length > 0 ? "" : "cursor-not-allowed opacity-50";

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    if (amount > 0 && choice.length > 0) {
      console.log(amount, choice);
      socket.emit("newBet", { poolId, choice, amount, currentAccount });
      // placeBet()
      // navigate("/");
    }
  };

  if (!poolDetails?.data?.data) {
    return;
  }

  return (
    <div className="flex  min-h-screen">
      <div className="w-1/2 h-auto p-2 m-6 border border-black-900">
        <Bar
          data={{
            labels: poolDetails?.data?.labels,
            datasets: [
              {
                backgroundColor: ["green", "red"],
                data: poolDetails?.data?.data,
              },
            ],
          }}
        />
        <div className="m-2 p-2 flex flex-col">
          <div className="">
            {poolDetails?.data?.labels[0]}: {poolDetails?.data?.data[0]}%
          </div>
          <div>
            {poolDetails?.data?.labels[1]}: {poolDetails?.data?.data[1]}%
          </div>
          <div> Total Size: {poolDetails?.totalCount}</div>
        </div>
      </div>
      <div className="w-1/2 border border-black-900 p-2 m-6 flex flex-col ">
        <div className="text-xl py-2 font-bold">
          {poolDetails?.data?.poolData?.name}
        </div>

        <div className="flex flex-col">
          <div className="switch-field p-2">
            <div className="pr-2">Select an option: </div>
            <input
              type="radio"
              id="radio-one"
              name="switch-one"
              value={poolDetails?.data?.labels["0"]}
              onClick={() => setChoice(poolDetails?.data?.labels["0"])}
            />
            <label htmlFor="radio-one">{poolDetails?.data?.labels["0"]}</label>
            <input
              type="radio"
              id="radio-two"
              name="switch-one"
              value={poolDetails?.data?.labels["1"]}
              onClick={() => setChoice(poolDetails?.data?.labels["1"])}
            />
            <label htmlFor="radio-two">{poolDetails?.data?.labels["1"]}</label>
          </div>
          <form onSubmit={onFormSubmit}>
            <div>
              <input
                type="number"
                className="focus:bg-grey-200 p-2 m-2 border boder-black-500 w-1/2"
                placeholder="Enter amount greater than 0"
                onChange={(e) => {
                  setAmount(+e.target.value);
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                className={`p-2 m-2 shadow-lg text-white bg-black w-1/2 ${removeDisabledClass} `}
              >
                Place Bet
              </button>
            </div>
          </form>
        </div>

        <div className="py-2">
          <span className="font-bold"> Description:</span>{" "}
          {poolDetails?.data?.poolData?.Description}
        </div>
      </div>
    </div>
  );
};

export default PlaceBet;
