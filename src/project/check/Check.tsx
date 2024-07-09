import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const CHECK = () => {
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
              Developed checkworld.click to enhance skills. Set up an Ubuntu
              server, configured MongoDB, and created a GraphQL WebSocket API
              for a Next.js app TSX and TailwindCSS.
            </h2>

            <h1>
              <a href="http://checkworld.click/">checkworld.click </a>
            </h1>
            <h3 className="text-xl font-bold">
              Next.js GraphQL WebSocket MongoDB Node.js Ubuntu
            </h3>

            <h2 className="text-xl font-bold">Overview</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <img
                width={"100%"}
                src="./pic/checkworld/check_1.png"
                alt="check_1"
              />
              <img
                width={"50%"}
                src="./pic/checkworld/check_2.png"
                alt="check_2"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CHECK;
