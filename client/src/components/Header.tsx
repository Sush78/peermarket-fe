import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { PoolContext } from "../context/PoolContext";
import { NotificationContext } from '../context/NotificationContext';
import { useContext } from "react";

const Header = () => {
  const { activeNotifications } = useContext(NotificationContext);
  const isUserLoggedIn = useSelector((store: any) => store.user.isUserLoggedIn);
  const { connectWallet, currentAccount, placeBet } = useContext(PoolContext);

  const onLoginClick = () => {
    connectWallet();
    console.log("in header: ", currentAccount);
  };
  return (
    <div className="h-16 bg-black text-white flex justify-between sticky top-0 z-50">
      <Link to={"/"}>
        <div className="p-4 ml-2 text-2xl">PeerMarket</div>
      </Link>
      <ul className="flex self-center	float-right">
        {isUserLoggedIn ? (
          <Link to={`/chat`}>
            <li className="px-4">Chat</li>
          </Link>
        ) : (
          <></>
        )}
        {currentAccount ? (
          <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white">
            <div className="relative inline-flex">
              <Link to="/notifications" className="text-white flex items-center">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" d="M10 18a2 2 0 002-2H8a2 2 0 002 2zm5.555-5.833c-.832-.89-2.166-1.667-2.166-5a4.167 4.167 0 00-8.334 0c0 3.333-1.334 4.11-2.166 5-.11.118-.222.237-.333.363V15a1 1 0 001 1h12a1 1 0 001-1v-2.47c-.11-.126-.222-.245-.333-.363zM16 7a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" /></svg>
                <span>
                  {activeNotifications > 0 && (
                    <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                      {activeNotifications}
                    </span>
                  )}
                </span>
              </Link>
            </div>
            <span className="px-4 mr-2 cursor-pointer">
              <Profile />
            </span>
          </button >
        ) : (
          <li className="px-4 mr-2 cursor-pointer" onClick={onLoginClick}>
            connect wallet
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
