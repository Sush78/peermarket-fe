import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaceBetForm = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [choice, setChoice] = useState("");

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    console.log(amount, choice);
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <div className="switch-field p-2">
        <div className="pr-2">Select an option: </div>
        <input
          type="radio"
          id="radio-one"
          name="switch-one"
          value="yes"
          onClick={() => setChoice("yes")}
        />
        <label htmlFor="radio-one">Yes</label>
        <input
          type="radio"
          id="radio-two"
          name="switch-one"
          value="no"
          onClick={() => setChoice("no")}
        />
        <label htmlFor="radio-two">No</label>
      </div>
      <form onSubmit={onFormSubmit}>
        <div>
          <input
            type="number"
            className="focus:bg-grey-200 p-2 m-2 border boder-black-500 w-1/2"
            placeholder="Enter amount"
            onChange={(e) => {
              setAmount(+e.target.value);
            }}
          />
        </div>
        <div>
          {/* <Link to={"/"}> */}
          <button type="submit" className="p-2 m-2 bg-slate-100 rounded-lg">
            Place Bet
          </button>
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
};

export default PlaceBetForm;
