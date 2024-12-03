import React from 'react';
import { Chart } from 'react-google-charts';

const TotalApplicantsOverTimeChart = ({ jobData }) => {
    // Prepare data for the Area Chart
    const applicantTrendsData = jobData.reduce((acc, job) => {
        const date = new Date(job.posted_on).toLocaleDateString();
        const applicantCount = job.applicants?.length || 0; // Default to 0 if no applicants
        
        const existingDate = acc.find(entry => entry[0] === date);
        
        if (existingDate) {
            existingDate[1] += applicantCount; // Add applicant count if date already exists
        } else {
            acc.push([date, applicantCount]); // Initialize with applicant count
        }

        return acc;
    }, []);

    // Sort data by date
    applicantTrendsData.sort((a, b) => new Date(a[0]) - new Date(b[0]));

    // Add header row for the chart
    const data = [
        ['Date', 'Total Applicants'],
        ...applicantTrendsData,
    ];

    const options = {
        title: 'Total Applicants Over Time',
        hAxis: { title: 'Date' },
        vAxis: { title: 'Total Applicants' },
        legend: { position: 'bottom' },
        areaOpacity: 0.3, // For translucent fill
        colors: ['#3b8dd4'],
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Chart
                chartType="AreaChart"
                data={data}
                options={options}
                width="100%"
                height="400px"
            />
        </div>
    );
};

export default TotalApplicantsOverTimeChart;
