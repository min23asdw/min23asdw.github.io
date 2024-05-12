import { Viewer, Worker } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import React from "react";
function PdfViewer() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (


        <div className="container">

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                    fileUrl='https://github.com/min23asdw/Diagnostic_GA/blob/master/report_Diagnostic_GA.pdf'
                    plugins={[
                        defaultLayoutPluginInstance
                    ]}
                />
            </Worker>

        </div>


    )
}

export default PdfViewer