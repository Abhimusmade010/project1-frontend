import React from 'react';
import './DepartmentSummary.css';

const DepartmentSummary = ({ complaints, onDepartmentClick }) => {
  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electronics and Computer',
    'Artificial Intelligence and Data Science'
  ];

  const getDepartmentStats = (deptName) => {
    const deptComplaints = complaints.filter(c => c.department === deptName);
    return {
      total: deptComplaints.length,
      pending: deptComplaints.filter(c => c.status === 'Pending').length,
      inProgress: deptComplaints.filter(c => c.status === 'In-progress').length,
      resolved: deptComplaints.filter(c => c.status === 'Resolved').length
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffc107';
      case 'In-progress': return '#17a2b8';
      case 'Resolved': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div className="department-summary">
      <h2>Department-wise Summary</h2>
      <div className="department-cards">
        {departments.map(dept => {
          const stats = getDepartmentStats(dept);
          return (
            <div key={dept} className="department-card" onClick={() => onDepartmentClick(dept)}>
              <div className="dept-header">
                <h3>{dept}</h3>
                <div className="dept-total">{stats.total}</div>
              </div>
              <div className="dept-stats">
                <div className="stat-item">
                  <span className="stat-dot" style={{ backgroundColor: getStatusColor('Pending') }}></span>
                  <span className="stat-label">Pending: {stats.pending}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-dot" style={{ backgroundColor: getStatusColor('In-progress') }}></span>
                  <span className="stat-label">In Progress: {stats.inProgress}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-dot" style={{ backgroundColor: getStatusColor('Resolved') }}></span>
                  <span className="stat-label">Resolved: {stats.resolved}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentSummary;
