import React, { useState } from 'react';
import api from '../utils/api';
import './BusinessWorld.css';

const BusinessWorld = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idea: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const { name, email, phone, idea } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      const response = await api.post('/business/contact', formData);
      setMessage({ type: 'success', text: response.data.message });
      setFormData({ name: '', email: '', phone: '', idea: '' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Submission failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="business-world-page">
      <div className="container">
        <div className="business-hero">
          <h1>Welcome to Business World</h1>
          <p>
            Transform your business ideas into reality. Connect with investors 
            and get expert guidance to grow your venture.
          </p>
        </div>

        <div className="business-content">
          <div className="info-section">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Submit Your Idea</h3>
                <p>Fill out the form with your business concept and details</p>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <h3>Admin Review</h3>
                <p>Our team will review your submission and assess the potential</p>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <h3>Connect with Investors</h3>
                <p>We'll connect you with relevant investors and mentors</p>
              </div>
            </div>

            <div className="contact-info">
              <h3>Direct Contact</h3>
              <p><strong>Email:</strong> bslxrnilagiribsccs@gmail.com</p>
              <p><strong>WhatsApp:</strong> +91 9747835717</p>
            </div>
          </div>

          <div className="form-section">
            <h2>Submit Your Business Idea</h2>
            
            {message.text && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={onSubmit} className="business-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

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
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Business Idea</label>
                <textarea
                  name="idea"
                  value={idea}
                  onChange={onChange}
                  required
                  rows="6"
                  placeholder="Describe your business idea in detail..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Idea'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessWorld;
