import logo from './logo.svg';
import './App.css';
import Main from './Main';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import _ from "lodash"
import LandingPage from './components/landingPage/LandingPage';
import { fetchJobs } from './actions/JobActions';
import Login from './components/auth/Login';
import { fetchCustomers, loadProfile } from './actions/AppActions';
import Jobdetails from './components/JobDetails/Jobdetails';
import EmployerLogin from './components/auth/EmployerLogin';
import EmployerMain from './EmployerMain';
import Spinner from './utils/Spinner';
import Signup from './components/auth/Signup';
import EmployerSignup from './components/auth/EmployerSignup';
import AdminMain from './AdminMain';


function App() {

  const [state, setState] = useState({

    jobs:{}, 
    profile:{},
    loggingOut:false

  })

  const user = false;


  const dispatch = useDispatch();

  useEffect(() => {
    
  //  dispatch(fetchJobs())
   dispatch(loadProfile()); 
   dispatch(fetchCustomers()); 
  
  }, [dispatch])



  const appState = useSelector((state) => state.app);
  const jobState = useSelector((state) => state.jobs);

  useEffect(() => {
    try {
      setState((prevState) => ({
        ...prevState,
      jobs: jobState.jobs,
      profile:appState.profile,
      loggingOut:appState.loggingOut


      }));
    } catch (e) {
      console.log(e);
    }
  }, [jobState, appState]);





  const renderSeekerMain = () => {

      return <Main jobs ={jobState.jobs} profile = {appState.profile}  />;
    
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

  
  return (
    <Routes>
       <Route path="/employer" element={<EmployerMain />} />
      {
        !_.isEmpty(appState.profile) ? (
          hasValidRole ? (
            currentRole === 'staff' ? (
              // Navigate to seeker main route
              <Route path="*" element={renderSeekerMain()} />
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
