// frontend/src/pages/Gallery.js
import React, { useEffect, useState } from "react";
import API from "../api";

export default function Gallery() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get("/gallery-folders")
      .then(res => {
        setFolders(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("gallery fetch err:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <style>{`
        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 16px;
        }
        .gallery-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .gallery-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 12px;
        }
        .gallery-header p {
          font-size: 1.1rem;
          color: #6c757d;
        }
        .folder-section {
          margin-bottom: 64px;
        }
        .folder-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 3px solid #007bff;
          display: inline-block;
        }
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }
        .image-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          background: #fff;
        }
        .image-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        .image-card img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          overflow: hidden;
          display: block;
        }
        .image-info {
          padding: 16px;
        }
        .image-caption {
          font-size: 15px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .image-date {
          font-size: 13px;
          color: #6c757d;
        }
        .empty-state {
          text-align: center;
          padding: 64px 16px;
          color: #6c757d;
        }
        .empty-state-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.3;
        }
        .loading {
          text-align: center;
          padding: 64px 16px;
          font-size: 1.2rem;
          color: #6c757d;
        }
        @media (max-width: 768px) {
          .gallery-header h1 {
            font-size: 2rem;
          }
          .folder-title {
            font-size: 1.5rem;
          }
          .image-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
          }
        }
      `}</style>

      <div className="gallery-container">
        <div className="gallery-header">
          <h1>Our Gallery</h1>
          <p>Explore moments captured from our events and activities</p>
        </div>

        {loading && (
          <div className="loading">Loading gallery...</div>
        )}

        {!loading && folders.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📸</div>
            <h3>No images yet</h3>
            <p>Check back soon for updates!</p>
          </div>
        )}

        {!loading && folders.map(folder => (
          <section key={folder._id} className="folder-section">
            <h2 className="folder-title">{folder.name}</h2>
            
            {folder.images.length === 0 ? (
              <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                No images in this folder yet.
              </p>
            ) : (
              <div className="image-grid">
                {folder.images.map(img => (
                  <div key={img._id} className="image-card">
                    <img 
                      src={img.url}
                      alt={img.caption || folder.name}
                      loading="lazy"
                      onError={(e) => {
                        console.error('Image failed to load:', img.url);
                        e.target.src = 'https://via.placeholder.com/280x220?text=Image+Not+Found';
                      }}
                    />
                    <div className="image-info">
                      <div className="image-caption">
                        {img.caption || folder.name}
                      </div>
                      <div className="image-date">
                        {new Date(img.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}