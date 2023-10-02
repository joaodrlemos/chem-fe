import { ReactNode } from "react";

export type NavbarProps = {
  onHomeClick?: () => void;
  showHomeButton?: boolean;
};

export type ModuleButtonProps = {
  label: string;
  image?: string;
};

export type InputFormProps = {
  inputType: string;
  typeSubmit: (data: any) => void;
};

export type OutputProps = {
  outputType: string;
};

export type TitleProps = {
  title: string;
  auxiliaryForm: boolean;
};

export type UserProps = {
  id: number;
  name: string;
  username: string;
  connected?: boolean;
  role: string;
};

export type AdminInfoProps = {
  lockedForUsers: boolean;
  users: Array<UserProps>;
};

export type PrivateRouteProps = {
  children: React.ReactNode;
};

type DataTypeMapFieldProps = {
  name: string;
  label: string;
};

type TritationTemplateType = {
  id: number;
  type: string;
  concentration: string;
  volume: string;
  addVolume: string;
};

type DistilationUnifacTemplateType = {
  id: number;
  temperature: number;
  compound1: string;
  compound2: string;
  molarFractionCompound1: number ;
};

type DistilationRaoultTemplateType = {
  id: number;
  pressure: string;
  temperature: number;
  compound1: string;
  compound2: string;
  x1: string;
  graphType: string;
};

type DistilationKvalueTemplateType = {
  id: number;
  type: string;
  concentration: string;
  volume: string;
  addVolume: string;
};

export type DataTypesMap = {
  [key: string]: DataTypeMapFieldProps[];
};

export type DataTypesTemplates = {
  [key: string]: TritationTemplateType[] | DistilationUnifacTemplateType[] | DistilationRaoultTemplateType[] | DistilationKvalueTemplateType[];
};

// AUTH PROVIDER

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  user: UserProps | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};


