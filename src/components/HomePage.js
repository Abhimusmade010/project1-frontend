import React from 'react';
import { Link } from 'react-router-dom';


import Header from './Header';


const HomePage = () => {
  return (
    <div className>

          <Header isAdmin={false} />

          

            <div className="hero">
              <div className="hero-inner">
                <h1>
                  PICT Hardware Complaint System <br />
                  {/* Maintenance Management System */}
                </h1>
                
                <p>
                  An official platform for logging and monitoring hardware issues across the campus.
                </p>

                <Link to="/submit-complaint" className="cta-button">
                  Register Complaint →
                </Link>
              </div>
            </div>


          {/* Contact Section */}
          <section className="contact" id="contact">
            <div className="container">
              <h2> Admin Contact</h2>
              {/* <p>Get in touch with our technical support team for any queries or assistance</p> */}
              
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                                    <h3>Phone</h3>
                    <p>+91 20 2437 1101, +91 20 2437 1102</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p><a href="mailto:abhishekmusmade342@gmail.com">abhishekmusmade342@gmail.com</a></p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Working Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </section>


    </div>
  );
};

export default HomePage;
