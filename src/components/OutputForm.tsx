import React from "react";
import { InputFormProps } from "../types/types";
import "../styles/outputForm.scss";

export const OutputForm: React.FC<InputFormProps> = ({
  inputType,
  onSubmit,
}) => {
  const [data, setData] = React.useState<any>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(data);
  };

  return (
    <div className="inputform-area">
      <span className="inputform-area__title">Output</span>
      
    </div>
  );
};
