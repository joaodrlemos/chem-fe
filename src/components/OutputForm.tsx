import React from "react";
import "../styles/outputForm.scss";
import graphImg from "../assets/images/others/tritation_graph.png";
import { OutputFormProps } from "../types/types";

export const OutputForm: React.FC<OutputFormProps> = ({ outputType, data }) => {
  const titleMap = {
    tritation: "Tritation Curve:",
    distilation_unifac: "Gammas:",
    distilation_raoult: "Raoult:",
    distilation_kvalue: "K Value:",
  };

  return (
    <div className="outputform-area">
      <span className="outputform-area__title">
        {/* {titleMap[outputType] || ""} */}
      </span>

      <div className="outputform-area__data">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <div className="outputform-area__graph">
        <img src={graphImg} alt="graphPlaceholder" />
      </div>
    </div>
  );
};
