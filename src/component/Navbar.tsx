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
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import { useSectionContext, SectionId } from "../context/SectionContext";
import { useThemeMode } from "../context/ThemeModeContext";

interface NavItem {
  label: string;
  href: string;
  sectionId: SectionId;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
];

// Scroll delay for expansion animation
const EXPANSION_DELAY_MS = 300;

function ThemeToggle() {
  const { mode, toggle } = useThemeMode();
  const next = mode === "dark" ? "light" : "dark";
  return (
    <IconButton
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      sx={{
        color: "var(--color-text-secondary)",
        padding: "var(--space-2)",
        borderRadius: "var(--radius-sm)",
        "&:hover": {
          backgroundColor: "var(--color-hover)",
          color: "var(--color-primary-500)",
        },
      }}
    >
      {mode === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
    </IconButton>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { expandSection, isExpanded } = useSectionContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToElement = (href: string, delay: number = 0) => {
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, delay);
  };

  const handleNavClick = (href: string, sectionId: SectionId) => {
    // Close mobile drawer first
    setMobileOpen(false);

    // Determine scroll delay based on whether section needs expansion
    const needsExpansion = !isExpanded(sectionId);
    const scrollDelay = needsExpansion ? EXPANSION_DELAY_MS : 0;

    // Expand section if needed
    if (needsExpansion) {
      expandSection(sectionId);
    }

    // Scroll with appropriate delay
    scrollToElement(href, scrollDelay);
  };

  const handleLogoClick = () => {
    // Close mobile drawer if open
    setMobileOpen(false);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              onClick={() => handleNavClick(item.href, item.sectionId)}
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
          padding: "0 var(--space-2)",
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
          aria-label="PORTFOLIO - go to homepage"
          onClick={handleLogoClick}
        >
          <Typography
            sx={{
              color: "var(--color-primary-500)",
              fontSize: "var(--text-lg)",
              fontWeight: 700,
              padding: "0 var(--space-4)",
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
              padding: "0 var(--space-8)"
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => handleNavClick(item.href, item.sectionId)}
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
            <ThemeToggle />
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeToggle />
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
          </Box>
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
