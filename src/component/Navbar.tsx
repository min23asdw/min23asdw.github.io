import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import NavbarUserPopover from "./NavPop";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

function Navbar() {
  const [popoverAnchor, setPopoverAnchor] =
    React.useState<HTMLButtonElement | null>(null);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "50px",
        padding: "10px",
        borderBottom: `1px solid ${grey[400]}`,
        boxShadow: `0px 4px 4px ${grey[400]}`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "end",
        gap: 2,
        backgroundColor: "white",
        zIndex: 1000,
        marginBottom: "60px",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "1.5rem",
            fontWeight: "bold",
            "&:hover": {
              color: "primary.dark",
            },
            display: "flex",
            alignItems: "center",
          }}
        >
          PORTFOLIO
        </Typography>
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: "30px",
          gap: 8,
        }}
      >
        <Button variant="text" onClick={handleUserMenuClick}>
          <LunchDiningIcon
            sx={{
              color: "rgba(255, 142, 61, 1.00)",
            }}
          />
        </Button>

        <NavbarUserPopover
          open={Boolean(popoverAnchor)}
          popoverAnchor={popoverAnchor}
          handlePopoverClose={handlePopoverClose}
        />
      </Box>
      <Box sx={{ height: "60px" }} />
    </Box>
  );
}

export default Navbar;
