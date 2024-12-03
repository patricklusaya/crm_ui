import React from 'react';
import { SortAscending } from 'phosphor-react';

const Header = ({ jobCount, onSort }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Left side: Recommended Jobs Title and Job Count */}
      <div className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg">
        <h2 className="text-xl font-semibold">Recommended Jobs</h2>
        <div className="text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
          {jobCount}
        </div>
      </div>

      {/* Right side: Sort Icon */}
      <div 
        onClick={onSort} 
        className="flex items-center cursor-pointer hover:text-blue-500"
      >
        <p className="mr-2 text-gray-600">Sort by</p>
        <SortAscending size={24} className="text-gray-600" />
      </div>
    </div>
  );
};

export default Header;
