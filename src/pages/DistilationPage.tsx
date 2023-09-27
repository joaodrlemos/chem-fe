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
  const [distilationTypes, setDistilationTypes] = useState(
    Object.fromEntries(Object.entries(dataTypes).filter(([key]) => key.startsWith("distilation")))
  );

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
        templateButton={user?.role === "admin" ? true : false}
        auxiliaryForm={user?.role === "admin" ? true : false}
      />
      <div className="content">
        <select
          className="content__distilation-type-button"
          value={currentDistilationType}
          onChange={(e) => setCurrentDistilationType(e.target.value)}
        >
          {Object.keys(distilationTypes).map((type) => (
            <option key={type} value={type}>
              {type.split("_")[1]}
            </option>
          ))}
        </select>
        <div className="content__data-section">
          <InputForm
            inputType={currentDistilationType}
            onSubmit={handleSubmit}
          />
          <OutputForm outputType={currentDistilationType} />
        </div>
      </div>
    </div>
  );
};
