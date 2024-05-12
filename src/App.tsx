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
    <div className="App">
      <About />
      <div>
        Resume Here.
        <button onClick={toggleResume}>
          {resumeVisible ? "Hide" : "Show"}
        </button>
        {resumeVisible && <PdfViewer />}
      </div>
      <SkillsComponent />

       

       
      <div>
        PROJECTS.
       
      </div>

      {/* </header> */}
    </div>
  );
}

export default App;
