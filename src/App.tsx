import React, { useState } from "react";
import "./App.css";
import PdfViewer from "./service/PdfViewer";

import About from "./pages/About";
import SkillsComponent from "./pages/Skills";
import { Box, Button, Collapse, Container } from "@mui/material";
import ProjectsComponent from "./pages/Projects";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Navbar from "./component/Navbar";
import { ExpandableSection } from "./component/Expand";

 
function App() {
  return (
    // <div className="App" style={{ marginLeft: "15vw", marginRight: "15vw" }}>
    <>
      <Navbar />
      <Container>
        <About />
        <ExpandableSection
          title="Resume"
          show={false}
          content={
            <PdfViewer src={"https://min23asdw.github.io/doc/resume.pdf"} />
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
