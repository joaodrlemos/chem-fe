import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ModuleButton } from "../components/ModuleButton";
import { TitleSection } from "../components/TitleSection";
import "../styles/homePage.scss";
import { modules } from "../assets/data/modules";

export const HomePage: React.FC = () => {

  return (
    <div className="home-container">
      <Navbar />
      <TitleSection
        title={"Chem Application Home Page"}
        templateButton={false}
        auxiliaryForm={false}
      />
      <div className="content">
        {modules.map((module) => (
          <ModuleButton
            key={module.name}
            label={module.name}
            image={module.image}
          />
        ))}
      </div>
    </div>
  );
};
