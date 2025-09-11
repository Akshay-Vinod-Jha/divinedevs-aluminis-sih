import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  hasVisited: boolean;
  markAsVisited: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check localStorage for authentication status
    const authStatus = localStorage.getItem("isAuthenticated");
    const visitedStatus = localStorage.getItem("hasVisited");

    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    if (visitedStatus === "true") {
      setHasVisited(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setHasVisited(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("hasVisited", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    // Don't reset hasVisited on logout
  };

  const markAsVisited = () => {
    setHasVisited(true);
    localStorage.setItem("hasVisited", "true");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, hasVisited, markAsVisited }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
