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

function App() {
  const [graphData, setGraphData] = useState({});

  return (
    <div className="flex flex-col h-screen">
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
        element: <BarChart />,
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
