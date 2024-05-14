import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { ScrollMode, SpecialZoomLevel } from '@react-pdf-viewer/core';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PdfProps {
  src: string;
}
function PdfViewer(props: PdfProps) {
  const src = props.src;
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
        fullScreenPlugin: {
            onEnterFullScreen: (zoom) => {
                zoom(SpecialZoomLevel.PageFit);
                defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
                    ScrollMode.Vertical
                );
            },
            onExitFullScreen: (zoom) => {
                zoom(SpecialZoomLevel.PageWidth);
                defaultLayoutPluginInstance.toolbarPluginInstance.scrollModePluginInstance.switchScrollMode(
                    ScrollMode.Vertical
                );
            },
        },
    },
});
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{   width: "70%" , height :'100vh'}}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
          <Viewer fileUrl={src} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
}

export default PdfViewer;
