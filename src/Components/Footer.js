import React from "react";

export default function Footer(){
  return (
    // Footer component with dark background, white text, and custom height
    <footer 
      className="bg-dark text-white d-flex justify-content-center align-items-center"
      style={{ minHeight: "80px", maxHeight: "80px", fontSize: "0.9rem" }}
    >
      &copy; {new Date().getFullYear()-1} **BrainOven** — Bake Your Tech Future
    </footer>
  );
}