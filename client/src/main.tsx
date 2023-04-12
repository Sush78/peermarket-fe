import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import appRouter from "./App";
import "./index.css";
import { store } from "./redux/store";
import {PoolProvider} from "./context/PoolContext.jsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PoolProvider>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </PoolProvider>
);
