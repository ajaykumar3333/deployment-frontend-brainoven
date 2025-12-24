// frontend/src/pages/Gallery.js
import React, { useEffect, useState } from "react";
import API from "../api";

export default function Gallery() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    API.get("/gallery-folders")
      .then(res => setFolders(res.data || []))
      .catch(err => console.error("gallery fetch err:", err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Gallery</h2>
      {folders.length === 0 && <p className="text-muted">No images yet.</p>}
      {folders.map(folder => (
        <section key={folder._id} className="mb-5">
          <h3>{folder.name}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginTop: 12 }}>
            {folder.images.map(img => (
              <div key={img._id} style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
                <img src={img.url} alt={img.caption || folder.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{img.caption || folder.name}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{new Date(img.createdAt).toLocaleString()}</div>
                </div>
              </div>
            ))}
            {folder.images.length === 0 && <div className="text-muted">No images in this folder.</div>}
          </div>
        </section>
      ))}
    </div>
  );
}
