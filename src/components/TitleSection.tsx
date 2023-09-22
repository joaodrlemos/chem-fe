import React from "react";
import { TitleProps } from "../types/types";
import '../styles/titleSection.scss'
import logoTransparentLight from '../assets/images/logos/transparent_light_mode_2.png';

export const TitleSection: React.FC<TitleProps> = ({
  title,
  templateButton,
  auxiliaryForm,
}) => {
  return (
    <div className="title-section">
      <div className="title-section__logo">
        <img
          className="title-section__logo--element"
          src={logoTransparentLight}
          alt="Logo"
        />
      </div>
      <h1 className="title-section__title">{title}</h1>
    </div>
  );
};
