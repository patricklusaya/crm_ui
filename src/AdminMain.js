import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { BellSimple, Smiley } from 'phosphor-react';

import { useDispatch } from 'react-redux';
import { logoutUser } from './actions/AppActions';

import ProfilePage from './components/profile/Profile';
import Employer from './components/employer/Employer';
import AdminHome from './components/admin/AdminHome';
import Analytics from './components/analytics/Analytics';
import ManageCustomers from './components/admin/ManageCustomers';


export default function Main({jobs, profile} ) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  const token = userProfile ? userProfile.token : null;

  const handleLogout = async () => {
    console.log('clicked')
    try {
      await dispatch(logoutUser(token)); // Dispatch the logout action
      navigate('/'); // Navigate to the home page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally handle errors (e.g., show a notification)
    }
  };

  const userImage = "https://via.placeholder.com/40";

  const routeAccessLevel = () => {
    return (
      <Routes>
         <Route exact path="/" element={<Analytics />} />
         <Route exact path="/manage-customers" element={<ManageCustomers />} />
         <Route exact path="/profile" element={<ProfilePage />} />

         {/* <Route exact path="/analytics" element={<Analytics />} />
         */}
        
      
        {/* Add other routes here as needed */}
      </Routes>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="flex-grow bg-white flex flex-col">
        {/* Navbar */}
        <nav className="bg-gradient-to-tr from-blue-600 to-purple-700 text-white sticky top-0 z-50"> {/* Added sticky and z-50 classes */}
          <div className="container mx-auto px-4 py-4 flex items-center">
            <div className="flex items-center space-x-4"> {/* Wrap title and links in a flex container */}
              <div className="text-2xl font-bold">
                <NavLink to="/" className="hover:text-gray-400">
                  CRM
                </NavLink>
              </div>
              <div className="flex space-x-4"> {/* No margin needed here */}
               <NavLink to="/manage-customers" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Manage Customers</NavLink>
                <NavLink to="/profile" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</NavLink>
                  <button
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-auto"> {/* Push notification and profile to the right */}
              <div className="relative">
                <BellSimple size={32} className="h-6 w-6 text-white hover:text-gray-400" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {/* <img src={userImage} alt="User Profile" className="w-full h-full object-cover" /> */}
                
              </div>
            </div>
          </div>
        </nav>

        



        {/* Layout with Sidebar */}
        <div className="flex flex-grow h-full">
       
          <div className="flex-grow h-full overflow-y-auto p-4">
          <div className="bodyContainer">
            {routeAccessLevel()}
          </div>
            {/* Job Listings */}
            {/* <Listings jobs ={jobs} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
