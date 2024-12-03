// JobDetails.js
import React, { useState } from 'react';
import ApplyModal from "./modal/ApplyModal"
import { useLocation } from 'react-router-dom';


export default function JobDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const data = location.state?.job;



  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-500 to-purple-700 text-white py-6 px-8">
          <h1 className="text-3xl font-bold"> {data.title} </h1>
          <p className="text-lg mt-2"> {data.company_name} </p>
        </header>

        {/* Job Information Section */}
        <section className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h3 className="font-semibold">Category</h3>
              <p>{data.job_category} </p>
            </div>
            <div>
              <h3 className="font-semibold">Salary</h3>
              <p> {data.salary_range} </p>
            </div>
            <div>
              <h3 className="font-semibold">Employment Type</h3>
              <p> {data.job_type} </p>
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

        {/* Apply Button */}
        <div className="px-8 py-6 flex justify-end">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal isOpen={isModalOpen} onClose={closeModal}  job={data}/>
    </div>
  );
}
