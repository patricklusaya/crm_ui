import React from 'react';
import { Chart } from 'react-google-charts';

const LineChart = () => {
  // Mock-up sales data
  const data = [
    ['Month', 'Sales'], // Headers
    ['January', 1000],
    ['February', 1170],
    ['March', 660],
    ['April', 1030],
    ['May', 950],
    ['June', 1120],
    ['July', 1240],
    ['August', 1370],
    ['September', 980],
    ['October', 1130],
    ['November', 1280],
    ['December', 1430],
  ];

  // Chart options
  const options = {
    title: 'Monthly Sales Data',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Months',
    },
    vAxis: {
      title: 'Sales in USD',
    },
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default LineChart;
