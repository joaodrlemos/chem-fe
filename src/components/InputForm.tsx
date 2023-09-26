import React from "react";
import { InputFormProps } from "../types/types";
import "../styles/inputForm.scss";

export const InputForm: React.FC<InputFormProps> = ({
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
      <span className="inputform-area__title">Input</span>
      <form className="inputform-area__form-section" onSubmit={handleSubmit}>
        <table className="form-section__inputs">
          <tbody>
            <tr className="inputs-row">
              <td>
                <span className="inputs-label">Type:</span>
              </td>
              <td>
                <input
                  name="tritation-type"
                  type="text"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="inputs-row">
              <td>
                <span className="inputs-label">Concentration:</span>
              </td>
              <td>
                <input
                  name="tritation-concentration"
                  type="text"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="inputs-row">
              <td>
                <span className="inputs-label">Volume:</span>
              </td>
              <td>
                <input
                  name="tritation-volume"
                  type="text"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="inputs-row">
              <td>
                <span className="inputs-label">Add Volume:</span>
              </td>
              <td>
                <input
                  name="tritation-add-volume"
                  type="text"
                  onChange={handleChange}
                />
              </td>
            </tr>
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
