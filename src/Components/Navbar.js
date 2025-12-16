import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      {/* The style block fixes the mobile menu background issue.
        When the navbar-collapse element is open (.show), it applies 
        the dark background to prevent it from blending with white page content.
      */}
      <style jsx="true">{`
        .navbar-collapse.show {
          background-color: #212529; /* bg-dark color */
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
          border-radius: 0 0 8px 8px; /* Optional: smooth corners at the bottom */
        }
        .navbar-nav .nav-link:hover {
            color: #00ADB5 !important; /* Custom accent color for hover */
        }
      `}</style>

      {/* Navbar component with fixed top, dark theme, and custom height */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
        style={{
          minHeight: "80px",
          maxHeight: "80px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.8)", /* Darker shadow for depth */
        }}
      >
        <div className="container-fluid">
          {/* Brand Link - Using an accent color for high visibility */}
          <Link
            className="navbar-brand fs-4"
            to="/"
            style={{ color: "#00ADB5", fontWeight: "bolder", letterSpacing: "1px" }}
          >
            BRAINOVEN
          </Link>

          {/* Toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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

            {/* Admin Link aligned to the right */}
            <Link to="/admin" className="btn btn-outline-light btn-sm ms-lg-3 hover-lift">
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}