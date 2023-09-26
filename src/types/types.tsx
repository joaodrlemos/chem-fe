import { ReactNode } from "react";
import { RoutesProps } from "react-router-dom";

export type NavbarProps = {
  onHomeClick?: () => void;
  showHomeButton?: boolean;
};

export type ModuleButtonProps = {
  label: string;
  image?: string;
};

export type InputFormProps = {
  inputType: 'tritation' | 'distilation_unifac' | 'distilation_raoult' | 'distilation_kvalue';
  onSubmit: (data: any) => void;
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
  role: string;
};

export type PrivateRouteProps = {
  children: React.ReactNode;
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
