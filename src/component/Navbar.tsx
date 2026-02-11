import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        backgroundColor: "var(--color-surface)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-4)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "var(--color-primary-500)",
            fontFamily: "var(--font-family-primary)",
          }}
        >
          Portfolio
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="close menu"
          sx={{
            color: "var(--color-text-primary)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ padding: "var(--space-2)" }}>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(item.href)}
              sx={{
                borderRadius: "var(--radius-sm)",
                margin: "var(--space-1) 0",
                padding: "var(--space-3) var(--space-4)",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-primary)",
                "&:hover": {
                  backgroundColor: "var(--color-hover)",
                  color: "var(--color-primary-600)",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: "var(--text-base)",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "56px",
          padding: "0 var(--container-padding-x)",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--color-surface)",
          zIndex: "var(--z-fixed)",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          aria-label="Go to homepage"
        >
          <Typography
            sx={{
              color: "var(--color-primary-500)",
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              fontFamily: "var(--font-family-primary)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            PORTFOLIO
          </Typography>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-1)",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                sx={{
                  color: "var(--color-text-secondary)",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)",
                  fontFamily: "var(--font-family-primary)",
                  textTransform: "none",
                  padding: "var(--space-1) var(--space-3)",
                  borderRadius: "var(--radius-sm)",
                  "&:hover": {
                    backgroundColor: "var(--color-hover)",
                    color: "var(--color-primary-600)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            aria-label="open menu"
            aria-expanded={mobileOpen}
            sx={{
              color: "var(--color-text-primary)",
              padding: "var(--space-2)",
              borderRadius: "var(--radius-sm)",
              "&:hover": {
                backgroundColor: "var(--color-hover)",
                color: "var(--color-primary-500)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            backgroundColor: "var(--color-surface)",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Box sx={{ height: "56px" }} />
    </>
  );
}

export default Navbar;
