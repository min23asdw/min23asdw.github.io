import { useState } from "react";
import Navbar from "../../component/Navbar";
import { Button, Collapse, Container } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const COMPILER = () => {
  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [show3, setShow3] = useState<boolean>(false);

  const t1 = () => {
    setShow1((prev) => !prev);
  };
  const t2 = () => {
    setShow2((prev) => !prev);
  };
  const t3 = () => {
    setShow3((prev) => !prev);
  };
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
              Worked with a team of three to develop a .cpe (functional)
              language with OCaml-based compiler to parse token and make AST and
              Understand Lambda calculus.
            </h2>

            <h2 className="text-xl font-bold">
              parser - token AST/ Lambda calculus
            </h2>

            <div
              style={{ width: "100%", borderTop: "3px dashed   #bbb" }}
            ></div>
            <div>
              <img width={"100%"} src="./pic/com/overview.png" alt="overview" />
              <h2 className="text-xl font-bold">
                <Button key={0} onClick={() => t1()}>
                  <h2 className="text-2xl font-bold"> 1. Lexer</h2>
                  {show1 ? <ExpandLess /> : <ExpandMore />}
                </Button>
              </h2>
              <Collapse
                key={0}
                in={show1}
                timeout="auto"
                style={{ width: "100%" }}
              >
                <img width={"100%"} src="./pic/com/lexer_1.png" alt="lexer_1" />
                <img width={"100%"} src="./pic/com/lexer_2.png" alt="lexer_2" />
                <img width={"100%"} src="./pic/com/lexer_3.png" alt="lexer_3" />
              </Collapse>
              <h2 className="text-xl font-bold">
                <Button key={1} onClick={() => t2()}>
                  <h2 className="text-2xl font-bold"> 2. Parser</h2>
                  {show2 ? <ExpandLess /> : <ExpandMore />}
                </Button>
              </h2>
              <Collapse
                key={1}
                in={show2}
                timeout="auto"
                style={{ width: "100%" }}
              >
                <img
                  width={"100%"}
                  src="./pic/com/parser_1.png"
                  alt="parser_1"
                />
                <img
                  width={"100%"}
                  src="./pic/com/parser_2.png"
                  alt="parser_2"
                />
                <img
                  width={"100%"}
                  src="./pic/com/parser_3.png"
                  alt="parser_3"
                />
              </Collapse>
              <h2 className="text-xl font-bold">
                <Button key={2} onClick={() => t3()}>
                  <h2 className="text-2xl font-bold"> 3. Typecheck</h2>
                  {show3 ? <ExpandLess /> : <ExpandMore />}
                </Button>
              </h2>
              <Collapse
                key={2}
                in={show3}
                timeout="auto"
                style={{ width: "100%" }}
              >
                <img
                  width={"100%"}
                  src="./pic/com/typecheck_1.png"
                  alt="typecheck_1"
                />
                <img
                  width={"100%"}
                  src="./pic/com/typecheck_2.png"
                  alt="typecheck_2"
                />
                <img
                  width={"100%"}
                  src="./pic/com/typecheck_3.png"
                  alt="typecheck_3"
                />
              </Collapse>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img width={"60%"} src="./pic/com/step1.png" alt="step1" />
              <img width={"60%"} src="./pic/com/step2.png" alt="step2" />
              <img width={"60%"} src="./pic/com/step3.png" alt="step3" />
              <img width={"60%"} src="./pic/com/app.png" alt="app" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default COMPILER;
