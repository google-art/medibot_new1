import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ restore session on refresh
  useEffect(() => {
    const stored = localStorage.getItem("isAuthenticated");
    if (stored === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
