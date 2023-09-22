import React from "react";
import { SquareButtonProps } from "../types/types";

export const SquareButton: React.FC<SquareButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <div className="square-button" onClick={onClick}>
      <button>{label}</button>
    </div>
  );
};
