import Countdown from "react-countdown";

const Timer = ({ onPoolStatusChange }: any) => {
  // Set the target date and time (in milliseconds)
  const targetDate = new Date("May 31, 2023 01:58:00").getTime();

  // Define the renderer function to display the countdown
  const renderer = ({ days, hours, minutes, seconds }: any) => {
    return (
      <div className="grid grid-cols-5 gap-4 text-xl text-gray-800 ">
        <div className="col-span-1 text-center text-white text-xl flex items-center">
          <p>Expires in</p>
        </div>
        <div className="p-1 bg-white rounded-md shadow-md">
          <p className="font-medium text-center">{days}</p>
          <p className="text-sm text-center text-gray-500">Days</p>
        </div>
        <div className="p-1 bg-white rounded-md shadow-md">
          <p className="font-medium text-center">{hours}</p>
          <p className="text-sm text-center text-gray-500">Hours</p>
        </div>
        <div className="p-1 bg-white rounded-md shadow-md">
          <p className="font-medium text-center">{minutes}</p>
          <p className="text-sm text-center text-gray-500">Minutes</p>
        </div>
        <div className="p-1 bg-white rounded-md shadow-md">
          <p className="font-medium text-center">{seconds}</p>
          <p className="text-sm text-center text-gray-500">Seconds</p>
        </div>
        <>
          {days === 0 && hours === 0 && minutes === 0 && seconds === 0
            ? onPoolStatusChange(true)
            : ""}
        </>
      </div>
    );
  };

  return (
    <div className="p-2 rounded-2xl">
      <Countdown date={targetDate} renderer={renderer} />
    </div>
  );
};

export default Timer;
