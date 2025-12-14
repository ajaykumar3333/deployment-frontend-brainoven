// frontend/src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function authConfig(){
  const token = localStorage.getItem("brainoven_token");
  return { headers: { Authorization: token ? `Bearer ${token}` : "" } };
}

export default function AdminDashboard(){
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [stories, setStories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [students, setStudents] = useState([]);

  // course form
  const [cTitle, setCTitle] = useState("");
  const [cSyllabus, setCSyllabus] = useState("");
  const [cDuration, setCDuration] = useState("");
  const [cObjectives, setCObjectives] = useState("");
  const [cOutcome, setCOutcome] = useState("");

  // story form
  const [sName, setSName] = useState("");
  const [sTitle, setSTitle] = useState("");
  const [sContent, setSContent] = useState("");
  const [sImage, setSImage] = useState("");

  // gallery form
  const [gTitle, setGTitle] = useState("");
  const [gImage, setGImage] = useState("");
  const [gCaption, setGCaption] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("brainoven_token");
    if(!token) navigate("/admin");
    fetchAll();
  }, [navigate]);

  const fetchAll = async () => {
    try {
      const [cRes, sRes, gRes, stRes] = await Promise.all([
        API.get("/courses"),
        API.get("/successStories"),
        API.get("/gallery"),
        API.get("/students/all", authConfig()) // protected endpoint
      ]);
      setCourses(cRes.data);
      setStories(sRes.data);
      setGallery(gRes.data);
      setStudents(stRes.data || []);
    } catch (e) {
      console.error(e);
      // if unauthorized, redirect to login
      if (e.response && e.response.status === 401) {
        localStorage.removeItem("brainoven_token");
        navigate("/admin");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("brainoven_token");
    navigate("/");
  };

  // Course handlers
  const addCourse = async () => {
    try {
      const res = await API.post("/admin/content/courses", {
        title: cTitle, syllabus: cSyllabus, duration: cDuration, objectives: cObjectives, outcome: cOutcome
      }, authConfig());
      setCourses(prev=>[res.data, ...prev]);
      setCTitle(""); setCSyllabus(""); setCDuration(""); setCObjectives(""); setCOutcome("");
    } catch (e) { alert("Error adding course (auth?)") }
  };

  const deleteCourse = async (id) => {
    if(!window.confirm("Delete course?")) return;
    try {
      await API.delete(`/admin/content/courses/${id}`, authConfig());
      setCourses(prev => prev.filter(p=>p._id !== id));
    } catch (e) { alert("Error deleting"); }
  };

  // story handlers
  const addStory = async () => {
    try {
      const res = await API.post("/admin/content/successStories", {
        studentName: sName, title: sTitle, content: sContent, imageUrl: sImage
      }, authConfig());
      setStories(prev=>[res.data, ...prev]);
      setSName(""); setSTitle(""); setSContent(""); setSImage("");
    } catch (e) { alert("Error adding story") }
  };

  const deleteStory = async (id) => {
    if(!window.confirm("Delete story?")) return;
    try { await API.delete(`/admin/content/successStories/${id}`, authConfig()); setStories(prev => prev.filter(p=>p._id !== id)); } catch(e){ alert("Error") }
  };

  // gallery handlers
  const addGallery = async () => {
    try {
      const res = await API.post("/admin/content/gallery", { title: gTitle, imageUrl: gImage, caption: gCaption }, authConfig());
      setGallery(prev=>[res.data, ...prev]);
      setGTitle(""); setGImage(""); setGCaption("");
    } catch (e) { alert("Error adding gallery item") }
  };

  const deleteGallery = async (id) => {
    if(!window.confirm("Delete item?")) return;
    try { await API.delete(`/admin/content/gallery/${id}`, authConfig()); setGallery(prev => prev.filter(p=>p._id !== id)); } catch(e){ alert("Error") }
  };

  return (
    <>
      <div className="card" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Admin Dashboard</h2>
        <div style={{display:"flex", gap:8}}>
          <button className="btn" onClick={fetchAll} style={{color:"white"}}>Refresh</button>
          <button className="btn ghost" onClick={logout}>Logout</button>
        </div>
      </div>

      {/* COURSES (existing) */}
      <div className="card">
        <h3>Add Course</h3>
        <div className="form-row">
          <input placeholder="Title" value={cTitle} onChange={e=>setCTitle(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Duration" value={cDuration} onChange={e=>setCDuration(e.target.value)} />
          <input placeholder="Outcome" value={cOutcome} onChange={e=>setCOutcome(e.target.value)} />
        </div>
        <div className="form-row">
          <textarea placeholder="Syllabus" rows="3" value={cSyllabus} onChange={e=>setCSyllabus(e.target.value)} />
        </div>
        <div className="form-row">
          <textarea placeholder="Objectives" rows="2" value={cObjectives} onChange={e=>setCObjectives(e.target.value)} />
        </div>
        <div style={{display:"flex", gap:8}}>
          <button className="btn" onClick={addCourse}>Add Course</button>
        </div>
      </div>

      <div className="card">
        <h3>Existing Courses</h3>
        <table className="table">
          <thead><tr><th>Title</th><th>Duration</th><th>Actions</th></tr></thead>
          <tbody>
            {courses.map(c=>(
              <tr key={c._id}>
                <td>{c.title}</td>
                <td className="small">{c.duration}</td>
                <td>
                  <button className="btn ghost" onClick={()=>{navigator.clipboard?.writeText(window.location.origin + "/course/" + c._id)}}>Copy Link</button>
                  <button className="btn" onClick={()=>deleteCourse(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUCCESS STORIES */}
      <div className="card">
        <h3>Add Success Story</h3>
        <div className="form-row">
          <input placeholder="Student name" value={sName} onChange={e=>setSName(e.target.value)} />
          <input placeholder="Title" value={sTitle} onChange={e=>setSTitle(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Image URL" value={sImage} onChange={e=>setSImage(e.target.value)} />
        </div>
        <div className="form-row">
          <textarea placeholder="Content" rows="3" value={sContent} onChange={e=>setSContent(e.target.value)} />
        </div>
        <div>
          <button className="btn" onClick={addStory}>Add Story</button>
        </div>

        <h4 style={{marginTop:16}}>Existing Stories</h4>
        <table className="table">
          <thead><tr><th>Student</th><th>Title</th><th>Actions</th></tr></thead>
          <tbody>
            {stories.map(s=>(
              <tr key={s._id}>
                <td>{s.studentName}</td>
                <td className="small">{s.title}</td>
                <td>
                  <button className="btn" onClick={()=>deleteStory(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GALLERY */}
      <div className="card">
        <h3>Add Gallery Item</h3>
        <div className="form-row">
          <input placeholder="Title" value={gTitle} onChange={e=>setGTitle(e.target.value)} />
          <input placeholder="Image URL" value={gImage} onChange={e=>setGImage(e.target.value)} />
        </div>
        <div className="form-row">
          <input placeholder="Caption" value={gCaption} onChange={e=>setGCaption(e.target.value)} />
        </div>
        <div><button className="btn" onClick={addGallery}>Add to Gallery</button></div>

        <h4 style={{marginTop:12}}>Gallery</h4>
        <table className="table">
          <thead><tr><th>Title</th><th>Image</th><th>Actions</th></tr></thead>
          <tbody>
            {gallery.map(g=>(
              <tr key={g._id}>
                <td>{g.title}</td>
                <td className="small">{g.imageUrl}</td>
                <td><button className="btn" onClick={()=>deleteGallery(g._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STUDENT SUBMISSIONS */}
      <div className="card">
        <h3>Student Enquiries</h3>
        {students.length === 0 ? (
          <p className="small">No submissions yet.</p>
        ) : (
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Submitted</th></tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td className="small">{s.email}</td>
                  <td className="small">{s.phone}</td>
                  <td className="small">{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
