import React, { useState, useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  ChartConfiguration,
} from "chart.js";
import "chart.js/auto";
import "../styles/outputForm.scss";
import { OutputFormProps } from "../types/types";

export const OutputForm: React.FC<OutputFormProps> = ({
  outputType,
  result,
}) => {
  const [outputTitle, setOutputTitle] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const titleMap = {
    tritation: "Tritation Curve",
    distilation_unifac: "Gammas",
    distilation_raoult: "Raoult",
    distilation_kvalue: "K Value",
  };

  useEffect(() => {
    Chart.register(
      LineController,
      LinearScale,
      PointElement,
      LineElement,
      CategoryScale
    );
  }, []);

  type GraphDataType = {
    [graphName: string]: {
      [x: string]: number;
    };
  };

  const generateGraphConfig = (
    graphData: GraphDataType
  ): ChartConfiguration => {
    const datasets = [];
    const labels: string[] = [];

    for (const [graphName, coordinates] of Object.entries(graphData)) {
      const data = [];
      for (const [x, y] of Object.entries(coordinates)) {
        data.push({ x: parseFloat(x), y });
        if (!labels.includes(x)) labels.push(x);
      }
      datasets.push({
        label: graphName,
        data,
        fill: false,
        borderColor: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      });
    }

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            type: "linear",
          },
        },
      },
    };
    return config;
  };

  const renderTable = () => {
    if (result?.tableData || result?.defaultRaoultTableData) {
      const tableData = result.tableData || result.defaultRaoultTableData;
      if (tableData) {
        const tableType = Object.keys(tableData)[0];
        const tableRows = Object.entries(tableData[tableType]);

        return (
          <table>
            <thead>
              <tr>
                {tableRows.map(([key], index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableRows.map(([_, value], index) => (
                  <td key={index}>{(value as number).toString()}</td>
                ))}
              </tr>
            </tbody>
          </table>
        );
      }
    }
    return null;
  };

  const renderGraph = () => {
    if (
      result?.graphData ||
      (outputType === "distilation_raoult" && result?.graphData)
    ) {
      return (
        <div className="outputform-area__graph-container">
          <canvas ref={canvasRef}></canvas>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (result) {
      setOutputTitle(titleMap[outputType]);
    }
  }, [result, outputType]);

  useEffect(() => {
    if (result) {
      console.log(outputType, result);
    }
  }, [result]);

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      const graphData = result?.graphData;
      const config = generateGraphConfig(graphData);
      chartRef.current = new Chart(canvasRef.current, config);
    }
  }, [outputType, result, generateGraphConfig]);

  return (
    <>
      {result &&
        (result?.tableData ||
          result?.defaultRaoultTableData ||
          result.graphData) && (
          <div className="outputform-area">
            <span className="outputform-area__title">{outputTitle}</span>
            {renderTable()}
            {renderGraph()}
          </div>
        )}
    </>
  );
};
