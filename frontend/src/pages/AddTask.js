import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AddTask() {
  const [form, setForm] = useState({ title: "", description: "", status: "Pending" });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${projectId}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (error) {
        console.error("Failed to load tasks", error);
        alert("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId && token) {
      fetchTasks();
    }
  }, [projectId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/projects/${projectId}/tasks`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: "", description: "", status: "Pending" });
      await refreshTasks();
    } catch (error) {
      console.error("Failed to add task", error);
      alert("Failed to add task.");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
      alert("Failed to delete task.");
    }
  };

  const refreshTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to refresh tasks", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Task</h2>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div>
        <h2>Tasks for Project</h2>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task._id}>
                <strong>{task.title}</strong> – {task.description} ({task.status})
                <div>
                  <Link to={`/tasks/${task._id}/edit`}>Edit</Link>{" "}
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => navigate("/")}>Back to Dashboard</button>
      </div>
    </div>
  );
}
