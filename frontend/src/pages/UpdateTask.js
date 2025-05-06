import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function UpdateTask() {
  const [form, setForm] = useState({ title: "", description: "", status: "Pending" });
  const { token } = useAuth();
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://task-manager-backend-lbqe.onrender.com/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setForm(res.data));
  }, [taskId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://task-manager-backend-lbqe.onrender.com/api/tasks/${taskId}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Task</h2>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">Update</button>
    </form>
  );
}
