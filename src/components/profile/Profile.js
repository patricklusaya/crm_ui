import { Smiley } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../joblistings/JobListingCard';





 // Make sure to import the Smiley component from the correct library
  
  const ProfilePage = ({ jobs, profile }) => {
    const dispatch = useDispatch();
    const [changePassword, setChangePassword] = useState(true);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const role = localStorage.getItem("currentRole");


    const [state, setState] = useState({
        profile: {},

      });
    

      const appState = useSelector((state) => state.app);
    
    
      // Use effect to update the local state when Redux store updates
      useEffect(() => {
        setState((prevState) => ({
          ...prevState,
 
          profile: appState.profile,
      
        }));
      }, [appState]);



      const user = appState.profile.user;

    
  
    // Function to toggle password change section
    const handlePasswordChangeToggle = () => {
      setChangePassword(!changePassword);
    };
  
    // Function to handle password update (dummy function for demonstration)
    const handlePasswordUpdate = (e) => {
      e.preventDefault();
      // Add your password update logic here
      console.log('Password updated:', { password, newPassword });
      setPassword('');
      setNewPassword('');
      setChangePassword(false);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-4xl">
          <div className="md:flex">
            {/* Profile Smiley Icon */}
            <div className="md:w-1/3 flex flex-col justify-center items-center bg-blue-50 p-6">
              <div className="rounded-full border-4 border-blue-500 shadow-lg p-3">
                <Smiley size={32} />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                {/* <p className="text-sm text-gray-500 mt-1">{user.location}</p> */}
                <p className="text-gray-600"> Joined {formatDate(user.created_at)}  </p>
                <a href={`mailto:${user.email}`} className="text-sm text-blue-600 mt-2 underline">
                  {user.email}
                </a>
              </div>
            </div>
  
            {/* Profile Information */}
            <div className="md:w-2/3 p-6 space-y-4">
              {/* Role-Specific Content */}
           
  
              {/* Change Password Section */}
              <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
                <button
                  onClick={handlePasswordChangeToggle}
                  className="text-sm text-blue-600 mt-2 underline"
                >
                  {changePassword ? 'Cancel' : 'Change Password'}
                </button>
  
                {changePassword && (
                  <form onSubmit={handlePasswordUpdate} className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600">Current Password:</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">New Password:</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition duration-200"
                    >
                      Update Password
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  