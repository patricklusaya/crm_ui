// JobApplicantsChart.js
import React from 'react';
import { Chart } from 'react-google-charts';

const JobApplicantsChart = ({ jobData }) => {
    // Sort jobData by `posted_on` in descending order and take the latest 10 jobs
    const latestJobs = jobData
        .sort((a, b) => new Date(b.posted_on) - new Date(a.posted_on))
        .slice(0, 10);

    // Prepare data for the bar chart (job title and applicants count)
    const barChartData = [
        ["Job Title", "Applicants"],
        ...latestJobs.map(job => [job.title, job.applicants]),
    ];

    // Bar chart options
    const barChartOptions = {
        title: "Applicants for Latest 10 Jobs",
        hAxis: { title: "Job Title", slantedText: true, slantedTextAngle: 45 },
        vAxis: { title: "Number of Applicants" },
        colors: ["#1b9e77"],
        legend: { position: "none" },
        annotations: {
            alwaysOutside: true,
            textStyle: {
                fontSize: 12,
                color: '#000', // Change to your desired color
                auraColor: 'none',
            },
        },
    };

    return (
        <div style={{ marginTop: '40px' }}>
            <Chart
                chartType="ColumnChart" // Vertical bars
                data={barChartData}
                options={barChartOptions}
                width={"100%"}
                height={"500px"}
            />
        </div>
    );
};

export default JobApplicantsChart;
