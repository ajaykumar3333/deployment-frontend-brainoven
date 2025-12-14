// frontend/src/pages/About.js
import React, { useState } from "react";
import FloatingButton from "../Components/FloatingButton";
// Removed unused imports (API, useState) that were commented out

export default function About() {
  const heroImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQ_EG4DcNIFlf0Fn_Y9EP9VhI-imQCFDFUA&s";
  // The trainingImage variable is no longer needed but kept for completeness if needed elsewhere
  // const trainingImage = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const dummyCertifications = [
    { title: "MERN Stack Certification", icon: "bi-file-earmark-code" },
    { title: "React Development Specialist", icon: "bi-file-earmark-check" },
    { title: "Backend API Mastery", icon: "bi-gear-wide-connected" },
  ];

  return (
    <div className="bg-light pb-5">
      
      {/* 1. HERO SECTION: Decreased Height */}
      <header 
        className="text-center text-white py-5 mb-5 shadow-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px', 
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container py-4">
          <h1 className="display-4 fw-bold">About BrainOven</h1>
          <p className="lead mt-3 mx-auto" style={{ maxWidth: '800px' }}>
            We're dedicated to transforming raw talent into **skilled, industry-ready tech professionals** through practical mentorship.
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="container">

        {/* 2. CORE ABOUT CONTENT (Ethos, Mission, Trainers) - THREE IN A LINE */}
        <section className="mb-5">
            <h2 className="text-center display-6 fw-bold mb-5 text-dark">Our Ethos: Bake Your Future 🧠</h2>
            <div className="row g-4 text-center justify-content-center"> 
                
                {/* Why the name BrainOven? */}
                <div className="col-lg-4 col-md-6"> 
                    <div className="card h-100 shadow p-4 border-0">
                        <i className="bi bi-fire text-danger fs-1 mb-3"></i>
                        <h3 className="card-title fs-5 fw-bold text-dark">Why BrainOven?</h3>
                        <p className="card-text text-muted">We **'bake' raw talent** into professionals — thoughtfully guided, applied, and tested to be industry-ready.</p>
                    </div>
                </div>

                {/* Mission */}
                <div className="col-lg-4 col-md-6"> 
                    <div className="card h-100 shadow p-4 border-0">
                        <i className="bi bi-bullseye text-success fs-1 mb-3"></i>
                        <h3 className="card-title fs-5 fw-bold text-dark">Core Mission</h3>
                        <p className="card-text text-muted">“Transforming raw talent into skilled tech professionals” through focused and practical training programs.</p>
                    </div>
                </div>

                {/* Trainers' Experience */}
                <div className="col-lg-4 col-md-12"> 
                    <div className="card h-100 shadow p-4 border-0">
                        <i className="bi bi-person-workspace text-primary fs-1 mb-3"></i>
                        <h3 className="card-title fs-5 fw-bold text-dark">Trainers' Experience</h3>
                        <p className="card-text text-muted">Our trainers bring years of **real industry experience**, mentoring students with practical projects and live problem solving.</p>
                    </div>
                </div>
            </div>
        </section>

        <hr className="my-5" />

        {/* 3. TRAINING METHOD (Content Centered, Image Removed) */}
        <section className="row justify-content-center mb-5 text-center">
            
            {/* TEXT CONTENT (Centered in a medium column) */}
            <div className="col-lg-8"> 
                <h2 className="display-6 fw-bold mb-4 text-dark">Our Training Method 🛠️</h2>
                <p className="lead text-muted mb-5">We combine expert guidance with hands-on practice, ensuring every student is job-ready from day one. Our method is simple, effective, and result-oriented.</p>
                
                {/* Re-adding the three core points for clarity, but in a centered list/card */}
                <div className="card bg-white p-4 border-0 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                    <h3 className="fs-5 fw-semibold mb-3">We follow a three-pronged approach:</h3>
                    <ul className="list-group list-group-flush text-start">
                        <li className="list-group-item d-flex align-items-center">
                            <i className="bi bi-tools text-danger me-3 fs-4"></i>
                            <div>
                                <span className="fw-bold">Practical</span> — Hands-on, real-world projects from day one.
                            </div>
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                            <i className="bi bi-compass text-primary me-3 fs-4"></i>
                            <div>
                                <span className="fw-bold">Guided</span> — Step-by-step mentorship and personalized feedback from experts.
                            </div>
                        </li>
                        <li className="list-group-item d-flex align-items-center">
                            <i className="bi bi-bar-chart-fill text-success me-3 fs-4"></i>
                            <div>
                                <span className="fw-bold">Structured</span> — Clear milestones, outcome-based modules, and verifiable results.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <hr className="my-5" />

        {/* 4. DUMMY CERTIFICATIONS SECTION */}
        <section className="mb-5 text-center p-4 bg-primary text-white rounded shadow-lg">
            <h2 className="display-6 fw-bold mb-4">Earn Verifiable Certifications 📜</h2>
            <p className="lead mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Demonstrate your mastery with industry-recognized certificates upon course completion.
            </p>
            <div className="row justify-content-center g-3">
                {dummyCertifications.map((cert, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                        <div className="card h-100 bg-light text-dark p-3 border-0">
                            <i className={`bi ${cert.icon} text-primary fs-3 mb-2 mx-auto`}></i>
                            <h4 className="fs-6 fw-bold">{cert.title}</h4>
                            <p className="small mb-0 text-muted">Certification of Completion</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </div>
      
      <FloatingButton />
    </div>
  );
}