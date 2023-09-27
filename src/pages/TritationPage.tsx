import React, { useState } from "react";
import "../styles/standartPage.scss";
import { Navbar } from "../components/Navbar";
import { InputForm } from "../components/InputForm";
import { TitleSection } from "../components/TitleSection";
import { useAuth } from "../context/AuthContext";
import { OutputForm } from "../components/OutputForm";

export const TritationPage: React.FC = () => {
  const { user } = useAuth();
  const [tritationValues, setTritationValues] = useState({});

  const handleSubmit = (values: { [key: string]: string }) => {
    const data = {
      type: values.type,
      concentration: values.concentration,
      volume: values.volume,
      addVolume: values.addVolume,
    };

    setTritationValues(data);
  };

  return (
    <div className="main-container">
      <Navbar showHomeButton={true} />
      <TitleSection
        title={"Tritation Module"}
        templateButton={user?.role === "admin" ? true : false}
        auxiliaryForm={user?.role === "admin" ? true : false}
      />
      <div className="content">
        <div className="content__data-section">
          <InputForm inputType={"tritation"} onSubmit={handleSubmit} />
          <OutputForm outputType={"tritation"}/>
        </div>
      </div>
    </div>
  );
};
