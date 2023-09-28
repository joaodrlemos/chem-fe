import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { TritationPage } from "./pages/TritationPage";
import { DistilationPage } from "./pages/DistilationPage";
import { PrivateRoute } from "./components/PrivateRoute";

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <LoginPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/home" replace /> : <LoginPage />}
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/tritation"
        element={
          <PrivateRoute>
            <TritationPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/distilation"
        element={
          <PrivateRoute>
            <DistilationPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
