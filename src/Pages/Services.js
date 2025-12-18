// frontend/src/pages/Services.js
import React, { useEffect, useState, useRef } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import FloatingButton from "../Components/FloatingButton";

export default function Services(){
  const [courses, setCourses] = useState([]);
  const scrollRef = useRef(null);

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

  // Scroll helpers for desktop arrows: scroll by one card width (including margin)
  const scrollByCard = (direction = "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.children[0];
    if (!first) return;

    const style = window.getComputedStyle(first);
    const marginRight = parseFloat(style.marginRight || "0");
    const cardWidth = first.getBoundingClientRect().width + marginRight;
    const amount = direction === "right" ? cardWidth : -cardWidth;

    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="container py-5 bg-light min-vh-100">
      <style>{`
        /* Arrow controls only visible on desktop (>=992px) */
        .courses-scroll-wrapper { position: relative; }
        .courses-arrow {
          display: none;
        }
        @media (min-width: 992px) {
          .courses-arrow {
            display: inline-flex;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 50;
            width: 44px;
            height: 44px;
            align-items: center;
            justify-content: center;
            background: rgba(33,37,41,0.78);
            color: white;
            border-radius: 999px;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(15,23,42,0.28);
          }
          .courses-arrow:hover { transform: translateY(-50%) scale(1.03); background: rgba(33,37,41,0.92); }
          .courses-arrow.left { left: 8px; }
          .courses-arrow.right { right: 8px; }
        }

        /* hide scrollbar like other pages */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* COURSES SECTION - Scrollable with dots and 3 visible */}
      <section className="mb-5">
        <h2 className="text-dark mb-4 border-bottom pb-2">Our Courses</h2>

        {/* scroll wrapper places arrows absolutely without affecting flow */}
        <div className="courses-scroll-wrapper mb-2">
          {/* left arrow (desktop-only) */}
          <button
            aria-label="Scroll courses left"
            className="courses-arrow left"
            onClick={() => scrollByCard("left")}
            title="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6 1.41 1.41z" fill="currentColor"/>
            </svg>
          </button>

          {/* right arrow (desktop-only) */}
          <button
            aria-label="Scroll courses right"
            className="courses-arrow right"
            onClick={() => scrollByCard("right")}
            title="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
            </svg>
          </button>

          {/* Scrollable Container with hidden scrollbar */}
          <div
            ref={scrollRef}
            className="d-flex hide-scrollbar"
            style={scrollContainerStyle}
          >
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
                  backgroundColor: '#6c757d',
                  opacity: 0.5,
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
