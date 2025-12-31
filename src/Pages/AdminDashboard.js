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

// Backend URL for image paths
const BACKEND_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || "https://deployment-backend-brainoven.onrender.com";

// Helper function to get full image URL
const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
};

/* ================= component ================= */
export default function AdminDashboard() {
  const navigate = useNavigate();

  /* ---------- data ---------- */
  const [courses, setCourses] = useState([]);
  const [stories, setStories] = useState([]);
  const [galleryFolders, setGalleryFolders] = useState([]);
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

  const [fqQuestion, setFqQuestion] = useState("");
  const [fqAnswer, setFqAnswer] = useState("");

  // Gallery folder states
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageCaption, setImageCaption] = useState("");

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
      // Fetch courses
      try {
        const cRes = await API.get("/courses");
        setCourses(normalize(cRes));
      } catch (err) {
        console.warn("Could not fetch courses:", err.message);
      }

      // Fetch stories
      try {
        const sRes = await API.get("/successStories");
        setStories(normalize(sRes));
      } catch (err) {
        console.warn("Could not fetch stories:", err.message);
      }

      // Fetch gallery folders (may not exist yet)
      try {
        const gRes = await API.get("/gallery-folders");
        setGalleryFolders(normalize(gRes));
      } catch (err) {
        console.warn("Could not fetch gallery folders:", err.message);
        setGalleryFolders([]); // Set empty array if endpoint doesn't exist yet
      }

      // Fetch FAQs
      try {
        const fRes = await API.get("/faqs");
        setFaqs(normalize(fRes));
      } catch (err) {
        console.warn("Could not fetch FAQs:", err.message);
      }

      // Fetch students
      try {
        const stRes = await API.get("/students/all", authConfig());
        setStudents(normalize(stRes));
      } catch (err) {
        console.warn("Could not fetch students:", err.message);
        // Check for auth error
        if (err?.response?.status === 401) {
          localStorage.removeItem("brainoven_token");
          navigate("/admin");
        }
      }

    } catch (e) {
      console.error("Unexpected error in fetchAll:", e);
      setError("Some data could not be loaded. Please refresh the page.");
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
    } catch (err) {
      console.error("addCourse error:", err);
      alert("Error adding course");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    try {
      await API.delete(`/admin/content/courses/${id}`, authConfig());
      setCourses((p) => p.filter((x) => getId(x) !== id));
    } catch (err) {
      console.error("deleteCourse error:", err);
      alert("Error deleting course");
    }
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
    } catch (err) {
      console.error("addStory error:", err);
      alert("Error adding story");
    }
  };

  const deleteStory = async (id) => {
    if (!window.confirm("Delete story?")) return;
    try {
      await API.delete(`/admin/content/successStories/${id}`, authConfig());
      setStories((p) => p.filter((x) => getId(x) !== id));
    } catch (err) {
      console.error("deleteStory error:", err);
      alert("Error deleting story");
    }
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
    } catch (err) {
      console.error("addFaq error:", err);
      alert("Error adding FAQ");
    }
  };

  const deleteFaq = async (id) => {
    if (!window.confirm("Delete FAQ?")) return;
    try {
      await API.delete(`/admin/content/faqs/${id}`, authConfig());
      setFaqs((p) => p.filter((x) => getId(x) !== id));
    } catch (err) {
      console.error("deleteFaq error:", err);
      alert("Error deleting FAQ");
    }
  };

  // ==================== GALLERY FOLDER HANDLERS ====================
  
  const createFolder = async () => {
    if (!folderName.trim()) {
      alert("Please enter a folder name");
      return;
    }
    try {
      const res = await API.post(
        "/admin/content/gallery-folders",
        { name: folderName },
        authConfig()
      );
      const created = res.data;
      setGalleryFolders((p) => [created, ...p]);
      setFolderName("");
      alert("Folder created successfully!");
    } catch (err) {
      console.error("createFolder error:", err);
      alert("Error creating folder. Make sure the backend route is set up correctly.");
    }
  };

  const deleteFolder = async (id) => {
    if (!window.confirm("Delete this folder and all its images?")) return;
    try {
      await API.delete(`/admin/content/gallery-folders/${id}`, authConfig());
      setGalleryFolders((p) => p.filter((x) => getId(x) !== id));
      if (selectedFolder && getId(selectedFolder) === id) {
        setSelectedFolder(null);
      }
    } catch (err) {
      console.error("deleteFolder error:", err);
      alert("Error deleting folder");
    }
  };

  const handleImageFilesChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const uploadImages = async () => {
    if (!selectedFolder) {
      alert("Please select a folder first");
      return;
    }
    if (imageFiles.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {
      const formData = new FormData();
      imageFiles.forEach(file => {
        formData.append("images", file);
      });
      if (imageCaption) {
        formData.append("caption", imageCaption);
      }

      const res = await API.post(
        `/admin/content/gallery-folders/${getId(selectedFolder)}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("brainoven_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the folder in state
      const updated = res.data;
      setGalleryFolders((prev) =>
        prev.map((f) => (getId(f) === getId(updated) ? updated : f))
      );
      setSelectedFolder(updated);
      setImageFiles([]);
      setImageCaption("");
      
      // Reset file input
      const fileInput = document.getElementById("imageFilesInput");
      if (fileInput) fileInput.value = "";

      alert("Images uploaded successfully!");
    } catch (err) {
      console.error("uploadImages error:", err);
      alert("Error uploading images. Check console for details.");
    }
  };

  const deleteImage = async (folderId, imageId) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      const res = await API.delete(
        `/admin/content/gallery-folders/${folderId}/images/${imageId}`,
        authConfig()
      );
      const updated = res.data;
      setGalleryFolders((prev) =>
        prev.map((f) => (getId(f) === getId(updated) ? updated : f))
      );
      if (selectedFolder && getId(selectedFolder) === folderId) {
        setSelectedFolder(updated);
      }
    } catch (err) {
      console.error("deleteImage error:", err);
      alert("Error deleting image");
    }
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
        button.primary{ background:#007bff }
        button.success{ background:#28a745 }
        input, textarea, select{ width:100%; margin-bottom:8px; padding:10px; border-radius:8px; border:1px solid #ddd }
        table{ width:100%; border-collapse:collapse }
        th{ text-align:left; padding:8px; border-bottom:2px solid #eee; color:var(--muted) }
        td{ padding:8px; border-bottom:1px solid #eee }
        .gallery{ display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:12px }
        .thumb img{ width:100%; height:120px; object-fit:cover; border-radius:8px }
        .error{ color:#dc3545; padding:12px; background:#ffe6e6; border-radius:8px; margin-bottom:16px }
        .warning{ color:#856404; padding:12px; background:#fff3cd; border-radius:8px; margin-bottom:16px }
        .faq-item{ display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid #f9f9f9 }
        .folder-list{ display:flex; flex-wrap:wrap; gap:12px; margin:16px 0 }
        .folder-card{ padding:12px 16px; border:2px solid #ddd; border-radius:8px; cursor:pointer; transition:all 0.2s }
        .folder-card:hover{ border-color:#007bff; background:#f8f9fa }
        .folder-card.selected{ border-color:#007bff; background:#e7f3ff }
        .folder-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px }
        .image-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:16px; margin-top:16px }
        .image-card{ border:1px solid #ddd; border-radius:8px; overflow:hidden }
        .image-card img{ width:100%; height:150px; object-fit:cover }
        .image-info{ padding:8px }
        .image-actions{ padding:8px; display:flex; justify-content:space-between }
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
        {error && <div className="error">{error}</div>}

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

        {/* GALLERY FOLDERS */}
        <div className="card">
          <h3>Gallery Management</h3>
          
          {galleryFolders.length === 0 && !loading && (
            <div className="warning">
              <strong>Note:</strong> If you just set up the gallery system, make sure you've:
              <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                <li>Added the GalleryFolder model to your backend</li>
                <li>Updated your routes (adminRoutes.js and publicRoutes.js)</li>
                <li>Updated your adminController.js</li>
                <li>Restarted your backend server</li>
              </ul>
            </div>
          )}
          
          {/* Create Folder */}
          <div style={{ marginBottom: '24px' }}>
            <h4>Create New Folder</h4>
            <input 
              placeholder="Folder Name (e.g., 'Campus Events', 'Student Activities')" 
              value={folderName} 
              onChange={e => setFolderName(e.target.value)} 
            />
            <button className="primary" onClick={createFolder}>Create Folder</button>
          </div>

          {/* Folder List */}
          <div>
            <h4>Existing Folders</h4>
            {galleryFolders.length === 0 && !loading && <p style={{ color: 'var(--muted)' }}>No folders yet. Create one above.</p>}
            <div className="folder-list">
              {galleryFolders.map(folder => (
                <div 
                  key={getId(folder)} 
                  className={`folder-card ${selectedFolder && getId(selectedFolder) === getId(folder) ? 'selected' : ''}`}
                  onClick={() => setSelectedFolder(folder)}
                >
                  <div className="folder-header">
                    <strong>{folder.name}</strong>
                    <button 
                      className="danger" 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFolder(getId(folder));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {folder.images?.length || 0} image(s)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Images to Selected Folder */}
          {selectedFolder && (
            <div style={{ marginTop: '24px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Upload Images to: {selectedFolder.name}</h4>
              <input 
                id="imageFilesInput"
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageFilesChange}
                style={{ marginBottom: '8px' }}
              />
              <input 
                placeholder="Optional caption for all images" 
                value={imageCaption} 
                onChange={e => setImageCaption(e.target.value)} 
              />
              <button className="success" onClick={uploadImages}>Upload Images</button>
              {imageFiles.length > 0 && (
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>
                  {imageFiles.length} file(s) selected
                </p>
              )}

              {/* Display Images in Selected Folder */}
              {selectedFolder.images && selectedFolder.images.length > 0 && (
                <div>
                  <h4 style={{ marginTop: '24px' }}>Images in this folder:</h4>
                  <div className="image-grid">
                    {selectedFolder.images.map(img => (
                      <div key={img._id} className="image-card">
                        <img 
                          src={getImageUrl(img.url)} 
                          alt={img.caption || selectedFolder.name}
                          onError={(e) => {
                            console.error('Image failed to load:', img.url);
                            e.target.src = 'https://via.placeholder.com/180x150?text=Error';
                          }}
                        />
                        <div className="image-info">
                          <div style={{ fontSize: '12px', fontWeight: '600' }}>
                            {img.caption || 'No caption'}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                            {new Date(img.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="image-actions">
                          <button 
                            className="danger" 
                            onClick={() => deleteImage(getId(selectedFolder), img._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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