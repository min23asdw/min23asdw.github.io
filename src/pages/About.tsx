import { Box, Stack } from "@mui/material";

function About() {
  return (
    <Stack
      className="About"
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
          className="Email-link"
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
          projects that gave me real-world experience. One of these projects was
          developing a crowdsourcing platform for a Christian organization,
          which I think is my masterwork.
          <b> [React, Jira, and Agile] </b>
        </p>

        <p>
          I have a passion about learning and exploring a wide range of topics,
          from <b>AI</b>,<b>React</b>,<b>Mobile Flutter</b>, and
          <b> Backend development </b>
          which reflects my adaptable skill set and enhance for creativity.
        </p>
      </Box>
    </Stack>
  );
}

export default About;
