import Navbar from "../../component/Navbar";
import { Container } from "@mui/material";

const FOOD = () => {
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
              Created a Convolutional Neural Network <b>CNN</b> model for
              classifying types of food from images.
            </h2>

            <h2 className="text-xl font-bold">OpenCv , Classification model</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingLeft: "15%",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img width={"40%"} src="./pic/food/food_1.png" alt="food_1" />
                <img width={"70%"} src="./pic/food/food_2.png" alt="food_2" />
              </div>
              <img width={"80%"} src="./pic/food/food_3.png" alt="food_3" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FOOD;
