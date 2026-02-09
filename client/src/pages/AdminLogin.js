import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'bslxrnilagiribsccs@gmail.com',
    password: 'Basilreji@0071'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login({ email, password });
      
      // Verify admin role
      if (userData.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        setLoading(false);
        return;
      }
      
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  const useAdminCredentials = () => {
    setFormData({
      email: 'bslxrnilagiribsccs@gmail.com',
      password: 'Basilreji@0071'
    });
  };

  return (
    <div className="admin-login-page">
      <div className="container">
        <div className="admin-login-container">
          <div className="admin-header">
            <div className="admin-icon">🔐</div>
            <h1>Admin Portal</h1>
            <p className="admin-subtitle">BLAZIL.IN Administration</p>
          </div>
          
          {/* Admin Credentials Info Box */}
          <div className="admin-credentials-box">
            <h4>🔑 Admin Credentials</h4>
            <div className="admin-credential-item">
              <div className="credential-info">
                <strong>Admin Account:</strong><br />
                Email: bslxrnilagiribsccs@gmail.com<br />
                Password: Basilreji@0071
              </div>
              <button 
                type="button"
                className="btn-quick-login"
                onClick={useAdminCredentials}
              >
                Quick Fill
              </button>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={onSubmit} className="admin-login-form">
            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="Enter admin email"
              />
            </div>

            <div className="form-group">
              <label>Admin Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Enter admin password"
              />
            </div>

            <button type="submit" className="btn btn-admin btn-block" disabled={loading}>
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>
          </form>

          <p className="admin-footer">
            Not an admin? <a href="/login">Go to User Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
