import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Dream Job in South India</h1>
            <p>
              Connecting talented individuals with opportunities across 
              Andhra Pradesh, Karnataka, Kerala, Tamil Nadu, Telangana, and Puducherry
            </p>
            <div className="hero-buttons">
              <Link to="/jobs" className="btn btn-primary btn-large">
                Browse Jobs
              </Link>
              <Link to="/register" className="btn btn-secondary btn-large">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose BLAZIL.IN?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Part-Time Jobs</h3>
              <p>Perfect for students looking for flexible work opportunities</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Full-Time Careers</h3>
              <p>Build your career with established companies across South India</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Work From Home</h3>
              <p>Flexible remote opportunities for work-life balance</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Business World</h3>
              <p>Connect with investors and grow your business ideas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of job seekers and employers on BLAZIL.IN</p>
            <Link to="/register" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
