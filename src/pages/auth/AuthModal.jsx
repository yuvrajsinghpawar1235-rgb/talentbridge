import React, { useState } from "react";
import {
  XMarkIcon,
  UserIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState("CANDIDATE"); // 'CANDIDATE' | 'RECRUITER' | 'ADMIN'

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    adminSecretCode: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct user object
    const userPayload = {
      name:
        mode === "register"
          ? formData.name
          : formData.email.split("@")[0] || "User",
      email: formData.email,
      role: selectedRole,
      company: selectedRole === "RECRUITER" ? formData.companyName : undefined,
    };

    if (onSuccess) onSuccess(userPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden text-slate-800">
        {/* Header Bar */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {mode === "login"
                ? "Sign in to access your dashboard"
                : "Join TalentBridge ATS Platform"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => setSelectedRole("CANDIDATE")}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === "CANDIDATE"
                    ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UserIcon className="w-4 h-4 mb-0.5" />
                Candidate
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("RECRUITER")}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === "RECRUITER"
                    ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BriefcaseIcon className="w-4 h-4 mb-0.5" />
                Recruiter
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("ADMIN")}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === "ADMIN"
                    ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShieldCheckIcon className="w-4 h-4 mb-0.5" />
                Admin
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name (Register Mode) */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Sarah Jenkins"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={
                    selectedRole === "ADMIN"
                      ? "admin@talentbridge.com"
                      : "you@company.com"
                  }
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Recruiter Extra Field */}
            {mode === "register" && selectedRole === "RECRUITER" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company Name
                </label>
                <div className="relative">
                  <BuildingOfficeIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="Acme Corporation"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition"
                  />
                </div>
              </div>
            )}

            {/* Admin Key Code (Register Mode) */}
            {mode === "register" && selectedRole === "ADMIN" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admin Security Access Pass
                </label>
                <div className="relative">
                  <ShieldCheckIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="adminSecretCode"
                    required
                    placeholder="••••••••••••"
                    value={formData.adminSecretCode}
                    onChange={handleInputChange}
                    className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 transition active:scale-[0.98]"
            >
              {mode === "login"
                ? `Sign In as ${selectedRole}`
                : `Register ${selectedRole} Account`}
            </button>
          </form>

          {/* Mode Switcher Footer */}
          <div className="pt-2 text-center text-xs text-slate-500">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
