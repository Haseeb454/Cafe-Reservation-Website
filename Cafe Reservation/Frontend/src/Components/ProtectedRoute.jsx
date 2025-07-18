import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  // ❌ Alert removed to avoid popup
  if (!token) {
    return <Navigate to="/AdminLogin" />;
  }

  return children;
};

export default ProtectedRoute;
