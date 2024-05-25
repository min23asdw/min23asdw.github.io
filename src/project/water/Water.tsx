import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const WATER = () => {
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
              Developed a smart home water usage monitoring system utilizing IoT
              technology for data collection and storage. The system
              incorporates a data analysis web application that presents
              detailed reports and insights through a user-friendly dashboard.
            </h2>

            <h2 className="text-xl font-bold">
              Microcontroller - Firebase / iot
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  gap: "10px",
                }}
              >
                <div
                  style={{ width: "100%", height: "500px", overflow: "hidden" }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src="./pic/water/water_1.png"
                    alt="water_1"
                  />
                </div>
                <div
                  style={{ width: "100%", height: "500px", overflow: "hidden" }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src="./pic/water/water_2.png"
                    alt="water_2"
                  />
                </div>
              </div>
              <div
                style={{
                  width: "60%",
                  height: "500px",
                  overflow: "hidden",
                  marginTop: "10px",
                }}
              >
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src="./pic/water/water_3.png"
                  alt="water_3"
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  // overflow: "hidden",
                  marginTop: "10px",
                }}
              >
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src="./pic/water/water_4.png"
                  alt="water_4"
                />
              </div>

              <img
                style={{ width: "50%", height: "50%", objectFit: "cover" }}
                src="./pic/water/water_5.png"
                alt="water_5"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WATER;
