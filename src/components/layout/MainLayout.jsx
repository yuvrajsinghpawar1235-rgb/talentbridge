import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthModal from "../auth/AuthModal";

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  // Hide top header bar inside full-width admin portal if preferred, or render global header
  const isAdminView = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {!isAdminView && (
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center text-white">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-black text-xl cursor-pointer"
          >
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black">
              T
            </div>
            TalentBridge
          </div>

          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-300">
                  Logged in as{" "}
                  <strong className="text-indigo-400">{user.name}</strong> (
                  {user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold text-xs rounded-xl transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </header>
      )}

      {/* Render children and pass down auth handlers if needed */}
      <main className="w-full">
        {React.cloneElement(children, {
          currentUser: user,
          onLogout: handleLogout,
        })}
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
