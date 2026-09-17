import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Pipeline from "./pages/recruiter/Pipeline";
import MyApplications from "./pages/candidate/MyApplications";
import AdminDashboard from "./pages/admin/Dashboard"; // Import Dashboard

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-xs">Loading Workspace...</div>
      }
    >
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Admin Dashboard with Sidebar & Table */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Candidate Routes */}
        <Route path="/candidate">
          <Route index element={<Navigate to="applications" replace />} />
          <Route path="applications" element={<MyApplications />} />
        </Route>

        {/* Recruiter Routes */}
        <Route path="/recruiter">
          <Route index element={<Navigate to="pipeline" replace />} />
          <Route path="pipeline" element={<Pipeline />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
