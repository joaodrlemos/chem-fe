import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { SquareButton } from "../components/SquareButton";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleTritationClick = () => {
    navigate("/tritation");
  };

  const handleDistilationClick = () => {
    navigate("/distilation");
  };

  return (
    <div className="home-container">
      <div className="logo-section">
        <Navbar />
        <h1>Welcome to Chem Application by Cunha & Cunha Consulting</h1>
      </div>
      <div className="content-section">
        <SquareButton label="Tritation" onClick={handleTritationClick} />
        <SquareButton label="Distilation" onClick={handleDistilationClick} />
      </div>
    </div>
  );
};
