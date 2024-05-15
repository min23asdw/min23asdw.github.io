import data from "../data/SkillData.json";

const SkillsComponent = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
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
            {data.frontend.map((skill, index) => (
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {data.backend.map((skill, index) => (
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
