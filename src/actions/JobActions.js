

// actionTypes.js

import { message } from "antd";
import { 
   FETCH_JOBS_FAILURE ,
   FETCH_JOBS_SUCCESS, 
   FETCH_JOBS_REQUEST,
   FILTER_REQUEST,
   FILTER_ERROR,
   FILTER_SUCCESS,
   EMPTY_FILTERED_JOBS
  
  
  
  } from "./Types";




// actions.js
export const fetchJobs = () => {
  return async (dispatch) => {

    dispatch({ type: FETCH_JOBS_REQUEST });

    try {
      const jobs = await getJobs();
      // Dispatch success action with fetched jobs
      dispatch({
        type: FETCH_JOBS_SUCCESS,
        payload: jobs,
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Dispatch failure action with error message
      dispatch({
        type: FETCH_JOBS_FAILURE,
        payload: error.message,
      });
    }
  };
};



export const emptyFilteredJobs = () => {
  return async (dispatch) => {

    dispatch({ type: EMPTY_FILTERED_JOBS });

  }
};

async function getJobs() {
  const response = await fetch("http://127.0.0.1:8000/api/jobs");

  // Check if the response is ok (status in the range 200-299)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const jobs = await response.json();

  return jobs; // Return the jobs to the caller
}


// src/actions/jobActions.js
// import {
//   FETCH_JOB_REQUEST,
//   FETCH_JOB_SUCCESS,
//   FETCH_JOB_FAILURE
// } from './jobActionTypes';

// Action creator to fetch job by ID
export const fetchJobById = (jobId) => {
  return async (dispatch) => {
    try {
      const userProfile = JSON.parse(localStorage.getItem('userProfile'));

      // Extract the token from userProfile
      const token = userProfile ? userProfile.token : null;

      const response = await fetch(`http://127.0.0.1:8000/api/jobs/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch job details');
      }

      const data = await response.json();

      // Optionally dispatch a success action if needed
      // dispatch({ type: FETCH_JOB_SUCCESS, payload: data });

      return data; // Return the job data
    } catch (error) {
      console.error('Error occurred while fetching job:', error);

      // Optionally dispatch a failure action if needed
      // dispatch({ type: FETCH_JOB_FAILURE, payload: error.message });

      throw error; // Rethrow error to handle it in the calling function
    }
  };
};



// JobActions.js
export const createJob = (jobData) => {
  

  return async (dispatch) => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const userToken = userProfile ? userProfile.token : null;



  message.info("Posting .. ")

  try {
    const response = await fetch('http://127.0.0.1:8000/api/jobs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error:', errorResponse.message);
      message.error("Something went wrong")
      throw new Error(errorResponse.message || 'Failed to create job post.');
    }

    const newJob = await response.json();
    message.success("Job Posted")
 

    // Dispatch any additional actions if necessary
  } catch (error) {
    console.error('Error creating job:', error);
  }
}
};


export const updateJob = (jobData, id) => {
  

  return async (dispatch) => {

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const userToken = userProfile ? userProfile.token : null;



  message.info(" Updating .. ")

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error:', errorResponse.message);
      message.error("Something went wrong")
      throw new Error(errorResponse.message || 'Failed to create job post.');
    }

    const newJob = await response.json();
    message.success("Job updated")
   

    // Dispatch any additional actions if necessary
  } catch (error) {
    console.error('Error creating job:', error);
  }
}
};


export const deleteJob = (id) => {

  return async (dispatch) => {

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const userToken = userProfile ? userProfile.token : null;



  message.info(" Deleting .. ")

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error:', errorResponse.message);
      message.error("Something went wrong")
      throw new Error(errorResponse.message || 'Failed to create job post.');
    }

    const newJob = await response.json();
    message.success("Job Deleted")
   

    // Dispatch any additional actions if necessary
  } catch (error) {
    console.error('Error creating job:', error);
  }
}
};


export const filterJobs = (filterParams) => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const userToken = userProfile ? userProfile.token : null;

  return async (dispatch) => {
    dispatch({ type: FILTER_REQUEST });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/jobs/filter", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`, // Ensure userToken is defined and valid
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterParams), // Pass filterParams as the request body
      });

      // Parse the response
      const filteredJobs = await response.json();

      // Handle non-ok responses
      if (!response.ok) {
        const error = filteredJobs.message || "Error filtering jobs";
        dispatch({ type: FILTER_ERROR });
        throw new Error(error);
      }

      // Check if the API returned a message indicating no jobs were found
      if (filteredJobs.success === false && filteredJobs.message) {
        dispatch({ type: FILTER_SUCCESS, payload: { data: [], message: filteredJobs.message } });
      } else {
        // Otherwise, dispatch the successful data
        dispatch({ type: FILTER_SUCCESS, payload: {data:filteredJobs, message:""} });
       
      }

    } catch (error) {
      console.error("Error in filtering jobs:", error);
      dispatch({ type: FILTER_ERROR, payload: error.message });
    }
  };
};



export const updateCustomer = (jobData, id) => {
  

  return async (dispatch) => {

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const userToken = userProfile ? userProfile.token : null;



  message.info(" Updating .. ")

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/customers/${id}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error:', errorResponse.message);
      message.error("Something went wrong")
      throw new Error(errorResponse.message || 'Failed to create job post.');
    }

    const newJob = await response.json();
    message.success("Job updated")
   

    // Dispatch any additional actions if necessary
  } catch (error) {
    console.error('Error creating job:', error);
  }
}
};
