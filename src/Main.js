import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { BellSimple, Smiley } from 'phosphor-react';
import { useDispatch } from 'react-redux';

// action imports
import { logoutUser } from './actions/AppActions';

// component imports
import ProfilePage from './components/profile/Profile';
import StaffHome from './components/StaffHome';
import Analytics from './components/analytics/Analytics';

export default function Main({} ) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  // Extract the token from userProfile
  const token = userProfile ? userProfile.token : null;


  const handleLogout = async () => {
    try {
      dispatch(logoutUser(navigate, token)); 
      // navigate('/'); // Navigate to the home page after logout
    } catch (error) {
      console.error('Logout failed:', error);
      
    }
  };



  const routeAccessLevel = () => {
    return (
      <Routes>
         <Route exact path="/" element={<Analytics/>} />
         <Route exact path="/add-customer" element={<StaffHome/>} />
         <Route exact path="/analytics" element={<Analytics/>} />
         <Route exact path="/profile" element={<ProfilePage/>} />
      </Routes>
    );
  }

  return (
    
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="flex-grow bg-white flex flex-col">
        {/* Navbar */}
        <nav className="bg-gradient-to-tr from-blue-600 to-purple-700 text-white sticky top-0 z-50"> 
          <div className="container mx-auto px-4 py-4 flex items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">
                <NavLink to="/" className="hover:text-gray-400">
                  CRM
                </NavLink>
              </div>
              <div className="flex space-x-4">
                <NavLink to="/add-customer" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Add Customer</NavLink>

                <NavLink to="/profile" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</NavLink>
                  <button
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
              </div>
            </div>
            <div className="flex items-center space-x-4 ml-auto"> 
              <div className="relative">
                <BellSimple size={32} className="h-6 w-6 text-white hover:text-gray-400" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </div>
            </div>
          </div>
        </nav>

      
        <div className="flex flex-grow h-full">
          <div className="flex-grow h-full overflow-y-auto p-4">
            <div className="bodyContainer">
              {routeAccessLevel()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
