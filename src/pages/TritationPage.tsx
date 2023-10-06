import React, { useState } from "react";
import "../styles/standartPage.scss";
import { Navbar } from "../components/Navbar";
import { InputForm } from "../components/InputForm";
import { TitleSection } from "../components/TitleSection";
import { useAuth } from "../context/AuthContext";
import { OutputForm } from "../components/OutputForm";
import axios from "axios";

export const TritationPage: React.FC = () => {
  const { user } = useAuth();
  const [tritationResult, setTritationResult] = useState<any>(null);

  const handleTritationSubmit = async (data: any) => {
    if (data.type === "" || data.type === undefined) {
      alert("Type has to be Acid or Base");
      return;
    }

    if (data.conc <= 0 || data.conc === undefined) {
      alert("Concentration has to be a positive number.");
      return;
    }

    if (data.volume <= 0 || !Number.isInteger(data.volume)) {
      alert("Volume number has to be a positive integer.");
      return;
    }

    if (data.addition <= 0 || !Number.isInteger(data.addition)) {
      alert("The add volume number has to be a positive integer.");
      return;
    }

    const payload = {
      type: data.type,
      conc: data.conc,
      addition: data.addition,
      volume: data.volume,
    };

    console.log("payload: ", payload);

    try {
      const response = await axios.post(
        "http://localhost:8083/simulate",
        payload
      );
      setTritationResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error making the API call:", error);
    }
  };

  return (
    <div className="main-container">
      <Navbar showHomeButton={true} />
      <TitleSection
        title={"Tritation Module"}
        auxiliaryForm={user?.role === "admin" ? true : false}
      />
      <div className="tritation content">
        <div className="content__data-section">
          <InputForm
            key={"tritation"}
            inputType={"tritation"}
            onSubmit={handleTritationSubmit}
          />
          <OutputForm outputType={"tritation"} />
        </div>
      </div>
    </div>
  );
};
