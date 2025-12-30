// frontend/src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Accordion from "../Components/Accordion";

/* ================= helpers ================= */
const authConfig = () => {
  const token = localStorage.getItem("brainoven_token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const normalize = (res) => {
  const p = res?.data ?? res;
  if (Array.isArray(p)) return p;
  if (Array.isArray(p?.data)) return p.data;
  if (Array.isArray(p?.items)) return p.items;
  return [];
};

const getId = (x) => x?._id || x?.id;

/* ================= component ================= */
export default function AdminDashboard() {
  const navigate = useNavigate();

  /* ---------- data ---------- */
  const [courses, setCourses] = useState([]);
  const [stories, setStories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [students, setStudents] = useState([]);

  /* ---------- ui ---------- */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- forms ---------- */
  const [cTitle, setCTitle] = useState("");
  const [cSyllabus, setCSyllabus] = useState("");
  const [cDuration, setCDuration] = useState("");
  const [cObjectives, setCObjectives] = useState("");
  const [cOutcome, setCOutcome] = useState("");

  const [sName, setSName] = useState("");
  const [sTitle, setSTitle] = useState("");
  const [sContent, setSContent] = useState("");
  const [sImage, setSImage] = useState("");

  const [gTitle, setGTitle] = useState("");
  const [gImage, setGImage] = useState("");

  const [fqQuestion, setFqQuestion] = useState("");
  const [fqAnswer, setFqAnswer] = useState("");

  /* ================= lifecycle ================= */
  useEffect(() => {
    const token = localStorage.getItem("brainoven_token");
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchAll();
  }, [navigate]);

  /* ================= fetch all ================= */
  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [cRes, sRes, gRes, fRes, stRes] = await Promise.all([
        API.get("/courses"),
        API.get("/successStories"),
        API.get("/gallery").catch(() => ({ data: [] })),
        API.get("/faqs"),
        API.get("/students/all", authConfig()),
      ]);

      setCourses(normalize(cRes));
      setStories(normalize(sRes));
      setGallery(normalize(gRes));
      setFaqs(normalize(fRes));
      setStudents(normalize(stRes));
    } catch (e) {
      console.error(e);
      setError("Failed to load admin data");
      if (e?.response?.status === 401) {
        localStorage.removeItem("brainoven_token");
        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("brainoven_token");
    navigate("/");
  };

  /* ================= handlers ================= */
  const addCourse = async () => {
    try {
      const res = await API.post(
        "/admin/content/courses",
        { title: cTitle, syllabus: cSyllabus, duration: cDuration, objectives: cObjectives, outcome: cOutcome },
        authConfig()
      );
      const created = normalize(res)[0];
      if (created) setCourses((p) => [created, ...p]);
      setCTitle(""); setCSyllabus(""); setCDuration(""); setCObjectives(""); setCOutcome("");
    } catch {
      alert("Error adding course");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    await API.delete(`/admin/content/courses/${id}`, authConfig());
    setCourses((p) => p.filter((x) => getId(x) !== id));
  };

  const addStory = async () => {
    try {
      const res = await API.post(
        "/admin/content/successStories",
        { studentName: sName, title: sTitle, content: sContent, imageUrl: sImage },
        authConfig()
      );
      const created = normalize(res)[0];
      if (created) setStories((p) => [created, ...p]);
      setSName(""); setSTitle(""); setSContent(""); setSImage("");
    } catch {
      alert("Error adding story");
    }
  };

  const deleteStory = async (id) => {
    if (!window.confirm("Delete story?")) return;
    await API.delete(`/admin/content/successStories/${id}`, authConfig());
    setStories((p) => p.filter((x) => getId(x) !== id));
  };

  const addGallery = async () => {
    try {
      const res = await API.post(
        "/admin/content/gallery",
        { title: gTitle, imageUrl: gImage },
        authConfig()
      );
      const created = normalize(res)[0];
      if (created) setGallery((p) => [created, ...p]);
      setGTitle(""); setGImage("");
    } catch {
      alert("Error adding gallery image");
    }
  };

  const deleteGallery = async (id) => {
    if (!window.confirm("Delete image?")) return;
    await API.delete(`/admin/content/gallery/${id}`, authConfig());
    setGallery((p) => p.filter((x) => getId(x) !== id));
  };

  const addFaq = async () => {
    try {
      const res = await API.post(
        "/admin/content/faqs",
        { question: fqQuestion, answer: fqAnswer },
        authConfig()
      );
      const created = normalize(res)[0];
      if (created) setFaqs((p) => [created, ...p]);
      setFqQuestion(""); setFqAnswer("");
    } catch {
      alert("Error adding FAQ");
    }
  };

  const deleteFaq = async (id) => {
    if (!window.confirm("Delete FAQ?")) return;
    await API.delete(`/admin/content/faqs/${id}`, authConfig());
    setFaqs((p) => p.filter((x) => getId(x) !== id));
  };

  /* ================= render ================= */
  return (
    <>
      <style>{`
        :root{ --card-bg:#fff; --muted:#6c757d; --accent:#212529 }
        .admin{ max-width:1200px; margin:auto; padding:16px }
        .card{ background:#fff; border-radius:12px; padding:18px; margin-bottom:18px; box-shadow:0 6px 18px rgba(20,20,30,0.04) }
        .card.header{ display:flex; justify-content:space-between; align-items:center }
        .header-controls{ display:flex; gap:8px }
        button{ background:var(--accent); color:#fff; border:none; padding:8px 12px; border-radius:8px; cursor:pointer }
        button.ghost{ background:transparent; color:var(--accent); border:1px solid #ddd }
        button.danger{ background:#dc3545; padding:4px 8px; font-size:12px }
        input, textarea{ width:100%; margin-bottom:8px; padding:10px; border-radius:8px; border:1px solid #ddd }
        table{ width:100%; border-collapse:collapse }
        th{ text-align:left; padding:8px; border-bottom:2px solid #eee; color:var(--muted) }
        td{ padding:8px; border-bottom:1px solid #eee }
        .gallery{ display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:12px }
        .thumb img{ width:100%; height:120px; object-fit:cover; border-radius:8px }
        .error{ color:#dc3545 }
        .faq-item{ display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f9f9f9 }
      `}</style>

      <div className="admin">
        <div className="card header">
          <h2>Admin Dashboard</h2>
          <div className="header-controls">
            <button onClick={fetchAll}>Refresh</button>
            <button className="ghost" onClick={logout}>Logout</button>
          </div>
        </div>

        {loading && <p>Loading…</p>}
        {error && <p className="error">{error}</p>}

        {/* COURSES */}
        <div className="card">
          <h3>Add Course</h3>
          <input placeholder="Title" value={cTitle} onChange={e => setCTitle(e.target.value)} />
          <input placeholder="Duration" value={cDuration} onChange={e => setCDuration(e.target.value)} />
          <textarea placeholder="Syllabus" value={cSyllabus} onChange={e => setCSyllabus(e.target.value)} />
          <textarea placeholder="Objectives" value={cObjectives} onChange={e => setCObjectives(e.target.value)} />
          <textarea placeholder="Outcome" value={cOutcome} onChange={e => setCOutcome(e.target.value)} />
          <button onClick={addCourse}>Add Course</button>

          <table>
            <tbody>
              {courses.map(c => (
                <tr key={getId(c)}>
                  <td>{c.title}</td>
                  <td>{c.duration}</td>
                  <td><button onClick={() => deleteCourse(getId(c))}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* STORIES */}
        <div className="card">
          <h3>Success Stories</h3>
          <input placeholder="Student Name" value={sName} onChange={e => setSName(e.target.value)} />
          <input placeholder="Title" value={sTitle} onChange={e => setSTitle(e.target.value)} />
          <input placeholder="Image URL" value={sImage} onChange={e => setSImage(e.target.value)} />
          <textarea placeholder="Content" value={sContent} onChange={e => setSContent(e.target.value)} />
          <button onClick={addStory}>Add Story</button>

          {stories.map(s => (
            <p key={getId(s)}>
              <strong>{s.studentName}</strong> — {s.title}
              <button onClick={() => deleteStory(getId(s))}>Delete</button>
            </p>
          ))}
        </div>

        {/* GALLERY */}
        <div className="card">
          <h3>Gallery</h3>
          <input placeholder="Title" value={gTitle} onChange={e => setGTitle(e.target.value)} />
          <input placeholder="Image URL" value={gImage} onChange={e => setGImage(e.target.value)} />
          <button onClick={addGallery}>Add Image</button>

          <div className="gallery">
            {gallery.map(g => (
              <div key={getId(g)} className="thumb">
                <img src={g.imageUrl} alt="" />
                <button onClick={() => deleteGallery(getId(g))}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="card">
          <h3>FAQs</h3>
          <input placeholder="Question" value={fqQuestion} onChange={e => setFqQuestion(e.target.value)} />
          <textarea placeholder="Answer" value={fqAnswer} onChange={e => setFqAnswer(e.target.value)} />
          <button onClick={addFaq}>Add FAQ</button>
          
          <div style={{ marginTop: '16px' }}>
            <h4>Existing FAQs (Manage)</h4>
            {faqs.map(f => (
              <div key={getId(f)} className="faq-item">
                <span>{f.question}</span>
                <button className="danger" onClick={() => deleteFaq(getId(f))}>Delete</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px' }}>
            <h4>Preview</h4>
            {faqs.length > 0 && <Accordion faqs={faqs} />}
          </div>
        </div>

        {/* STUDENTS */}
        <div className="card">
          <h3>Student Enquiries</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={getId(s)}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {new Date(s.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}