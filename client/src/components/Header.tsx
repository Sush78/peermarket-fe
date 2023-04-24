import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/user";
import Profile from "./Profile";
import { PoolContext } from "../context/PoolContext";
import { useContext } from "react";

const Header = () => {
  const isUserLoggedIn = useSelector((store: any) => store.user.isUserLoggedIn);
  const dispatch = useDispatch();
  const { connectWallet, currentAccount, placeBet } = useContext(PoolContext)

  const onLoginClick = () => {
    //connectWallet()
    dispatch(loginUser())
    console.log("in header: ",currentAccount)
  };
  return (
    <div className="h-16 bg-black text-white flex justify-between sticky top-0 z-50">
    <Link to={"/"}>
      <div className="p-4 ml-2 text-2xl">PeerMarket</div>
    </Link>
    {/* <SearchBar /> */}
    <ul className="flex self-center	float-right">
      {/* {isUserLoggedIn ? (
        <Link to={`/chat`}>
          <li className="px-4">Chat</li>
        </Link>
      ) : (
        <></>
      )}

      {isUserLoggedIn ? (
        <Link to={`/sell`}>
          <li className="px-4">+Sell</li>
        </Link>
      ) : (
        <></>
      )} */}
       {isUserLoggedIn ? (
          <span className="px-4 mr-2 cursor-pointer">
          <Profile />
        </span>
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
