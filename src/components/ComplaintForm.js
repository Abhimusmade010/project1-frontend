import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailAddress: '',
    department: '',
    roomNumber: '',
    natureOfComplaint: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const departments = [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electronics and Computer',
    'Artificial Intelligence and Data Science',
    'Basic Sciences and Engineering'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // add below the url in fetch
      const response = await fetch('/user/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId: formData.emailAddress,
          department: formData.department,
          roomNo: formData.roomNumber,
          natureOfComplaint: formData.natureOfComplaint
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setMessage({
          type: 'success',
          text: `Complaint submitted successfully! Your complaint ID is: ${data.data.complaintId}`
        });
        setFormData({
          emailAddress: '',
          department: '',
          roomNumber: '',
          natureOfComplaint: ''
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: data.errors || 'Failed to submit complaint. Please try again.'
        });
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
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">Submit Hardware Complaint</h1>
        <p className="form-subtitle">Please fill out all required fields to report your hardware issue</p>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Department <span className="required">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select your department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Room Number <span className="required">*</span>
            </label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter room number (e.g., 101, Lab-A, etc.)"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Nature of Complaint <span className="required">*</span>
            </label>
            <textarea
              name="natureOfComplaint"
              value={formData.natureOfComplaint}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Please describe the hardware issue in detail..."
              required
              minLength="10"
            />
            {/* <p className="form-note">Minimum 10 characters required.</p> */}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;


