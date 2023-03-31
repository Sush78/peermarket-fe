import Footer from "./components/Footer";
import Header from "./components/Header";
import CategoryView from "./components/views/CategoryView";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProductList from "./components/ProductList";
import Chat from "./components/Chat";
import Sell from "./components/Sell";
import Error from "./components/Error";

function App() {
  return (
    <div className="flex flex-col h-screen">
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
        element: <CategoryView />,
      },
      {
        path: "/productList",
        element: <ProductList />,
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
