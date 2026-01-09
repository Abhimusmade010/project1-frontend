import React from "react";
import { Link } from "react-router-dom";
import pictLogo from "../assets/pict-logo.png"; // <-- add your logo file

// import { useNavigate } from 'react-router-dom';



const Header = ({isAdmin,handleLogout,AdminLogout}) => {

  return (
    <>
      {/* TOP BLUE STRIP — EXACT LIKE PICT WEBSITE */}
      <div className="pict-top-strip">
        <img src={pictLogo} alt="PICT Logo" className="pict-logo" />

        <div className="pict-title-block">
          <h1 className="pict-title">PUNE INSTITUTE OF COMPUTER TECHNOLOGY</h1>
          <p className="pict-subtitle">
            (An Autonomous Institute affiliated to Savitribai Phule Pune University)
          </p>
          <p className="pict-tags">
            AICTE APPROVED | ISO 9001:2015 | NAAC A+ Grade | NBA Accredited
          </p>
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <header className="pict-nav">
        <div className="container">
          <nav>
            <ul className="nav-links">


              <li><Link to="/">Home</Link></li>

                {/* {!isAdmin && (
                  <li><Link to="/#contact">Contact</Link></li>
                  
                )}      */}
              
                {isAdmin && AdminLogout && (
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i> Admin Logout
                  </button>
                </li>
                )}
 
                {!isAdmin && (
                  <li><Link to="/admin-login">Admin Login</Link></li>
                )}
              <li>
                <a href="https://pict.edu" target="_blank" rel="noopener noreferrer">
                  PICT Website
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
