import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Accordion from "../Components/Accordion";

function authConfig(){
  const token = localStorage.getItem("brainoven_token");
  return { headers: { Authorization: token ? `Bearer ${token}` : "" } };
}

export default function AdminDashboard(){
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [stories, setStories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [faqs, setFaqs] = useState([]);
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

  // Accordion / FAQ form
  const [fqQuestion, setFqQuestion] = useState("");
  const [fqAnswer, setFqAnswer] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("brainoven_token");
    if(!token) navigate("/admin");
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchAll = async () => {
    try {
      const [cRes, sRes, gRes, stRes, fRes] = await Promise.all([
        API.get("/courses"),
        API.get("/successStories"),
        API.get("/gallery"),
        API.get("/students/all", authConfig()), // protected endpoint
        API.get("/faqs"), // public faq list
      ]);

      setCourses(cRes.data || []);
      setStories(sRes.data || []);
      setGallery(gRes.data || []);
      setStudents(stRes.data || []);
      setFaqs(fRes.data || []);
    } catch (e) {
      console.error(e);
      // if unauthorized, redirect to login
      if (e?.response?.status === 401) {
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
    } catch (e) { console.error(e); alert("Error adding course (auth?)") }
  };

  const deleteCourse = async (id) => {
    if(!window.confirm("Delete course?")) return;
    try {
      await API.delete(`/admin/content/courses/${id}`, authConfig());
      setCourses(prev => prev.filter(p=>p._id !== id));
    } catch (e) { console.error(e); alert("Error deleting"); }
  };

  // story handlers
  const addStory = async () => {
    try {
      const res = await API.post("/admin/content/successStories", {
        studentName: sName, title: sTitle, content: sContent, imageUrl: sImage
      }, authConfig());
      setStories(prev=>[res.data, ...prev]);
      setSName(""); setSTitle(""); setSContent(""); setSImage("");
    } catch (e) { console.error(e); alert("Error adding story") }
  };

  const deleteStory = async (id) => {
    if(!window.confirm("Delete story?")) return;
    try { await API.delete(`/admin/content/successStories/${id}`, authConfig()); setStories(prev => prev.filter(p=>p._id !== id)); } catch(e){ console.error(e); alert("Error") }
  };

  // gallery handlers
  const addGallery = async () => {
    try {
      const res = await API.post("/admin/content/gallery", { title: gTitle, imageUrl: gImage, caption: gCaption }, authConfig());
      setGallery(prev=>[res.data, ...prev]);
      setGTitle(""); setGImage(""); setGCaption("");
    } catch (e) { console.error(e); alert("Error adding gallery item") }
  };

  const deleteGallery = async (id) => {
    if(!window.confirm("Delete item?")) return;
    try { await API.delete(`/admin/content/gallery/${id}`, authConfig()); setGallery(prev => prev.filter(p=>p._id !== id)); } catch(e){ console.error(e); alert("Error") }
  };

  // FAQ handlers
  const addFaq = async () => {
    try {
      const res = await API.post("/admin/content/faqs", { question: fqQuestion, answer: fqAnswer }, authConfig());
      setFaqs(prev => [res.data, ...prev]);
      setFqQuestion(""); setFqAnswer("");
    } catch (e) {
      console.error(e);
      alert("Error adding FAQ (auth?)");
    }
  };

  const deleteFaq = async (id) => {
    if (!window.confirm("Delete FAQ?")) return;
    try {
      await API.delete(`/admin/content/faqs/${id}`, authConfig());
      setFaqs(prev => prev.filter(f => f._id !== id));
    } catch (e) {
      console.error(e);
      alert("Error deleting FAQ");
    }
  };

  return (
    <>
      {/* --------- Mobile / Visual Enhancements (no JS changes) --------- */}
      <style>{`
        :root{
          --card-bg: #ffffff;
          --muted: #6c757d;
          --accent: #212529;
          --soft: #f6f7f8;
        }

        /* Card look */
        .card {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 18px;
          box-shadow: 0 6px 18px rgba(20,20,30,0.04);
        }

        /* Header card layout */
        .card.header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
        }

        .card.header h2 { margin:0; font-size:1.1rem }
        .header-controls { display:flex; gap:8px; align-items:center; }

        /* Buttons */
        .btn {
          background: var(--accent);
          color: #fff;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          cursor:pointer;
          font-weight:600;
        }
        .btn.ghost {
          background: transparent;
          color: var(--accent);
          border: 1px solid #e6e7ea;
          font-weight:600;
        }
        .btn.small { padding:6px 10px; font-size:0.95rem }

        /* Form rows */
        .form-row {
          display:flex;
          gap:10px;
          margin-bottom:10px;
          align-items:center;
          flex-wrap:wrap;
        }
        .form-row input, .form-row textarea {
          flex:1 1 220px;
          padding:10px 12px;
          border-radius:8px;
          border:1px solid #e7e8eb;
          font-size:0.95rem;
          background: #fbfcfd;
        }
        .form-row textarea { min-height:72px; }

        /* Make action controls more accessible on mobile */
        .action-bar { display:flex; gap:8px; margin-top:6px; }
        .action-bar .btn { flex:0 0 auto; }

        /* Tables - responsive */
        .table-responsive { overflow-x:auto; -webkit-overflow-scrolling:touch; }
        table.table { width:100%; border-collapse:collapse; min-width:600px; }
        table.table thead th {
          text-align:left;
          padding:10px 12px;
          color:var(--muted);
          font-size:0.9rem;
          border-bottom:1px solid #f1f3f5;
        }
        table.table tbody td {
          padding:10px 12px;
          border-bottom:1px solid #f6f7f8;
        }
        table.table tbody tr:nth-child(odd) { background: #ffffff; }
        table.table tbody tr:nth-child(even) { background: #fbfcfd; }

        /* Actions column - stack on mobile */
        .actions { display:flex; gap:8px; flex-wrap:wrap; }
        .actions .btn { padding:6px 10px; font-size:0.9rem }

        /* Small text */
        .small { color:var(--muted); font-size:0.9rem; }

        /* Sub-head spacing */
        h3, h4 { margin:8px 0 12px 0; }

        /* Divider helper */
        .divider { height:1px; background:#f1f3f5; margin:12px 0; border-radius:2px; }

        /* ---------- MOBILE-SPECIFIC ---------- */
        @media (max-width: 768px) {

          /* Header card stacks */
          .card.header { flex-direction:column; align-items:flex-start; }

          .header-controls { width:100%; display:flex; gap:8px; }

          /* Form rows become vertical stacks */
          .form-row { flex-direction:column; }
          .form-row input, .form-row textarea { width:100%; flex-basis:auto; }

          /* Buttons full width for easy tapping */
          .action-bar .btn, .actions .btn {
            width:100%;
            display:block;
          }

          /* Smaller paddings for table cells on mobile but keep readability */
          table.table thead th, table.table tbody td { padding:12px 10px; font-size:0.95rem; }

          /* Make card padding slightly tighter on narrow screens */
          .card { padding:14px; margin-bottom:14px; }

          /* Make tables look card-like */
          .table-responsive { border-radius:10px; overflow:hidden; box-shadow: inset 0 0 0 1px #f1f3f5; }

          /* Improve spacing for gallery list */
          .gallery-preview { display:flex; flex-direction:column; gap:8px; }
          .gallery-item { display:flex; gap:10px; align-items:center; }
          .gallery-item img { width:64px; height:48px; object-fit:cover; border-radius:6px; }
        }
      `}</style>

      {/* Header */}
      <div className="card header">
        <h2>Admin Dashboard</h2>
        <div className="header-controls">
          <button className="btn small" onClick={fetchAll} style={{background:"#0d6efd"}}>Refresh</button>
          <button className="btn ghost small" onClick={logout}>Logout</button>
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
        <div className="action-bar">
          <button className="btn" onClick={addCourse}>Add Course</button>
        </div>
      </div>

      <div className="card">
        <h3>Existing Courses</h3>
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>Title</th><th>Duration</th><th>Actions</th></tr></thead>
            <tbody>
              {courses.map(c=>(
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td className="small">{c.duration}</td>
                  <td>
                    <div className="actions">
                      <button className="btn ghost small" onClick={()=>{navigator.clipboard?.writeText(window.location.origin + "/course/" + c._id)}}>Copy Link</button>
                      <button className="btn small" onClick={()=>deleteCourse(c._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <div className="action-bar">
          <button className="btn" onClick={addStory}>Add Story</button>
        </div>

        <h4 style={{marginTop:16}}>Existing Stories</h4>
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>Student</th><th>Title</th><th>Actions</th></tr></thead>
            <tbody>
              {stories.map(s=>(
                <tr key={s._id}>
                  <td>{s.studentName}</td>
                  <td className="small">{s.title}</td>
                  <td>
                    <div className="actions">
                      <button className="btn small" onClick={()=>deleteStory(s._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <div className="action-bar"><button className="btn" onClick={addGallery}>Add to Gallery</button></div>

        <h4 style={{marginTop:12}}>Gallery</h4>
        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>Title</th><th>Image</th><th>Actions</th></tr></thead>
            <tbody>
              {gallery.map(g=>(
                <tr key={g._id}>
                  <td>{g.title}</td>
                  <td className="small">{g.imageUrl}</td>
                  <td><div className="actions"><button className="btn small" onClick={()=>deleteGallery(g._id)}>Delete</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQS */}
<div className="card">
  <h3>Manage FAQs</h3>

  <div className="form-row">
    <input placeholder="Question" value={fqQuestion} onChange={e => setFqQuestion(e.target.value)} />
  </div>
  <div className="form-row">
    <textarea placeholder="Answer (HTML allowed)" rows="3" value={fqAnswer} onChange={e => setFqAnswer(e.target.value)} />
  </div>
  <div className="action-bar">
    <button className="btn" onClick={addFaq}>Add FAQ</button>
  </div>

  <h4 style={{ marginTop: 12 }}>Existing FAQs</h4>

  {faqs.length === 0 ? (
    <p className="small">No FAQs yet.</p>
  ) : (
    <>
      <div style={{ marginBottom: 12 }}>
        {/* render accordion for preview */}
        <Accordion faqs={faqs} />
      </div>

      {/* quick management table */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr><th>Question</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {faqs.map(f => (
              <tr key={f._id}>
                <td>{f.question}</td>
                <td>
                  <div className="actions">
                    {/* Delete */}
                    <button className="btn small" onClick={() => deleteFaq(f._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )}
</div>


      {/* STUDENT SUBMISSIONS */}
      <div className="card">
        <h3>Student Enquiries</h3>
        {students.length === 0 ? (
          <p className="small">No submissions yet.</p>
        ) : (
          <div className="table-responsive">
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
          </div>
        )}
      </div>
    </>
  );
}
