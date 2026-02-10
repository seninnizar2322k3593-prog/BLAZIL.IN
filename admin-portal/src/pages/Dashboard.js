import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { admin, logout } = useAuth();
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
      showMessage('error', error.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleApproveJob = async (jobId) => {
    try {
      await api.put(`/admin/jobs/${jobId}/approve`);
      showMessage('success', 'Job approved successfully');
      fetchData();
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Error approving job');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    try {
      await api.delete(`/admin/jobs/${jobId}`);
      showMessage('success', 'Job deleted successfully');
      fetchData();
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Error deleting job');
    }
  };

  const handleUpdateBusinessIdea = async (ideaId, status) => {
    try {
      await api.put(`/admin/business-ideas/${ideaId}`, { status });
      showMessage('success', `Business idea marked as ${status}`);
      fetchData();
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Error updating business idea');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>BLAZIL.IN Admin Portal</h1>
          <div className="admin-info">
            <span>Welcome, {admin?.name || 'Admin'}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'stats' ? 'active' : ''} 
          onClick={() => setActiveTab('stats')}
        >
          📊 Dashboard
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={activeTab === 'jobs' ? 'active' : ''} 
          onClick={() => setActiveTab('jobs')}
        >
          💼 Jobs
        </button>
        <button 
          className={activeTab === 'applications' ? 'active' : ''} 
          onClick={() => setActiveTab('applications')}
        >
          📝 Applications
        </button>
        <button 
          className={activeTab === 'business' ? 'active' : ''} 
          onClick={() => setActiveTab('business')}
        >
          💡 Business Ideas
        </button>
      </nav>

      {/* Message Display */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Content Area */}
      <main className="dashboard-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {/* Statistics Tab */}
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
                  <h3>Pending Jobs</h3>
                  <p className="stat-number">{stats.pendingJobs}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Applications</h3>
                  <p className="stat-number">{stats.totalApplications}</p>
                </div>
                <div className="stat-card">
                  <h3>Students</h3>
                  <p className="stat-number">{stats.studentUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Normal Users</h3>
                  <p className="stat-number">{stats.normalUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Clients</h3>
                  <p className="stat-number">{stats.clientUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Business Ideas</h3>
                  <p className="stat-number">{stats.totalBusinessIdeas}</p>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="table-container">
                <h2>All Users</h2>
                <table className="data-table">
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
                        <td><span className={`badge ${user.role}`}>{user.role}</span></td>
                        <td>{user.isVerified ? '✓' : '✗'}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="table-container">
                <h2>All Jobs</h2>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Company</th>
                      <th>Type</th>
                      <th>State</th>
                      <th>Posted By</th>
                      <th>Approved</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job._id}>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td><span className={`badge ${job.jobType}`}>{job.jobType}</span></td>
                        <td>{job.state}</td>
                        <td>{job.postedBy?.name || 'N/A'}</td>
                        <td>{job.isApproved ? '✓' : '✗'}</td>
                        <td className="actions">
                          {!job.isApproved && (
                            <button 
                              onClick={() => handleApproveJob(job._id)}
                              className="approve-btn"
                            >
                              Approve
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteJob(job._id)}
                            className="delete-btn"
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

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="table-container">
                <h2>All Applications</h2>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Job Title</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app._id}>
                        <td>{app.user?.name || 'N/A'}</td>
                        <td>{app.job?.title || 'N/A'}</td>
                        <td>{app.job?.company || 'N/A'}</td>
                        <td><span className={`badge ${app.status}`}>{app.status}</span></td>
                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Business Ideas Tab */}
            {activeTab === 'business' && (
              <div className="table-container">
                <h2>Business Ideas</h2>
                <table className="data-table">
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
                        <td className="idea-text">{idea.idea}</td>
                        <td><span className={`badge ${idea.status}`}>{idea.status}</span></td>
                        <td className="actions">
                          {idea.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => handleUpdateBusinessIdea(idea._id, 'contacted')}
                                className="approve-btn"
                              >
                                Mark Contacted
                              </button>
                              <button 
                                onClick={() => handleUpdateBusinessIdea(idea._id, 'rejected')}
                                className="reject-btn"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
