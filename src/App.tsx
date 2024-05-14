import React, { useState } from "react";
import "./App.css";
import PdfViewer from "./service/PdfViewer";

import About from "./pages/About";
import SkillsComponent from "./pages/Skills";
import { Box, Button, Collapse, Container } from "@mui/material";
import ProjectsComponent from "./pages/Projects";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Navbar from "./component/Navbar";

interface SectionProps {
  title: string;
  show: boolean;
  content: React.ReactNode;
}

const ExpandableSection: React.FC<SectionProps> = ({
  title,
  show,
  content,
}) => {
  const [visible, setVisible] = useState(show);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button
        onClick={toggleVisibility}
        sx={{
          bgcolor: "rgba(255, 142, 61, 0.25)",
          color: "black",
          ":hover": {
            bgcolor: "rgba(255, 142, 61, 0.75)",
            color: "white",
          },
          borderBottom: "solid black",
          width: "100%",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        {visible ? <ExpandLess /> : <ExpandMore />}
      </Button>

      <Collapse in={visible} timeout="auto">
        <Box sx={{ padding: "10px" }}>{content}</Box>
      </Collapse>
    </>
  );
};

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
