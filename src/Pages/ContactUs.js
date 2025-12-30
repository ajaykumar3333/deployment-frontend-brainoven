// frontend/src/pages/ContactUs.js
import React, { useState, useEffect } from "react";
import API from "../api";
import FloatingButton from "../Components/FloatingButton";
import Accordion from "../Components/Accordion";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // FAQs state
  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoadingFaqs(true);
        const res = await API.get("/faqs"); // keep same pattern as your admin fetches
        console.log("ContactUs GET /faqs:", res);
        setFaqs(res.data || []);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setFaqs([]);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setMsg("Please fill all fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setMsg("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setMsg("");
    if (!validate()) return;
    setLoading(true);
    try {
      await API.post("/students/submit", form);
      setMsg("Submitted! Thank you — we will get back to you shortly.");
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
      setMsg("Submission failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const heroImage =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1350&q=80";

  return (
    <div className="bg-light pb-5">
      <div className="container py-4">
        <div className="mb-5 shadow-lg overflow-hidden rounded-3">
          <aside
            className="d-flex align-items-end justify-content-start p-4 p-md-5 text-white"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "400px",
            }}
            aria-hidden="true"
          >
            <div>
              <h1 className="display-6 fw-bold mb-1">BRAINOVEN</h1>
              <p className="lead border-top border-white pt-1" style={{ fontSize: "1rem" }}>
                Bake Your Tech Future — Enquire & Join
              </p>
            </div>
          </aside>
        </div>

        <section className="row g-4 d-flex align-items-stretch justify-content-center">
          <div className="col-12 col-lg-6" style={{ minWidth: "400px" }}>
            <div className="card bg-white border-0 shadow-lg p-4 p-md-5 h-100">
              <h2 className="card-title text-dark mb-3">Contact / Enquiry 🤝</h2>
              <p className="text-muted small mb-4">
                Fill the form below and our team will reach out. For instant{" "}
                <strong>WhatsApp</strong>:
                {" "}
                <a
                  href="https://wa.me/919611360608"
                  target="_blank"
                  rel="noreferrer"
                  className="text-dark fw-bold text-decoration-none"
                >
                  +91 9611360608
                </a>
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="mb-3">
                  <input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-light border-secondary"
                  />
                </div>
                <div className="mb-3">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-light border-secondary"
                  />
                </div>
                <div className="mb-4">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-light border-secondary"
                  />
                </div>

                <div className="d-flex align-items-center flex-wrap">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg me-3 mb-2"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Enquiry"}
                  </button>
                  <span
                    className={`small fw-bold mt-2 ${msg.includes("Submitted") ? "text-success" : "text-danger"}`}
                    role="status"
                    aria-live="polite"
                  >
                    {msg}
                  </span>
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-lg-6" style={{ minWidth: "400px" }}>
            <div className="card bg-light border-secondary shadow-sm p-4 h-100 mt-4 mt-lg-0">
              <h3 className="card-title text-dark mb-3">Frequently Asked Questions 🤔</h3>

              {loadingFaqs ? (
                <p>Loading FAQs…</p>
              ) : faqs.length === 0 ? (
                <p>No FAQs yet.</p>
              ) : (
                // Pass faqs and a unique parentId to avoid id collisions
                <Accordion faqs={faqs} parentId="contact-page-faqs" />
              )}
            </div>
          </div>
        </section>
      </div>

      <FloatingButton />
    </div>
  );
}
