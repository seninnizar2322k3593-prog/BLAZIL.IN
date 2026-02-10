import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  // Only show test account button in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const useTestAccount = () => {
    // Test credentials only available in development
    if (isDevelopment) {
      setFormData({
        email: 'bslxrnilagiribsccs@gmail.com',
        password: 'Basilreji@0071',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>BLAZIL.IN</h1>
        <h2>Admin Portal</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter admin email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {isDevelopment && (
          <button onClick={useTestAccount} className="test-account-btn">
            Use Test Admin Account (Dev Only)
          </button>
        )}
        
        <p className="security-notice">
          ⚠️ This is the admin portal. Only authorized administrators can access this area.
        </p>
      </div>
    </div>
  );
};

export default Login;
