import "./App.css";
import PdfViewer from "./service/PdfViewer";

import SkillsComponent from "./sections/Skills";
import { Container } from "@mui/material";
import ProjectsComponent from "./sections/Projects";
import Navbar from "./component/Navbar";
import { ExpandableSection } from "./component/Expand";
import About from "./sections/About";

function App() {
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
        <ExpandableSection
          title="Resume"
          show={false}
          content={
            <PdfViewer src={"https://min23asdw.github.io/doc/Pongsakorn_Rattanapan_Resume.pdf"} />
          }
        />
        <ExpandableSection
          title="Skills"
          show={true}
          content={<SkillsComponent />}
        />
        <ExpandableSection
          title="Projects"
          show={true}
          content={<ProjectsComponent />}
        />
      </Container>
    </>
  );
}

export default App;
