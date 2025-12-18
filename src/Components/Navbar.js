import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <style>{`
        /* NAVBAR BASE - Black Theme */
        .app-navbar {
          min-height: 80px;
          background: #000000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .app-navbar .navbar-brand {
          color: #ffffff !important;
          font-weight: 800;
          letter-spacing: 1px;
        }

        /* TOGGLER - Custom White Outline */
        .navbar-toggler {
          border: 1px solid rgba(255,255,255,0.2) !important;
        }

        /* MOBILE DROPDOWN STYLING */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: #000000; /* Solid Black Background */
            position: absolute;
            top: 80px; /* Directly below the navbar */
            left: 0;
            right: 0;
            padding: 1rem 1.5rem 2rem 1.5rem;
            border-bottom: 2px solid #333;
            z-index: 1000;
          }
          
          .nav-item {
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding: 10px 0;
          }
          
          .admin-mobile-container {
            margin-top: 1.5rem;
          }
        }

        /* LINKS - White on Black */
        .app-navbar .nav-link {
          color: rgba(255,255,255,0.8) !important;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .app-navbar .nav-link:hover {
          color: #ffffff !important;
          padding-left: 5px; /* Subtle movement effect */
        }

        /* ADMIN BUTTON */
        .admin-btn {
          border: 1px solid rgba(255,255,255,0.3);
          color: #ffffff !important;
          border-radius: 6px;
          padding: 8px 20px;
          text-align: center;
          transition: 0.3s;
        }

        .admin-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: #ffffff;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top">
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand fs-4" to="/">
            BRAINOVEN
          </Link>

          {/* Toggler - Traditional Dropdown Style */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Content */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">Contact Us</Link>
              </li>
            </ul>

            {/* Admin Button */}
            <div className="admin-mobile-container">
              <Link to="/admin" className="btn admin-btn d-block d-lg-inline-block">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}