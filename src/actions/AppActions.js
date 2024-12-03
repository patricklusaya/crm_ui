import { message } from "antd";
import { LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGIN_FAILURE,
   LOAD_PROFILE_SUCCESS,
   LOGOUT,
   LOGOUT_SUCCESS,
   LOGOUT_FAILED,
   SIGNUP_REQUEST,
   SIGNUP_FAILURE,
   SIGNUP_SUCCESS, 
   FIND_INFO_REQUEST,
   FIND_INFO_SUCCESS,
   FIND_INFO_FAILED,
   FETCH_CUSTOMER_SUCCESS,
   FETCHING_CUSTOMERS,
   
  
  
  } from "./Types";


export const loginUser = (email, password, currentRole, navigate) => {
  return async (dispatch) => {
    // Dispatch request action for loading state
    dispatch({ type: LOGIN_REQUEST });

    try {
      const user = await login(email, password);

   
      
      // Check if the user's roles array contains an object with role_name equal to currentRole
      const hasValidRole = user.roles && user.roles.some(role => role.role_name === currentRole);

      if (hasValidRole) {
        // Dispatch success action with user information
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user, currentRole },
        });
        console.log('success')
        navigate('/')
      } else {
        // If the role is not valid, show an error and dispatch a failure action
        message.error("Invalid role");
        dispatch({
          type: LOGIN_FAILURE,
          payload: 'Invalid role',
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Dispatch failure action with error message
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};



async function login(email, password) {
  const response = await fetch("http://127.0.0.1:8000/api/signin", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  // Check if the response is ok (status in the range 200-299)
  if (!response.ok) {
    
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to login.'); // Use the error message from the response or a default message
  }
  const user = await response.json();

  return user; // Return the user information to the caller
}



export const loadProfile = () => {
    return (dispatch) => {
      // Load the profile from local storage
      const persistedProfile = localStorage.getItem('userProfile')
        ? JSON.parse(localStorage.getItem('userProfile'))
        : {};
  
      if (persistedProfile) {
        dispatch({ type: LOAD_PROFILE_SUCCESS, payload: persistedProfile });
      }
    };
  };
  

  
export const logoutUser = (navigate, token) => {
  return async (dispatch) => {

    console.log('TRIGGERED')
    dispatch({ type:LOGOUT });
    message.info("Logging you out ..")

 

    console.log('user tokenx', token)
   
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signout", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Use Bearer token for authorization
          'Content-Type': 'application/json',
      },
        
      });
    
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        dispatch({ type:LOGOUT_FAILED });
        throw new Error( 'Failed to logout.'); // Use the error message from the response or a default message
       
      } else{
        const info = await response.json();
      console.log('User info:', info.message);
      dispatch({ type:LOGOUT_SUCCESS });
      navigate("/")
      message.success("Logged out")
      }
      
    
    } catch (error) {
      console.error('Error logging in:', error);
      dispatch({ type:LOGOUT_FAILED });
      
    }
  };
};



export const signupUser = (email, password, name, phone_number,password_confirm,  currentRole) => {
  return async (dispatch) => {
    console.log('send loader 2')
    // Dispatch request action for loading state
    dispatch({ type: SIGNUP_REQUEST });

    try {
      const user = await signup(email, password, name, phone_number,password_confirm, currentRole);

      console.log('my user', user)

      
      dispatch({
        type: SIGNUP_SUCCESS,
       
      });
      
     
    } catch (error) {
      console.error('Error Signing up:', error);
      // Dispatch failure action with error message
      dispatch({
        type: SIGNUP_FAILURE,
        payload: error.message,
      });
    }
  };
};



async function signup(email, password, name, phone_number,password_confirm, currentRole) {

  let roles = []; 

  // Assign role based on currentRole
  if (currentRole === "admin") {
    const role = 1; 
    roles = [role];  
  } else if (currentRole === "staff") {
    const role = 3; 
    roles = [role];  
  }
 
  const password_confirmation = password_confirm

  console.log('reached here', email, password, name, phone_number, roles)

  const response = await fetch("http://127.0.0.1:8000/api/signup", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ email, password, name, phone_number , password_confirmation, roles}),
  });

  // Check if the response is ok (status in the range 200-299)
  if (!response.ok) {
    
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Failed to login.'); // Use the error message from the response or a default message
  }
  const user = await response.json();
  console.log('User info:', user);
  return user; // Return the user information to the caller
}


export const createCustomer = (customerData) => {
  return async (dispatch) => {
   message.info('creating a customer')

    try {
     
      
      const response = await fetch('http://127.0.0.1:8000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: customerData.name,
          email: customerData.email,
          phone_number: customerData.phone,
          address: customerData.address
        })
      });

   
      if (!response.ok) {
        // Parse error response
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create customer');
      }

     
      const data = await response.json();

      // Dispatch success action
      // dispatch({
      //   type: CREATE_CUSTOMER_SUCCESS,
      //   payload: data.customer
      // });
      

      // Show success message
      message.success('Customer added successfully!');

      // Return the created customer
      return data.customer;
    } catch (error) {
      // Dispatch failure action
      // dispatch({
      //   type: CREATE_CUSTOMER_FAILURE,
      //   payload: error.message
      // });
      message.error('Failed to create a customer')

      // Show error message
      message.error(error.message || 'Failed to create customer. Please try again.');

      // Rethrow the error for component to handle if needed
      throw error;
    }
  };
};



export const fetchCustomers = () => {
  return async (dispatch) => {

    dispatch({ type: FETCHING_CUSTOMERS});
     

    try {
    
      const response = await fetch('http://127.0.0.1:8000/api/customers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         
          // 'Authorization': `Bearer ${token}`
        },
      
      });

   
      if (!response.ok) {
        // Parse error response
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create customer');
      }

     
      const data = await response.json();
      console.log('data', data.customers)

      // Dispatch success action
      dispatch({
        type: FETCH_CUSTOMER_SUCCESS,
        payload: data.customers
      });
      

    } catch (error) {
      // Dispatch failure action
      // dispatch({
      //   type: CREATE_CUSTOMER_FAILURE,
      //   payload: error.message
      // });
      message.error('Failed to fetch customer')

      // Show error message
      message.error(error.message || 'Failed to  fetch customer. Please try again.');

      // Rethrow the error for component to handle if needed
      throw error;
    }
  };
};


export const findApplicantInfo = (userId) => {
  return async (dispatch) => {

    console.log('find', userId)

    dispatch({ type:FIND_INFO_REQUEST });

    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    // Extract the token from userProfile
    const token = userProfile ? userProfile.token : null;
   
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Use Bearer token for authorization
          'Content-Type': 'application/json',
      },
        
      });
    
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        dispatch({ type:FIND_INFO_FAILED });
        throw new Error( 'Failed to get info.'); // Use the error message from the response or a default message
       
      }
      const info = await response.json();
      console.log('response info:', info);
      dispatch({ type:FIND_INFO_SUCCESS , payload:info});
    
    } catch (error) {
      console.error('Error getting info:', error);
      dispatch({ type:FIND_INFO_FAILED });
      
    }
  };
};


export const updateCustomer = (customerId, updatedData) => async (dispatch) => {
  // dispatch({ type: UPDATE_CUSTOMER_REQUEST });

  message.info('Updating ..')

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/customers/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update customer');
    }

    const data = await response.json();

    // dispatch({
    //   type: UPDATE_CUSTOMER_SUCCESS,
    //   payload: data, // Assuming the API returns the updated customer data
    // });

    message.success('Data Updated')
  } catch (error) {

    // dispatch({
    //   type: UPDATE_CUSTOMER_FAILURE,
    //   error: error.message,
    // });

    message.error("Something went wrong")

  }
};



export const deleteCustomer = (id) => {

  return async (dispatch) => {

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const userToken = userProfile ? userProfile.token : null;



  message.info(" Deleting .. ")

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': `Bearer ${userToken}`,
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
    message.success("Customer Deleted")
   

    // Dispatch any additional actions if necessary
  } catch (error) {
    console.error('Error deleting customer:', error);
  }
}
};

