import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ currentRole = "recruiter", onRoleChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(currentRole);

  const handleRoleToggle = (role) => {
    setActiveRole(role);
    if (onRoleChange) onRoleChange(role);
    navigate(
      role === "recruiter" ? "/recruiter/pipeline" : "/candidate/applications",
    );
  };

  const recruiterNavs = [
    { label: "Pipeline", path: "/recruiter/pipeline" },
    { label: "Job Listings", path: "/recruiter/jobs" },
  ];

  const candidateNavs = [
    { label: "My Applications", path: "/candidate/applications" },
    { label: "Browse Jobs", path: "/candidate/jobs" },
  ];

  const currentNavs =
    activeRole === "recruiter" ? recruiterNavs : candidateNavs;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              T
            </div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">
              Talent<span className="text-indigo-600">Flow</span>
            </span>
          </Link>

          {/* Dynamic Route Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {currentNavs.map((nav) => {
              const isActive = location.pathname === nav.path;
              return (
                <Link
                  key={nav.path}
                  to={nav.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  {nav.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Role Switcher & Profile */}
        <div className="flex items-center gap-3">
          {/* Segmented Switcher for Role Selection */}
          <div className="bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 flex items-center gap-1 text-[11px] font-bold">
            <button
              onClick={() => handleRoleToggle("candidate")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRole === "candidate"
                  ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Candidate
            </button>
            <button
              onClick={() => handleRoleToggle("recruiter")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRole === "recruiter"
                  ? "bg-indigo-600 text-white shadow-xs shadow-indigo-500/30"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Recruiter
            </button>
          </div>

          {/* User Avatar Badge */}
          <div className="pl-2 border-l border-slate-200/80 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-xs">
              {activeRole === "recruiter" ? "HR" : "JD"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
