import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PdfViewer from "./service/PdfViewer";
import YouTubePlayer from "react-player/youtube";
import YoutubeViewer from "./service/YoutubeViewer";
import About from "./pages/About";
import SkillsComponent from "./pages/Skills";

function App() {
  const [resumeVisible, setResumeVisible] = useState(false);
  const toggleResume = () => {
    setResumeVisible(!resumeVisible);
  };

  return (
    <div className="App" style={{ marginLeft: "15vw", marginRight: "15vw" }}>
      <About />
      <div>
        Resume Here.
        <button onClick={toggleResume}>
          {resumeVisible ? "Hide" : "Show"}
        </button>
        {resumeVisible && (
          <PdfViewer src={"https://min23asdw.github.io/doc/resume.pdf"} />
        )}
      </div>
      <SkillsComponent />

      <div>
        <h2> PROJECTS.</h2>
      </div>

      {/* </header> */}
    </div>
  );
}

export default App;
