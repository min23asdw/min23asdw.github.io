function About() {
  return (
    <div
      className="About"
      style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "5px",
        }}
      >
        <h2>PONGSAKORN RATTANAPAN</h2>
        <a
          className="Email-link"
          href="mailto:pongsakorn_career@outlook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          pongsakorn_career@outlook.com
        </a>

        <a
          className="Email-link"
          href="https://www.linkedin.com/in/pongsakorn-rattanapan-7b2979140/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          https://www.linkedin.com/in/pongsakorn-rattanapan-7b2979140/
        </a>
        <p>(+66) 802033044</p>
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

      <div style={{ width: "60%" }}>
        <h4 className="text-md">
          My name is Pongsakorn Rattanapan. I'm a computer engineering
          undergraduate student at Faculty of Engineering, Chiang Mai
          University.
        </h4>
      </div>
    </div>
  );
}

export default About;
