import React, { useState, useEffect } from "react";
import { InputFormProps, TemplateType } from "../types/types";
import "../styles/inputForm.scss";
import { dataTypes } from "../assets/data/dataTypes";
import { templates } from "../assets/data/templates";

export const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  inputType,
  changeDistilationType,
}) => {
  const [data, setData] = React.useState<any>({});
  const [inputFields, setInputFields] = useState(dataTypes[inputType]);
  const distilationTypes = Object.fromEntries(
    Object.entries(dataTypes).filter(([key]) => key.startsWith("distilation"))
  );
  const [templateValue, setTemplateValue] = useState<string | undefined>("");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setData((previousData: any) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const formatInputValue = (value: any): string => {
    if (typeof value === "number") {
      return value.toString();
    }
    return value || "";
  };

  useEffect(() => {
    setInputFields(dataTypes[inputType]);
    setData({});
    setTemplateValue("");
  }, [inputType]);

  useEffect(() => {
    if (selectedTemplate) {
      setData(selectedTemplate as any);
    }
  }, [selectedTemplate]);

  return (
    <div className="inputform-area">
      <form className="inputform-area__form-section" onSubmit={handleOnSubmit}>
        <div className="form-section__input-buttons">
          {inputType.split("_")[0] === "distilation" &&
            changeDistilationType && (
              <select
                className="content__distilation-type-button"
                value={inputType}
                onChange={(e) => changeDistilationType(e.target.value)}
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
              value={templateValue}
              onChange={(e) => {
                setTemplateValue(e.target.value);
                if (e.target.value === "") {
                  setData({});
                  setSelectedTemplate(null);
                } else {
                  const selectedTemplate = (
                    templates[inputType] as TemplateType[]
                  ).find((template) => template.id === Number(e.target.value));
                  setSelectedTemplate(selectedTemplate || null);
                }
              }}
            >
              <option value="">template</option>
              {templates[inputType]?.map((template, index) => (
                <option key={index} value={template.id}>
                  {template.id}
                </option>
              ))}
            </select>
            <button
              disabled
              className="template-buttons__save-template-element"
            >
              Save
            </button>
          </div>
        </div>

        <table className="form-section__inputs">
          <tbody>
            {inputFields.map((field, id) => {
              return (
                <tr key={id} className="inputs-row">
                  <td>
                    <span className="inputs-label">{field.label}:</span>
                  </td>
                  <td>
                    {field.name === "graphType" ? (
                      <select
                        className="inputs-graph-type"
                        name={field.name}
                        value={data[field.name] || ""}
                        onChange={handleChange}
                      >
                        <option value="">Graph Type</option>
                        <option value="equilibrium">Equilibrium</option>
                        <option value="temperature">Temperature</option>
                        <option value="pressure">Pressure</option>
                      </select>
                    ) : field.name === "type" ? (
                      <select
                        className="inputs-graph-type"
                        name={field.name}
                        value={data[field.name] || ""}
                        onChange={handleChange}
                      >
                        <option value="">Type</option>
                        <option value="A">Acid</option>
                        <option value="B">Base</option>
                      </select>
                    ) : field.name === "state" ? (
                      <select
                        className="inputs-graph-type"
                        name={field.name}
                        value={data[field.name] || ""}
                        onChange={handleChange}
                      >
                        <option value="">State</option>
                        <option value="vapor">Vapor</option>
                        <option value="liquid">Liquid</option>
                      </select>
                    ) : (
                      <input
                        name={field.name}
                        type="text"
                        value={formatInputValue(data[field.name])}
                        onChange={handleChange}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
            {inputType === "distilation_kvalue" && (
              <tr className="inputs-row">
                <td>
                  <span className="inputs-label more-compounds-button">+</span>
                </td>
              </tr>
            )}
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
