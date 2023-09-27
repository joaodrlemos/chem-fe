import React, { useState, useEffect } from "react";
import { InputFormProps } from "../types/types";
import "../styles/inputForm.scss";
import { dataTypes } from "../assets/data/dataTypes";

export const InputForm: React.FC<InputFormProps> = ({
  inputType,
  onSubmit,
}) => {
  const [data, setData] = React.useState<any>({});
  const [inputFields, setInputFields] = useState(dataTypes[inputType]);

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

  useEffect(() => {
    setInputFields(dataTypes[inputType]);
  }, [inputType]);

  return (
    <div className="inputform-area">
      <span className="inputform-area__title">Input</span>
      <form className="inputform-area__form-section" onSubmit={handleSubmit}>
        <table className="form-section__inputs">
          <tbody>
            {inputFields.map((field) => {
              return (
                <tr className="inputs-row">
                  <td>
                    <span className="inputs-label">{field.label}:</span>
                  </td>
                  <td>
                    <input
                      name={field.name}
                      type="text"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="form-section__submit-button">
          <button className="submit-button__element" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
