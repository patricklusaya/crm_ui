import React from 'react';
import { Chart } from 'react-google-charts';

// Line chart component
const JobPostingTrendsChart = ({ jobData }) => {
    // Transform jobData into a format suitable for the line chart
    const jobTrendsData = jobData.reduce((acc, job) => {
        const date = new Date(job.posted_on).toLocaleDateString(); // Format date as needed
        const existingDate = acc.find(entry => entry[0] === date);

        if (existingDate) {
            existingDate[1] += 1; // Increment count if date already exists
        } else {
            acc.push([date, 1]); // Initialize with count 1
        }

        return acc;
    }, []);

    // Add header row for chart
    const data = [
        ['Date', 'Number of Postings'],
        ...jobTrendsData
    ];

    const options = {
        title: 'Job Posting Trends Over Time',
        hAxis: { title: 'Date' },
        vAxis: { title: 'Number of Jobs Posted' },
        legend: { position: 'bottom' },
        curveType: 'function', // Adds a curve to line for smoother appearance
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Chart
                chartType="LineChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default JobPostingTrendsChart;
