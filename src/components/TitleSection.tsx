import React, { useState, useEffect, useMemo } from "react";
import { AdminInfoProps, TitleProps, UserProps } from "../types/types";
import "../styles/titleSection.scss";
import logoTransparentLight from "../assets/images/logos/transparent_light_mode_2.png";
import { users } from "../assets/data/users";

export const TitleSection: React.FC<TitleProps> = ({
  title,
  auxiliaryForm,
}) => {
  const userRoleUsers = useMemo(
    () => users.filter((user) => user.role === "user"),
    []
  );

  const [adminInfo, setAdminInfo] = useState<AdminInfoProps | null>(() => {
    const storedAdminInfoString = localStorage.getItem("adminInfo");
    if (storedAdminInfoString) {
      return JSON.parse(storedAdminInfoString);
    } else {
      return { lockedForUsers: false, users: [...userRoleUsers] };
    }
  });

  useEffect(() => {
    let adminInfoObj: AdminInfoProps = {
      lockedForUsers: false,
      users: [...userRoleUsers],
    };
    const storedAdminInfoString = localStorage.getItem("adminInfo");
    if (storedAdminInfoString) {
      adminInfoObj = JSON.parse(storedAdminInfoString);
    }

    const mainArray = adminInfoObj.users;
    const newArray = userRoleUsers;

    const newMap = new Map(newArray.map((user) => [user.name, user]));

    const updatedExistingUsers: UserProps[] = mainArray
      .filter((user) => newMap.has(user.name))
      .map((user) => {
        const newUser = newMap.get(user.name) as UserProps;
        return { ...newUser, connected: user.connected };
      });

    const newUsers: UserProps[] = newArray.filter(
      (newUser) => !mainArray.some((mainUser) => mainUser.name === newUser.name)
    ) as UserProps[];

    adminInfoObj.users = [...updatedExistingUsers, ...newUsers];

    setAdminInfo(adminInfoObj);
  }, [userRoleUsers]);

  const handleToggleLockForStudents = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setAdminInfo((prevAdminInfo) => {
      if (!prevAdminInfo) return null;

      const updatedAdminInfo = {
        ...prevAdminInfo,
        lockedForUsers: !prevAdminInfo.lockedForUsers,
      };
      localStorage.setItem("adminInfo", JSON.stringify(updatedAdminInfo));

      return updatedAdminInfo;
    });
  };

  const handleUserConnection = (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: number
  ) => {
    e.preventDefault();
    setAdminInfo((prevAdminInfo) => {
      if (!prevAdminInfo) return null;

      const updatedUsers = prevAdminInfo.users.map((user) =>
        user.id === userId ? { ...user, connected: !user.connected } : user
      );

      const updatedAdminInfo = { ...prevAdminInfo, users: updatedUsers };
      localStorage.setItem("adminInfo", JSON.stringify(updatedAdminInfo));

      return updatedAdminInfo;
    });
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
                  {adminInfo?.users.map((user) => (
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
