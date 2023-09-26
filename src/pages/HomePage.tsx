import React from "react";
import "../styles/standartPage.scss";
import { Navbar } from "../components/Navbar";
import { ModuleButton } from "../components/ModuleButton";
import { TitleSection } from "../components/TitleSection";
import { modules } from "../assets/data/modules";

export const HomePage: React.FC = () => {
  return (
    <div className="main-container">
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
