import React from "react";
import ReactPlayer from "react-player";

 
 
function YoutubeViewer() {

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "5rem 0 5rem 5rem",
      }}
    >
      <div style={{ border: "2px solid rgba(0,0,0,.3)"  }}>
      <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
      </div>
    </div>
  );
}

export default YoutubeViewer;
