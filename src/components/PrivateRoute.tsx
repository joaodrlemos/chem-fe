import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PrivateRouteProps } from "../types/types";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user && location.pathname === "/") {
    return <Navigate to="/home" replace />;
  }

  if (user) {
    return <>{children}</>;
  }
  
  return <Navigate to="/login" replace />;
};
