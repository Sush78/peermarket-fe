import { useState, useEffect, useContext } from "react";

const CreatePool = () => {
  const [poolName, setPoolName] = useState("");
  const [firstBetOption, setFirstBetOption] = useState("");
  const [secondBetOption, setSecondBetOption] = useState("");
  const [poolDescription, setPoolDescription] = useState("");
  const [poolApi, setPoolApi] = useState("");

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    console.log(e, poolName);
  };

  let removeDisabledClass =
    poolName.length > 0 &&
    firstBetOption.length > 0 &&
    secondBetOption.length > 0 &&
    poolDescription.length > 0 &&
    poolApi.length > 0
      ? ""
      : "cursor-not-allowed opacity-50";

  return (
    <div className="min-h-screen flex flex-col mt-2">
      <div className="h-auto p-2 w-1/2 mx-6 border border-slate-500 rounded-2xl self-center">
        <form onSubmit={onFormSubmit}>
          <div className="my-1">
            <input
              type="text"
              className="focus:bg-grey-200 p-2 border boder-black-500 w-full h-20 text-xl rounded-xl bg-slate-900 text-white placeholder-white "
              placeholder="Enter Pool Name"
              onChange={(e) => {
                setPoolName(e.target.value);
              }}
            />
          </div>
          <div className="flex">
            <div className="my-1 w-1/2">
              <input
                type="text"
                className="focus:bg-grey-200 p-2 border boder-black-500 w-full  h-20 text-xl rounded-xl bg-slate-900 text-white placeholder-white "
                placeholder="Enter First Bet Option"
                onChange={(e) => {
                  setFirstBetOption(e.target.value);
                }}
              />
            </div>
            <div className="my-1 w-1/2 ml-1">
              <input
                type="text"
                className="focus:bg-grey-200 p-2 border boder-black-500 w-full h-20 text-xl rounded-xl bg-slate-900 text-white placeholder-white "
                placeholder="Enter Second Bet Option"
                onChange={(e) => {
                  setSecondBetOption(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="my-1">
            <input
              type="text"
              className="focus:bg-grey-200 p-2 border boder-black-500 w-full h-20 text-xl rounded-xl bg-slate-900 text-white placeholder-white "
              placeholder="Enter Pool API"
              onChange={(e) => {
                setPoolApi(e.target.value);
              }}
            />
          </div>
          <div className="my-1">
            <textarea
              rows={5}
              className="focus:bg-grey-200 p-2 border boder-black-500 w-full text-xl rounded-xl bg-slate-900 text-white placeholder-white "
              placeholder="Enter Pool Description"
              onChange={(e) => {
                setPoolDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className={`rounded-2xl h-14 my-1 w-full shadow-lg text-white text-xl bg-blue-900 w-1/2 ${removeDisabledClass}`}
            >
              Create Pool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePool;
