import React from "react";

const Header = () => {
  return (
    <div className="h-16 bg-black text-white flex justify-between sticky top-0 z-50">
      <div className="p-4 ml-2 text-2xl">PeerMarket</div>
      <ul className="flex self-center	float-right">
        <li className="px-4">Chat</li>
        <li className="px-4">+Sell</li>
        <li className="px-4 mr-2">Login with G</li>
      </ul>
    </div>
  );
};

export default Header;
