import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import BusinessWorld from './pages/BusinessWorld';
import VerifyEmail from './pages/VerifyEmail';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-page">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/business-world" element={<BusinessWorld />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          
          <Route
            path="/post-job"
            element={
              <ProtectedRoute roles={['client', 'admin']}>
                <PostJob />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
