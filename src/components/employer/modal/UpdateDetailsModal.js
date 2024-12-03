// UpdateJobModal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateJob } from '../../../actions/JobActions';

const UpdateJobModal = ({ isOpen, onClose, jobData, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState(jobData);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,

    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = jobData.id;
    dispatch(updateJob(updatedData, id)); // Call the update function passed as prop
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Return null if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-lg font-bold mb-4">Update Job Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={updatedData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={updatedData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobModal;
