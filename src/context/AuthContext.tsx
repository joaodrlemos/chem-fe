import React, { createContext, useState, useContext, ReactNode } from "react";
import { users } from "../assets/data/users";
import { AuthContextType, AuthProviderProps } from "../types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );

  const login = (username: string, password: string) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setUser({ username: user.username, role: user.role });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
