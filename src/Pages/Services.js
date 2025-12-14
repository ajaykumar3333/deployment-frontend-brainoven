import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import FloatingButton from "../Components/FloatingButton";

export default function Services(){
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses data when the component mounts
    API.get("/courses").then(r => setCourses(r.data)).catch(()=>{});
  }, []);

  // Styles for the scrollable container and items (showing 3 items)
  const scrollContainerStyle = {
    display: "flex",
    overflowX: "scroll",
    scrollSnapType: "x mandatory",
    paddingBottom: "1rem", 
  };

  const scrollItemStyle = {
    // Allows ~3 items on a standard wide screen, adjusts for responsiveness
    flex: "0 0 32%", 
    minWidth: "300px", 
    scrollSnapAlign: "start",
    marginRight: "1.5%", // Gap between cards
  };

  // Logic to generate dots (non-functional indicator)
  const numPages = Math.ceil(courses.length / 3);
  const dotIndicators = Array.from({ length: numPages }, (_, i) => i);


  return (
    <div className="container py-5 bg-light min-vh-100">
      
      {/* COURSES SECTION - Scrollable with dots and 3 visible */}
      <section className="mb-5">
        <h2 className="text-dark mb-4 border-bottom pb-2">Our Courses</h2>
        
        {/* Scrollable Container with hidden scrollbar */}
        <div className="d-flex hide-scrollbar" style={scrollContainerStyle}>
          {courses.length === 0 && (
            <div className="w-100"><p className="text-muted">No courses are currently available. Admin can add courses from dashboard.</p></div>
          )}
          {courses.map(c => (
            <div key={c._id} style={scrollItemStyle}>
              <div className="card h-100 bg-white border-secondary shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-dark">{c.title}</h3>
                  <p className="card-subtitle mb-2 text-muted small">{c.duration || "Duration not specified"}</p>
                  <p className="card-text mt-3 small">
                    {c.syllabus?.slice(0, 100)}{c.syllabus?.length > 100 ? "..." : "Click view details for full syllabus."}
                  </p>
                  <Link
                    to={`/course/${c._id}`}
                    className="btn btn-dark btn-sm mt-3"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS INDICATORS */}
        {courses.length > 0 && (
          <div className="d-flex justify-content-center mt-3">
            {dotIndicators.map((_, index) => (
              <span 
                key={index} 
                className="mx-1"
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#6c757d', // Grey color for dots
                  opacity: 0.5,
                  // Note: True active state for dots would require adding scroll tracking logic.
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Internships Section */}
      <section className="mb-5">
        <h2 className="text-dark mb-4 border-bottom pb-2">Internships</h2>
        <div className="card bg-dark text-white shadow-lg p-4">
          <ul className="list-unstyled mb-0 fs-5">
            <li className="mb-2"><i className="bi bi-laptop me-2"></i> Online internship</li>
            <li className="mb-2"><i className="bi bi-building me-2"></i> Offline internship</li>
            <li className="mb-2"><i className="bi bi-code-slash me-2"></i> Project-based internship</li>
          </ul>
        </div>
      </section>

      {/* What Students Get Section */}
      <section className="mb-5">
        <h2 className="text-dark mb-4 border-bottom pb-2">What Students Get</h2>
        <div className="card bg-dark text-white shadow-lg p-4">
          <ul className="list-unstyled mb-0 fs-5">
            <li className="mb-2"><i className="bi bi-patch-check-fill me-2"></i> Completion certificate</li>
            <li className="mb-2"><i className="bi bi-folder-fill me-2"></i> Real project experience</li>
            <li className="mb-2"><i className="bi bi-file-earmark-person-fill me-2"></i> Resume guidance</li>
            <li className="mb-2"><i className="bi bi-person-workspace me-2"></i> Placement preparation</li>
          </ul>
        </div>
      </section>

      <FloatingButton />
    </div>
  );
}