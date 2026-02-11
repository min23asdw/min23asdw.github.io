# Portfolio Design System v2.0

## Executive Summary

This design system addresses critical issues in the current portfolio including mobile responsiveness, inconsistent styling patterns, and lack of accessibility. The new system provides a modern, cohesive foundation with full dark mode support.

---

## 1. Critical Fixes Required

### 1.1 Viewport Meta Tag (URGENT)

**File:** `public/index.html` line 7

**Current:**

```html
<meta name="viewport" content="width=1024" />
```

**Fix:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 1.2 Remove Fixed Widths

**File:** `src/sections/About.tsx`

- Line 101: `width: "40%"` → Use flex/grid layouts
- Line 140: `width: "60%"` → Use flex/grid layouts
- Line 164: `width: "60%"` → Use flex/grid layouts

---

## 2. Color System

### 2.1 Primary Palette

| Token                 | Light Mode | Dark Mode | Usage                   |
| --------------------- | ---------- | --------- | ----------------------- |
| `--color-primary-50`  | `#FFF7ED`  | `#431407` | Lightest backgrounds    |
| `--color-primary-100` | `#FFEDD5`  | `#7C2D12` | Hover states            |
| `--color-primary-200` | `#FED7AA`  | `#9A3412` | Subtle accents          |
| `--color-primary-300` | `#FDBA74`  | `#C2410C` | Secondary accents       |
| `--color-primary-400` | `#FB923C`  | `#EA580C` | Interactive elements    |
| `--color-primary-500` | `#F97316`  | `#F97316` | **Primary brand color** |
| `--color-primary-600` | `#EA580C`  | `#FB923C` | Hover primary           |
| `--color-primary-700` | `#C2410C`  | `#FDBA74` | Active states           |
| `--color-primary-800` | `#9A3412`  | `#FED7AA` | Emphasis                |
| `--color-primary-900` | `#7C2D12`  | `#FFEDD5` | Text on light           |

### 2.2 Neutral Palette (Gray Scale)

| Token              | Light Mode | Dark Mode | Usage            |
| ------------------ | ---------- | --------- | ---------------- |
| `--color-gray-50`  | `#F9FAFB`  | `#111827` | Page background  |
| `--color-gray-100` | `#F3F4F6`  | `#1F2937` | Card backgrounds |
| `--color-gray-200` | `#E5E7EB`  | `#374151` | Borders light    |
| `--color-gray-300` | `#D1D5DB`  | `#4B5563` | Disabled states  |
| `--color-gray-400` | `#9CA3AF`  | `#6B7280` | Placeholder text |
| `--color-gray-500` | `#6B7280`  | `#9CA3AF` | Secondary text   |
| `--color-gray-600` | `#4B5563`  | `#D1D5DB` | Body text dim    |
| `--color-gray-700` | `#374151`  | `#E5E7EB` | Body text        |
| `--color-gray-800` | `#1F2937`  | `#F3F4F6` | Headings         |
| `--color-gray-900` | `#111827`  | `#F9FAFB` | Primary text     |

### 2.3 Semantic Colors

| Token                | Light     | Dark      | Usage               |
| -------------------- | --------- | --------- | ------------------- |
| `--color-success`    | `#10B981` | `#34D399` | Success states      |
| `--color-success-bg` | `#D1FAE5` | `#064E3B` | Success backgrounds |
| `--color-warning`    | `#F59E0B` | `#FBBF24` | Warning states      |
| `--color-warning-bg` | `#FEF3C7` | `#451A03` | Warning backgrounds |
| `--color-error`      | `#EF4444` | `#F87171` | Error states        |
| `--color-error-bg`   | `#FEE2E2` | `#450A0A` | Error backgrounds   |
| `--color-info`       | `#3B82F6` | `#60A5FA` | Info states         |
| `--color-info-bg`    | `#DBEAFE` | `#1E3A8A` | Info backgrounds    |

### 2.4 Badge Colors

| Badge         | Background | Text      | Dark BG   | Dark Text |
| ------------- | ---------- | --------- | --------- | --------- |
| FE (Frontend) | `#10B981`  | `#FFFFFF` | `#059669` | `#FFFFFF` |
| BE (Backend)  | `#F59E0B`  | `#FFFFFF` | `#D97706` | `#FFFFFF` |
| Mobile        | `#3B82F6`  | `#FFFFFF` | `#2563EB` | `#FFFFFF` |
| AI            | `#8B5CF6`  | `#FFFFFF` | `#7C3AED` | `#FFFFFF` |
| DevOps        | `#EC4899`  | `#FFFFFF` | `#DB2777` | `#FFFFFF` |
| Design        | `#14B8A6`  | `#FFFFFF` | `#0D9488` | `#FFFFFF` |

### 2.5 Special Colors

| Token                      | Light Mode | Dark Mode | Usage            |
| -------------------------- | ---------- | --------- | ---------------- |
| `--color-background`       | `#FFFFFF`  | `#0F172A` | Main background  |
| `--color-surface`          | `#FFFFFF`  | `#1E293B` | Cards, panels    |
| `--color-surface-elevated` | `#FFFFFF`  | `#334155` | Modals, popovers |
| `--color-border`           | `#E5E7EB`  | `#334155` | Borders          |
| `--color-border-focus`     | `#F97316`  | `#F97316` | Focus rings      |

---

## 3. Typography System

### 3.1 Font Stack

```css
/* Primary font - Modern sans-serif */
--font-family-primary:
  "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Monospace for code */
--font-family-mono: "JetBrains Mono", "Fira Code", Consolas, Monaco, monospace;

/* Thai font support */
--font-family-thai: "IBM Plex Sans Thai", "Sarabun", sans-serif;
```

**Google Fonts Import:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### 3.2 Type Scale

| Token         | Size            | Line Height | Weight | Letter Spacing | Usage      |
| ------------- | --------------- | ----------- | ------ | -------------- | ---------- |
| `--text-xs`   | 0.75rem (12px)  | 1rem        | 400    | 0              | Captions   |
| `--text-sm`   | 0.875rem (14px) | 1.25rem     | 400    | 0              | Body small |
| `--text-base` | 1rem (16px)     | 1.5rem      | 400    | 0              | Body       |
| `--text-lg`   | 1.125rem (18px) | 1.75rem     | 400    | -0.01em        | Lead text  |
| `--text-xl`   | 1.25rem (20px)  | 1.75rem     | 500    | -0.01em        | H6         |
| `--text-2xl`  | 1.5rem (24px)   | 2rem        | 600    | -0.02em        | H5         |
| `--text-3xl`  | 1.875rem (30px) | 2.25rem     | 600    | -0.02em        | H4         |
| `--text-4xl`  | 2.25rem (36px)  | 2.5rem      | 700    | -0.02em        | H3         |
| `--text-5xl`  | 3rem (48px)     | 1.1         | 700    | -0.03em        | H2         |
| `--text-6xl`  | 3.75rem (60px)  | 1.1         | 800    | -0.03em        | H1         |

### 3.3 Font Weights

| Token              | Value | Usage           |
| ------------------ | ----- | --------------- |
| `--font-normal`    | 400   | Body text       |
| `--font-medium`    | 500   | Labels, buttons |
| `--font-semibold`  | 600   | Subheadings     |
| `--font-bold`      | 700   | Headings        |
| `--font-extrabold` | 800   | Display text    |

---

## 4. Spacing System

### 4.1 Base Unit: 4px

| Token        | Value          | Usage             |
| ------------ | -------------- | ----------------- |
| `--space-0`  | 0              | None              |
| `--space-1`  | 0.25rem (4px)  | Tight spacing     |
| `--space-2`  | 0.5rem (8px)   | Icon gaps         |
| `--space-3`  | 0.75rem (12px) | Small padding     |
| `--space-4`  | 1rem (16px)    | Default spacing   |
| `--space-5`  | 1.25rem (20px) | Component padding |
| `--space-6`  | 1.5rem (24px)  | Section gaps      |
| `--space-8`  | 2rem (32px)    | Card padding      |
| `--space-10` | 2.5rem (40px)  | Large gaps        |
| `--space-12` | 3rem (48px)    | Section padding   |
| `--space-16` | 4rem (64px)    | Major sections    |
| `--space-20` | 5rem (80px)    | Hero spacing      |
| `--space-24` | 6rem (96px)    | Large sections    |

### 4.2 Layout Spacing

| Token                   | Value         | Usage                        |
| ----------------------- | ------------- | ---------------------------- |
| `--section-padding-y`   | 4rem (64px)   | Vertical section padding     |
| `--container-max`       | 1280px        | Max container width          |
| `--container-padding-x` | 1.5rem (24px) | Horizontal container padding |

---

## 5. Component Guidelines

### 5.1 Cards

```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all 200ms ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-interactive:hover {
  border-color: var(--color-primary-300);
}
```

### 5.2 Buttons

**Primary Button:**

```css
.btn-primary {
  background: var(--color-primary-500);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 200ms ease;
}

.btn-primary:hover {
  background: var(--color-primary-600);
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary-300);
  outline-offset: 2px;
}
```

**Secondary Button:**

```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary-600);
  border: 1px solid var(--color-primary-300);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
}
```

### 5.3 Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-fe {
  background: var(--color-success);
  color: white;
}
.badge-be {
  background: var(--color-warning);
  color: white;
}
.badge-mobile {
  background: var(--color-info);
  color: white;
}
.badge-ai {
  background: #8b5cf6;
  color: white;
}
```

### 5.4 Navigation

**Navbar:**

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  z-index: 1000;
}

.navbar-dark {
  background: rgba(15, 23, 42, 0.9);
}
```

**Navigation Links:**

- Use clear section anchors: `#about`, `#skills`, `#projects`, `#experience`
- Replace food icon with hamburger menu icon
- Include all main sections in mobile menu

### 5.5 Focus States (Accessibility)

```css
.focus-ring:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.focus-ring:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 6. Layout System

### 6.1 Container

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-left: var(--container-padding-x);
  padding-right: var(--container-padding-x);
}
```

### 6.2 Grid System

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Responsive */
@media (min-width: 768px) {
  .md-grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .md-grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .lg-grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .lg-grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 6.3 Breakpoints

| Name  | Min Width | Usage          |
| ----- | --------- | -------------- |
| `sm`  | 640px     | Small tablets  |
| `md`  | 768px     | Tablets        |
| `lg`  | 1024px    | Small desktops |
| `xl`  | 1280px    | Desktops       |
| `2xl` | 1536px    | Large screens  |

---

## 7. Shadows & Effects

### 7.1 Shadow Scale

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md:
  0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg:
  0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl:
  0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-glow: 0 0 20px rgba(249, 115, 22, 0.3);

/* Dark mode shadows */
--shadow-dark-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--shadow-dark-md:
  0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
```

### 7.2 Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.5rem; /* 8px */
--radius-lg: 0.75rem; /* 12px */
--radius-xl: 1rem; /* 16px */
--radius-2xl: 1.5rem; /* 24px */
--radius-full: 9999px; /* Pills, badges */
```

### 7.3 Transitions

```css
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
--transition-bounce: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 8. Z-Index Scale

```css
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-tooltip: 700;
--z-toast: 800;
```

---

## 9. Animation Guidelines

### 9.1 Card Hover

```css
@keyframes cardHover {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-4px);
  }
}
```

### 9.2 Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 9.3 Pulse (for loading states)

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

---

## 10. Migration Strategy

### Phase 1: Foundation (Critical)

1. Fix viewport meta tag
2. Create `src/styles/theme.css` with all CSS variables
3. Update `src/index.css` to import theme and set base styles
4. Remove fixed widths from About section

### Phase 2: Component Updates

1. Update Badge component to use CSS variables
2. Update card styles
3. Create new Navbar with proper navigation
4. Add Footer component

### Phase 3: Styling Consolidation

1. Replace inline styles with CSS classes
2. Standardize on CSS variables over hardcoded values
3. Remove unused CSS files

### Phase 4: Polish

1. Add dark mode toggle
2. Implement focus indicators
3. Add smooth scroll behavior
4. Test accessibility

---

## 11. File Structure

```
src/
├── styles/
│   ├── theme.css          # All CSS variables/tokens
│   ├── base.css           # Reset and base styles
│   ├── utilities.css      # Utility classes
│   └── components/        # Component-specific styles
│       ├── card.css
│       ├── badge.css
│       └── nav.css
├── components/
│   ├── Navbar.tsx         # Updated navigation
│   ├── Footer.tsx         # New footer
│   ├── ProjectCard.tsx    # Updated card
│   └── Badge.tsx          # Updated badge
└── sections/
    ├── About.tsx          # Fixed responsive layout
    ├── Skills.tsx         # Updated styling
    ├── Projects.tsx       # Grid layout
    └── Experience.tsx     # Grid layout
```

---

## 12. Recommended Color Palette Visual

```
Primary (Orange):
50  ████████████████████  #FFF7ED (lightest)
100 ████████████████████  #FFEDD5
200 ████████████████████  #FED7AA
300 ████████████████████  #FDBA74
400 ████████████████████  #FB923C
500 ████████████████████  #F97316 (brand)
600 ████████████████████  #EA580C
700 ████████████████████  #C2410C
800 ████████████████████  #9A3412
900 ████████████████████  #7C2D12 (darkest)

Neutral (Gray):
50  ████████████████████  #F9FAFB
100 ████████████████████  #F3F4F6
200 ████████████████████  #E5E7EB
300 ████████████████████  #D1D5DB
400 ████████████████████  #9CA3AF
500 ████████████████████  #6B7280
600 ████████████████████  #4B5563
700 ████████████████████  #374151
800 ████████████████████  #1F2937
900 ████████████████████  #111827
```

---

_Document Version: 2.0_
_Last Updated: 2026-02-11_
