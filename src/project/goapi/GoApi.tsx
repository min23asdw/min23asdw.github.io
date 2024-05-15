import React from "react";
import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";
import PdfViewer from "../../service/PdfViewer";

const GOAPI = () => {
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
              Build in an MVC structure and connect to a MySQL database
            </h2>

            <h3 className="text-xl font-bold">
              To offers endpoints for users, posts, task services with JWT
              authentication.
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
              <img width={"100%"} src="./pic/go/goapi.png" alt="goapi" />
              <img
                width={"100%"}
                src="./pic/go/goapi_mysql.png"
                alt="goapi_mysql"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default GOAPI;
