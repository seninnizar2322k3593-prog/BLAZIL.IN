import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      if (user.role === 'client') {
        const jobsResponse = await api.get('/jobs/my-jobs');
        setJobs(jobsResponse.data);
      } else {
        const appsResponse = await api.get('/applications/user');
        setApplications(appsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user.isVerified) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <div className="verification-notice">
            <h2>Email Verification Required</h2>
            <p>Please verify your email address to access the dashboard and apply for jobs.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user.name}!</h1>
          <p>Role: <span className="role-badge">{user.role}</span></p>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="dashboard-content">
            {user.role === 'client' ? (
              <div className="client-dashboard">
                <h2>My Posted Jobs ({jobs.length})</h2>
                
                {jobs.length === 0 ? (
                  <div className="empty-state">
                    <p>You haven't posted any jobs yet.</p>
                  </div>
                ) : (
                  <div className="jobs-list">
                    {jobs.map((job) => (
                      <div key={job._id} className="dashboard-card">
                        <h3>{job.title}</h3>
                        <p><strong>{job.company}</strong></p>
                        <p>{job.location}, {job.state}</p>
                        <p className="job-type-badge">{job.jobType}</p>
                        <p className={`status ${job.isApproved ? 'approved' : 'pending'}`}>
                          {job.isApproved ? 'Approved' : 'Pending Approval'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="user-dashboard">
                <h2>My Applications ({applications.length})</h2>
                
                {applications.length === 0 ? (
                  <div className="empty-state">
                    <p>You haven't applied to any jobs yet.</p>
                  </div>
                ) : (
                  <div className="applications-list">
                    {applications.map((app) => (
                      <div key={app._id} className="dashboard-card">
                        <h3>{app.job.title}</h3>
                        <p><strong>{app.job.company}</strong></p>
                        <p>{app.job.location}</p>
                        <p className="application-status">
                          Status: <span className={`status ${app.status}`}>{app.status}</span>
                        </p>
                        <p className="applied-date">
                          Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
