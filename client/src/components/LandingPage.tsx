import React from "react";
import BarChart from "./BarChart";

const LandingPage = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {new Array(6).fill(0).map((element, index) => {
        const poolDetails = {
          id: index + 1,
        };
        return <BarChart key={index} {...poolDetails} />;
      })}
    </div>
  );
};

export default LandingPage;
