import { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import ZoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getPoolById,
  updateChart,
  clearPoolData,
} from "../redux/slices/poolById";
import { AppDispatch } from "../redux/store";
import { io } from "socket.io-client";
import { PoolContext } from "../context/PoolContext";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { socketEndPoint } from "../utils/constants/generic";
import LineChart from "./LineChart";
import PlaceBetShimmer from "./PlaceBetShimmer";
import Timer from "./Timer";
import * as api from '../api/index'
import { Notification } from '../utils/constants/notification';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ZoomPlugin,
  Title,
  Tooltip
);

const socket = io(socketEndPoint);

const PlaceBet = () => {
  const { currentAccount, placeBet } = useContext(PoolContext);
  const poolDetails = useSelector((store: any) => store.getPoolById);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const poolId: any = searchParams.get("poolId");
  const { width, height } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isPoolExpired, setIsPoolExpired] = useState(false);

  useEffect(() => {
    dispatch(getPoolById(poolId));
    socket.on("newBet", (data) => {
      if (data?.poolId === poolId) {
        dispatch(updateChart(data));
      }
    });

    return () => {
      socket.off("connect");
      dispatch(clearPoolData());
    };
  }, []);

  const amounts_0: any[] = [];
  const amounts_1: any[] = [];
  const timeStamps: any[] = [];

  if (poolDetails?.data?.graphData != undefined) {
    for (const data of poolDetails?.data?.graphData) {
      const [timestamp, direction] = Object.keys(data)[0].split("-");
      const amount = data[Object.keys(data)[0]][0];
      timeStamps.push(new Date(timestamp));
      if (direction === "0") {
        amounts_0.push(amount);
        amounts_1.push(null);
      } else if (direction === "1") {
        amounts_1.push(amount);
        amounts_0.push(null);
      }
    }
  }

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
      placeBet(amount, choice);
    }
  };

  const onOverlayClick = () => {
    setIsClicked(false);
    navigate("/");
  };

  const handlePoolStatusChange = (value: boolean) => {
    setIsPoolExpired(value);
    const addNotifcation = async () => {
      const notification: Notification = 
        {
          pool_id: 1,
          notification_text: 'You are Winner of this bet',
          status: 'active',
          player_address: 'test',
          notification_title: 'Testing Notification 1'
        }
        await api.addNotification(notification);
    };
    addNotifcation();
    console.log("------", isPoolExpired);
  };

  if (poolDetails.isLoading) {
    return <PlaceBetShimmer />;
  }

  if (!poolDetails?.data?.data) {
    return <></>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-2/5 self-center mt-2">
        <Timer onPoolStatusChange={handlePoolStatusChange} />
      </div>
      <div className="flex ">
        <div className="w-1/2 h-auto p-2 m-6 flex flex-col overflow-y-auto">
          <div className="h-1/2 p-2 mx-6 shadow-xl ">
            <LineChart
              amounts0={amounts_0}
              amounts1={amounts_1}
              poolDetails={poolDetails}
              timestamps={timeStamps}
            />
          </div>
          <div className="h-1/2 p-2 mx-6 my-1 shadow-xl">
            <Bar
              className="h-2/6"
              data={{
                labels: poolDetails?.data?.labels,
                datasets: [
                  {
                    backgroundColor: ["green", "red"],
                    data: poolDetails?.data?.data,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    ticks: {
                      color: "white",
                    },
                  },
                  y: {
                    ticks: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="w-1/2 h-auto p-2 m-6  flex flex-col overflow-y-auto  ">
          <div className="h-1/2 p-2 w-3/4 mx-6 border border-slate-500 rounded-2xl self-center shadow-xl">
            <div className="text-2xl py-2 font-bold text-white flex justify-center">
              {poolDetails?.data?.poolData?.name}
            </div>

            <div className="flex flex-col">
              <div className="switch-field rounded-xl">
                <input
                  type="radio"
                  id="radio-one"
                  name="switch-one"
                  value={poolDetails?.data?.labels["0"]}
                  onClick={() => setChoice("0")}
                />
                <label htmlFor="radio-one" className="w-11/12 h-20 rounded-xl">
                  {poolDetails?.data?.labels["0"]}
                </label>
                <input
                  type="radio"
                  id="radio-two"
                  name="switch-one"
                  className="w-11/12"
                  value={poolDetails?.data?.labels["1"]}
                  onClick={() => setChoice("1")}
                />
                <label htmlFor="radio-two" className="w-11/12 h-20 rounded-xl">
                  {poolDetails?.data?.labels["1"]}
                </label>
              </div>
              <form onSubmit={onFormSubmit}>
                <div className="my-1">
                  <input
                    type="number"
                    className="focus:bg-grey-200 p-2 border boder-black-500 w-full h-20 text-xl rounded-xl bg-slate-900 text-white placeholder-white "
                    placeholder="Enter amount greater than 0"
                    onChange={(e) => {
                      setAmount(+e.target.value);
                    }}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className={`rounded-2xl h-14 my-1 w-full shadow-lg text-white text-xl bg-blue-900 w-1/2 ${removeDisabledClass} `}
                  >
                    Place Bet
                  </button>
                </div>
              </form>
            </div>
          </div>
          {(isVisible || isPoolExpired) && (
            <Confetti width={width} height={height} />
          )}
          {(isClicked || isPoolExpired) && (
            <div className="overlay ">
              <div className="flex flex-col items-center bg-white rounded-lg">
                {/* <div className="flex w-64 p-2">
                  <div className="flex flex-col shadow-lg">
                    <img src="/nft-image.jpg" alt="NFT" />
                  </div>
                  <div
                    className="font-bold self-start pl-2 cursor-pointer"
                    onClick={onOverlayClick}
                  >
                    x
                  </div>
                </div> */}
                {/* <div className="text-xl p-2 w-64 pt-0 text-center">
                  Congratulations Your Bet Has Been Placed!
                </div> */}
                <div className="text-xl p-2 w-64 pt-0 text-center">
                  The Pool Is Expired Now. Please Check Notifications.
                </div>
              </div>
            </div>
          )}
          <div className="h-1/2 p-2 w-3/4 self-center border-slate-500 rounded-2xl mx-6 my-1 border border-black-900 text-white">
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
            <div className="py-2">
              <span className="font-bold"> Description:</span>{" "}
              {poolDetails?.data?.poolData?.Description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceBet;
