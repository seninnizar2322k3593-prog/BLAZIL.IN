import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [businessIdeas, setBusinessIdeas] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      switch (activeTab) {
        case 'stats':
          const statsRes = await api.get('/admin/stats');
          setStats(statsRes.data);
          break;
        case 'users':
          const usersRes = await api.get('/admin/users');
          setUsers(usersRes.data);
          break;
        case 'jobs':
          const jobsRes = await api.get('/admin/jobs');
          setJobs(jobsRes.data);
          break;
        case 'applications':
          const appsRes = await api.get('/admin/applications');
          setApplications(appsRes.data);
          break;
        case 'business':
          const businessRes = await api.get('/admin/business-ideas');
          setBusinessIdeas(businessRes.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({ type: 'error', text: 'Failed to fetch data' });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveJob = async (jobId) => {
    try {
      await api.put(`/admin/jobs/${jobId}/approve`);
      setMessage({ type: 'success', text: 'Job approved successfully' });
      fetchData();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to approve job' });
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/admin/jobs/${jobId}`);
        setMessage({ type: 'success', text: 'Job deleted successfully' });
        fetchData();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete job' });
      }
    }
  };

  const handleUpdateBusinessStatus = async (ideaId, status) => {
    try {
      await api.put(`/admin/business-ideas/${ideaId}`, { status });
      setMessage({ type: 'success', text: 'Business idea status updated' });
      fetchData();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update status' });
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="container">
        <div className="error-message">Access Denied: Admin Only</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <div className="container">
        <h1>Admin Dashboard</h1>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={activeTab === 'jobs' ? 'active' : ''}
            onClick={() => setActiveTab('jobs')}
          >
            Jobs
          </button>
          <button
            className={activeTab === 'applications' ? 'active' : ''}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
          <button
            className={activeTab === 'business' ? 'active' : ''}
            onClick={() => setActiveTab('business')}
          >
            Business Ideas
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="admin-content">
            {activeTab === 'stats' && stats && (
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p className="stat-number">{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Jobs</h3>
                  <p className="stat-number">{stats.totalJobs}</p>
                </div>
                <div className="stat-card">
                  <h3>Active Jobs</h3>
                  <p className="stat-number">{stats.activeJobs}</p>
                </div>
                <div className="stat-card">
                  <h3>Pending Jobs</h3>
                  <p className="stat-number">{stats.pendingJobs}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Applications</h3>
                  <p className="stat-number">{stats.totalApplications}</p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="data-table">
                <h2>All Users ({users.length})</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Verified</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><span className="role-badge">{user.role}</span></td>
                        <td>{user.isVerified ? '✓' : '✗'}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="data-table">
                <h2>All Jobs ({jobs.length})</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Company</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Posted By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job._id}>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.jobType}</td>
                        <td>
                          <span className={job.isApproved ? 'status-approved' : 'status-pending'}>
                            {job.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td>{job.postedBy?.name}</td>
                        <td>
                          {!job.isApproved && (
                            <button
                              onClick={() => handleApproveJob(job._id)}
                              className="btn-small btn-approve"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="btn-small btn-delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="data-table">
                <h2>All Applications ({applications.length})</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Job</th>
                      <th>Applicant</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app._id}>
                        <td>{app.job?.title}</td>
                        <td>{app.user?.name}</td>
                        <td>{app.user?.email}</td>
                        <td><span className={`status-${app.status}`}>{app.status}</span></td>
                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'business' && (
              <div className="data-table">
                <h2>Business Ideas ({businessIdeas.length})</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Idea</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessIdeas.map((idea) => (
                      <tr key={idea._id}>
                        <td>{idea.name}</td>
                        <td>{idea.email}</td>
                        <td>{idea.phone}</td>
                        <td className="idea-text">{idea.idea.substring(0, 100)}...</td>
                        <td><span className={`status-${idea.status}`}>{idea.status}</span></td>
                        <td>
                          <select
                            value={idea.status}
                            onChange={(e) => handleUpdateBusinessStatus(idea._id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="under-review">Under Review</option>
                            <option value="connected">Connected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
