import React from "react";
import { SkillData } from "../data/SkillData";

const SkillsComponent = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
    >
      <h2
        className="text-2xl font-bold"
        style={{
          paddingBottom: "1rem",
          borderBottom: "solid black",
          textAlign: "left",
          width: "100%",
        }}
      >
        SKILLS
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "3rem" }}>
          <h2 className="text-xl font-bold">Frontend</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
            {SkillData.frontend.map((skill, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <i className={skill.icon} style={{ fontSize: "56px" }}></i>

                <h3 className="text-md">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "3rem" }}>
          <h2 className="text-xl font-bold">Backend</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
            {SkillData.backend.map((skill, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <i className={skill.icon} style={{ fontSize: "56px" }}></i>

                <h3 className="text-md">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <h2 className="text-xl font-bold">Other Skills</h2>
          <div className="flex gap-8 flex-wrap">
            <ul>
              <li>
                <span className="font-bold">Version Control:</span> Git
              </li>
              <li>
                <span className="font-bold">Computation Intelligence</span>
              </li>
              <li>
                <span className="font-bold">OpenCV / NLP</span>
              </li>
              <li>
                <span className="font-bold">Languages:</span> Thai (Native)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsComponent;
