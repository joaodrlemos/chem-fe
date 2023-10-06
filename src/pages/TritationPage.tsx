import React, { useState } from "react";
import "../styles/standartPage.scss";
import { Navbar } from "../components/Navbar";
import { InputForm } from "../components/InputForm";
import { TitleSection } from "../components/TitleSection";
import { useAuth } from "../context/AuthContext";
import { OutputForm } from "../components/OutputForm";

export const TritationPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="main-container">
      <Navbar showHomeButton={true} />
      <TitleSection
        title={"Tritation Module"}
        auxiliaryForm={user?.role === "admin" ? true : false}
      />
      <div className="tritation content">
        <div className="content__data-section">
          <InputForm key={"tritation"} inputType={"tritation"} />
          <OutputForm outputType={"tritation"} />
        </div>
      </div>
    </div>
  );
};
