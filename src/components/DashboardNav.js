import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardNav.css';

const DashboardNav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/admin/logout', {
        credentials: 'include'
      });
      
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="logo-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="logo-text">
            <h1>PICT</h1>
            <p>Hardware Complaint System</p>
          </div>
        </div>
        
        <div className="nav-actions">
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i>
            Home
          </Link>
          <button onClick={handleLogout} className="nav-link logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
