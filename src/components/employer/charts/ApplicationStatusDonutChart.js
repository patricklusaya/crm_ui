import React from 'react';
import { Chart } from 'react-google-charts';

const ApplicationStatusDonutChart = ({ totals }) => {
    // Prepare the data for the Donut Chart
    const data = [
        ['Status', 'Count'],
        ['Accepted', totals.accepts],
        ['Pending', totals.pendings],
        ['Rejected', totals.rejects],
        ['Other', totals.applicants - (totals.accepts + totals.pendings + totals.rejects)],
    ];

    const options = {
        title: 'Application Status Distribution',
        pieHole: 0.4, // Creates the donut hole
        colors: ['#4caf50', '#ffeb3b', '#f44336', '#9e9e9e'],
        legend: { position: 'bottom' },
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width="100%"
                height="400px"
            />
        </div>
    );
};

export default ApplicationStatusDonutChart;
