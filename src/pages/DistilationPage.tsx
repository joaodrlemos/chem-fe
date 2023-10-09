import React, { useState } from "react";
import "../styles/standartPage.scss";
import { Navbar } from "../components/Navbar";
import { InputForm } from "../components/InputForm";
import { TitleSection } from "../components/TitleSection";
import { useAuth } from "../context/AuthContext";
import { OutputForm } from "../components/OutputForm";
import axios from "axios";

export const DistilationPage: React.FC = () => {
  const { user } = useAuth();
  const [distilationResult, setDistilationResult] = useState<any>(null);
  const [defaultRaoultResult, setDefaultRaoultResult] = useState<any>(null);
  const [currentDistilationType, setCurrentDistilationType] =
    useState("distilation_unifac");

  const handleDistilationTypeChange = (destilationType: string) => {
    setCurrentDistilationType(destilationType);
  };

  const handleDistilationSubmit = async (data: any) => {
    let endpoint = "";
    let payload = {};
    console.log("INPUT DATA:", data);

    if (
      parseFloat(data.temperature) < -273.15 ||
      data.temperature === "" ||
      data.temperature === undefined
    ) {
      alert("Temperature has to be a number bigger -273.15.");
      return;
    }

    if (
      data.compound1 === "" ||
      data.compound1 === undefined ||
      data.compound2 === "" ||
      data.compound2 === undefined
    ) {
      alert("Compounds cannot be empty");
      return;
    }

    if (currentDistilationType === "distilation_unifac") {
      if (data.molarFractionCompound1 <= 0) {
        alert("Molar Fraction Compound 1 number must be positive.");
        return;
      }

      endpoint = "unifac";
      payload = {
        molarFraction: data.molarFractionCompound1,
        temperature: data.temperature,
        compound: [data.compound1, data.compound2],
      };
    }

    if (currentDistilationType === "distilation_kvalue") {
      if (data.pressure <= 0) {
        alert("Pressure number must be positive.");
        return;
      }

      endpoint = "kvalue";
      payload = {
        pressure: data.pressure,
        temperature: data.temperature,
        compound: [data.compound1, data.compound2],
      };
    }

    if (currentDistilationType === "distilation_raoult") {
      if (data.pressure <= 0) {
        alert("Pressure number must be positive.");
        return;
      }

      if (data.state === "") {
        alert("State must be Vapor or Liquid.");
        return;
      }

      if (data.molar <= 0) {
        alert("x1 number must be positive.");
        return;
      }

      payload = {
        pressure: data.pressure,
        temperature: data.temperature,
        compound: [data.compound1, data.compound2],
        molar: data.molar,
        state: data.state,
        points: 100,
      };

      try {
        const response = await axios.post(
          "http://localhost:8082/raoult",
          payload
        );
        setDefaultRaoultResult(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error making the API call:", error);
      }

      if (
        data.graphType &&
        (data.graphType !== "" || data.graphType !== undefined)
      ) {
        endpoint = "raoult/" + data.graphType;
      } else {
        console.log("payload: ", payload);
        return;
      }
    }

    console.log("payload: ", payload);

    try {
      const response = await axios.post(
        "http://localhost:8082/" + endpoint,
        payload
      );
      setDistilationResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error making the API call:", error);
    }
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
            onSubmit={handleDistilationSubmit}
          />
          <OutputForm outputType={currentDistilationType} />
        </div>
      </div>
    </div>
  );
};
