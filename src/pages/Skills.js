import React from "react";
import { SkillData } from "../data/SkillData";

const SkillsComponent = () => {
  return (
    <>
      <h1 className="text-2xl border-b-2 pb-4 font-bold">SKILLS</h1>
      <div className="flex gap-8 flex-col">
        <div className="flex gap-12" >
          <h2 className="text-xl font-bold">Frontend</h2>
          <div className="flex gap-10 flex-wrap">
            {SkillData.frontend.map((skill, index) => (
              <div key={index} className="flex flex-col gap-6 items-center" style={{ display: "inline-block" }}>
                <i className={skill.icon} style={{ fontSize: "56px" }}></i>
              
                <h3 className="text-md">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-12">
          <h2 className="text-xl font-bold">Backend</h2>
          <div className="flex gap-8 flex-wrap">
            {SkillData.backend.map((skill, index) => (
              <div key={index} className="flex flex-col gap-6 items-center" style={{ display: "inline-block" }}>
                {skill.icon ? (
                  <i className={skill.icon} style={{ fontSize: "56px" }}></i>
                ) : (
                  <img src={skill.img} alt={skill.name} className="w-14 h-14" />
                )}
                <h3 className="text-md">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-12">
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
    </>
  );
};

export default SkillsComponent;
