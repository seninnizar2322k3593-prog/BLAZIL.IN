import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './PostJob.css';

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    state: '',
    jobType: '',
    salary: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const { title, description, company, location, state, jobType, salary } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      await api.post('/jobs', formData);
      setMessage({ 
        type: 'success', 
        text: 'Job posted successfully! Awaiting admin approval.' 
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        company: '',
        location: '',
        state: '',
        jobType: '',
        salary: ''
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to post job' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not client or admin
  if (user && user.role !== 'client' && user.role !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="post-job-page">
      <div className="container">
        <div className="post-job-container">
          <h1>Post a Job</h1>
          <p className="post-job-subtitle">
            Share your job opportunity with talented individuals across South India
          </p>

          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={onSubmit} className="post-job-form">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                required
                placeholder="e.g., Software Developer, Marketing Manager"
              />
            </div>

            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company"
                value={company}
                onChange={onChange}
                required
                placeholder="Your company name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Job Type *</label>
                <select name="jobType" value={jobType} onChange={onChange} required>
                  <option value="">Select Job Type</option>
                  <option value="part-time">Part-Time</option>
                  <option value="full-time">Full-Time</option>
                  <option value="work-from-home">Work From Home</option>
                </select>
              </div>

              <div className="form-group">
                <label>State *</label>
                <select name="state" value={state} onChange={onChange} required>
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={onChange}
                required
                placeholder="City, District"
              />
            </div>

            <div className="form-group">
              <label>Salary *</label>
              <input
                type="text"
                name="salary"
                value={salary}
                onChange={onChange}
                required
                placeholder="e.g., ₹30,000 - ₹50,000 per month"
              />
            </div>

            <div className="form-group">
              <label>Job Description *</label>
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                required
                rows="8"
                placeholder="Describe the job role, responsibilities, requirements, and qualifications..."
              ></textarea>
            </div>

            {jobType === 'part-time' && (
              <div className="alert alert-warning">
                Note: Part-time jobs will automatically expire after 24 hours.
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block btn-large" disabled={loading}>
              {loading ? 'Posting Job...' : 'Post Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
