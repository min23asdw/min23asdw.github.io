import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const WAANME = () => {
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
              startup ผ่านโครงการ
              พัฒนาระบบนิเวศเพื่อสร้างผู้ประกอบการรุ่นใหม่  (Entrepreneurial Ecosystem Development) ของทาง CMU STeP ครับ
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
              <img width={"70%"} src="./pic/waanme/poster.png" alt="poster" />
              <img width={"70%"} src="./pic/waanme/user.png" alt="user" />
              <img width={"70%"} src="./pic/waanme/waan.png" alt="waan" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WAANME;
