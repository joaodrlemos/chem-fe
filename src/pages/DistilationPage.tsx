import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { InputForm } from "../components/InputForm";

export const DistilationPage: React.FC = () => {
  const [lockedForStudents, setLockedForStudents] = useState(false);
  const [studentsConnected, setStudentsConnected] = useState(
    "Requests connect to screen"
  );
  const [joaoAlves, setJoaoAlves] = useState(false);

  const handleSubmit = (values: string[]) => {
    const data = {
      concentrationA: values[0],
      concentrationB: values[1],
      volumeA: values[2],
      volumeB: values[3],
    };
    console.log(data);
  };

  return (
    <div className="container">
      <div className="top-section half-section">
        <Navbar showHomeButton={true} />
        <img
          src="../assets/images/logos/logo_fundo_preto.jpg"
          alt="Chem Logo"
        />
        <h1 className="title">Distilation Module</h1>
        <button className="template-button">Template</button>
        <div className="top-right-controls">
          <div>
            <label>Locked for students</label>
            <input
              type="checkbox"
              checked={lockedForStudents}
              onChange={() => setLockedForStudents(!lockedForStudents)}
            />
          </div>
          <div>
            <label>Students connected</label>
            <input
              type="text"
              value={studentsConnected}
              onChange={(e) => setStudentsConnected(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label>João Alves</label>
            <input
              type="checkbox"
              checked={joaoAlves}
              onChange={() => setJoaoAlves(!joaoAlves)}
            />
          </div>
        </div>
      </div>
      <div className="bottom-section half-section">
        {/* <InputForm onSubmit={handleSubmit} /> */}
      </div>
    </div>
  );
};
