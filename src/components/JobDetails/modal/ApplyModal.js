// ApplyModal.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { applyJob } from '../../../actions/ApplicationActions';
import { message } from 'antd';

export default function ApplyModal({ isOpen, onClose, job }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const dispatch = useDispatch();

  const appState = useSelector((state) => state.app);

  if (!isOpen) return null;

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };


  const handleSubmit = () => {
    const profile = appState.profile;
    const job_id = job.id;
    if (coverLetter && resume) {

      dispatch(applyJob(profile, resume, coverLetter, job_id)); // Dispatch the application
    onClose(); // Close the modal after submission
      
    } else {

      message.error("All fields are required")
    }
    
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Apply for Job</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
      
          {/* Cover Letter */}
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="coverLetter">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            rows="5"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Write a brief cover letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>

          {/* Resume Upload */}
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="resume">
            Upload Resume
          </label>
          <input
            type="file"
            id="resume"
            className="w-full mb-4 text-gray-600"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSubmit}>
              Submit Application
            </button>
          </div>
      
      </div>
    </div>
  );
}
