import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PdfProps {
  src: string;
}
function PdfViewer(props: PdfProps) {
  const src = props.src;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{   width: "70%" }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
          <Viewer fileUrl={src} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
}

export default PdfViewer;
