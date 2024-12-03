import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BellSimple, MapPin, Briefcase, Buildings, AlignCenterHorizontal, XCircle, Faders, Calendar } from 'phosphor-react';
import { emptyFilteredJobs, fetchJobs, filterJobs } from '../../actions/JobActions';
import { message } from 'antd';
import { BuildOutlined } from '@ant-design/icons';


export default function Filters() {
  // Redux dispatch
  const dispatch = useDispatch();

  // State for selected filters
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  // Example job categories and job types
  const jobCategories = ['Engineering', 'Sales', 'Marketing', 'Finance', 'Tech'];
  const jobTypes = ['Internship', 'Full-time', 'Part-time', 'Contract'];

  // Handle filter change
  
  const handleFilterChange = () => {
    const filters = {
      date: selectedDate,
      category: selectedCategory,
      job_type: selectedJobType,
    };
  
    if (selectedDate || selectedCategory || selectedJobType) {
      // Dispatch the action to filter jobs only when filters are not empty
      dispatch(filterJobs(filters));
    } else {
      // Show a message only if no filters are selected
      message.info('Choose filters');
    }
  };
  

  const handleClearFilter = () => {
    setSelectedDate("")
    setSelectedCategory("")
    setSelectedJobType("")

    if(selectedDate || selectedCategory || selectedJobType){
      dispatch(emptyFilteredJobs());
      dispatch(fetchJobs());
    }

    else {
      // Show a message only if no filters are selected
      message.info('Nothing to clear')
    }

   
   
   
    
  };

  return (
    <div className="bg-gray-100 border-t border-gray-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-6">
          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            
            <input
              type="date"
              className="border border-gray-300 rounded-lg  px-4 py-3"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          {/* Job Category Filter */}
          <div className="flex items-center space-x-2">
           
            <select
              className="border border-gray-300 rounded-lg  px-4 py-3"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" className=" px-4">Job Category</option>
              {jobCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Job Type Filter */}
          <div className="flex items-center space-x-2">
            
            <select
              className="border border-gray-300 rounded-lg px-4 py-3"
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
            >
              <option value="">Job Type</option>
              {jobTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mb-10 flex space-x-6">
          <button
            onClick={handleFilterChange}
            className="flex items-center justify-center bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <Faders size={20} className="text-white mr-2" />
            <span className="font-semibold">APPLY</span>
          </button>

          <button
            onClick={handleClearFilter}
            className="flex items-center justify-center bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <XCircle size={20} className="text-white mr-2" />
            <span className="font-semibold">CLEAR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
