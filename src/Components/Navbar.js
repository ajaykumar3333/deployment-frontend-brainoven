import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    // Navbar component with fixed top, dark theme, and custom height
    <nav 
      className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
      style={{ minHeight: "80px", maxHeight: "80px", boxShadow: "0 2px 5px rgba(0,0,0,0.5)" }}
    >
      <div className="container-fluid">
        {/* Brand Link */}
        <Link className="navbar-brand fs-4" to="/" style={{ color: "#f8f9fa", fontWeight: "bold" }}>
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
          <Link to="/admin" className="btn btn-outline-light btn-sm ms-lg-3">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}