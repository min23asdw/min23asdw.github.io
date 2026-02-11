import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ProjectData from "../model/project";
import "../styles/card.css";
import Badge from "./Badge";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface DataProp {
  data: ProjectData;
}

const ProjectCard = (prop: DataProp) => {
  const data = prop.data;

  return (
    <Link
      style={{ textDecoration: "none", display: "block", height: "100%" }}
      to={data.detailsLink}
      aria-label={`View details for ${data.title}`}
    >
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          overflow: "hidden",
          "&:focus-within": {
            outline: "2px solid var(--color-border-focus)",
            outlineOffset: "2px",
          },
        }}
        className="custom-card"
      >
        {/* Image Container */}
        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%",
            backgroundColor: "var(--color-surface-subtle)",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={data.imgSrc + "?w=600&h=338&fit=crop"}
            alt={data.alt}
            loading="lazy"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            padding: "var(--space-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontSize: "var(--text-lg)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              lineHeight: "var(--leading-tight)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.25rem",
            }}
          >
            {data.title}
          </Typography>

          {/* Date and Badges */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: "var(--space-2)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
                color: "var(--color-text-tertiary)",
                fontSize: "var(--text-sm)",
              }}
            >
              <CalendarTodayIcon fontSize="small" />
              <span>{data.start}</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "var(--space-1)",
                flexWrap: "wrap",
              }}
            >
              {data.tech.map((type, index) => (
                <Badge key={index} type={type} />
              ))}
            </Box>
          </Box>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-normal)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flexGrow: 1,
            }}
          >
            {data.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            padding: "var(--space-3) var(--space-4)",
            paddingTop: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid var(--color-border-subtle)",
            marginTop: "auto",
          }}
        >
          <Box />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-1)",
              color: "var(--color-primary-500)",
              fontWeight: 500,
              fontSize: "var(--text-sm)",
            }}
          >
            <span>Details</span>
            <ArrowForwardIcon fontSize="small" />
          </Box>
        </CardActions>
      </Card>
    </Link>
  );
};

export default ProjectCard;
