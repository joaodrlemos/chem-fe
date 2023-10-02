import React, { useState } from "react";
import "../styles/standartPage.scss";
import { Navbar } from "../components/Navbar";
import { InputForm } from "../components/InputForm";
import { TitleSection } from "../components/TitleSection";
import { useAuth } from "../context/AuthContext";
import { OutputForm } from "../components/OutputForm";
import { dataTypes } from "../assets/data/dataTypes";

export const DistilationPage: React.FC = () => {
  const { user } = useAuth();
  const [distilationValues, setDistilationValues] = useState({});
  const [currentDistilationType, setCurrentDistilationType] =
    useState("distilation_unifac");

  const handleSubmit = (values: { [key: string]: string }) => {
    const data = {
      concentrationA: values.concentrationA,
      concentrationB: values.concentrationB,
      volumeA: values.volumeA,
      volumeB: values.volumeB,
    };

    setDistilationValues(data);
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
            inputType={currentDistilationType}
            typeSubmit={(v)=> setCurrentDistilationType(v)}
          />
          <OutputForm outputType={currentDistilationType} />
        </div>
      </div>
    </div>
  );
};
