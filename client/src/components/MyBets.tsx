import React from "react";

const MyBets = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {new Array(10).fill(0).map((element, index) => {
        return (
          <img
            className="p-4 w-64 h-64"
            src="nft-image.jpg"
            alt="nft-image"
            key={index}
          />
        );
      })}
    </div>
  );
};

export default MyBets;
