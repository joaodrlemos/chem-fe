import React from "react";
import "../styles/outputForm.scss";
import graphImg from "../assets/images/others/tritation_graph.png";
import { OutputProps } from "../types/types";

export const OutputForm: React.FC<OutputProps> = ({outputType}) => {
  return (
    <div className="outputform-area">
      <span className="outputform-area__title">Output</span>
      <div className="outputform-area__graph">
        <img src={graphImg} alt="graphPlaceholder" />
      </div>
    </div>
  );
};
