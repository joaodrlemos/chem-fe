import React from "react";
import { InputFormProps } from "../types/types";

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
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
    <form onSubmit={handleSubmit}>
      <label>
        Concentration A:
        <input name="concentrationA" type="text" onChange={handleChange} />
      </label>
      <label>
        Concentration B:
        <input name="concentrationB" type="text" onChange={handleChange} />
      </label>
      <label>
        Volume A:
        <input name="volumeA" type="text" onChange={handleChange} />
      </label>
      <label>
        Volume B:
        <input name="volumeB" type="text" onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
