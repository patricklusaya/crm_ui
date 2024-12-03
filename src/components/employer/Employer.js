import React, { useEffect, useState } from 'react';

import { SortAscending, Warning } from 'phosphor-react';
import _ from 'lodash';
import EmployerJobsCard from './EmployerJobsCard';
import { fetchJobs } from '../../actions/JobActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../utils/Spinner';

const jobDatay = [
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
  {
    id: 4,
    date: '2024-10-24',
    title: 'Software Engineer',
    companyLogo: 'https://via.placeholder.com/40',
    salaryRange: { min: 60000, max: 90000 },
  },
  {
    id: 5,
    date: '2024-10-23',
    title: 'Product Manager',
    companyLogo: 'https://via.placeholder.com/40',
    salaryRange: { min: 80000, max: 120000 },
  },
  {
    id: 6,
    date: '2024-10-22',
    title: 'Data Scientist',
    companyLogo: 'https://via.placeholder.com/40',
    salaryRange: { min: 70000, max: 110000 },
  },
  {
    id: 7,
    date: '2024-10-24',
    title: 'Software Engineer',
    companyLogo: 'https://via.placeholder.com/40',
    salaryRange: { min: 60000, max: 90000 },
  },
  {
    id: 8,
    date: '2024-10-23',
    title: 'Product Manager',
    companyLogo: 'https://via.placeholder.com/40',
    salaryRange: { min: 80000, max: 120000 },
  },
  {
    id: 9,
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
      <h2 className="text-xl font-semibold">My Jobs</h2>
      <div className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
        {jobCount}
      </div>
    </div>

    {/* Right side: Sort Icon */}
    
  </div>
);

const EmployerJobListings = ({jobs, profile }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    jobs: {},
    profile: {},
    loadingJobs: false,
    filteredJobs: [],
    loadingFilteredJobs:false,
    filterMessage:""

  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const appState = useSelector((state) => state.app);
  const jobState = useSelector((state) => state.jobs);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      jobs: jobState.jobs,
      loadingJobs: jobState.loadingJobs,
      filteredJobs: jobState.filteredJobs,
      loadingFilteredJobs:jobState.loadingFilteredJobs,
      filterMessage:jobState.filterMessage
    }));
  }, [jobState, appState]);



  // Use filteredJobs from state if available, otherwise default to jobState.jobs.data
  const jobData = jobState.filteredJobs.length ? state.filteredJobs : jobState.jobs.data || [];
  const userId = profile.user.id;
  const filteredJobs = jobData.filter((job) => job.employer_id === userId);

  const colorClasses = [
    "bg-green-100", // Light green
    "bg-blue-100",  // Light blue
    "bg-yellow-100", // Light yellow
    "bg-red-100",    // Light red
    "bg-purple-100", // Light purple
    "bg-pink-100",   // Light pink
    "bg-orange-100", // Light orange
    "bg-teal-100",   // Light teal
  ];

  
  const renderEmptyMessage = () => (
    <div className="flex items-center justify-center">
      <p className="flex items-center justify-center bg-red-200 text-black-500 font-semibold px-2 py-1 rounded">
        <span className="mr-2">You haven't posted Jobs</span>
      </p>
    </div>
  );

  const renderFilterMessage = () => (
    <div className="flex items-center justify-center">
      <p className="flex items-center justify-center bg-red-200 text-black-500 font-semibold px-2 py-1 rounded">
        <span className="mr-2">{state.filterMessage} </span>
      </p>
    </div>
  );
  
  const renderLoading = () => (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
  
  const renderJobCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredJobs.map((job, index) => (
        <EmployerJobsCard
          key={job.id}
          date={job.created_at}
          title={job.title}
          jobInfo={job}
          salaryRange={"2000"}
          companyName={job.company_name}
          onBookmark={() => console.log(`Bookmarked job: ${job.title}`)}
          colorClass={colorClasses[index % colorClasses.length]}
        />
      ))}
    </div>
  );
  
  const renderCard = () => {
    if (state.loadingJobs || state.loadingFilteredJobs) {
      return renderLoading();
    }
    if (_.isEmpty(filteredJobs)) {
      return renderEmptyMessage();
    }
    if (state.filterMessage) {
      return renderFilterMessage();
    }
    return renderJobCards();
  };
  

  return (
    <div className="container mx-auto px-4">
      {/* Header with job count and sort button */}
      <Header
        jobCount={filteredJobs.length}
        onSort={() => console.log("Sorting jobs by last updated")}
      />

      {/* Job Listings Grid */}
      {renderCard()}
    </div>
  );
};

export default EmployerJobListings;