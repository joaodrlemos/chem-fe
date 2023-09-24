import React from "react";
import { ModuleButtonProps } from "../types/types";
import "../styles/moduleButton.scss";
import { useNavigate } from "react-router-dom";

export const ModuleButton: React.FC<ModuleButtonProps> = ({ label, image }) => {
  const navigate = useNavigate();

  const handleModuleClick = (moduleName: string) => {
    navigate("/" + moduleName.toLowerCase());
  };
  return (
    <div className="modulebutton-container">
      <div className="modulebutton-container__elements">
        <div className="modulebutton-container__elements--image">
          <img className="image--element" src={image} alt={label + "_image"} />
        </div>
        <button
          className="modulebutton-container__elements--button"
          onClick={() => handleModuleClick(label.toLocaleLowerCase())}
        >
          {label}
        </button>
      </div>
    </div>
  );
};
