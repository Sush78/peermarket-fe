import React, { useState, useEffect, useContext } from "react";
import { Line, Bar } from "react-chartjs-2";
import ZoomPlugin from 'chartjs-plugin-zoom';
import moment from 'moment';
import {
  Chart as ChartJS,
  ChartType,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPoolById, updateChart } from "../redux/slices/poolById";
import { AppDispatch } from "../redux/store";
import { io } from "socket.io-client";
import { PoolContext } from "../context/PoolContext";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, TimeScale, ZoomPlugin, Title, Tooltip);
const socket = io("http://localhost:9000");
const PlaceBet = () => {
  const { currentAccount, placeBet } = useContext(PoolContext);
  const poolDetails = useSelector((store: any) => store.getPoolById);
  if (poolDetails?.data?.timestamps !== undefined) {
    debugger;
    const timestamps1 = poolDetails?.data?.timestamps[0];
    const timestamps2 = poolDetails?.data?.timestamps[1];
    const amounts1 = poolDetails?.data?.amounts[0];
    const amounts2 = poolDetails?.data?.amounts[1];
    var finalData: any = [];
    var timestamps: any = [];
    var t1 = [];
    for (let i = 0; i < timestamps1.length; i++) {
      const amount1 = amounts1[i];
      t1.push({ x: moment(timestamps1[i]).subtract(1, 'hour').format("DD-MM-YYYY HH:mm:ss"), y: amount1 });
    }
    var t2 = []
    for (let i = 0; i < timestamps2.length; i++) {
      const amount2 = amounts2[i];
      t2.push({ x: moment(timestamps2[i]).subtract(1, 'hour').format("DD-MM-YYYY HH:mm:ss"), y: amount2 });
    }
    // Sort data by timestamp
    finalData = [
      {
        label: poolDetails?.data?.labels[0],
        borderColor: "green",
        data: t1
      },
      {
        label: poolDetails?.data?.labels[1],
        borderColor: "red",
        data: t2
      },
    ];
    timestamps = (finalData[0].data.map((item) => item.x).concat(finalData[1].data.map((item) => item.x))).sort()
  }
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const poolId: any = searchParams.get("poolId");
  const { width, height } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    dispatch(getPoolById(poolId));
    socket.on("newBet", (data) => {
      dispatch(updateChart(data));
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
      setIsVisible(true);
      setIsClicked(true);
      // placeBet()
      // navigate("/");
    }
  };

  const onOverlayClick = () => {
    setIsClicked(false);
    navigate("/");
  };

  if (!poolDetails?.data?.data) {
    return <></>;
  }

  console.log("------");
  return (
    <div className="flex  min-h-screen">
      <div className="w-1/2 h-auto p-2 m-6 border border-black-900 flex flex-col overflow-y-auto">
        <div className="h-1/2 p-2 mx-6 border border-black-900">
          <Line className="h-2/6" options={{
            responsive: true,
            scales: {
              // @ts-ignore
              xAxis: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                      // @ts-ignore
                      let time = ((poolDetails?.data?.timestamps[0].concat(poolDetails?.data?.timestamps[1])).sort())[index]
                        return moment(time).subtract(1, 'hour').format("DD-MM-YYYY HH:mm:ss");
                    },
                },
                labels: timestamps,
            }
            }, plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'xy'
                },
                pan: {
                  enabled: true,
                  mode: 'xy'
                }
              }
            }
          }} data={{
            datasets: finalData
          }} />
                 </div>

        <div className="h-1/2 p-2 mx-6 my-1 border border-black-900">
          <Bar className="h-2/6"
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
        </div>
      </div>
      <div className="w-1/2 h-auto p-2 m-6 border border-black-900 flex flex-col overflow-y-auto">
        <div className="h-1/2 p-2 mx-6 border border-black-900">
          <div className="text-3xl py-2 font-bold text-center">
            Place Bet
          </div>
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
                onClick={() => setChoice("0")}
              />
              <label htmlFor="radio-one">{poolDetails?.data?.labels["0"]}</label>
              <input
                type="radio"
                id="radio-two"
                name="switch-one"
                value={poolDetails?.data?.labels["1"]}
                onClick={() => setChoice("1")}
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
        {isVisible && <Confetti width={width} height={height} />}
        {isClicked && (
          <div className="overlay ">
            <div className="flex flex-col items-center bg-white rounded-lg">
              <div className="flex w-64 p-2">
                <div className="flex flex-col shadow-lg">
                  <img src="/nft-image.jpg" alt="NFT" />
                </div>
                <div
                  className="font-bold self-start pl-2 cursor-pointer"
                  onClick={onOverlayClick}
                >
                  x
                </div>
              </div>
              <div className="text-xl p-2 w-64 pt-0 text-center">
                Congratulations Your Bet Has Been Placed!🎉
              </div>
            </div>
          </div>
        )}
        <div className="h-1/2 p-2 mx-6 my-1 border border-black-900">
          <div className="text-3xl py-2 font-bold text-center">
            Bet Details
          </div>
          <div>
            {poolDetails?.data?.labels[0]}: {poolDetails?.data?.data[0]}%
          </div>
          <div>
            {poolDetails?.data?.labels[1]}: {poolDetails?.data?.data[1]}%
          </div>
          <div> Total Volume: {poolDetails?.data?.totalVolume}</div>
        </div>
      </div>
    </div>
  );
};

export default PlaceBet;
