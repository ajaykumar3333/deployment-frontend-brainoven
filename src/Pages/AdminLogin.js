import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/admin/login", { username, password });
      localStorage.setItem("brainoven_token", res.data.token);
      setMsg("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      setMsg("Login failed");
    }
  };

  return (
    <div className="card" style={{maxWidth:500, margin:"0 auto"}}>
      <h2>Admin Login</h2>
      <div className="form-row">
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
      </div>
      <div className="form-row">
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      <div style={{display:"flex", gap:8}}>
        <button className="btn" onClick={handleLogin} style={{color:"white"}}>Login</button>
        
        {/* <button className="btn ghost" onClick={() => { setUsername("admin"); setPassword("admin123"); }}>Fill demo</button> */}
      </div>
      <p className="small">{msg}</p>
    </div>
  );
}
