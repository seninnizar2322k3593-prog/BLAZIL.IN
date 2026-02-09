import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            BLAZIL.IN
          </Link>
          
          <div className="navbar-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/jobs" className="nav-link">Jobs</Link>
            <Link to="/business-world" className="nav-link">Business World</Link>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="nav-link">Admin</Link>
                )}
                {user.role === 'client' && (
                  <Link to="/post-job" className="nav-link">Post Job</Link>
                )}
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button onClick={logout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-secondary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
