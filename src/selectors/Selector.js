import { createSelector } from "@reduxjs/toolkit";

// Select the jobs data from the Redux state
export const selectJobsData = (state) => {
  const { current_page, data } = state.jobs; // Destructure to get current_page and data
  return data; // Return the actual job data array
};

// Select a job by its ID from paginated jobs
export const selectJobById = createSelector(
  [selectJobsData, (_, jobId) => jobId],
  (paginatedJobs, jobId) => {
    // Find the job by ID within the paginated jobs data
    const foundJob = paginatedJobs.find((job) => job.id === jobId);
    return foundJob || null; // Return the job if found, otherwise null
  }
);
