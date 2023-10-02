import React, { useState, useEffect } from "react";
import { InputFormProps } from "../types/types";
import "../styles/inputForm.scss";
import { dataTypes } from "../assets/data/dataTypes";
import { templates } from "../assets/data/templates";

export const InputForm: React.FC<InputFormProps> = ({
  inputType,
  typeSubmit,
}) => {
  const [data, setData] = React.useState<any>({});
  const [inputFields, setInputFields] = useState(dataTypes[inputType]);
  const distilationTypes = Object.fromEntries(
    Object.entries(dataTypes).filter(([key]) => key.startsWith("distilation"))
  );
  const [templateValue, setTemplateValue] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    typeSubmit(data);
  };

  const templateSubmit = (event: React.FormEvent) => {
    event.preventDefault();

  }

  useEffect(() => {
    setInputFields(dataTypes[inputType]);
  }, [inputType]);

  return (
    <div className="inputform-area">
      <form className="inputform-area__form-section" onSubmit={handleSubmit}>
        <div className="form-section__input-buttons">
          {inputType.split("_")[0] === "distilation" && (
            <select
              className="content__distilation-type-button"
              value={inputType}
              onChange={(e) => typeSubmit(e.target.value)}
            >
              {Object.keys(distilationTypes).map((type) => (
                <option key={type} value={type}>
                  {type.split("_")[1]}
                </option>
              ))}
            </select>
          )}
          <div
            style={{
              justifyContent: inputType === "tritation" ? "flex-start" : "",
            }}
            className="form-section__template-buttons"
          >
            <select
              className="template-buttons__dropdown-element"
              value={'template'}
              // onChange={(e) => templateSubmit(e.target.value)}
            >
              <option value={'template'}>Template</option>
              {/* {Object.keys(templates).map((type) => (
                <option key={type} value={type}>
                  {type.split("_")[1]}
                </option>
              ))} */}
            </select>
            <button disabled
              className="template-buttons__save-template-element"
            >
              Save
            </button>
          </div>
        </div>

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
