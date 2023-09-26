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
      concentrationA: values.concentrationA,
      concentrationB: values.concentrationB,
      volumeA: values.volumeA,
      volumeB: values.volumeB,
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
      <div className="content tritation">
        <div className="tritation-content-section">
          <InputForm inputType={"tritation"} onSubmit={handleSubmit} />
          <OutputForm inputType={"tritation"} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
