import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/user";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Header = () => {
  const isUserLoggedIn = useSelector((store: any) => store.user.isUserLoggedIn);
  const dispatch = useDispatch();

  const [user, setuser] = useState(null)

  const handleGoogleCallback = (response:any) => {
    setuser(jwt_decode(response.credential))
  }

  useEffect(() => {
    console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "medium"}
    )
  },[])

  const onLoginClick = () => {
    dispatch(loginUser());
  };
  return (
    <div className="h-16 bg-black text-white flex justify-between sticky top-0 z-50 shadow-xl">
      <Link to={"/"}>
        <div className="p-4 ml-2 text-2xl">PeerMarket</div>
      </Link>
      <SearchBar />
      <ul className="flex self-center	float-right">
        <Link to={`/chat`}>
          <li className="px-4">Chat</li>
        </Link>

        {user !== null ? (
          <Link to={`/sell`}>
            <li className="px-4">+Sell</li>
          </Link>
        ) : (
          <></>
        )}

        {/* <li className="px-4 mr-2 cursor-pointer" onClick={onLoginClick}>
          Login with G
        </li> */}
        <div id="signInDiv"></div>
      </ul>
    </div>
  );
};

export default Header;
