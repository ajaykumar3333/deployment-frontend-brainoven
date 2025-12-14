// frontend/src/pages/Home.js
import React, { useEffect, useState } from "react";
import API from "../api"; 
import { Link } from "react-router-dom";
import FloatingButton from "../Components/FloatingButton";

// --- COMMON SCROLL STYLES (Moved outside component) ---
const scrollContainerStyle = {
  display: "flex",
  overflowX: "scroll",
  scrollSnapType: "x mandatory",
  paddingBottom: "1rem", // Space for the scrollbar/shadow
};

// Item style set to 100% width of the container on all screens for a carousel effect
const heroScrollItemStyle = {
  flex: "0 0 100%", // Take up 100% width of the scroll container
  scrollSnapAlign: "start",
};

const contentScrollItemStyle = {
  flex: "0 0 320px", // Fixed width for scroll snapping in other sections
  scrollSnapAlign: "start",
  marginRight: "1rem", // Gap between cards
};

// Placeholder for default card images
const imagePlaceholderUrl = "https://images.unsplash.com/photo-1549692520-2228801d0f81?auto=format&fit=crop&w=600&q=80";

export default function Home() {
  const [courses, setCourses] = useState([]); 
  const [stories, setStories] = useState([]);
  const [gallery, setGallery] = useState([]);

  // --- HERO IMAGE DATA ---
  const heroImages = [
    { 
      id: 1, 
      imageUrl: "https://www.21kschool.com/in/wp-content/uploads/sites/4/2023/11/15-Facts-About-Coding-Every-Kid-Should-Know.png",
      title: "Fueling Tech Careers",
      subtitle: "Hands-on, Industry-Focused Training and Mentorship.",
      buttonText: "Explore Our Programs",
      link: "/services"
    },
    { 
      id: 2, 
      imageUrl: "https://www.21kschool.com/in/wp-content/uploads/sites/4/2023/11/15-Facts-About-Coding-Every-Kid-Should-Know.png",
      title: "Become a Full Stack Developer",
      subtitle: "Master MERN/MEAN stack with live projects and expert guidance.",
      buttonText: "View Courses",
      link: "/courses"
    },
    { 
      id: 3, 
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Guaranteed Placement Assistance",
      subtitle: "We stand by your career journey from coding to job offer.",
      buttonText: "Contact Us",
      link: "/contact"
    }
  ];
  // --- END HERO IMAGE DATA ---

  useEffect(() => {
    // API calls remain the same
    API.get("/courses").then(r => setCourses(r.data)).catch(()=>{});
    API.get("/successStories").then(r => setStories(r.data)).catch(()=>{});
    API.get("/gallery").then(r => setGallery(r.data)).catch(()=>{});
  }, []);

  const whyPoints = [
    // Consolidated to remove duplicates and use standard structure
    { id: "hybrid", title: "Hybrid Learning Options", text: "Flexible online + offline classes so you can learn at your pace.", icon: "bi-tablet-landscape-fill" },
    { id: "expert", title: "Expert-Led Training", text: "Learn directly from industry professionals with real experience.", icon: "bi-person-badge-fill" },
    { id: "projects", title: "Project-Based Approach", text: "Every course includes hands-on projects for your portfolio.", icon: "bi-code-slash" },
    { id: "internship", title: "Internship Programs", text: "Gain practical experience through guided internships.", icon: "bi-briefcase-fill" },
    { id: "kits", title: "Startup Project Kits", text: "Launch-ready project kits for startups and college students.", icon: "bi-lightning-charge-fill" },
    { id: "placement", title: "Placement Assistance", text: "Resume building, mock interviews, and job guidance.", icon: "bi-flag-fill" },
  ];

  return (
    <div className="bg-light pb-5"> 
      
      {/* 1. HEADER: Scrollable Hero Carousel */}
      <header className="mb-5 shadow-lg overflow-hidden">
        <div className="d-flex hide-scrollbar" style={{ ...scrollContainerStyle, paddingBottom: 0 }}>
          {heroImages.map((hero) => (
            <div key={hero.id} style={heroScrollItemStyle}>
              <div 
                className="text-white p-5 text-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${hero.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <div className="container"> 
                  <h1 className="display-3 fw-bolder mb-3">{hero.title}</h1>
                  <p className="lead fs-4" style={{ color: "#adb5bd" }}>
                    {hero.subtitle}
                  </p>
                  <Link to={hero.link} className="btn btn-lg btn-warning fw-bold mt-3">{hero.buttonText}</Link> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* All subsequent sections will use a limited-width container */}
      <div className="container">

        {/* 2. ABOUT US SUMMARY (Using the requested content in a grid) */}
        <section className="mb-5">
            <h2 className="text-center mb-4 text-dark display-6 fw-bold">About BrainOven</h2>
            <div className="row g-4 justify-content-center">
                
                {/* Why the name BrainOven? */}
                <div className="col-lg-4 col-md-6">
                    <div className="card h-100 shadow-sm p-4 border-0">
                        <h3 className="card-title fs-5 fw-bold text-dark">Why the name BrainOven? 💡</h3>
                        <p className="card-text text-muted">At **BrainOven** we **'bake' raw talent** into industry-ready tech professionals — thoughtfully guided, applied, and tested.</p>
                    </div>
                </div>

                {/* Mission */}
                <div className="col-lg-4 col-md-6">
                    <div className="card h-100 shadow-sm p-4 border-0">
                        <h3 className="card-title fs-5 fw-bold text-dark">Mission 🎯</h3>
                        <p className="card-text text-muted">“Transforming raw talent into skilled tech professionals” by focusing on practical, industry-relevant skills.</p>
                    </div>
                </div>

                {/* Trainers' Experience */}
                <div className="col-lg-4 col-md-6">
                    <div className="card h-100 shadow-sm p-4 border-0">
                        <h3 className="card-title fs-5 fw-bold text-dark">Trainers' Experience 👨‍💻</h3>
                        <p className="card-text text-muted">Our trainers bring years of **real industry experience**, mentoring students with practical projects and live problem solving.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <hr className="my-5" />

        {/* 3. WHY BRAINOVEN — Horizontal Scrollable Cards */}
        <section className="mb-5">
            <h2 className="text-center mb-4 text-dark display-6 fw-bold">Why Choose BrainOven?</h2>
            
            {/* Scrollable Container */}
            <div className="d-flex hide-scrollbar" style={scrollContainerStyle}>
            {whyPoints.map((point, index) => (
                <div key={point.id} style={contentScrollItemStyle}>
                <div 
                    className="card text-white bg-dark border-secondary h-100 shadow-lg"
                    style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    minHeight: "260px"
                    }}
                >
                    {/* Background Image */}
                    <img
                    src={gallery[index]?.imageUrl || imagePlaceholderUrl}
                    alt={point.title}
                    className="card-img"
                    style={{
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.55)" // Darken the image for text contrast
                    }}
                    />

                    {/* Overlay Text */}
                    <div 
                    className="card-img-overlay d-flex flex-column justify-content-end p-4"
                    style={{
                        background: "linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.85))"
                    }}
                    >
                        <i className={`bi ${point.icon || 'bi-book-half'} fs-1 mb-2 text-warning`}></i>
                        <h3 className="card-title fs-5 fw-bold mb-1">{point.title}</h3>
                        <p className="card-text small mb-0" style={{ color: "#dcdcdc" }}>{point.text}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </section>

        <hr className="my-5" />

        {/* 4. SUCCESS STORIES — Horizontal Scrollable Cards */}
        <section className="mb-5">
            <h2 className="text-center mb-4 text-dark display-6 fw-bold">Student Success Stories 🎓</h2>
            
            {/* Scrollable Container with hidden scrollbar */}
            <div className="d-flex hide-scrollbar" style={scrollContainerStyle}>
            {stories.length === 0 && <div className="col"><p className="text-muted">No success stories yet.</p></div>}
            {stories.map(s => (
                <div key={s._id} style={contentScrollItemStyle}>
                <div className="card h-100 bg-white border-secondary shadow-sm">
                    <img
                    src={s.imageUrl || "https://via.placeholder.com/320x180"}
                    alt={s.title}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                    <h4 className="card-title fs-5 fw-bold">{s.studentName}</h4>
                    <p className="card-subtitle mb-2 text-primary small">{s.title}</p>
                    <p className="card-text small mt-3 text-muted">
                        {s.content?.slice(0, 120)}{s.content?.length > 120 ? "..." : ""}
                    </p>
                    </div>
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