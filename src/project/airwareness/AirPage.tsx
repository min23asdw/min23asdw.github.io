import React from "react";
import Navbar from "../../component/Navbar";

const AIRWARE = () => {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "3rem" }}>
            <h2 className="text-xl font-bold">Frontend</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "2rem",
              }}
            >
              ssss
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "3rem" }}>
            <h2 className="text-xl font-bold">Backend</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "2rem",
              }}
            >
              sdddd
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
    </>
  );
};

export default AIRWARE;
