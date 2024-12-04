import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import _ from "lodash"

// action imports
import { fetchCustomers, loadProfile } from './actions/AppActions';

//utils imports
import Spinner from './utils/Spinner';

// component imports
import Main from './Main';
import EmployerLogin from './components/auth/EmployerLogin';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import EmployerSignup from './components/auth/EmployerSignup';
import AdminMain from './AdminMain';


// FILE IMPORTS
import logo from './logo.svg';

function App() {

  const [state, setState] = useState({

    jobs:{}, 
    profile:{},
    loggingOut:false

  })

  const user = false;


  const dispatch = useDispatch();

  useEffect(() => {
    
   dispatch(loadProfile()); 
   dispatch(fetchCustomers()); 
  
  }, [dispatch])



  const appState = useSelector((state) => state.app);


  useEffect(() => {
    try {
      setState((prevState) => ({
        ...prevState,

      profile:appState.profile,
      loggingOut:appState.loggingOut
      }));
    } catch (e) {
      console.log(e);
    }
  }, [ appState]);





  const renderStaffMain = () => {

      return <Main/>;
    
  };


    // Get the current role from local storage
    const currentRole = localStorage.getItem('currentRole');

  // Check if the user's roles array contains an object with role_name equal to currentRole
  const hasValidRole = appState.profile.roles && appState.profile.roles.some(role => role.role_name === currentRole);

    if (state.loggingOut) {
      return (
        <Spinner/>
      )

      
    }

    // <Route path="/employer" element={<EmployerMain />} />
  
  return (
    <Routes>

     <Route path="/admin" element={<AdminMain  />} />
     <Route path="/staff" element={<Main />} />  
      {
        !_.isEmpty(appState.profile) ? (
          hasValidRole ? (
            currentRole === 'staff' ? (
              // Navigate to seeker main route
              <Route path="*" element={renderStaffMain()} />
            ) : currentRole === 'admin' ? (
          
              <Route path="*" element={<AdminMain />} />
            ) : (
              // Redirect to login if the role doesn't match any expected roles
              <Route path="*" element={<Navigate to="/login" replace />} />
            )
          ) : (
            // Redirect to login if the role is not valid
            <Route path="*" element={<Navigate to="/login" replace />} />
          )
        ) : (
          <>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/employer-login" element={<EmployerLogin />} />
            <Route path="/employer-signup" element={<EmployerSignup />} />
          
          </>
        )
      }
    </Routes>
  );
}

export default App;
