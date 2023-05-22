import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { PoolContext } from "../context/PoolContext";

const PrivateRoutes = () => {
  const { currentAccount } = useContext(PoolContext);
  return currentAccount ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
