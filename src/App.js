import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Services from "./Pages/Services";
import About from "./Pages/About";
import CourseDetails from "./Pages/CourseDetails";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import ContactUs from "./Pages/ContactUs";
import Gallery from "./Pages/Gallery";
// import Gallery from "./Pages/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/course/:id" element={<CourseDetails />} />

          {/* Hidden admin route */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
