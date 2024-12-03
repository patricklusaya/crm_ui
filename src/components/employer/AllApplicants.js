import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, fetchJobsApplicants } from '../../actions/ApplicationActions';
import _ from "lodash";
import { formatDate } from '../joblistings/JobListingCard';
import Spinner from '../../utils/Spinner';
import { Warning } from 'phosphor-react';
import { findApplicantInfo } from '../../actions/AppActions';

export default function AllApplicants() {
  const [state, setState] = useState({
    jobApplications: [],
    loadingApplicants:false,
    userInfo:{},
    loadingUserInfo:false
  });

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [contactCandidate, setContactCandidate] = useState(null); // New state for contact candidate info

  const dispatch = useDispatch();
  const applicationsState = useSelector((state) => state.applications);
  const appState = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchJobsApplicants());
  }, [dispatch]);

  // Update the local state when the Redux store updates
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      jobApplications: applicationsState.jobApplications,
      loadingApplicants:applicationsState.loadingApplicants,
      userInfo:appState.userInfo,
      loadingUserInfo:appState.loadingUserInfo
    }));
  }, [applicationsState, appState]);







  // Function to handle accept/reject actions
  const handleApplicationAction = (id, status) => {
    // Add your logic to accept or reject the applicant here
    console.log(`Applicant ${id} has been ${status}`);
    dispatch(changeStatus(id, status))

  };

  const handleGetContacts = (id) => {
    // Add your logic to accept or reject the applicant here
    console.log(`Applicant ${id} `);
    dispatch(findApplicantInfo(id))

  };

  const renderButton = (id)=>{
    return ( 
      <button
      onClick={ () => handleGetContacts(id)}
      className="px-3 py-1 bg-[#5C3CDA] text-white rounded hover:bg-blue-600"
    >
   
      { state.loadingUserInfo ?  ( <Spinner/> ): ( <span> Get Contact </span> )   }
     
    </button>
    )
  }

  // Render application list with job details



 
  const renderApplications = () => {

    if (!_.isEmpty(state.jobApplications)) {
      return (
        <div className="space-y-6">
          {state.jobApplications
            .filter((job) => job.applications && job.applications.length > 0)
            .map((job) => (
              <div key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <p className="text-sm text-gray-500">Posted on: {formatDate(job.created_at)}</p>
                <div className="mt-4">
                  <h4 className="text-md font-semibold">Applicants:</h4>
                  {job.applications.map((applicant) => (
                    <div
                      key={applicant.user_id}
                      className="flex justify-between items-center bg-white shadow-sm rounded-lg p-3 mt-2"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">{applicant.name}</span>
                        <span className="text-xs text-gray-400">Applied At: {formatDate(applicant.created_at)}</span>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedApplicant(applicant)}
                          className="text-blue-500 hover:underline"
                        >
                          View Cover Letter
                        </button>
                        {applicant.resume ? (
                          <a
                            href={`/storage/resumes/${applicant.resume.split('/').pop()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View Resume
                          </a>
                        ) : (
                          <span className="text-gray-400">No Resume Available</span>
                        )}
                      </div>
                      <div className="flex space-x-3 items-center">
                        {applicant.status === 'Accepted' ? (
                          <>
                            <span className="bg-green-200 text-green-500 font-semibold px-2 py-1 rounded">
                              Already Reviewed
                            </span>
                            {!_.isEmpty(state.userInfo) ? (
                              <div className="flex flex-col text-sm text-gray-700 space-y-1">
                                <span><strong>Name:</strong> {state.userInfo.name}</span>
                                <span><strong>Email:</strong> {state.userInfo.email}</span>
                                <span><strong>Location:</strong> {state.userInfo.location}</span>
                              </div>
                            ) : (
                              renderButton(applicant.user_id)
                            )}
                          </>
                        ) : applicant.status === 'Rejected' ? (
                          <button
                            onClick={() => handleApplicationAction(applicant.id, 'Accepted')}
                            className="px-3 py-1 bg-green-300 text-black rounded hover:bg-green-600"
                          >
                            Reconsider
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleApplicationAction(applicant.id, 'Accepted')}
                              className="px-3 py-1 bg-green-300 text-black rounded hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleApplicationAction(applicant.id, 'Rejected')}
                              className="px-3 py-1 bg-red-200 text-black rounded hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      );
    }
    

    

    return (
      <div className="flex items-center justify-center">
         <p className="flex items-center justify-center bg-red-200 text-black-500 font-semibold px-2 py-1 rounded"> <span className='mr-2'>No Applicants to your jobs </span> <Warning/> </p>
        
      </div>
     
    )
  };


  if (state.loadingApplicants) {
    return (
      <div className="flex items-center justify-center">
        <Spinner  size="20" />
  </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Applicants</h2>
      {renderApplications()}

      {/* Show Cover Letter Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
  
        {/* Inner modal container with fixed width */}
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-xl mx-4">
          <h2 className="text-lg font-semibold mb-2">Cover Letter</h2>
          <p>{selectedApplicant.cover_letter}</p>
          <button
            onClick={() => setSelectedApplicant(null)}
            className="mt-4 text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
        
      </div>
      
      )}

      {/* Show Contact Candidate Modal */}
      {contactCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black ">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Contact {contactCandidate.name}</h2>
            <p>Email: {contactCandidate.email}</p> {/* Assuming email is part of applicant object */}
            <p>Phone: {contactCandidate.phone}</p> {/* Assuming phone is part of applicant object */}
            <button
              onClick={() => setContactCandidate(null)}
              className="mt-4 text-red-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
