import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
      setMessage({ type: 'error', text: 'Job not found' });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!user.isVerified) {
      setMessage({ type: 'error', text: 'Please verify your email first' });
      return;
    }

    if (!resume) {
      setMessage({ type: 'error', text: 'Please upload your resume' });
      return;
    }

    setApplying(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('jobId', id);
      formData.append('coverLetter', coverLetter);
      formData.append('resume', resume);

      await api.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', text: 'Application submitted successfully!' });
      setCoverLetter('');
      setResume(null);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit application' 
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="container">
        <div className="error-message">Job not found</div>
      </div>
    );
  }

  const canApply = user && (user.role === 'student' || user.role === 'normal');
  const isNormalUserPartTime = user?.role === 'normal' && job.jobType === 'part-time';

  return (
    <div className="job-details-page">
      <div className="container">
        <button onClick={() => navigate('/jobs')} className="back-button">
          ← Back to Jobs
        </button>

        <div className="job-details-container">
          <div className="job-header-detail">
            <div>
              <h1>{job.title}</h1>
              <h2>{job.company}</h2>
            </div>
            <span className={`job-type-badge ${job.jobType}`}>
              {job.jobType}
            </span>
          </div>

          <div className="job-info-grid">
            <div className="info-item">
              <strong>Location:</strong> {job.location}, {job.state}
            </div>
            <div className="info-item">
              <strong>Salary:</strong> {job.salary}
            </div>
            <div className="info-item">
              <strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}
            </div>
            {job.expiresAt && (
              <div className="info-item">
                <strong>Expires:</strong> {new Date(job.expiresAt).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="job-description-section">
            <h3>Job Description</h3>
            <p>{job.description}</p>
          </div>

          {canApply && !isNormalUserPartTime && (
            <div className="apply-section">
              <h3>Apply for this Job</h3>
              
              {message.text && (
                <div className={`alert alert-${message.type}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleApply} className="apply-form">
                <div className="form-group">
                  <label>Cover Letter (Optional)</label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows="5"
                    placeholder="Tell us why you're a great fit for this position..."
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Upload Resume *</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                    required
                  />
                  <small>Accepted formats: PDF, DOC, DOCX (Max 5MB)</small>
                </div>

                <button type="submit" className="btn btn-primary btn-large" disabled={applying}>
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          )}

          {isNormalUserPartTime && (
            <div className="alert alert-warning">
              Normal users can only apply for full-time and work-from-home jobs.
            </div>
          )}

          {!canApply && (
            <div className="apply-prompt">
              <p>
                <a href="/login">Login</a> or <a href="/register">Create an account</a> to apply for this job.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
