import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const KIBO = () => {
  const link2021 =
    "https://www.nstda.or.th/spaceeducation/kibo-rpc-2021-20-final-list/";
  const link2022 = "https://www.nstda.or.th/spaceeducation/3rd-kibo-rpc-score/";
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
              CCollaborated with a team to program the robot <b>Astrobee</b> in
              Java for completing tasks in an ISS simulation, including image
              processing, handling robot errors, and planning robot routes.
            </h2>

            <h2 className="text-xl font-bold">
              ISS Simulation , Java , OpenCV
            </h2>
            <div
              style={{ width: "100%", borderTop: "3px dashed   #bbb" }}
            ></div>

            <h2 className="text-xl font-bold">
              The 4th place on 2022 <Link to={link2022}>Link</Link>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <img width={"80%"} src="./pic/kibo/kibo_1.png" alt="kibo_1" />
            </div>
            <h2 className="text-xl font-bold">
              8th place on 2021 <Link to={link2021}>Link</Link>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <img width={"80%"} src="./pic/kibo/kibo_2.png" alt="kibo_2" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default KIBO;
