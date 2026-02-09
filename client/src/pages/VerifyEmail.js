import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, verifyEmail, resendVerification } = useAuth();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    // Auto-verify if token is in URL
    const urlToken = searchParams.get('token');
    if (urlToken) {
      handleVerify(urlToken);
    }
  }, []);

  const handleVerify = async (verificationToken) => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await verifyEmail(verificationToken || token);
      setMessage({ 
        type: 'success', 
        text: 'Email verified successfully! Redirecting...' 
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Verification failed. Please check your token.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!user?.email) {
      setMessage({ type: 'error', text: 'No email found. Please login again.' });
      return;
    }

    setResending(true);
    setMessage({ type: '', text: '' });

    try {
      await resendVerification(user.email);
      setMessage({ 
        type: 'success', 
        text: 'Verification email sent! Please check your inbox.' 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to resend verification email.' 
      });
    } finally {
      setResending(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

  return (
    <div className="verify-email-page">
      <div className="container">
        <div className="verify-container">
          <h1>Verify Your Email</h1>
          <p className="verify-subtitle">
            Please enter the verification code sent to your email
          </p>

          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={onSubmit} className="verify-form">
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={loading || !token}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="resend-section">
            <p>Didn't receive the code?</p>
            <button 
              onClick={handleResend} 
              className="btn btn-secondary"
              disabled={resending}
            >
              {resending ? 'Sending...' : 'Resend Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
