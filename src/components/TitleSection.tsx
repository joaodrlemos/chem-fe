import React, { useState } from "react";
import { AdminInfoProps, TitleProps } from "../types/types";
import "../styles/titleSection.scss";
import logoTransparentLight from "../assets/images/logos/transparent_light_mode_2.png";
import { users } from "../assets/data/users";

export const TitleSection: React.FC<TitleProps> = ({
  title,
  templateButton,
  auxiliaryForm,
}) => {
  const userRoleUsers = users.filter((user) => user.role === "user");
  let adminInfoObj = { lockedForUsers: false, users: [...userRoleUsers] };
  const storedAdminInfoString = localStorage.getItem("adminInfo");
  if (storedAdminInfoString) {
    adminInfoObj = JSON.parse(storedAdminInfoString);
  }
  const [adminInfo, setAdminInfo] = useState<AdminInfoProps | null>(
    adminInfoObj
  );

  const handleToggleLockForStudents = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setAdminInfo((p) => {
      if (!p) return null;

      return {
        ...p,
        lockedForUsers: !p.lockedForUsers,
      };
    });
    localStorage.setItem(
      "adminInfo",
      JSON.stringify({
        lockedForUsers: !adminInfo?.lockedForUsers,
        users: adminInfo?.users,
      })
    );
  };

  const handleUserConnection = (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: number
  ) => {
    e.preventDefault();
    const updatedUsers =
      adminInfo?.users.map((user) => {
        if (user.id === userId) {
          return { ...user, connected: !user.connected };
        }
        return user;
      }) || [];
    setAdminInfo((p) => {
      if (!p) return null;

      return { ...p, users: updatedUsers };
    });
    localStorage.setItem(
      "adminInfo",
      JSON.stringify({
        lockedForUsers: adminInfo?.lockedForUsers,
        users: updatedUsers,
      })
    );
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
                style={{ color: adminInfo?.lockedForUsers ? "green" : "red" }}
              >
                {adminInfo?.lockedForUsers ? "true" : "false"}
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
                  {adminInfoObj.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>
                        <button
                          className="boolean-button student-connection-button"
                          onClick={(e) => handleUserConnection(e, user.id)}
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
                        <td style={{ fontSize: "1.5em" }}>-</td>
                        <td>
                          <button
                            className="boolean-button  student-connection-button"
                            disabled
                          >
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
