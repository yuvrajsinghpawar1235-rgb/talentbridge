import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admins have bypass privileges to access all candidate and recruiter routes
  if (user.role === "ADMIN" || allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
