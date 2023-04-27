import Footer from "./components/Footer";
import Header from "./components/Header";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Error from "./components/Error";
import PlaceBet from "./components/PlaceBet";
import LandingPage from "./components/LandingPage";
import MyBets from "./components/MyBets";
import CreatePool from "./components/CreatePool";

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-gray-700 via-gray-900 to-slate-900">
      <Header />
      <Outlet />
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
        path: `/placeBet`,
        element: <PlaceBet />,
      },
      {
        path: "/myBets",
        element: <MyBets />,
      },
      {
        path: "/createPool",
        element: <CreatePool />,
      },
    ],
  },
]);

export default appRouter;
