// ApplicationDetails.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PencilSimple, Trash } from 'phosphor-react';
import UpdateJobModal from './modal/UpdateDetailsModal';
import { useDispatch } from 'react-redux';
import { deleteJob } from '../../actions/JobActions';


export default function ApplicationDetails() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const data = location.state?.job;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUpdate = (updatedData) => {
    // Add your update logic here, e.g., an API call to update job details
 
  };

  const handleDelete = (id) => {
    // Add your update logic here, e.g., an API call to update job details
  
    dispatch(deleteJob(id))
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-500 to-purple-700 text-white py-6 px-8 relative">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-lg mt-2">{data.company_name}</p>
          {/* Update and Delete Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button onClick={openModal} className="text-white hover:text-gray-300">
              <PencilSimple size={24} />
            </button>
            <button className="text-white hover:text-gray-300" onClick={() => handleDelete(data.id)} >
              <Trash size={24} />
            </button>
          </div>
        </header>

        {/* Job Information Section */}
        <section className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-semibold">Category</h3>
              <p>{data.job_category}</p>
            </div>
            <div>
              <h3 className="font-semibold">Salary</h3>
              <p>{data.salary_range}</p>
            </div>
            <div>
              <h3 className="font-semibold">Employment Type</h3>
              <p>{data.job_type}</p>
            </div>
            <div>
              <h3 className="font-semibold">Experience</h3>
              <p>3+ years</p>
            </div>
          </div>
        </section>

        {/* Job Description */}
        <section className="px-8 py-6">
          <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </section>
      </div>

      {/* Update Job Modal */}
      <UpdateJobModal
        isOpen={isModalOpen} 
        onClose={closeModal} 
        jobData={data} 
        onUpdate={handleUpdate} 
      />
    </div>
  );
}
