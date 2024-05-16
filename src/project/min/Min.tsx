import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const MIN = () => {
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
              Host Ubuntu Minecraft server on AWS, free up 12 mouths , with
              security and port game settings
            </h2>

            <h2 className="text-xl font-bold">Overview</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <img width={"100%"} src="./pic/min/m1.png" alt="m1" />

              <img width={"100%"} src="./pic/min/m2.png" alt="m2" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MIN;
