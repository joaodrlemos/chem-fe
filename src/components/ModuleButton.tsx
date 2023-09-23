import React from "react";
import { ModuleButtonProps } from "../types/types";
import "../styles/moduleButton.scss";

export const ModuleButton: React.FC<ModuleButtonProps> = ({
  label,
  image,
  onClick,
}) => {
  return (
    <div className="modulebutton-container" onClick={onClick}>
      <div className="modulebutton-container__elements">
        <div className="modulebutton-container__elements--image">
          <img className="image--element" src={image} alt={label + "_image"} />
        </div>
        <button className="modulebutton-container__elements--button">
          {label}
        </button>
      </div>
    </div>
  );
};
