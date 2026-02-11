import { Box, Grid, Typography } from "@mui/material";
import ProjectCard from "../component/ProjectCard";
import file from "../data/Projects.json";
import Timeline from "../components/Timeline";

const ProjectsComponent = () => {
  return (
    <Box
      id="projects"
      component="section"
      sx={{
        padding: { xs: "var(--space-4) 0", md: "var(--space-6) 0" },
        scrollMarginTop: "60px",
      }}
    >
      {/* Section Header */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: { xs: "var(--space-6)", md: "var(--space-8)" },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "var(--text-2xl)", md: "var(--text-3xl)" },
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-2)",
          }}
        >
          Projects
        </Typography>
        <Typography
          sx={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          A collection of my work, from university coursework to real-world applications.
        </Typography>
      </Box>

      {/* Projects Grid */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 2, lg: 3 }}
        sx={{ marginBottom: "var(--space-8)" }}
      >
        {Array.from(file).map((data, index) => (
          <Grid item xs={1} sm={1} lg={1} key={index}>
            <Box
              sx={{
                height: "100%",
              }}
            >
              <ProjectCard data={data} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Timeline */}
      <Box
        sx={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--radius-lg)",
          padding: { xs: "var(--space-4)", md: "var(--space-6)" },
          border: "1px solid var(--color-border)",
        }}
      >
        <Timeline data={file} />
      </Box>
    </Box>
  );
};

export default ProjectsComponent;
