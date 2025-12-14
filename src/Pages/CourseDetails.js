import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function CourseDetails(){
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/courses/${id}`).then(r => setCourse(r.data)).catch(()=>{});
  }, [id]);

  if (!course) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2>{course.title}</h2>
      <p className="small">Duration: {course.duration}</p>

      <h3>Syllabus</h3>
      <p>{course.syllabus || "Not provided."}</p>

      <h3>Course Objectives</h3>
      <p>{course.objectives || "Not provided."}</p>

      <h3>Outcome expected</h3>
      <p>{course.outcome || "Not provided."}</p>
    </div>
  );
}
