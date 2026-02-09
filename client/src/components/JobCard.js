import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onView }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className={`job-type ${job.jobType}`}>
          {job.jobType}
        </span>
      </div>
      
      <div className="job-company">
        <strong>{job.company}</strong>
      </div>
      
      <div className="job-location">
        📍 {job.location}, {job.state}
      </div>
      
      <div className="job-salary">
        💰 {job.salary}
      </div>
      
      <div className="job-description">
        {job.description.substring(0, 150)}...
      </div>
      
      <div className="job-footer">
        <button onClick={() => onView(job._id)} className="btn btn-primary">
          View Details
        </button>
        
        {job.expiresAt && (
          <span className="expires-at">
            Expires: {new Date(job.expiresAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
