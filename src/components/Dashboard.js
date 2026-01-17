import React, { useState, useEffect ,useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import DepartmentSummary from './DepartmentSummary';
import './Dashboard.css';
import Header from "../components/Header";
import API_BASE_URL from '../config/api';

const Dashboard = () => {
  console.log("🔥 DASHBOARD FROM MAIN BRANCH 🔥");

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDepartmentSummary, setShowDepartmentSummary] = useState(true);
  
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const departments = [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electronics and Computer',
    'Artificial Intelligence and Data Science',
    'Basic Science and Engineering'
  ];

  const statuses = ['Pending', 'In-progress', 'Resolved'];
  // useEffect(() => {
  //   fetchComplaints();
  // }, []);

  // const fetchComplaints = async () =>{
  //   try{
  //     setLoading(true);
  //     const response = await fetch(`${API_BASE_URL}/admin/api/complaints`, {
  //       credentials: 'include'
  //     });

  //     if(response.status === 401) {
  //       navigate('/admin-login');
  //       return;
  //     }

  //     const data = await response.json();
      
  //     if (data.success) {
  //       setComplaints(data.data);
  //       calculateStats(data.data);
  //     } else {
  //       setError('Failed to fetch complaints');
  //     }
  //   } catch (error) {
  //     setError('Network error. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const calculateStats = useCallback((complaintsData) => {
    setStats({
      total: complaintsData.length,
      pending: complaintsData.filter(c => c.status === 'Pending').length,
      inProgress: complaintsData.filter(c => c.status === 'In-progress').length,
      resolved: complaintsData.filter(c => c.status === 'Resolved').length
    });
  }, []);
  
  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/api/complaints`, {
        credentials: 'include'
      });

      if (response.status === 401) {
        navigate('/admin-login');
        return;
      }

      const data = await response.json();

      if (data.success) {
        setComplaints(data.data);
        calculateStats(data.data);
      } else {
        setError('Failed to fetch complaints');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigate,calculateStats]);
    
  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);




  // const calculateStats = (complaintsData) => {
  //   const stats = {
  //     total: complaintsData.length,
  //     pending: complaintsData.filter(c => c.status === 'Pending').length,
  //     inProgress: complaintsData.filter(c => c.status === 'In-progress').length,
  //     resolved: complaintsData.filter(c => c.status === 'Resolved').length
  //   };
  //   setStats(stats);
  // };

  

  const updateComplaintStatus = async (rowIndex, status, technician) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          rowIndex: rowIndex,
          status: status,
          technician: technician
        }),
      });

      const data = await response.json();

             if (data.success) {
         // Update the local state
         setComplaints(prevComplaints => 
           prevComplaints.map(complaint => 
             complaint.rowIndex === rowIndex 
               ? { ...complaint, status, technician }
               : complaint
           )
         );
         
         // Recalculate stats
         const updatedComplaints = complaints.map(complaint => 
           complaint.rowIndex === rowIndex 
             ? { ...complaint, status, technician }
             : complaint
         );
         calculateStats(updatedComplaints);
         
         setNotification({
           show: true,
           message: 'Status updated successfully! Email notification sent to the complainant.',
           type: 'success'
         });
         setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 5000);
       } else {
         setNotification({
           show: true,
           message: 'Error updating status: ' + data.errors,
           type: 'error'
         });
         setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 5000);
       }
         } catch (error) {
       setNotification({
         show: true,
         message: 'Error updating status: ' + error.message,
         type: 'error'
       });
       setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 5000);
     }
  };

  const handleDepartmentClick = (dept) => {
    setSelectedDepartment(dept);
    setShowDepartmentSummary(false);
  };

  const filteredComplaints = complaints.filter(complaint => {
    const deptMatch = selectedDepartment === 'all' || complaint.department === selectedDepartment;
    const statusMatch = selectedStatus === 'all' || complaint.status === selectedStatus;
    return deptMatch && statusMatch;
  });



  const handleLogout = async () => {
    console.log("🔥 HANDLE LOGOUT CALLED");
    try {
      const url = API_BASE_URL
      ? `${API_BASE_URL}/admin/logout`
      : "/admin/logout";
      
      console.log("🔥 LOGOUT URL:", url);

      const response = await fetch(url, {
        method:"POST",
        credentials: 'include'
      });

      console.log("🔥 FETCH RESPONSE RECEIVED");

      const data=await response.json();

      console.log("🔥 RESPONSE DATA:", data);
      if (response.ok) {
        alert(data.message);
        // navigate('/');
        window.location.href = "/";
      }
      else{
        alert("Logout Failed!")
      }
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = "/";
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffc107';
      case 'In-progress': return '#17a2b8';
      case 'Resolved': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading complaints...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

     return (
     <div>
      <Header isAdmin={true} AdminLogout={true} handleLogout={handleLogout} />
       {/* <DashboardNav /> */}
       {notification.show && (
         <div className={`notification ${notification.type}`}>
           {notification.message}
           <button 
             onClick={() => setNotification({ show: false, message: '', type: 'success' })}
             className="notification-close"
           >
             ×
           </button>
         </div>
       )}
       
       <div className="dashboard-container">
        {/* <button onClick={handleLogout} className="nav-link logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            Admin Logout
          </button>
          <h1>Complaints Dashboard</h1> */}

          <div className="dashboard-header">
            <h1 className="dashboard-title">Complaints Dashboard</h1>
          </div>
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Complaints</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.resolved}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>

        

        {/* Filters */}
        <div className="filters-section">

          <div className="filter-group">
            {/* <label>Department:</label> */}
            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>


          <div className="filter-group">
            {/* <label>Status:</label> */}
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <button 
              onClick={() => setShowDepartmentSummary(!showDepartmentSummary)}
              className="toggle-summary-btn"
            >
              {showDepartmentSummary ? 'Hide' : 'Show'} Department Summary
            </button>
          </div>
        </div>


        {/* Department Summary */}
        {showDepartmentSummary && (
          <DepartmentSummary 
            complaints={complaints} 
            onDepartmentClick={handleDepartmentClick}
          />
        )}

                 {/* Complaints Table */}
         <div className="complaints-table-container">
           <div className="table-header">
             <h2>Complaints ({filteredComplaints.length})</h2>
             <div className="email-notification-info">
               <span className="email-icon">📧</span>
               <span>Email notifications are automatically sent when status is updated</span>
             </div>
           </div>
          <div className="table-wrapper">
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>Complaint_ID</th>
                  <th>Nature of Complaint</th>
                  <th>Department</th>
                  <th>Room No</th>
                  <th>Email</th>
                  <th>Complaint Received Date</th>
                  <th>Status</th>
                  <th>Technician</th>
                  <th>Actions</th>
                  <th>Images</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map(complaint => (
                  <ComplaintRow 
                    key={complaint.rowIndex}
                    complaint={complaint}
                    onUpdateStatus={updateComplaintStatus}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


const ComplaintRow = ({ complaint, onUpdateStatus, getStatusColor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(complaint.status);
  const [technician, setTechnician] = useState(complaint.technician || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(complaint.rowIndex, status, technician);
      setIsEditing(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setStatus(complaint.status);
    setTechnician(complaint.technician || '');
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{complaint.complaintId}</td>
      <td>{complaint.natureOfComplaint}</td>
      <td>{complaint.department}</td>
      <td>{complaint.roomNo}</td>
      <td>{complaint.emailId}</td>
      <td>{complaint.receivedOn}</td>
      <td>
        {isEditing ? (
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="status-select"
          >
            <option value="Pending">Pending</option>
            <option value="In-progress">In-progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        ) : (
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(complaint.status) }}
          >
            {complaint.status}
          </span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            placeholder="Technician name"
            className="technician-input"
          />
        ) : (
          <span>{complaint.technician || '-'}</span>
        )}
      </td>

      <td>
        {isEditing ? (
          <div className="action-buttons">
            <button onClick={handleUpdate} className="btn-save">Save</button>
            <button onClick={handleCancel} className="btn-cancel">Cancel</button>
          </div>
                 ) : (
           <button 
             onClick={() => setIsEditing(true)} 
             className="btn-edit"
             disabled={isUpdating}
           >
             {isUpdating ? 'Updating...' : 'Edit'}
           </button>
         )}
      </td>

      <td>
        {complaint.imageUrl && complaint.imageUrl.trim() !== "" ? (
          <button 
            className="view-image-button"
            onClick={() => setSelectedImage(complaint.imageUrl)}
          >
            View Image
          </button>
        ) : (
          "-"
        )}
      </td>



      {selectedImage && (
      <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
        <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
          <img src={selectedImage} alt="Complaint" />
          <button className="close-modal" onClick={() => setSelectedImage(null)}>Close</button>
        </div>
      </div>
    )}
    
    </tr>

  );
};

export default Dashboard;
