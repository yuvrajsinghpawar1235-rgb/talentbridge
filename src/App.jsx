import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AdminDashboard from "./pages/admin/Dashboard"; // Updated to point to Dashboard.jsx
import Landing from "./pages/Landing";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
