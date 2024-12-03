


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserApplications } from '../../actions/ApplicationActions';
import _ from "lodash";
import { formatDate } from '../joblistings/JobListingCard';
import { fetchJobById } from '../../actions/JobActions'; // Add a new action to fetch a job by ID
import Spinner from '../../utils/Spinner';




export default function UserApplications() {
  const [state, setState] = useState({
    profile: {},
    applications: [],
    jobCache: {} ,// Cache to store fetched jobs
    loading:false
  });

  const dispatch = useDispatch();
  const applicationsState = useSelector((state) => state.applications);
  const jobState = useSelector((state) => state.jobs);
  const appState = useSelector((state) => state.app);

  useEffect(() => {
     dispatch(fetchUserApplications())

  }, [dispatch])
  

  // Use effect to update the local state when Redux store updates
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      applications: applicationsState.applications,
      profile: appState.profile,
      loading:applicationsState.loading
    }));
  }, [applicationsState, appState]);

  // Track loading state for each job
  const [loadingJobs, setLoadingJobs] = useState({});


  // Fetch job data when applications change
  useEffect(() => {
    const fetchJobsForApplications = async () => {
      const newJobCache = { ...state.jobCache };

      for (const application of state.applications) {
        const jobId = application.job_id;

        // Fetch job if it's not already in the cache
        if (!newJobCache[jobId] && !loadingJobs[jobId]) {
          try {
            // Mark this job as loading
            setLoadingJobs((prev) => ({ ...prev, [jobId]: true }));

            // Fetch job data and store it in the cache
            const jobData = await dispatch(fetchJobById(jobId));
        
            newJobCache[jobId] = jobData;

            // Update the job cache state
            setState((prevState) => ({
              ...prevState,
              jobCache: newJobCache,
            }));
          } catch (error) {
            console.error(`Error fetching job data for jobId ${jobId}:`, error);
          } finally {
            // Remove loading state for this job
            setLoadingJobs((prev) => ({ ...prev, [jobId]: false }));
          }
        }
      }
    };

    if (state.applications.length > 0) {
      fetchJobsForApplications();
    }
  }, [state.applications, dispatch, state.jobCache, loadingJobs]);



  // Render application list with job details
  const renderApplications = () => {
    if (!_.isEmpty(state.applications)) {
      return (
        <div className="space-y-4">
          {state.applications.map((application) => {
            const jobId = application.job_id;
            const job = state.jobCache[jobId];

            // Show a loading state if job data is not yet available
            if (!job) {
              return (
                <div key={application.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
                 
                  <  Spinner color={'#6435D7'} size={150} />
                  
                </div>
              );
            }

            return (
              <div key={application.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Application Date: {formatDate(application.created_at)}</span>
                  <div className='flex justify-between items-center'>
                  <span className="text-lg font-semibold">{job.company_name}, </span>
                  <span className="text-sm text-gray-700"> {job.title}</span>
                  </div> 
                  <span className="text-sm text-gray-600">{job.location}</span>
                  
                  
                  
                </div>
                <div className='flex justify-between items-center'>
                <span className={`px-3 py-1 mr-3 rounded-full text-black font-semibold bg-orange-100 `}>
                  {job.job_type}
                </span>
                <span className={`px-3 py-1 rounded-full text-white font-semibold ${getStatusClass(application.status)}`}>
                  {application.status}
                </span>
                
                </div>
               
              </div>
            );
          })}
        </div>
      );
    }
  };


  console.log(applicationsState.loading)
  if (applicationsState.loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner  size="20" />
  </div>
    );
  }

  if (_.isEmpty(state.applications)) {
    return (
      <div className="flex items-center justify-center">
         <p className="flex items-center justify-center bg-red-200 text-black-500 font-semibold px-2 py-1 rounded">
      <span className="mr-2">You haven't made an application </span>
    </p>
    </div>
    );
  }

  return (
    <div className="p-4">
    

      <div className="flex items-center space-x-2 px-4 py-2 rounded-lg">
      <h2 className="text-xl font-semibold">My Applications</h2>
      <div className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
      {state.applications.length}
      </div>
    </div>
      {renderApplications()}
    </div>
  );
}

function getStatusClass(status) {
  switch (status) {
    case 'Accepted':
      return 'bg-green-300';
    case 'Pending':
      return 'bg-[#DBEAFE]';
    case 'Rejected':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}
