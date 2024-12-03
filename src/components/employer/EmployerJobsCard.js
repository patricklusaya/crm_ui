import React from 'react';
import { ArrowFatLinesRight, BookmarkSimple } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
const companyLogo = "https://via.placeholder.com/40"

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


const EmployerJobsCard = ({ date, title, salaryRange, onBookmark, colorClass, jobInfo }) => {



  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-50">
      {/* Header Section with Vibrant Colors */}
      <div className={`${colorClass} p-5 rounded-md`}>
        <div className="flex items-center justify-between">
          {/* Date with white background and rounded border */}
          <p className="bg-white text-gray-600 px-2 py-1 rounded-full border">
            {formatDate(date)}
          </p>

          {/* Bookmark Icon with white background and rounded border */}
          <div className="flex items-center bg-white p-1 rounded-full border">
            <BookmarkSimple 
              size={24} 
              className="text-gray-600 cursor-pointer hover:text-blue-500" 
              onClick={onBookmark} 
            />
          </div>
        </div>
        
        {/* Title and Company Logo */}
        <div className="flex items-center justify-between mt-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <img src={companyLogo} alt="Company Logo" className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm font-medium">${salaryRange}</p>
        <button className="bg-violet-500 text-white py-2 px-3 rounded-full hover:bg-blue-600">
        <NavLink 
            to="/application-details" 
            state={{ 
              job:jobInfo 
            }} 
            className="text-sm font-medium"
          >
            <ArrowFatLinesRight size={32} />
        </NavLink>
        </button>
      </div>
    </div>
);
};

export default EmployerJobsCard;
