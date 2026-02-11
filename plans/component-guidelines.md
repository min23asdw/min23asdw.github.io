# Component Style Guidelines

## Overview

This document provides detailed styling guidelines for all portfolio components. All components should use the CSS variables defined in `src/styles/theme.css`.

---

## 1. Card Components

### ProjectCard

**Structure:**

```tsx
<Card className="custom-card project-card">
  <CardMedia className="card-media" />
  <CardContent className="card-content">
    <Typography className="card-title" />
    <Box className="card-meta">
      <Typography className="card-date" />
      <Box className="card-badges" />
    </Box>
    <Typography className="card-description" />
  </CardContent>
  <CardActions className="card-actions" />
</Card>
```

**CSS:**

```css
.project-card {
  min-height: 550px;
  cursor: pointer;
}

.card-media {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
}

.card-content {
  flex-grow: 1;
  padding: var(--space-4);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  min-height: 50px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.card-date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-semibold);
}

.card-badges {
  display: flex;
  gap: var(--space-2);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.card-actions {
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
}
```

**Hover Effects:**

- Scale up slightly: `transform: translateY(-4px)`
- Enhanced shadow: `box-shadow: var(--shadow-md)`
- Border color change to primary-300
- Transition: `var(--transition-base)`

---

## 2. Badge Component

### Usage

```tsx
<Badge type="FE" />  // Frontend
<Badge type="BE" />  // Backend
<Badge type="Mobile" />
<Badge type="AI" />
<Badge type="DevOps" />
<Badge type="Design" />
```

**CSS:**

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
  transition: transform var(--transition-fast);
}

.badge:hover {
  transform: scale(1.05);
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

---

## 3. Navigation Components

### Navbar

**Structure:**

```tsx
<Box component="nav" className="navbar">
  <Link to="/" className="navbar-brand">
    PORTFOLIO
  </Link>
  <Box className="navbar-nav desktop-nav">
    <Link className="navbar-link" to="/#about">
      About
    </Link>
    <Link className="navbar-link" to="/#skills">
      Skills
    </Link>
    <Link className="navbar-link" to="/#projects">
      Projects
    </Link>
    <Link className="navbar-link" to="/#experience">
      Experience
    </Link>
  </Box>
  <IconButton className="navbar-menu-btn mobile-only">
    <MenuIcon />
  </IconButton>
</Box>
```

**CSS:**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  z-index: var(--z-fixed);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--container-padding-x);
  transition: background var(--transition-base);
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
  gap: var(--space-8);
}

.navbar-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  padding: var(--space-2) 0;
  position: relative;
  transition: color var(--transition-fast);
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

.navbar-menu-btn {
  display: none;
  color: var(--color-text-primary);
}

/* Mobile */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .navbar-menu-btn {
    display: flex;
  }
}
```

### Mobile Menu (NavPop)

**Structure:**

```tsx
<Popover className="mobile-menu">
  <List className="mobile-menu-list">
    <ListItem className="mobile-menu-item">
      <Link to="/">หน้าหลัก</Link>
    </ListItem>
    <ListItem className="mobile-menu-item">
      <Link to="/#about">About</Link>
    </ListItem>
    {/* ... */}
  </List>
</Popover>
```

**CSS:**

```css
.mobile-menu {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
}

.mobile-menu-item {
  padding: var(--space-3) var(--space-4);
  transition: background var(--transition-fast);
}

.mobile-menu-item:hover {
  background: var(--color-hover);
}

.mobile-menu-item a {
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: var(--font-medium);
  display: block;
}
```

---

## 4. Section Components

### About Section

**Layout:**

- Two-column layout on desktop (40% / 60%)
- Single column on mobile
- Use CSS Grid or Flexbox, NOT fixed widths

**CSS:**

```css
.about-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--section-padding-y) 0;
}

@media (min-width: 1024px) {
  .about-section {
    flex-direction: row;
  }

  .about-left {
    flex: 0 0 40%;
  }

  .about-right {
    flex: 1;
  }
}

.about-name {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.about-contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.about-contact a {
  color: var(--color-primary-600);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}

.about-contact a:hover {
  color: var(--color-primary-700);
  text-decoration: underline;
}

.about-bio {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.about-bio b {
  color: var(--color-text-primary);
}
```

### Skills Section

**CSS:**

```css
.skills-section {
  padding: var(--section-padding-y) 0;
}

.skills-category {
  margin-bottom: var(--space-8);
}

.skills-category-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  min-width: 120px;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  transition: transform var(--transition-fast);
}

.skill-item:hover {
  transform: translateY(-4px);
  background: var(--color-hover);
}

.skill-icon {
  font-size: 56px;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.skill-item:hover .skill-icon {
  color: var(--color-primary-500);
}

.skill-name {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
```

### Projects Section

**CSS:**

```css
.projects-section {
  padding: var(--section-padding-y) 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 5. Footer Component

**Structure:**

```tsx
<Box component="footer" className="footer">
  <Container className="footer-container">
    <Box className="footer-content">
      <Typography className="footer-copyright" />
      <Box className="footer-links" />
    </Box>
  </Container>
</Box>
```

**CSS:**

```css
.footer {
  background: var(--color-surface-subtle);
  border-top: 1px solid var(--color-border);
  padding: var(--space-8) 0;
  margin-top: var(--space-16);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-copyright {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.footer-links {
  display: flex;
  gap: var(--space-6);
}

.footer-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary-600);
}
```

---

## 6. Expandable Section

**CSS:**

```css
.expandable-section {
  margin-bottom: var(--space-6);
}

.expandable-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.expandable-header:hover {
  background: var(--color-hover);
  border-color: var(--color-primary-300);
}

.expandable-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.expandable-icon {
  color: var(--color-text-muted);
  transition: transform var(--transition-fast);
}

.expandable-header[aria-expanded="true"] .expandable-icon {
  transform: rotate(180deg);
}

.expandable-content {
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: none;
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
}
```

---

## 7. Interactive States

### Button States

```css
.btn {
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Link States

```css
.link {
  color: var(--color-primary-600);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.link:hover {
  color: var(--color-primary-700);
  text-decoration: underline;
}

.link:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Card Hover

```css
.card-hover {
  transition: all var(--transition-base);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-hover:active {
  transform: translateY(-2px);
}
```

---

## 8. Accessibility Patterns

### Focus Management

```css
/* Ensure all interactive elements have visible focus */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Remove focus outline for mouse users */
button:focus:not(:focus-visible),
a:focus:not(:focus-visible) {
  outline: none;
}
```

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Skip Link

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-600);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: var(--z-toast);
}

.skip-link:focus {
  top: 0;
}
```

---

## 9. Responsive Patterns

### Container Queries (if supported)

```css
@container (min-width: 400px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Touch Targets

```css
/* Minimum 44px touch targets for mobile */
.touch-target {
  min-width: 44px;
  min-height: 44px;
}

button,
a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
```

---

## 10. Dark Mode Considerations

All components automatically adapt to dark mode through CSS variables. Ensure:

- Images have good contrast in both modes
- Shadows are adjusted for dark backgrounds
- Text colors use the semantic variables

```css
@media (prefers-color-scheme: dark) {
  /* Add any component-specific dark mode overrides here */
  .project-card img {
    opacity: 0.9;
  }
}
```
