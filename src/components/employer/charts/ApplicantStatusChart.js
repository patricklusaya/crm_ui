import React from 'react';
import { Chart } from 'react-google-charts';

const ApplicantStatusChart = ({ totals }) => {
    // Prepare the data for the chart
    const data = [
        ["Status", "Count"],
    
        ["Accepts", totals.accepts],
        ["Pendings", totals.pendings],
        ["Rejects", totals.rejects]
    ];

    // Define the options for the chart
    const options = {
        title: "Application Status Breakdown",
        pieHole: 0.4, // To make it a donut chart; remove for a regular pie chart
        is3D: false,
        colors: ["#109618", "#FF9900", "#DC3912"],
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default ApplicantStatusChart;
