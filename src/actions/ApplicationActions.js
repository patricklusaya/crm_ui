// Action Types
import { message } from "antd";
import {FETCH_APPLICATIONS_SUCCESS ,
     FETCH_APPLICATIONS_FAILURE,
     FETCH_APPLICATIONS_REQUEST,
     FETCH_APPLICANTS_REQUEST,
     FETCH_APPLICANTS_SUCCESS,
     FETCH_APPLICANTS_FAILURE,

     FETCH_SEEKER_APPLICATIONS_REQUEST,
     FETCH_SEEKER_APPLICATIONS_SUCCESS,
     FETCH_SEEKER_APPLICATIONS_FAILURE
    
    
    } from "./Types"

    

// Action to fetch user applications
export const fetchUserApplications = () => {
    return async (dispatch) => {

   
        dispatch({ type: FETCH_APPLICATIONS_REQUEST });

       

        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        // Extract the token from userProfile
        const userToken = userProfile ? userProfile.token : null;

        

        try {
            const applications = await fetchApplications(userToken); 

        
            dispatch({
                type: FETCH_APPLICATIONS_SUCCESS,
                payload: applications,
            });
        } catch (error) {
            console.error('Error fetching applications:', error);

            
            dispatch({
                type: FETCH_APPLICATIONS_FAILURE,
                payload: error.message,
            });
        }
    };
};

// Fetch applications from the API
async function fetchApplications(token) {
    
    const response = await fetch("http://127.0.0.1:8000/api/applications", {
        method: 'GET', 
        headers: {
            'Authorization': `Bearer ${token}`, // Use Bearer token for authorization
            'Content-Type': 'application/json',
        },
    });

    // Check if the response is ok 
    if (!response.ok) {
        console.log('Error fetching applications');
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch applications.'); // Use the error message from the response or a default message
    }

    const fetchedData = await response.json();
    console.log('Fetched applications:', fetchedData); // Log the fetched data for debugging

    // Return the applications data from the response structure
    return fetchedData.applications; // Access the 'applications' field in the returned JSON
}



// Action Creator for applying to a job
export const applyJob = (profile, resume, coverLetter, job_id) => {
    return async (dispatch) => {
        message.info('Sending Application')
        // dispatch({ type: FETCH_APPLICATIONS_REQUEST });

        const userToken = profile.token;
        const user_id = profile.user.id;


      

        try {
            const info = await sendApplications(userToken, resume, coverLetter,user_id, job_id );
            
        
            message.success("Application sent")

            // Check if the response status is 200
            // if (info.status === 200) {
            //     dispatch({
            //         type: FETCH_APPLICATIONS_SUCCESS,
            //         payload: info.data, // Assuming 'info' contains a 'data' field with the application info
            //     });
            // } else {
            //     // Handle unexpected status codes
            //     dispatch({
            //         type: FETCH_APPLICATIONS_FAILURE,
            //         payload: 'Unexpected response status: ' + info.status,
            //     });
            // }
        } catch (error) {
            console.error('Error applying for job:', error);
           
            dispatch({
                type: FETCH_APPLICATIONS_FAILURE,
                payload: error.message || 'Failed to apply for job.',
            });
        }
    };
};

// Fetch applications from the API
async function sendApplications(userToken, resume, coverLetter, user_id, job_id) {
 

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('resume', resume); // 'resume' is the name expected by your Laravel validation
    formData.append('cover_letter', coverLetter);
    formData.append('user_id', user_id);
    formData.append('job_id', job_id);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/apply", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                // No 'Content-Type' header here because `fetch` will automatically set the correct boundary for FormData
            },
            body: formData, // Send FormData instead of JSON
        });

        // Check if the response is ok
        if (!response.ok) {
            
            const errorResponse = await response.json();
            
            message.error(  errorResponse.message)
            throw new Error(errorResponse.message || 'Failed to send application.');
        }

        const info = await response.json();
      

        // Return the response data
        return info;
    } catch (error) {
        console.error('Error in sendApplications:', error);
        throw error;
    }
}

export const fetchJobsApplicants = () => {
    return async (dispatch) => {

       

        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        // Extract the token from userProfile
        const userToken = userProfile ? userProfile.token : null;

        

       const userId =  userProfile.id;

        dispatch({ type: FETCH_APPLICANTS_REQUEST });

        try {
            const applicants = await getJobsApplicants(userToken, userId); 

        
            dispatch({
                type: FETCH_APPLICANTS_SUCCESS,
                payload: applicants,
            });

        

        } catch (error) {
            console.error('Error fetching applicants:', error);

            
            dispatch({
                type: FETCH_APPLICANTS_FAILURE,
                payload: error.message,
            });
        }
    };
};

async function getJobsApplicants(token,userId) {

  
    
    const response = await fetch(`http://127.0.0.1:8000/api/jobs/${userId}/applications`, {
        method: 'GET', 
        headers: {
            'Authorization': `Bearer ${token}`, // Use Bearer token for authorization
            'Content-Type': 'application/json',
        },
    });

    // Check if the response is ok 
    if (!response.ok) {
        console.log('Error fetching applicants');
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch applications.'); // Use the error message from the response or a default message
    }

    const fetchedData = await response.json();
    // console.log('Fetched applicants:', fetchedData); // Log the fetched data for debugging

    // Return the applications data from the response structure
    return fetchedData.data; // Access the 'applications' field in the returned JSON
}


 export  function changeStatus(id, status) {

    return async (dispatch) =>{

           
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    // Extract the token from userProfile
    const userToken = userProfile ? userProfile.token : null;

    try {
        
        const response = await fetch(`http://127.0.0.1:8000/api/applications/${id}/status`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
             
            },
          
              body: JSON.stringify({status }),
           
        });

        // Check if the response is ok
        if (!response.ok) {
            
            const errorResponse = await response.json();
            message.error("Something went wrong")
            
            message.error(  errorResponse.message)
            throw new Error(errorResponse.message || 'Failed to send status.');
           
        }

        const info = await response.json();
      
        message.success("Candidate Accepted")

        // Return the response data
        return info;
    } catch (error) {
        console.error('Error in sending status:', error);
        throw error;
    }

    }

 
}




    

// Action to fetch user applications
export const fetchSeekerApplications = () => {
    return async (dispatch) => {

       
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));

        // Extract the token from userProfile
        const userToken = userProfile ? userProfile.token : null;

        dispatch({ type: FETCH_SEEKER_APPLICATIONS_REQUEST });

        try {
            const applications = await getSeekerApplications(userToken); 

        
            dispatch({
                type: FETCH_SEEKER_APPLICATIONS_SUCCESS,
                payload: applications,
            });
        } catch (error) {
            console.error('Error fetching applications:', error);

            
            dispatch({
                type: FETCH_SEEKER_APPLICATIONS_FAILURE,
                payload: error.message,
            });
        }
    };
};

// Fetch applications from the API
async function getSeekerApplications(token) {
    
    const response = await fetch("http://127.0.0.1:8000/api/applications/all", {
        method: 'GET', 
        headers: {
            'Authorization': `Bearer ${token}`, // Use Bearer token for authorization
            'Content-Type': 'application/json',
        },
    });

    // Check if the response is ok 
    if (!response.ok) {
        console.log('Error fetching applications');
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch applications.'); // Use the error message from the response or a default message
    }

    const fetchedData = await response.json();
    console.log('Fetched applications:', fetchedData); // Log the fetched data for debugging

    // Return the applications data from the response structure
    return fetchedData.data; 
}