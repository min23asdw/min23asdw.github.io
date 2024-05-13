import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Theme,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import { ProjectData } from "../model/project";
import "../styles/card.css";
interface DataProp {
  data: ProjectData;
}

const ProjectCard = (prop: DataProp) => {
  const data = prop.data;

  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: "600px",
        height: "100%",
        // width: { xs: "80vh", md: "20vh" },
        borderRadius: "10px",
      }}
      className="custom-card"
    >
      <CardMedia
        component="img"
        height="200"
        image={data.imgSrc}
        alt={data.alt}
        sx={{ padding: "1em 1em 0 0em", objectFit: "contain" }}
      />

      <CardContent>
      
        <h3 className="inline  text-lg font-bold">{data.title}</h3>
     

        {data.interval}
        <Typography variant="body1" color="text.secondary">
          {data.description}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {data.techstack}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing></CardActions> */}
    </Card>
  );
};

export default ProjectCard;
