import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import JobCard from '../components/JobCard';
import './Jobs.css';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: '',
    state: '',
    search: ''
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.jobType) params.append('jobType', filters.jobType);
      if (filters.state) params.append('state', filters.state);
      if (filters.search) params.append('search', filters.search);
      
      const response = await api.get(`/jobs?${params.toString()}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="jobs-page">
      <div className="container">
        <h1>Browse Jobs</h1>
        
        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              name="search"
              placeholder="Search jobs..."
              value={filters.search}
              onChange={handleFilterChange}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
              <option value="">All Job Types</option>
              <option value="part-time">Part-Time</option>
              <option value="full-time">Full-Time</option>
              <option value="work-from-home">Work From Home</option>
            </select>
          </div>
          
          <div className="filter-group">
            <select name="state" value={filters.state} onChange={handleFilterChange}>
              <option value="">All States</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">
            <p>No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} onView={handleViewJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
