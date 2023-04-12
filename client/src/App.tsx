import Footer from "./components/Footer";
import Header from "./components/Header";
import CategoryView from "./components/views/CategoryView";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProductList from "./components/ProductList";
import Chat from "./components/Chat";
import Sell from "./components/Sell";
import Error from "./components/Error";
import { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import PlaceBet from "./components/PlaceBet";
import { io } from "socket.io-client";
import { addDataToChart } from "./redux/slices/chart";
import { useDispatch } from "react-redux";
import LandingPage from "./components/LandingPage";

const socket = io("http://localhost:3001");

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        const totalCount = data?.true + data?.false;
        console.log("---", totalCount);
        dispatch(addDataToChart(data));
      });

      socket.emit("msg", "Thanks for connecting!");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header />
      <Outlet />
      {/* <BarChart /> */}
      <Footer />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/placeBet",
        element: <PlaceBet />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/sell",
        element: <Sell />,
      },
    ],
  },
]);

export default appRouter;
