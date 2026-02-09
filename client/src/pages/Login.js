import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;
  
  // Test accounts
  const testAccounts = [
    { label: 'Test Student Account', email: 'student@test.com', password: 'Student123' },
    { label: 'Test Normal User', email: 'user@test.com', password: 'User123' },
    { label: 'Test Client Account', email: 'client@test.com', password: 'Client123' }
  ];

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const useTestAccount = (account) => {
    setFormData({
      email: account.email,
      password: account.password
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login({ email, password });
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Login to your account</p>
          
          {/* Test Credentials Info Box */}
          <div className="test-credentials-box">
            <h4>🧪 Test Credentials</h4>
            <div className="test-accounts-list">
              {testAccounts.map((account, index) => (
                <div key={index} className="test-account-item">
                  <div className="test-account-info">
                    <strong>{account.label}:</strong><br />
                    Email: {account.email}<br />
                    Password: {account.password}
                  </div>
                  <button 
                    type="button"
                    className="btn-use-test"
                    onClick={() => useTestAccount(account)}
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={onSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
