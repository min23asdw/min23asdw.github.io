import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";
import PdfViewer from "../../service/PdfViewer";

const MLP = () => {
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
              Build JAVA - MLP / Neural networks from scratch without using any
              Lib.
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <h3 className="text-xl font-bold">
                Backpropagation
                <a
                  className="github-link"
                  href="https://github.com/min23asdw/MLP_neural_network"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (Github)
                </a>
              </h3>
              <h3 className="text-xl font-bold">
                Genetic algorithm
                <a
                  className="github-link"
                  href="https://github.com/min23asdw/Diagnostic_GA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (Github)
                </a>
              </h3>
              <h3 className="text-xl font-bold">
                Swarm optimization
                <a
                  className="github-link"
                  href="https://github.com/min23asdw/Particle_swarm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (Github)
                </a>
              </h3>

              <img src="./pic/mlp/train.png" alt="train" />
            </div>
            <h2 className="text-xl font-bold">Theory</h2>
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: "1rem",
                // paddingLeft: "5%",
              }}
            >
              <PdfViewer src={"./doc/mlp/mlp_f.pdf"} />
            </div>
            <h2 className="text-xl font-bold">Other</h2>
            <div
              style={{
                display: "flex",
                width: "100%",

                flexDirection: "column",
              }}
            >
              <PdfViewer src={"./doc/mlp/report_MLP.pdf"} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MLP;
