import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsApplicants } from '../../actions/ApplicationActions';
import _ from "lodash"
import ApplicantStatusChart from './charts/ApplicantStatusChart';
import Spinner from '../../utils/Spinner';
import JobApplicantsChart from './charts/JobApplicantsChart';
import JobPostingTrendsChart from './charts/JobPostingTrendsChart';
import TotalApplicantsOverTimeChart from './charts/TotalApplicantsOverTimeChart';
import ApplicationStatusDonutChart from './charts/ApplicationStatusDonutChart';

export default function Analytics() {

    const [state, setState] = useState({
        jobApplications: [],
        loadingApplicants:false
      });
    
      const dispatch = useDispatch();
      const applicationsState = useSelector((state) => state.applications);
    
      useEffect(() => {
        dispatch(fetchJobsApplicants());
      }, [dispatch]);
    
      // Update the local state when the Redux store updates
      useEffect(() => {
        setState((prevState) => ({
          ...prevState,
          jobApplications: applicationsState.jobApplications,
          loadingApplicants:applicationsState.loadingApplicants
        }));
      }, [applicationsState]);
    
      console.log('my jobApplications', state.jobApplications);


      
      const getEmployerData = () => {
        let jobsData = [];
        let totalApplicants = 0;
        let totalAccepts = 0;
        let totalPendings = 0;
        let totalRejects = 0;
    
        // Check if jobApplications has data
        if (!_.isEmpty(state.jobApplications)) { 
            state.jobApplications.forEach((job) => {
                // Count applications by status for this job
                const applicants = job.applications.length;
                const accepts = job.applications.filter((app) => app.status === "Accepted").length;
                const pendings = job.applications.filter((app) => app.status === "Pending").length;
                const rejects = job.applications.filter((app) => app.status === "Rejected").length;
    
                // Accumulate the totals
                totalApplicants += applicants;
                totalAccepts += accepts;
                totalPendings += pendings;
                totalRejects += rejects;
    
                // Store data for each job
                jobsData.push({
                    jobId: job.id,
                    jobTitle: job.title,
                    applicants: applicants,
                    accepts: accepts,
                    pendings: pendings,
                    rejects: rejects,
                    posted_on:job.created_at

                });
            });
        }
    
        return {
            jobsData,
            totals: {
                applicants: totalApplicants,
                accepts: totalAccepts,
                pendings: totalPendings,
                rejects: totalRejects
            }
        };
    };
    
    const employerData = getEmployerData();
    
    console.log('Employer Data:', employerData);
    
 
if (state.loadingApplicants) {

    return (
        <div className=" flex justify-center align-center">
        <Spinner/>
        </div>
    )
    
}
else if (_.isEmpty(state.jobApplications)) {

    return (
        <div className=" flex justify-center align-center">
        <p>No Analytics to View</p>
        </div>
    )
    
}

  return (

    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Dashboard Overview</h2>


      {/* Bottom Row with Two Wider Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Posting Trends</h3>
          <JobPostingTrendsChart jobData={employerData.jobsData} />
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Applicants Over Time</h3>
          <TotalApplicantsOverTimeChart jobData={employerData.jobsData} />
        </div>
      </div>

      
      {/* Top Row with Three Charts */}
      <div className="flex flex-wrap gap-6 mb-6 mt-5">
        <div className="flex-1 min-w-[250px] p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Applicant Status</h3>
          <ApplicantStatusChart totals={employerData.totals} />
        </div>

        <div className="flex-1 min-w-[250px] p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Status Distribution</h3>
          <ApplicationStatusDonutChart totals={employerData.totals} />
        </div>

        <div className="flex-1 min-w-[250px] p-4 bg-white rounded-lg shadow-md ">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Applicants per Latest Jobs</h3>
          <JobApplicantsChart jobData={employerData.jobsData} />
        </div>
      </div>
    </div>
    
  )
}
