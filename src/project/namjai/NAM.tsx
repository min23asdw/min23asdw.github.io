import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const NAMJAI = () => {
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
              Namjai is a crowd funding platform targeted to childrens
              development led by a charity foundation.
            </h2>
            <p className="   ">
              I worked in a team as a front end and UX/UI designer developer
              using <b>React, TypeScript</b> , Tailwind CSS, and <b>MUI</b>.
            </p>
            <h2 className="text-xl font-bold">Overview</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <img width={"100%"} src="./pic/namjai/n1.png" alt="n1" />

              <img width={"100%"} src="./pic/namjai/n2.png" alt="n2" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NAMJAI;
