import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

export default function CourseDetails(){
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/courses/${id}`).then(r => setCourse(r.data)).catch(()=>{});
  }, [id]);

  const renderMultiline = (text) => {
    if (!text) return <p className="small">Not provided.</p>;

    // split by newlines, trim, remove empty lines
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return <p className="small">Not provided.</p>;

    // detect bullet list (- or *)
    const allBullets = lines.every(l => /^[-*]\s+/.test(l));
    if (allBullets) {
      return (
        <ul>
          {lines.map((l, i) => <li key={i}>{l.replace(/^[-*]\s+/, '')}</li>)}
        </ul>
      );
    }

    // detect numbered list (1. or 1) )
    const allNumbered = lines.every(l => /^\d+[\.\)]\s+/.test(l));
    if (allNumbered) {
      return (
        <ol>
          {lines.map((l, i) => <li key={i}>{l.replace(/^\d+[\.\)]\s+/, '')}</li>)}
        </ol>
      );
    }

    // fallback: render each line as its own paragraph (line-by-line)
    return (
      <div>
        {lines.map((l, i) => (
          <p key={i} className="small" style={{ margin: "6px 0" }}>{l}</p>
        ))}
      </div>
    );
  };

  if (!course) return <div className="card p-3">Loading...</div>;

  return (
    <div className="card p-4">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>{course.title}</h2>
        <Link to="/services" className="btn btn-sm btn-outline-secondary">Back to Courses</Link>
      </div>

      <p className="small mb-3"><strong>Duration:</strong> {course.duration || "Not specified"}</p>

      <h4>Syllabus</h4>
      {renderMultiline(course.syllabus)}

      <h4 style={{ marginTop: 12 }}>Course Objectives</h4>
      {renderMultiline(course.objectives)}

      <h4 style={{ marginTop: 12 }}>Outcome expected</h4>
      {renderMultiline(course.outcome)}
    </div>
  );
}
