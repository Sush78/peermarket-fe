import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const Chart: React.FC<{
  amounts0: any[];
  amounts1: any[];
  timestamps: any[];
  poolDetails: {
    data: {
      labels: string[];
    };
  };
}> = ({ amounts0, amounts1, poolDetails, timestamps }) => {
  const data = {
    // labels: [...new Set([...timestamps0, ...timestamps1])],
    datasets: [
      {
        label: poolDetails?.data?.labels[0],
        data: amounts0,
        borderColor: "green",
        lineTension: 0.1,
        spanGaps: true
      },
      {
        label: poolDetails?.data?.labels[1],
        data: amounts1,
        borderColor: "red",
        lineTension: 0.1,
        spanGaps: true
      },
    ],
  };

  return <Line className="h-2/6" data={data}
    options={{
      responsive: true,
      scales: {
        // @ts-ignore
        xAxis: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              // @ts-ignore
              let time = timestamps[index];
              return moment(time).format("HH:mm:ss");
            },
            color: "white",
          },
          labels: timestamps,
        },
        y: {
          ticks: {
            color: "white",
          },
        },
      },
      plugins: {
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
          },
          pan: {
            enabled: true,
            mode: "xy",
          },
        },
      },
    }} />;
};

export default Chart;