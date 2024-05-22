import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const TA = () => {
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
              Assisted in the Seminar in Accounting for Non IT Majors course and

            </h2>

            <h2 className="text-xl font-bold">Overview</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: 'center',
              }}
            >
              <img width={"70%"} src="./pic/ta/bi_1.png" alt="bi_1" />
              <img width={"70%"} src="./pic/ta/bi_2.png" alt="bi_2" />
              <img width={"100%"} src="./pic/ta/bi_3.png" alt="bi_3" />
              <img width={"100%"} src="./pic/ta/bi_4.png" alt="bi_4" />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "100%",
            }}
          >
            <h2 className="text-xl font-bold">

              Assisted in  the Computational Intelligence for Robotics Majors course

            </h2>

            <h2 className="text-xl font-bold">Overview</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                gap: "1rem",
              }}
            >
              <img width={"70%"} src="./pic/ta/ci_1.png" alt="ci_1" />
              <img width={"70%"} src="./pic/ta/ci_2.png" alt="ci_2" />
              <img width={"30%"} src="./pic/ta/ci_3.png" alt="ci_3" />
              <img width={"30%"} src="./pic/ta/ci_4.png" alt="ci_4" />
              <img width={"30%"} src="./pic/ta/ci_5.png" alt="ci_5" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TA;
