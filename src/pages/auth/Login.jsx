import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DEMO_USERS, ROLES } from "../../utils/constants";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Default fallback if user types manual credentials
    login({ name: "User", email, role: ROLES.CANDIDATE });
    navigate("/");
  };

  // Quick Switcher for instant demoing
  const handleQuickLogin = (role) => {
    let demoUser;
    if (role === ROLES.ADMIN) demoUser = DEMO_USERS.admin;
    else if (role === ROLES.RECRUITER) demoUser = DEMO_USERS.recruiter;
    else demoUser = DEMO_USERS.candidate;

    login(demoUser);

    if (role === ROLES.ADMIN) navigate("/admin/dashboard");
    else if (role === ROLES.RECRUITER) navigate("/recruiter/pipeline");
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border max-w-md w-full space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Sign In to TalentBridge
          </h2>
          <p className="text-xs text-gray-500">
            Access your candidate applications or recruitment pipeline
          </p>
        </div>

        {/* Quick Demo Role Switcher */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 space-y-2 text-center">
          <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">
            ⚡ Instant Demo Login
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin(ROLES.CANDIDATE)}
              className="px-2 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs font-semibold rounded hover:bg-blue-100 transition"
            >
              Candidate
            </button>
            <button
              onClick={() => handleQuickLogin(ROLES.RECRUITER)}
              className="px-2 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs font-semibold rounded hover:bg-blue-100 transition"
            >
              Recruiter
            </button>
            <button
              onClick={() => handleQuickLogin(ROLES.ADMIN)}
              className="px-2 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs font-semibold rounded hover:bg-blue-100 transition"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-200"
              placeholder="user@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-200"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
