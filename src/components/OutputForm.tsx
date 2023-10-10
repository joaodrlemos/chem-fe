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
import { GraphDataType, OutputFormProps } from "../types/types";

export const OutputForm: React.FC<OutputFormProps> = ({
  outputType,
  result,
}) => {
  const [outputTitle, setOutputTitle] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [flipTableVertically, setFlipTableVertically] = useState(false);
  const titleMap = {
    tritation: "Tritation Curve",
    distilation_unifac: "Gammas",
    distilation_raoult: "Raoult",
    distilation_kvalue: "K Value",
  };
  const axisLabelMap: { [key: string]: { x: string; y: string } } = {
    tritation: { x: "Vol(ml)", y: "Ph" },
    equilibrium: { x: "Molar Fraction(i in liquid)", y: "Molar Fraction(i in vapor)" },
    temperature: { x: "Xi", y: "T(K)" },
    pressure: { x: "Xi", y: "P(bar)" },
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

    const xLabel = axisLabelMap[result.graphType]?.x || "x";
    const yLabel = axisLabelMap[result.graphType]?.y || "y";

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
            title: {
              display: true,
              text: xLabel,
            },
          },
          y: {
            type: "linear",
            title: {
              display: true,
              text: yLabel,
            },
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

        if (flipTableVertically) {
          return (
            <div className="outputform-area__table-container">
              <table>
                <tbody>
                  {tableRows.map(([key, value], index) => (
                    <tr key={index}>
                      <th>{key}</th>
                      <td data-label={key}>{(value as number).toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        } else {
          return (
            <div className="outputform-area__table-container">
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
                    {tableRows.map(([key, value], index) => (
                      <td key={index} data-label={key}>
                        {(value as number).toString()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
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
    Chart.register(
      LineController,
      LinearScale,
      PointElement,
      LineElement,
      CategoryScale
    );

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (result) {
      const firstKey = Object.keys(result?.tableData || {})[0];
      if (firstKey) {
        const tableData = result.tableData[firstKey];
        if (windowWidth <= 890) {
          setFlipTableVertically(Object.keys(tableData || {}).length > 3);
        } else {
          setFlipTableVertically(false);
        }
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    if (result) {
      console.log(outputTitle, result);
      setOutputTitle(titleMap[outputType]);
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
