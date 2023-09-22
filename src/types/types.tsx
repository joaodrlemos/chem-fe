import { ReactNode } from "react";

export type NavbarProps = {
  onHomeClick?: () => void;
  showHomeButton?: boolean;
};

export type SquareButtonProps = {
  label: string;
  onClick: () => void;
};

export type InputFormProps = {
  onSubmit: (data: any) => void;
};

export type TitleProps = {
  title: string;
  templateButton: boolean;
  auxiliaryForm: boolean;
};

// AUTH PROVIDER

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  user: { username: string; role: string } | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};
