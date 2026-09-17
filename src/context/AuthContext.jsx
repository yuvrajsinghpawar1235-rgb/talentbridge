import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Roles: 'ADMIN', 'RECRUITER', 'CANDIDATE', or null
  const [user, setUser] = useState({
    name: "Jordan",
    email: "admin@talentbridge.com",
    role: "ADMIN",
  });

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
