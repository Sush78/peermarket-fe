import React from "react";

const PlaceBetShimmer = () => {
  return (
    <div className="flex min-h-screen animate-pulse justify-around">
      <div className="w-[600px] h-auto flex flex-col m-6 ">
        <div className="h-72 p-2 mx-6 shadow-xl bg-gray-200 rounded-xl"></div>
        <div className="h-72 p-2 mx-6 my-4 shadow-xl bg-gray-200 rounded-xl"></div>
      </div>
      <div className="w-[500px] h-auto flex flex-col m-6">
        <div className="h-72 p-2 mx-6 shadow-xl bg-gray-200 rounded-xl"></div>
        <div className="h-72 p-2 mx-6 my-4 shadow-xl bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export default PlaceBetShimmer;
