import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { TritationPage } from "./pages/TritationPage";
import { DistilationPage } from "./pages/DistilationPage";
import './app.scss';

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/tritation" element={<TritationPage />} />
            <Route path="/distilation" element={<DistilationPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};
