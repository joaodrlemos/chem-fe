import React, { useState } from "react";
import { TitleProps } from "../types/types";
import "../styles/titleSection.scss";
import logoTransparentLight from "../assets/images/logos/transparent_light_mode_2.png";
import { users } from "../assets/data/users";

export const TitleSection: React.FC<TitleProps> = ({
  title,
  templateButton,
  auxiliaryForm,
}) => {
  const [userRoleUsers, setUserRoleUsers] = useState(
    users.filter((user) => user.role === "user")
  );
  const [lockedForStudents, setLockedForStudents] = useState(false);

  const handleToggleLockForStudents = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLockedForStudents((p) => !p);
  };

  const handleStudentConnection = (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: number
  ) => {
    e.preventDefault();
    const updatedUsers = userRoleUsers.map((user) => {
      if (user.id === userId) {
        return { ...user, connected: !user.connected };
      }
      return user;
    });
    setUserRoleUsers(updatedUsers);
  };

  return (
    <div className="title-section">
      <div className="title-section__logo">
        <img
          className="title-section__logo--element"
          src={logoTransparentLight}
          alt="Logo"
        />
      </div>
      <h1 className="title-section__title">{title}</h1>
      {templateButton && (
        <button className="title-section__template-button">Template</button>
      )}
      {auxiliaryForm && (
        <form className="title-section__professor-form">
          <div className="title-section__professor-form--fields">
            <div className="fields__locked-for-students-button">
              <span className="fields__locked-for-students-button--label">
                Locked for students
              </span>
              <button
                className="boolean-button"
                onClick={(e) => handleToggleLockForStudents(e)}
                style={{ color: lockedForStudents ? "green" : "red" }}
              >
                {lockedForStudents ? "true" : "false"}
              </button>
            </div>
            <div className="fields__connected-students-table-container">
              <table className="fields__connected-students-table-element">
                <thead>
                  <tr>
                    <th>Students</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="scrollable-tbody">
                  {userRoleUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>
                        <button
                          className="boolean-button student-connection-button"
                          onClick={(e) => handleStudentConnection(e, user.id)}
                          style={{ color: user.connected ? "green" : "red" }}
                        >
                          {user.connected ? "connected" : "not connected"}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {Array(Math.max(0, 2 - userRoleUsers.length))
                    .fill(null)
                    .map((_, index) => (
                      <tr key={`empty-${index}`}>
                        <td style={{fontSize:'1.5em'}}>-</td>
                        <td>
                          <button className="boolean-button  student-connection-button" disabled>
                          not connected
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
