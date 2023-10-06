import { DataTypesMap } from "../../types/types";

export const dataTypes: DataTypesMap = {
  tritation: [
    { name: "type", label: "Type" },
    { name: "conc", label: "Concentration" },
    { name: "volume", label: "Volume" },
    { name: "addition", label: "Add Volume" },
  ],
  distilation_unifac: [           
    { name: "temperature", label: "Temperature(ºC)" },
    { name: "compound1", label: "Compound 1" },
    { name: "compound2", label: "Compound 2" },
    { name: "molarFractionCompound1", label: "Molar Fraction Compound 1" },
  ],
  distilation_raoult: [
    { name: "pressure", label: "Pressure(bar)" },
    { name: "temperature", label: "Temperature(ºC)" },
    { name: "compound1", label: "Compound 1" },
    { name: "compound2", label: "Compound 2" },
    { name: "molar", label: "x1" },
    { name: "state", label: "State" },
    { name: "graphType", label: "Graph Type " },
  ],
  distilation_kvalue: [
    { name: "pressure", label: "Pressure(bar)" },
    { name: "temperature", label: "Temperature(ºC)" },
    { name: "compound1", label: "Compound 1" },
    { name: "compound2", label: "Compound 2" },
  ],
};
