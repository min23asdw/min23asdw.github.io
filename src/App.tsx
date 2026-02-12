import "./App.css";
import PdfViewer from "./service/PdfViewer";

import SkillsComponent from "./sections/Skills";
import { Container, Box } from "@mui/material";
import ProjectsComponent from "./sections/Projects";
import Navbar from "./component/Navbar";
import { ExpandableSection } from "./component/Expand";
import About from "./sections/About";
import ExperienceComponent from "./sections/Experience";
import Footer from "./component/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionProvider, useSectionContext } from "./context/SectionContext";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { expandedSections, toggleSection } = useSectionContext();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const redirect = query.get("redirect");
    if (redirect) {
      const isFullUrl = redirect.startsWith("http://") || redirect.startsWith("https://");

      if (window.location.href.startsWith("https://min23asdw.github.io")) {
        navigate(redirect);
      } else {
        const finalUrl = isFullUrl ? redirect : `https://min23asdw.github.io${redirect}`;
        window.location.href = finalUrl;
      }
      return;
    }
  }, [location, navigate]);

  const Resume = [
    {
      title: "Resume",
      content: (
        <PdfViewer src="https://min23asdw.github.io/doc/Pongsakorn_Rattanapan_Resume.pdf" />
      ),
    },
    {
      title: "Skills",
      content: <SkillsComponent />,
    },
  ];

  const Projects = [
    {
      title: "Projects",
      content: <ProjectsComponent />,
    },
  ];

  const Experience = [
    {
      title: "Experience",
      content: <ExperienceComponent />,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AnimatedBackground />
      <Navbar />
      <Container
        component="main"
        sx={{
          flex: 1,
          paddingTop: "var(--space-4)",
          paddingBottom: "var(--space-8)",
          pointerEvents: "none",
          "& > *": {
            pointerEvents: "auto",
          },
        }}
      >
        <About
          isExpanded={expandedSections.about}
          onToggle={() => toggleSection("about")}
        />
        <ExpandableSection items={Resume} show={null} />
        <ExpandableSection
          items={Experience}
          show={null}
          externalExpandedIndex={expandedSections.experience ? 0 : null}
          onToggle={() => toggleSection("experience")}
        />
        <ExpandableSection
          items={Projects}
          show={null}
          externalExpandedIndex={expandedSections.projects ? 0 : null}
          onToggle={() => toggleSection("projects")}
        />
      </Container>
      <Footer />
    </Box>
  );
}

function App() {
  return (
    <SectionProvider>
      <AppContent />
    </SectionProvider>
  );
}

export default App;
