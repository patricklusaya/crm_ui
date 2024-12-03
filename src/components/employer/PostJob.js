import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJob } from '../../actions/JobActions';

export default function JobPostForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_name: '',
    location: '',
    salary_range: '',
    job_type: '',
    job_category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob(formData));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create a Job Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job title"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the role and responsibilities"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job location"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Salary Range</label>
          <select
            name="salary_range"
            value={formData.salary_range}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a range</option>
            <option value="20,000 - 40,000">20,000 - 40,000</option>
            <option value="40,000 - 60,000">40,000 - 60,000</option>
            <option value="60,000 - 80,000">60,000 - 80,000</option>
            <option value="80,000 - 100,000">80,000 - 100,000</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">Job Category</label>
          <select
            name="job_category"
            value={formData.job_category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Design">Design</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Create Job Post
        </button>
      </form>
    </div>
  );
}
