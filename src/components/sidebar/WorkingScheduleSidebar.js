import React, { useState } from 'react';
import { Clock, Crown, FileText, ChartBar, Gear } from 'phosphor-react'; // Import icons from Phosphor React
import { NavLink } from 'react-router-dom';
import premium from "../../assets/premium.png";

const WorkingScheduleSidebar = () => {
  const currentRole = localStorage.getItem("currentRole");

  const [workingSchedules, setWorkingSchedules] = useState({
    fullTime: false,
    partTime: false,
    freelance: false,
    internship: false,
  });

  const handleScheduleChange = (e) => {
    const { name, checked } = e.target;
    setWorkingSchedules((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="w-1/6 bg-[#DBEAFE] p-4 h-full flex flex-col">
      {/* Ad Section */}
      <div className="flex flex-col px-4 justify-center items-center bg-[#DBEAFE] h-1/3">
        <div className="flex flex-col justify-center items-center bg-black text-white rounded-lg mb-4 p-4">
          <p className="text-lg text-center mb-2">Wanna see more filters?</p>
          <button className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
            Go Premium
            <Crown size={22} className="ml-2" color='gold' />
          </button>
        </div>
      </div>

      {/* Conditional Rendering for Employer Links or Working Schedules */}
 
      
      <div className="space-y-3 flex-grow">
        {currentRole === "employer" ? (
          // Display NavLinks for employer
          <>
            <NavLink
              to="/create-post"
              className="block bg-white hover:bg-gray-100 p-3 rounded-md shadow-sm transition duration-150 text-gray-800 font-medium flex items-center"
            >
              <FileText size={24} className="mr-2" />
              Post Job
            </NavLink>
          
            <NavLink
              to="/analytics"
              className="block bg-white hover:bg-gray-100 p-3 rounded-md shadow-sm transition duration-150 text-gray-800 font-medium flex items-center"
            >
              <ChartBar size={24} className="mr-2" />
              Analytics
            </NavLink>
          </>
        ) : (
          // Display schedule checkboxes for other roles
       <div></div>


        )}
      </div>
    </div>
  );
};

export default WorkingScheduleSidebar;
