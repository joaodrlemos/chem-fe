import React, { useState } from "react";
import "../styles/standartPage.scss";
import { Navbar } from "../components/Navbar";
import { InputForm } from "../components/InputForm";
import { TitleSection } from "../components/TitleSection";
import { useAuth } from "../context/AuthContext";
import { OutputForm } from "../components/OutputForm";

export const DistilationPage: React.FC = () => {
  const { user } = useAuth();
  const [currentDistilationType, setCurrentDistilationType] =
    useState("distilation_unifac");

  const handleDistilationTypeChange = (destilationType: string) => {
    setCurrentDistilationType(destilationType);
  };

  return (
    <div className="main-container">
      <Navbar showHomeButton={true} />
      <TitleSection
        title={"Distilation Module"}
        auxiliaryForm={user?.role === "admin" ? true : false}
      />
      <div className="distilation content">
        <div className="content__data-section">
          <InputForm
            key={currentDistilationType}
            inputType={currentDistilationType}
            changeDistilationType={(destilationType) =>
              handleDistilationTypeChange(destilationType)
            }
          />
          <OutputForm outputType={currentDistilationType} />
        </div>
      </div>
    </div>
  );
};
