import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const NETAPI = () => {
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
              Learn and build in an .NET Framework for all CRUD
            </h2>

            <h3 className="text-xl font-bold">
              with data validations for villas endpoints that have swagger API
              Document and connect to a SQL database.
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
              <img width={"100%"} src="./pic/net/net_api.png" alt="net_api" />
              <img width={"100%"} src="./pic/net/net_api2.png" alt="net_api2" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NETAPI;
