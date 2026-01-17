import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
import HomePage from './components/HomePage';
import ComplaintForm from './components/ComplaintForm';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import './App.css';


function AppContent() {
  // const location = useLocation();
  // const isDashboard = location.pathname === '/admin/dashboard';

  return (
    <div className="App">
      {/* {<Header />} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit-complaint" element={<ComplaintForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
