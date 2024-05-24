import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const BINBOT = () => {
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
            Utilizing the Gogoboard microcontroller operates as both a trash bin and a cleaning robot.
            </h2>

            <h2 className="text-xl font-bold">CAD microcontroller - iot</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <img width={"100%"} src="./pic/binbot/bin_1.png" alt="bin_1" />

              <img width={"100%"} src="./pic/binbot/bin_2.png" alt="bin_2" />
              <img width={"100%"} src="./pic/binbot/bin_3.png" alt="bin_4" />
              <img width={"100%"} src="./pic/binbot/bin_4.png" alt="bin_4" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BINBOT;
