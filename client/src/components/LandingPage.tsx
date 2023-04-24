import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import BarChart from "./BarChart";
import { getTopPools } from "../redux/slices/topPools";
import CategoryShimmer from "./CategoryShimmer";

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const topPools = useSelector((state: any) => state.topPools);

  useEffect(() => {
    dispatch(getTopPools());
  }, []);

  if (topPools.isLoading) {
    return <CategoryShimmer />;
  }
  /* if (topPools.isError) {
    return <Error />;
  } */

  return (
    <div className="flex flex-wrap justify-center min-h-screen ">
      {topPools.data.map((pool: any) => {
        return <BarChart key={pool._id} {...pool} />;
      })}
    </div>
  );
};

export default LandingPage;