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
  onSubmit: (data: any) => void;
};

export type OutputProps = {
  outputType: string;
};

export type TitleProps = {
  title: string;
  templateButton: boolean;
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

type DataTypeMapField = {
  name: string;
  label: string;
};

export type DataTypesMap = {
  [key: string]: DataTypeMapField[];
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


