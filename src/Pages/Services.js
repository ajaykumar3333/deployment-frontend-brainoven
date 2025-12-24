import React, { useEffect, useState, useRef } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import FloatingButton from "../Components/FloatingButton";

export default function Services(){
  const [courses, setCourses] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    API.get("/courses").then(r => setCourses(r.data)).catch(()=>{});
  }, []);

  const scrollContainerStyle = {
    display: "flex",
    overflowX: "scroll",
    scrollSnapType: "x mandatory",
    paddingBottom: "1rem",
  };

  const scrollItemStyle = {
    flex: "0 0 32%",
    minWidth: "300px",
    scrollSnapAlign: "start",
    marginRight: "1.5%",
  };

  const numPages = Math.ceil(courses.length / 3);
  const dotIndicators = Array.from({ length: numPages }, (_, i) => i);

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

  // helper: preview first 1-2 lines of syllabus
  const syllabusPreview = (s) => {
    if (!s) return "Not provided.";
    const lines = s.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return "Not provided.";
    const preview = lines.slice(0,2).join(' ');
    return preview.length > 180 ? preview.slice(0,177) + '...' : preview;
  };

  // Inline fallback SVG placeholder (data URL). Keeps UI working if you haven't added your own image.
  const fallbackSvgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
      <rect width='100%' height='100%' fill='#f1f3f5'/>
      <g fill='#6c757d' font-family='Arial, Helvetica, sans-serif' font-size='36' text-anchor='middle'>
        <text x='50%' y='45%'>Image placeholder</text>
        <text x='50%' y='55%' font-size='20'>Put your image in /public/images/</text>
      </g>
    </svg>`
  )}`;

  return (
    <div className="container py-5 bg-light min-vh-100">
      <style>{`
        .courses-scroll-wrapper { position: relative; }
        .courses-arrow { display: none; }
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

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Shared image sizing */
        .section-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 8px;
          display: block;
        }

        /* NEW: Internships layout */
        .internships {
          display: flex;
          gap: 20px;
          align-items: center;
          background: #fff;
          padding: 18px;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(20,20,30,0.04);
        }
        .internships .internship-image {
          flex: 0 0 45%;
        }
        .internships .internship-content {
          flex: 1 1 55%;
        }
        .internships h3 { margin-top: 0; }
        .internships .intern-item { margin-bottom: 12px; }
        .internships .intern-item-title { font-weight: 700; margin-bottom: 6px; }
        .internships .intern-item-desc { margin: 0; color: #343a40; }

        /* What Students Get layout (LEFT content, RIGHT image) */
        .students-get {
          display: flex;
          gap: 20px;
          align-items: center;
          background: #fff;
          padding: 18px;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(20,20,30,0.04);
        }
        .students-get .sg-content {
          flex: 1 1 55%;
        }
        .students-get .sg-image {
          flex: 0 0 45%;
        }
        .sg-item { margin-bottom: 12px; }
        .sg-title { font-weight: 700; margin-bottom: 6px; }
        .sg-desc { margin: 0; color: #343a40; }

        /* Certificates section: two images, 500px each but responsive */
        .certificates {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          background: #fff;
          padding: 18px;
          border-radius: 10px;
          box-shadow: 0 6px 18px rgba(20,20,30,0.04);
        }
        .certificates .cert-img {
          width: 500px;
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
          display: block;
        }

        /* Responsive adjustments */
        @media (max-width: 767.98px) {
          .internships, .students-get {
            flex-direction: column;
          }
          .internships .internship-image, .internships .internship-content,
          .students-get .sg-image, .students-get .sg-content {
            flex: 1 1 auto;
            width: 100%;
          }

          .section-image {
            height: auto;
          }

          .certificates {
            padding: 12px;
            gap: 12px;
          }
          .certificates .cert-img {
            width: 100%; /* stack and be full width on small screens */
            height: auto;
          }
        }
      `}</style>

      <section className="mb-5">
        <h2 className="text-dark mb-4 border-bottom pb-2">Our Courses</h2>

        <div className="courses-scroll-wrapper mb-2">
          <button aria-label="Scroll courses left" className="courses-arrow left" onClick={() => scrollByCard("left")} title="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6 1.41 1.41z" fill="currentColor"/>
            </svg>
          </button>

          <button aria-label="Scroll courses right" className="courses-arrow right" onClick={() => scrollByCard("right")} title="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
            </svg>
          </button>

          <div ref={scrollRef} className="d-flex hide-scrollbar" style={scrollContainerStyle}>
            {courses.length === 0 && (
              <div className="w-100"><p className="text-muted">No courses are currently available. Admin can add courses from dashboard.</p></div>
            )}
            {courses.map(c => (
              <div key={c._id} style={scrollItemStyle}>
                <div className="card h-100 bg-white border-secondary shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title text-dark">{c.title}</h3>
                    <p className="card-subtitle mb-2 text-muted small">{c.duration || "Duration not specified"}</p>
                    <p className="card-text mt-3 small" style={{ flex: 1 }}>
                      {syllabusPreview(c.syllabus)}
                      { (c.syllabus && (c.syllabus.split(/\r?\n/).filter(Boolean).length > 2 || (c.syllabus.length > 180)) ) && " ..."}
                    </p>
                    <div className="mt-3">
                      <Link to={`/course/${c._id}`} className="btn btn-dark btn-sm">View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {courses.length > 0 && (
          <div className="d-flex justify-content-center mt-3">
            {dotIndicators.map((_, index) => (
              <span key={index} className="mx-1" style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6c757d', opacity: 0.5 }} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-5">
        <h2 className="text-dark mb-4 border-bottom pb-2">Internships</h2>

        <div className="internships">
          <div className="internship-image" aria-hidden>
            <img
              className="section-image"
              src="/internships-image.jpg"
              alt="Internships illustration (replace at /public/images/internship-placeholder.jpg)"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackSvgDataUrl; }}
              loading="lazy"
            />
          </div>

          <div className="internship-content">
            <div className="intern-item">
              <div className="intern-item-title">Online Internship</div>
              <p className="intern-item-desc">
                Enables students to gain industry-relevant experience remotely with flexible schedules and wider accessibility.
              </p>
            </div>

            <div className="intern-item">
              <div className="intern-item-title">Offline Internship</div>
              <p className="intern-item-desc">
                Provides hands-on training, direct mentorship, and real-time collaboration in a professional environment.
              </p>
            </div>

            <div className="intern-item">
              <div className="intern-item-title">Project-Based Internship</div>
              <p className="intern-item-desc">
                Allows students to build practical skills by working on real-world projects with measurable outcomes and portfolio value.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-dark mb-4 border-bottom pb-2">What Students Get</h2>

        <div className="students-get">
          <div className="sg-content" aria-live="polite">
            <div className="sg-item">
              <div className="sg-title">Completion Certificate</div>
              <p className="sg-desc">
                Students receive an industry-recognized certificate that validates their skills and enhances their credibility.
              </p>
            </div>

            <div className="sg-item">
              <div className="sg-title">Real Project Experience</div>
              <p className="sg-desc">
                Students gain hands-on exposure by working on real-world projects that build practical and job-ready skills.
              </p>
            </div>

            <div className="sg-item">
              <div className="sg-title">Resume Guidance</div>
              <p className="sg-desc">
                Students get expert guidance to create a professional, ATS-friendly resume that highlights their strengths.
              </p>
            </div>

            <div className="sg-item">
              <div className="sg-title">Placement Preparation</div>
              <p className="sg-desc">
                Students are trained with mock interviews, aptitude practice, and technical sessions to confidently crack job interviews.
              </p>
            </div>
          </div>

          <div className="sg-image" aria-hidden>
            <img
              className="section-image"
              src="/what-students-get.jpg"
              alt="What students get illustration (replace at /public/images/what-students-get.jpg)"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackSvgDataUrl; }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* --- Certificates section: only images (500px each, responsive) --- */}
      <section className="mb-5">
        <h2 className="text-dark mb-4 border-bottom pb-2">Certificates We Provide</h2>

        <div className="certificates" role="list">
          <img
            src="/certificate-2.jpg"
            alt="Landscape certificate placeholder (replace at /public/images/certificate-2.jpg)"
            className="cert-img"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackSvgDataUrl; }}
            loading="lazy"
            role="listitem"
          />

          <img
            src="/certificate-1.jpg"
            alt="Portrait certificate placeholder (replace at /public/images/certificate-1.jpg)"
            className="cert-img"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackSvgDataUrl; }}
            loading="lazy"
            role="listitem"
          />
        </div>
      </section>

      <FloatingButton />
    </div>
  );
}
