import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              {/* <i></i> */}
            </div>
            <div className="logo-text">
              <h1>PICT Maintenance</h1>
              <p>Pune Institute of Computer Technology</p>
            </div>
          </div>
          
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
              <li><Link to="/admin-login">Admin Login</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
