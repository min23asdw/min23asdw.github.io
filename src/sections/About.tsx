import { Box, Button, Card, CardContent, Collapse, Stack } from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Education = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Card
        variant="outlined"
        sx={{
          minHeight: "20px",
          height: "100%",
          borderRadius: "10px",
        }}
        className="custom-card"
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <b>ประวัติการศึกษา:</b> ปริญญาตรี - ปีที่สําเร็จการศึกษา 2567
              <br />
              <b>สถานศึกษา:</b> มหาวิทยาลัยเชียงใหม่ คณะวิศวกรรมศาสตร์
              สาขาวิศวกรรมคอมพิวเตอร์
              <br />
              <b>ชื่อปริญญา:</b> Bachelor of Engineering <br />
              <b>เกรดเฉลี่ย:</b> 3.61 <br />
              <b>เกียรตินิยมอันดับ:</b> เกียรตินิยมอันดับ 1 <br />
              <br />
            </div>
            <ul>
              <li>
                Data Structues : <b>A</b>
              </li>
              <li>
                Object-Oriented Programming : <b>A</b>
              </li>
              <li>
                Fundamentals of Database Systems : <b>B+</b>
              </li>
              <li>
                Algorithms : <b>A</b>
              </li>
              <li>
                Machine Vision : <b>A</b>
              </li>
              <li>
                NLP : <b>A</b>
              </li>
              <li>
                Basic Compiler Design : <b>A</b>
              </li>
              <li>
                Fundamental English 2 : <b>B</b>
              </li>
              <li>
                Calculus for Engineering 3 : <b>C+</b>
              </li>
            </ul>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

function About() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Stack
      className="About"
      sx={{
        display: "flex",
        flexDirection: "column",
        // marginTop: "50px",
      }}
    >
      <Stack
        className="About_1"
        sx={{
          display: "flex",
          flexDirection: { md: "column", lg: "row" },
          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "5px",
            width: "40%",
          }}
        >
          <h2>PONGSAKORN RATTANAPAN</h2>
          <div style={{ gap: "20px" }}>
            <a
              className="Email-link"
              href="mailto:pongsakorn_career@outlook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              pongsakorn_career@outlook.com
            </a>
          </div>

          <a
            className="linkedin-link"
            href="https://www.linkedin.com/in/pongsakorn-rattanapan-7b2979140/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            https://www.linkedin.com/in/pongsakorn-rattanapan-7b2979140/
          </a>
          <b>(+66)802033044</b>
          <a
            className="github-link"
            href="https://github.com/min23asdw"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            github.com/min23asdw
          </a>
          <Box
            className="school"
            sx={{
              width: "60%",
              // marginLeft: { xs: "30vw", lg: "0vw" },
            }}
          >
            <Button
              disableElevation
              onClick={toggleVisibility}
              sx={{
                // bgcolor: "rgba(255, 142, 61, 0.25)",
                color: "black",
                ":hover": {
                  // bgcolor: "rgba(255, 142, 61, 0.75)",
                  // color: "gray",
                },
                borderBottom: "solid gray",
              }}
            >
              <h2>{"ประวัติการศึกษา"}</h2>
              {visible ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </Box>
        </div>
        <Box
          className="Passion"
          sx={{
            width: "60%",
            marginLeft: { xs: "30vw", lg: "0vw" },
          }}
        >
          <p className="text-md">
            I graduated with a Bachelor of Engineering in Computer Engineering,
            Chiang Mai University and I'm interested in working as a
            <b> software engineer</b>, <b>web frontend/mobile developer</b> , or
            <b> full-stack developer</b>.
          </p>
          <p className="text-md">
            In particular, during my time in college, I worked on outsourcing
            projects that gave me real-world experience. One of these projects
            was developing a crowdsourcing platform for a Christian
            organization, which I think is my masterwork.
            <b> [React, Jira, and Agile] </b>
          </p>

          <p>
            I have a passion about learning and exploring a wide range of
            topics, from <b>AI</b>,<b>React</b>,<b>Mobile Flutter</b>, and
            <b> Backend development </b>
            which reflects my adaptable skill set and enhance for creativity.
          </p>
        </Box>
      </Stack>
      <Collapse in={visible} timeout="auto">
        <Education />
      </Collapse>
    </Stack>
  );
}

export default About;
