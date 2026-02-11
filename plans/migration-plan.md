# Portfolio Redesign Migration Plan

## Overview

This migration plan details the step-by-step implementation of the new design system. The plan is organized into phases to minimize risk and allow for incremental improvements.

---

## Phase 1: Critical Fixes (Priority: URGENT)

### 1.1 Fix Viewport Meta Tag

**File:** `public/index.html`
**Line:** 7

**Change:**

```diff
- <meta name="viewport" content="width=1024" />
+ <meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**Impact:** Enables mobile responsiveness across the entire site.

### 1.2 Add Theme CSS Import

**File:** `src/index.css`

**Add at the top:**

```css
@import "./styles/theme.css";
```

**Add Google Fonts to `public/index.html` `<head>`:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

---

## Phase 2: Foundation Setup

### 2.1 Create Theme CSS File

**File:** `src/styles/theme.css`

Copy the complete CSS content from `plans/theme-css-reference.md`.

### 2.2 Update Base Styles

**File:** `src/index.css`

Replace existing content with:

```css
@import "./styles/theme.css";

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-family-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y: scroll;
}

code {
  font-family: var(--font-family-mono);
}

/* Focus visible styles for accessibility */
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Utility classes */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-left: var(--container-padding-x);
  padding-right: var(--container-padding-x);
}

.section {
  padding-top: var(--section-padding-y);
  padding-bottom: var(--section-padding-y);
}
```

---

## Phase 3: Component Migration

### 3.1 Badge Component Update

**File:** `src/styles/Badge.css`

**Replace with:**

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: white;
}

.badge-fe {
  background-color: var(--badge-fe-bg);
}

.badge-be {
  background-color: var(--badge-be-bg);
}

.badge-mobile {
  background-color: var(--badge-mobile-bg);
}

.badge-ai {
  background-color: var(--badge-ai-bg);
}

.badge-devops {
  background-color: var(--badge-devops-bg);
}

.badge-design {
  background-color: var(--badge-design-bg);
}
```

### 3.2 Card Styles Update

**File:** `src/styles/card.css`

**Replace with:**

```css
.custom-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.custom-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  border-color: var(--color-primary-300);
}

.card-actions {
  justify-content: flex-end;
  padding: var(--space-4);
}

/* Project card specific */
.project-card {
  min-height: 550px;
}

.project-card img {
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
}

.project-card .card-content {
  flex-grow: 1;
  padding: var(--space-4);
}
```

### 3.3 Create Navigation Styles

**File:** `src/styles/nav.css`

**Create new file:**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  z-index: var(--z-fixed);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--container-padding-x);
}

.navbar-dark {
  background: rgba(15, 23, 42, 0.9);
  border-color: var(--color-border);
}

.navbar-brand {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.navbar-brand:hover {
  color: var(--color-primary-700);
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
  padding: var(--space-2) 0;
  position: relative;
}

.navbar-link:hover {
  color: var(--color-primary-600);
}

.navbar-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary-500);
  transition: width var(--transition-fast);
}

.navbar-link:hover::after {
  width: 100%;
}

/* Mobile menu button */
.navbar-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  color: var(--color-text-primary);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .navbar-nav {
    display: none;
  }

  .navbar-menu-btn {
    display: block;
  }

  .navbar-nav.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--color-surface);
    padding: var(--space-4);
    gap: var(--space-4);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
  }
}
```

---

## Phase 4: Section Layout Fixes

### 4.1 Fix About Section Responsive Layout

**File:** `src/sections/About.tsx`

**Key changes needed:**

- Remove fixed `width: "40%"` and `width: "60%"`
- Use CSS Grid or Flexbox with responsive breakpoints
- Replace inline styles with CSS classes

**Recommended structure:**

```tsx
// Use this layout approach
<Stack
  className="about-section"
  sx={{
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    gap: 4,
  }}
>
  <Box sx={{ flex: { lg: "0 0 40%" } }}>{/* Left column content */}</Box>
  <Box sx={{ flex: { lg: "1" } }}>{/* Right column content */}</Box>
</Stack>
```

### 4.2 Update Projects Section Grid

**File:** `src/sections/Projects.tsx`

Already using MUI Grid - ensure responsive columns work with new viewport meta tag.

### 4.3 Update Experience Section Grid

**File:** `src/sections/Experience.tsx`

Same as Projects - verify responsive behavior after viewport fix.

---

## Phase 5: Create New Components

### 5.1 Create Footer Component

**File:** `src/components/Footer.tsx`

```tsx
import { Box, Container, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "var(--color-surface-subtle)",
        borderTop: "1px solid var(--color-border)",
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Pongsakorn Rattanapan. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              href="https://github.com/min23asdw"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/pongsakorn-rattanapan-7b2979140/"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </Link>
            <Link href="mailto:pongsakorn_career@outlook.com">Email</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
```

### 5.2 Update Navbar Component

**File:** `src/components/Navbar.tsx`

**Replace food icon with proper hamburger menu:**

```tsx
import MenuIcon from "@mui/icons-material/Menu";
// ...
<Button variant="text" onClick={handleUserMenuClick}>
  <MenuIcon sx={{ color: "var(--color-primary-500)" }} />
</Button>;
```

**Update NavPop to include main sections:**

```tsx
const agenda = [
  ["หน้าหลัก", "/"],
  ["About", "/#about"],
  ["Skills", "/#skills"],
  ["Projects", "/#projects"],
  ["Experience", "/#experience"],
  ["Note", "/note"],
];
```

---

## Phase 6: Accessibility Improvements

### 6.1 Add Alt Text to All Images

Review all image components and add descriptive alt text.

### 6.2 Add ARIA Labels

- Add `aria-label` to icon-only buttons
- Add `aria-expanded` to expandable sections
- Add `aria-current="page"` to active navigation items

### 6.3 Ensure Color Contrast

All color combinations in theme.css meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

---

## Phase 7: Dark Mode Toggle (Optional)

### 7.1 Create Theme Context

**File:** `src/context/ThemeContext.tsx`

```tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("theme") as Theme) ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
```

### 7.2 Add Theme Toggle Button to Navbar

```tsx
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../context/ThemeContext";

// Inside Navbar component
const { theme, toggleTheme } = useTheme();

<IconButton onClick={toggleTheme} aria-label="Toggle theme">
  {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
</IconButton>;
```

---

## Phase 8: Testing & Validation

### 8.1 Responsive Testing Checklist

- [ ] Test on mobile (320px - 414px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1280px+)
- [ ] Verify all sections are readable
- [ ] Check touch targets are at least 44px

### 8.2 Accessibility Checklist

- [ ] Run Lighthouse audit (aim for 100 accessibility score)
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Check screen reader compatibility
- [ ] Test with reduced motion preference

### 8.3 Performance Checklist

- [ ] Verify fonts load correctly
- [ ] Check CSS file sizes
- [ ] Test smooth scrolling
- [ ] Verify animations work

---

## Migration Timeline

| Phase                   | Duration | Priority |
| ----------------------- | -------- | -------- |
| Phase 1: Critical Fixes | 1 day    | URGENT   |
| Phase 2: Foundation     | 1 day    | HIGH     |
| Phase 3: Components     | 2 days   | HIGH     |
| Phase 4: Section Fixes  | 1 day    | MEDIUM   |
| Phase 5: New Components | 1 day    | MEDIUM   |
| Phase 6: Accessibility  | 1 day    | MEDIUM   |
| Phase 7: Dark Mode      | 1 day    | LOW      |
| Phase 8: Testing        | 1 day    | HIGH     |

**Total Estimated Time:** 7-9 days

---

## Rollback Strategy

If issues arise:

1. Keep a backup branch of the original code
2. Use feature flags for major changes
3. Test each phase in isolation before proceeding
4. Have a staging environment for validation

---

## Success Criteria

- [ ] Viewport meta tag fixed
- [ ] No fixed widths breaking mobile layout
- [ ] Consistent use of CSS variables throughout
- [ ] All interactive elements have focus states
- [ ] Dark mode works correctly
- [ ] Lighthouse accessibility score ≥ 95
- [ ] All images have alt text
- [ ] Navigation is intuitive and complete
