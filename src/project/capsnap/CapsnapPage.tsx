import React from "react";
import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";
import PdfViewer from "../../service/PdfViewer";

const CAPSNAP = () => {
  return (
    <>
      <Navbar />
      <Container>
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
              Flutter based android application for product browsing, checkout
              in real time
            </h2>

            <h3 className="text-xl font-bold">
              and has feature like camera streaming that streaming to a self
              trained AI classification server in real time
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
              <img width={"100%"} src="./pic/capsnap/cap1.png" alt="cap1" />
              <img width={"100%"} src="./pic/capsnap/cap2.png" alt="cap2" />
              <img width={"100%"} src="./pic/capsnap/cap3.png" alt="cap3" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CAPSNAP;
