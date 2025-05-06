import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AddProject() {
  const [name, setName] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/projects", { name }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Project</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
}