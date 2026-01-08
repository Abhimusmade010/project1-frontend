import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";
import Header from './Header';


const AdminLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [showPassword, setShowPassword] = useState(false);





  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('password', password);

      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
        credentials: 'include'
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const data = await response.json();
        if (data.success) {
          setMessage({
            type: 'success',
            text: 'Login successful! Redirecting to dashboard...'
          });
          setTimeout(() => {
            navigate('/admin/dashboard');
          }, 1500);
        } else {
          setMessage({
            type: 'error',
            text: data.message || 'Login failed. Please check your password.'
          });
        }
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });
    }

    setLoading(false);
  };

  return (
    
    <div className>
      {/* <Header /> */}
      <div className="form-container">
        <h1 className="form-title">Admin Login</h1>
        <p className="form-subtitle">Enter your admin credentials to access the dashboard</p>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label className="form-label">
              Admin Password <span className="required">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter admin password"
              required
            />
          </div> */}

          <div className="form-group">
            <label className="form-label">
              Admin Password <span className="required">*</span>
            </label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter admin password"
                required
              />

              <span 
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🔒" : "🔓"}
              </span>
            </div>
          </div>


          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <div>
        <Link to="/" className="back-home-button">
            Back to Home
        </Link>

        
      </div>

    </div>
  );
};

export default AdminLogin;
