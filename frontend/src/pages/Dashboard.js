import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";  // Import the CSS file

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("https://task-manager-backend-lbqe.onrender.com/api/projects", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setProjects(res.data));
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2>Your Projects</h2>
      <Link to="/add-project" className="add-project-link">Add Project</Link>
      <button onClick={logout}>Logout</button>
      <ul>
        {projects.map(p => (
          <li key={p._id}>
            {p.name} <Link to={`/projects/${p._id}/add-task`}>Manage Task</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
