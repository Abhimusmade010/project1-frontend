import React from "react";
import { Link } from "react-router-dom";
import pictLogo from "../assets/pict-logo.png"; // <-- add your logo file

const Header = () => {
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
              <li><Link to="/#contact">Contact</Link></li>
              <li><Link to="/admin-login">Admin Login</Link></li>

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
