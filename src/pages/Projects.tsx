import React from "react";
import { Box, Grid } from "@mui/material";
import ProjectCard from "../component/ProjectCard";
import file from "../data/Projects.json";
const ProjectsComponent = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, md: 8, lg: 12 }}
      sx={{  marginBottom:'20px',}}
    >
      {Array.from(file).map((data, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <ProjectCard data={data} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsComponent;
