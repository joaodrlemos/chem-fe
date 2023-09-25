import React from "react";
import { Navbar } from "../components/Navbar";
import { InputForm } from "../components/InputForm";
import { TitleSection } from "../components/TitleSection";
import { useAuth } from "../context/AuthContext";

export const TritationPage: React.FC = () => {
    const { user } = useAuth();

  const handleSubmit = (values: { [key: string]: string }) => {
    const data = {
      concentrationA: values.concentrationA,
      concentrationB: values.concentrationB,
      volumeA: values.volumeA,
      volumeB: values.volumeB,
    };

    console.log(data);
  };

  return (
    <div className="tritation-container">
      <Navbar showHomeButton={true} />
      <TitleSection
        title={"Tritation Module"}
        templateButton={user?.role === 'admin' ? true : false}
        auxiliaryForm={user?.role === 'admin' ? true : false}
      />
      <div className="content">
        {/* <div className="top-section half-section">
                <Navbar showHomeButton={true} />
                <img src="../assets/images/Logo com fundo preto JPG (1).jpg" alt="Chem Logo" />
                <h1 className="title">Tritation Module</h1>
            </div>
            <div className="bottom-section half-section">
                <InputForm onSubmit={handleSubmit} />
            </div> */}
      </div>
    </div>
  );
};
