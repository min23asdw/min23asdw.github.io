import "./App.css";
import PdfViewer from "./service/PdfViewer";

import SkillsComponent from "./sections/Skills";
import { Container } from "@mui/material";
import ProjectsComponent from "./sections/Projects";
import Navbar from "./component/Navbar";
import { ExpandableSection } from "./component/Expand";
import About from "./sections/About";
import ExpenrienceComponent from "./sections/Experience";


function App() {
  const ResumeSkills = [
    {
      title: "Resume",
      content: <PdfViewer src="https://min23asdw.github.io/doc/Pongsakorn_Rattanapan_Resume.pdf" />,
    },
    {
      title: "Skills",
      content: <SkillsComponent />,
    },

  ];


  const Projects = [
    {
      title: "Projects",
      show: true,
      content: <ProjectsComponent />,
    }
  ];

  const Experience = [
    {
      title: "Experience",
      show: true,
      content: <ExpenrienceComponent />,
    }
  ];
  return (
    // <div className="App" style={{ marginLeft: "15vw", marginRight: "15vw" }}>
    <>
      <Navbar />
      <Container
        sx={{
          paddingTop: "70px",
        }}
      >
        <About />

        <ExpandableSection items={ResumeSkills} show={null} />
        <ExpandableSection
          items={Projects} show={0} />
        <ExpandableSection
          items={Experience} show={0} />
      </Container>
    </>
  );
}

export default App;
