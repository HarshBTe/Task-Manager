import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import { AuthProvider, useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-project"
            element={
              <PrivateRoute>
                <AddProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/add-task"
            element={
              <PrivateRoute>
                <AddTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:taskId/edit"
            element={
              <PrivateRoute>
                <UpdateTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:taskId/edit"
            element={
              <PrivateRoute>
                <UpdateTask />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
