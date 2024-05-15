import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";
import PdfViewer from "../../service/PdfViewer";

const AIRWARE = () => {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          paddingTop: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            height: "100%",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "100%",
            }}
          >
            <h2 className="text-xl font-bold">
              Worked with a team of five to develop a mobile application that
              displays air quality data.
            </h2>

            <h3 className="text-xl font-bold">
              My responsibility was to develop a feature that allows to get GPS
              coordinates and get heat spot data form api NASAs FIRMS Mobile
              Application - Flutter / Dart
            </h3>
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h3 className="text-xl font-bold">
                AreYouWorking Team
                <a
                  className="github-link"
                  href="https://github.com/AreYouWorking/Air-pollution-awareness"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (Github)
                </a>
              </h3>
              <h3 className="text-xl font-bold">
                GitHub.io
                <a
                  className="github-link"
                  href="https://areyouworking.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (Website)
                </a>
              </h3>
              <PdfViewer src={"./doc/air/air_m.pdf"} />
            </div>
            <h2 className="text-xl font-bold">Service</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <img width={"100%"} src="./pic/air/air_flow.png" alt="air_flow" />
            </div>
            <h2 className="text-xl font-bold">Flow</h2>
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <img src="./pic/air/air_btest.png" alt="air_btest" />
            </div>
            <h2 className="text-xl font-bold">Task</h2>
            <div
              style={{
                display: "flex",
                width: "100%",

                flexDirection: "column",
              }}
            >
              <img src="./pic/air/air_task.png" alt="air_task" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AIRWARE;
