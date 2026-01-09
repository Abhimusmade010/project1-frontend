import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

const HomePage = () => {
  return (
    <div>
      <Header isAdmin={false} />

      <div className="home-bg">
        <div className="hero">
          <div className="hero-inner">
            <h1>
              PICT Hardware Complaint System <br />
            </h1>

            <p>
              An official platform for logging and monitoring hardware issues across the campus.
            </p>

            <Link to="/submit-complaint" className="cta-button">
              Register Complaint →
            </Link>

            {/* ===== ADDED: TWO CARDS BELOW BUTTON ===== */}
            <div className="hero-cards">
              <div className="hero-card">
                {/* <div className="hero-card-icon"></div> */}
                <div className="hero-card-text">
                  <h3>Contact</h3>
                  <p>Mr. Rajesh Rao(Maint.Er)</p>
                  <p>Mobile Number:+91 9890730008</p>
                  <p>Email-Id:hardwaremaintenance@pict.edu</p>
                  {/* <p>hardwaremaint</p> */}
                </div>
              </div>

              
            </div>
            {/* ===== END ADDED ===== */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
