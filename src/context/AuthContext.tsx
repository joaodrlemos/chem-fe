import React, { createContext, useState, useContext } from "react";
import { users } from "../assets/data/users";
import { AuthContextType, AuthProviderProps, UserProps } from "../types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  let storedUser = null;
  const storedUserString = localStorage.getItem("user");
  if (storedUserString) {
    storedUser = JSON.parse(storedUserString);
  }
  const [user, setUser] = useState<UserProps | null>(storedUser);

  const login = (username: string, password: string): boolean => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const loggedUser = {
        id: user.id,
        name: user.name,
        username: user.username,
        connected: user.connected,
        role: user.role,
      };
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("user", JSON.stringify(null));
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
