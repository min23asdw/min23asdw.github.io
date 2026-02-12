import { Box, Button, Collapse, Stack } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

interface AboutProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

const Education = () => {
  return (
    <Box sx={{ padding: { xs: "var(--space-2)", md: "var(--space-4)" } }}>
      <Box
        sx={{
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          padding: { xs: "var(--space-3)", md: "var(--space-5)" },
        }}
      >
        {/* University Name */}
        <Box
          component="h3"
          sx={{
            fontSize: { xs: "var(--text-lg)", md: "var(--text-xl)" },
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-2)",
            fontFamily: "var(--font-family-thai)",
            lineHeight: "var(--leading-tight)",
          }}
        >
          มหาวิทยาลัยเชียงใหม่
        </Box>

        {/* Degree */}
        <Box
          sx={{
            fontSize: { xs: "var(--text-sm)", md: "var(--text-base)" },
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-family-thai)",
            lineHeight: "var(--leading-relaxed)",
          }}
        >
          วิศวกรรมศาสตรบัณฑิต (วิศวกรรมคอมพิวเตอร์)
        </Box>

        {/* Year & GPA */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "var(--space-1)", sm: "var(--space-3)" },
            color: "var(--color-text-tertiary)",
            fontSize: "var(--text-sm)",
            marginTop: "var(--space-3)",
            marginBottom: "var(--space-4)",
          }}
        >
          <span>2020 — 2024</span>
          <Box
            component="span"
            sx={{
              display: { xs: "none", sm: "inline" },
              color: "var(--color-border)",
            }}
          >
            |
          </Box>
          <span>GPA 3.61</span>
          <Box
            component="span"
            sx={{
              display: { xs: "none", sm: "inline" },
              color: "var(--color-border)",
            }}
          >
            |
          </Box>
          <span>First Class Honors</span>
        </Box>

        {/* Transcript Button */}
        <Button
          variant="outlined"
          size="small"
          href="/doc/Pongsakorn_Rattanapan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-1) var(--space-4)",
            fontFamily: "var(--font-family-thai)",
            marginBottom: "var(--space-5)",
            "&:hover": {
              backgroundColor: "var(--color-hover)",
              borderColor: "var(--color-border-hover)",
            },
          }}
        >
          ดู Resume
        </Button>

        {/* Course Grades */}
        <Box
          sx={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "var(--space-4)",
          }}
        >
          <Box
            sx={{
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-3)",
              fontFamily: "var(--font-family-thai)",
            }}
          >
            รายวิชาเด่น
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: "var(--space-2)",
            }}
          >
            {[
              { name: "Compiler Construction", grade: "A" },
              { name: "Machine Learning", grade: "A" },
              { name: "Software Engineering", grade: "A" },
              { name: "Database Systems", grade: "A" },
              { name: "Computer Networks", grade: "A" },
              { name: "Operating Systems", grade: "B+" },
            ].map((course) => (
              <Box
                key={course.name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "var(--space-2) var(--space-3)",
                  backgroundColor: "var(--color-bg-secondary)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <Box
                  sx={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {course.name}
                </Box>
                <Box
                  sx={{
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-family-mono)",
                  }}
                >
                  {course.grade}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

function About({ isExpanded = true, onToggle }: AboutProps) {
  const contactLinks = [
    {
      icon: <EmailIcon fontSize="small" />,
      label: "pongsakorn_career@outlook.com",
      href: "mailto:pongsakorn_career@outlook.com",
    },
    {
      icon: <PhoneIcon fontSize="small" />,
      label: "(+66) 80-203-3044",
      href: "tel:+66802033044",
    },
    {
      icon: <LinkedInIcon fontSize="small" />,
      label: "linkedin.com/in/pongsakorn-rattanapan",
      href: "https://www.linkedin.com/in/pongsakorn-rattanapan-7b2979140/",
    },
    {
      icon: <GitHubIcon fontSize="small" />,
      label: "github.com/min23asdw",
      href: "https://github.com/min23asdw",
    },
  ];

  return (
    <Box
      id="about"
      component="section"
      sx={{
        padding: { xs: "var(--space-8) 0 var(--space-4) 0", md: "var(--space-16) 0 var(--space-8) 0" },
        scrollMarginTop: "80px",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 6, lg: 8 }}
        alignItems={{ xs: "center", lg: "flex-start" }}
      >
        {/* Left Column - Personal Info */}
        <Box
          sx={{
            flex: { lg: "0 0 40%" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", lg: "flex-start" },
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          <Box
            component="h1"
            sx={{
              fontSize: { xs: "var(--text-3xl)", md: "var(--text-4xl)", lg: "var(--text-5xl)" },
              fontWeight: 800,
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-4)",
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            PONGSAKORN
            <br />
            RATTANAPAN
          </Box>

          <Box
            sx={{
              fontSize: "var(--text-lg)",
              color: "var(--color-primary-500)",
              fontWeight: 600,
              marginBottom: "var(--space-6)",
            }}
          >
            Software Engineer
          </Box>

          {/* Contact Links */}
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              marginBottom: "var(--space-6)",
            }}
          >
            {contactLinks.map((link, index) => (
              <Box
                key={index}
                component="a"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--text-sm)",
                  textDecoration: "none",
                  padding: "var(--space-2) var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  transition: "all var(--transition-fast)",
                  "&:hover": {
                    backgroundColor: "var(--color-hover)",
                    color: "var(--color-primary-600)",
                  },
                  justifyContent: { xs: "center", lg: "flex-start" },
                }}
              >
                <Box sx={{ color: "var(--color-primary-500)" }}>{link.icon}</Box>
                <span>{link.label}</span>
              </Box>
            ))}
          </Stack>


        </Box>

        {/* Right Column - Bio */}
        <Box
          sx={{
            flex: { lg: "1 1 auto" },
            maxWidth: { lg: "600px" },
          }}
        >
          <Box
            sx={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--leading-relaxed)",
              "& p": {
                marginBottom: "var(--space-4)",
              },
              "& b, & strong": {
                color: "var(--color-text-primary)",
                fontWeight: 600,
              },
            }}
          >
            <p>
              I graduated with a Bachelor of Engineering in Computer Engineering from
              Chiang Mai University. I'm interested in working as a{" "}
              <strong>Software Engineer</strong>,{" "}
              <strong>Web Frontend/Mobile Developer</strong>, or{" "}
              <strong>Full-stack Developer</strong>.
            </p>
            <p>
              During my time in college, I worked on outsourcing projects that gave me
              real-world experience. One of these projects was developing a
              crowdsourcing platform for a Christian organization, which I consider my
              masterwork. <strong>[React, Jira, and Agile]</strong>
            </p>
            <p>
              I have a passion for learning and exploring a wide range of topics, from{" "}
              <strong>AI</strong>, <strong>React</strong>, <strong>Mobile Flutter</strong>,
              and <strong>Backend Development</strong>, which reflects my adaptable
              skill set and enhances my creativity.
            </p>
          </Box>
          {/* Education Toggle Button */}
          <Button
            onClick={onToggle}
            sx={{
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-surface-subtle)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-3) var(--space-6)",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "var(--text-base)",
              fontFamily: "var(--font-family-thai)",
              transition: "all var(--transition-fast)",
              "&:hover": {
                backgroundColor: "var(--color-hover)",
                borderColor: "var(--color-primary-300)",
              },
              "&:focus-visible": {
                outline: "2px solid var(--color-border-focus)",
                outlineOffset: "2px",
              },
            }}
          >
            ประวัติการศึกษา
            {isExpanded ? (
              <ExpandLess sx={{ marginLeft: "var(--space-2)" }} />
            ) : (
              <ExpandMore sx={{ marginLeft: "var(--space-2)" }} />
            )}
          </Button>
        </Box>
      </Stack>

      {/* Education Section */}
      <Collapse in={isExpanded} timeout="auto">
        <Education />
      </Collapse>
    </Box>
  );
}

export default About;
