import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TitleSection } from "../components/TitleSection";
import "../styles/loginPage.scss";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(username, password);
    navigate("/home");
  };

  return (
    <div className="login-container">
      <TitleSection
        title={"Welcome to Chem Login Page"}
        templateButton={false}
        auxiliaryForm={false}
      />
      <div className="content">
        <div className="auth-section">
          <form className="auth-section__form">
            <div className="auth-section_form--inputs">
              <div className="inputs-username">
                <span className="inputs-username__label">username:</span>
                <input
                  className="inputs-username__value"
                  type="text"
                  placeholder="User"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inputs-password">
                <span className="inputs-password__label">password:</span>
                <input
                  className="inputs-password__value"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              className="auth-section__form--login-button"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
