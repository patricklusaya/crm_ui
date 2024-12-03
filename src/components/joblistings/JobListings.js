import React from 'react';
import JobListingCard from './JobListingCard';
import { SortAscending } from 'phosphor-react';

const jobData = [
  {
    id: 1,
    date: '2024-10-24',
    title: 'Software Engineer',
    companyLogo: 'https://via.placeholder.com/40',
    salaryRange: { min: 60000, max: 90000 },
  },
  {
    id: 2,
    date: '2024-10-23',
    title: 'Product Manager',
    companyLogo: 'https://via.placeholder.com/40',
    salaryRange: { min: 80000, max: 120000 },
  },
  {
    id: 3,
    date: '2024-10-22',
    title: 'Data Scientist',
    companyLogo: 'https://via.placeholder.com/40',
    salaryRange: { min: 70000, max: 110000 },
  },
];

// Header Component
const Header = ({ jobCount, onSort }) => (
  <div className="flex justify-between items-center mb-6">
    {/* Left side: Recommended Jobs Title and Job Count */}
    <div className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg">
      <h2 className="text-xl font-semibold">Recommended Jobs</h2>
      <div className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
        {jobCount}
      </div>
    </div>

    {/* Right side: Sort Icon */}
    <div 
      onClick={onSort} 
      className="flex items-center cursor-pointer hover:text-blue-500"
    >
      <p className="mr-2 text-gray-600">Sort by</p>
      <SortAscending size={24} className="text-gray-600" />
    </div>
  </div>
);

const JobListings = () => {
  // Array of vibrant color classes
  const colorClasses = ["bg-green-100", "bg-blue-100", "bg-yellow-100"];

  return (
    <div className="container mx-auto px-4">
      {/* Header with job count and sort button */}
      <Header 
        jobCount={jobData.length} 
        onSort={() => console.log('Sorting jobs by last updated')}
      />

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobData.map((job, index) => (
          <JobListingCard
            key={job.id}
            date={job.date}
            title={job.title}
            companyLogo={job.companyLogo}
            salaryRange={job.salaryRange}
            onBookmark={() => console.log(`Bookmarked job: ${job.title}`)}
            colorClass={colorClasses[index % colorClasses.length]}  // Alternate vibrant colors
          />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
