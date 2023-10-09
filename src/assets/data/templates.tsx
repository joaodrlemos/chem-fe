import { DataTypesTemplates } from "../../types/types";

export const templates: DataTypesTemplates = {
  tritation: [
    {
      id: 1,
      type: 'A',
      conc: 1,
      addition: 1,
      volume: 10,
    },
  ],
  distilation_unifac: [
    {
      id: 1,
      temperature: 0,
      compound1: "Benzene",
      compound2: "Toluene",
      molarFractionCompound1: 0.2,
    },
  ],
  distilation_raoult: [
    {
      id: 1,
      pressure: 1,
      temperature: 40,
      compound1: "C7H8",
      compound2: "C6H6",
      molar: 0.016,
      state: "vapor",
    },
  ],
  distilation_kvalue: [
    {
      id: 1,
      pressure: 1,
      temperature: 25,
      compound1: "CH4",
      compound2: "C2H4",
    },
  ],
};
