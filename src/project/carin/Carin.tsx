import React from "react";
import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";
import PdfViewer from "../../service/PdfViewer";

const CARIN = () => {
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
              It is a single-player online strategy game.
            </h2>

            <p className="   ">
              It features <b>genetic code parser </b> and <b>interpreter </b>for
              game's characters, and multi-threaded server support for
              concurrent playing games.
            </p>

            <h3 className="text-xl font-bold">
              ExpensivePigCARIN Team{" "}
              <a
                className="github-link"
                href="https://github.com/PutawanDE/ExpensivePigCARIN"
                target="_blank"
                rel="noopener noreferrer"
              >
                (Github)
              </a>
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
              <img width={"100%"} src="./pic/carin/carin.png" alt="carin" />

              <img
                width={"100%"}
                src="./pic/carin/editcode.png"
                alt="editcode"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CARIN;
