import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const Analytics = () => {
  // Mock Data for Customer Count by Month
  const customerData = [
    ['Month', 'Customer Count'],
    ['January', 50],
    ['February', 70],
    ['March', 65],
    ['April', 80],
    ['May', 55],
    ['June', 75],
  ];

  // Mock Data for Sales Data
  const salesData = [
    ['Month', 'Sales'],
    ['January', 1000],
    ['February', 1170],
    ['March', 660],
    ['April', 1030],
    ['May', 950],
    ['June', 1120],
  ];

  // Options for PieChart
  const pieOptions = {
    title: 'Customer Count by Month',
    is3D: true,
    chartArea: { width: '90%', height: '70%' },
  };

  // Options for LineChart
  const lineOptions = {
    title: 'Monthly Sales Data',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { title: 'Months' },
    vAxis: { title: 'Sales in USD' },
  };

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Simulate a simple check for errors or any other logic
    // If any chart causes an issue, we can set `isError` to true
    try {
      // Your logic to check for errors goes here
    } catch (error) {
      setIsError(true);
    }
  }, []);

  // Error boundary for charts
  if (isError) {
    return (
      <div className="text-center text-red-500">
        <h2>An error occurred while loading the charts.</h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Sales Dashboard</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PieChart for Customer Count */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Chart
            chartType="PieChart"
            data={customerData}
            options={pieOptions}
            width="100%"
            height="300px"
          />
        </div>

        {/* LineChart for Sales Data */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Chart
            chartType="LineChart"
            data={salesData}
            options={lineOptions}
            width="100%"
            height="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
