import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const ComplaintForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailAddress: '',
    department: '',
    roomNumber: '',
    natureOfComplaint: '',
    dsrNo: ''     // ✅ Added DSR number
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});  // for live validation

  const departments = [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electronics and Computer',
    'Artificial Intelligence and Data Science',
    'Basic Sciences and Engineering'
  ];

  // ✅ FULL SCHEMA (Now includes dsrNo)
  const formSchema = z.object({
  emailAddress: z
    .string()
    .email("Invalid email format")
    .regex(/@pict\.edu$/, "Only pict.edu emails are allowed"),

  department: z.string().min(1, "Department is required"),

  roomNumber: z.string().min(1, "Room number is required"),

  natureOfComplaint: z
    .string()
    .min(10, "Complaint must be at least 10 characters long"),

  dsrNo: z
    .string()
    .min(1, "DSR number is required")
    .refine((val) => /^[0-9]+$/.test(val), {
      message: "DSR number must contain digits only",
    })
});



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // LIVE email validation only
    if (name === "emailAddress") {
      const emailSchema = formSchema.shape.emailAddress;
      const validation = emailSchema.safeParse(value);

      if (!validation.success) {
        const issue = validation.error.issues?.[0];
        setErrors(prev => ({
        ...prev,
        emailAddress: issue?.message || "Invalid email"
        }));
      } else {
        setErrors(prev => ({ ...prev, emailAddress: "" }));
      }

    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // FULL FORM validation
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      setMessage({
        type: "error",
        text: result.error.errors[0].message
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/user/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailId: formData.emailAddress,
          department: formData.department,
          roomNo: formData.roomNumber,
          natureOfComplaint: formData.natureOfComplaint,
          dsrNo: formData.dsrNo    // ✅ Send to backend
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: `Complaint submitted successfully! Your complaint ID is: ${data.data.complaintId}`
        });

        // RESET form
        setFormData({
          emailAddress: '',
          department: '',
          roomNumber: '',
          natureOfComplaint: '',
          dsrNo: ''
        });

        setTimeout(() => navigate('/'), 3000);

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

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* EMAIL FIELD */}
          <div className="form-group">
            <label className="form-label">Email Address *</label>

            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email address"
              required
            />

            {errors.emailAddress && (
              <p className="error-text">{errors.emailAddress}</p>
            )}
          </div>

          {/* DEPARTMENT */}
          <div className="form-group">
            <label className="form-label">Department *</label>
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

          {/* ROOM NUMBER */}
          <div className="form-group">
            <label className="form-label">Room Number *</label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 101, Lab-A, etc."
              required
            />
          </div>

          {/* DSR NUMBER */}
          <div className="form-group">
            <label className="form-label">DSR Number *</label>
            <input
              type="number"
              name="dsrNo"
              value={formData.dsrNo}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter DSR Number (e.g., 102)"
              required
            />
          </div>

          {/* COMPLAINT */}
          <div className="form-group">
            <label className="form-label">Nature of Complaint *</label>
            <textarea
              name="natureOfComplaint"
              value={formData.natureOfComplaint}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describe the issue..."
              required
            />
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
