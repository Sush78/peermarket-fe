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
import { getPoolById } from "../redux/slices/poolById";
import { AppDispatch } from "../redux/store";
import { io } from "socket.io-client";
import { PoolContext } from "../context/PoolContext";

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

const socket = io("http://localhost:9000");

const PlaceBet = () => {
  const { currentAccount, placeBet } = useContext(PoolContext);

  useEffect(() => {
    dispatch(getPoolById(poolId));

    setData({
      labels: ["Yes", "No"],
      datasets: [
        {
          backgroundColor: ["green", "red"],
          data: [truePercentage, falsePercentage],
        },
      ],
    });

    socket.on("newBet", (data) => {
      console.log("+++++", data);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const [data, setData] = useState(initialData);
  const dispatch = useDispatch<AppDispatch>();
  const poolDetails = useSelector((store: any) => store.getPoolById);

  const [searchParams] = useSearchParams();
  const poolId: any = searchParams.get("poolId");

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

        <div className="flex flex-col">
          <div className="switch-field p-2">
            <div className="pr-2">Select an option: </div>
            <input
              type="radio"
              id="radio-one"
              name="switch-one"
              value="yes"
              onClick={() => setChoice("yes")}
            />
            <label htmlFor="radio-one">Yes</label>
            <input
              type="radio"
              id="radio-two"
              name="switch-one"
              value="no"
              onClick={() => setChoice("no")}
            />
            <label htmlFor="radio-two">No</label>
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
          {currentPool?.Description}
        </div>
      </div>
    </div>
  );
};

export default PlaceBet;
