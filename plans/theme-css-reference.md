# Theme CSS Reference

This document contains the complete CSS variables/tokens file that should be created at `src/styles/theme.css`.

## File Location

`src/styles/theme.css`

## Complete CSS Content

```css
/**
 * Portfolio Design System v2.0
 * CSS Variables & Design Tokens
 * 
 * This file contains all design tokens for the portfolio website.
 * Import this file in index.css before other styles.
 */

/* ============================================
   1. COLOR SYSTEM
   ============================================ */

/* Primary Palette - Orange */
:root {
  --color-primary-50: #fff7ed;
  --color-primary-100: #ffedd5;
  --color-primary-200: #fed7aa;
  --color-primary-300: #fdba74;
  --color-primary-400: #fb923c;
  --color-primary-500: #f97316;
  --color-primary-600: #ea580c;
  --color-primary-700: #c2410c;
  --color-primary-800: #9a3412;
  --color-primary-900: #7c2d12;

  /* Neutral Palette - Gray */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Semantic Colors */
  --color-success: #10b981;
  --color-success-bg: #d1fae5;
  --color-success-dark: #059669;

  --color-warning: #f59e0b;
  --color-warning-bg: #fef3c7;
  --color-warning-dark: #d97706;

  --color-error: #ef4444;
  --color-error-bg: #fee2e2;
  --color-error-dark: #dc2626;

  --color-info: #3b82f6;
  --color-info-bg: #dbeafe;
  --color-info-dark: #2563eb;

  /* Badge Colors */
  --badge-fe-bg: #10b981;
  --badge-be-bg: #f59e0b;
  --badge-mobile-bg: #3b82f6;
  --badge-ai-bg: #8b5cf6;
  --badge-devops-bg: #ec4899;
  --badge-design-bg: #14b8a6;

  /* Surface Colors (Light Mode Default) */
  --color-background: #ffffff;
  --color-surface: #ffffff;
  --color-surface-elevated: #ffffff;
  --color-surface-subtle: #f9fafb;

  /* Text Colors */
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-tertiary: #6b7280;
  --color-text-muted: #9ca3af;
  --color-text-inverse: #ffffff;

  /* Border Colors */
  --color-border: #e5e7eb;
  --color-border-subtle: #f3f4f6;
  --color-border-focus: #f97316;

  /* Interactive States */
  --color-hover: rgba(249, 115, 22, 0.05);
  --color-active: rgba(249, 115, 22, 0.1);
  --color-focus-ring: rgba(249, 115, 22, 0.4);
}

/* ============================================
   2. DARK MODE COLORS
   ============================================ */

@media (prefers-color-scheme: dark) {
  :root {
    /* Primary Palette - Orange (Inverted) */
    --color-primary-50: #431407;
    --color-primary-100: #7c2d12;
    --color-primary-200: #9a3412;
    --color-primary-300: #c2410c;
    --color-primary-400: #ea580c;
    --color-primary-500: #f97316;
    --color-primary-600: #fb923c;
    --color-primary-700: #fdba74;
    --color-primary-800: #fed7aa;
    --color-primary-900: #ffedd5;

    /* Neutral Palette - Gray (Inverted) */
    --color-gray-50: #111827;
    --color-gray-100: #1f2937;
    --color-gray-200: #374151;
    --color-gray-300: #4b5563;
    --color-gray-400: #6b7280;
    --color-gray-500: #9ca3af;
    --color-gray-600: #d1d5db;
    --color-gray-700: #e5e7eb;
    --color-gray-800: #f3f4f6;
    --color-gray-900: #f9fafb;

    /* Semantic Colors Dark Mode */
    --color-success: #34d399;
    --color-success-bg: #064e3b;
    --color-success-dark: #10b981;

    --color-warning: #fbbf24;
    --color-warning-bg: #451a03;
    --color-warning-dark: #f59e0b;

    --color-error: #f87171;
    --color-error-bg: #450a0a;
    --color-error-dark: #ef4444;

    --color-info: #60a5fa;
    --color-info-bg: #1e3a8a;
    --color-info-dark: #3b82f6;

    /* Badge Colors Dark Mode */
    --badge-fe-bg: #059669;
    --badge-be-bg: #d97706;
    --badge-mobile-bg: #2563eb;
    --badge-ai-bg: #7c3aed;
    --badge-devops-bg: #db2777;
    --badge-design-bg: #0d9488;

    /* Surface Colors Dark Mode */
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-surface-elevated: #334155;
    --color-surface-subtle: #1f2937;

    /* Text Colors Dark Mode */
    --color-text-primary: #f9fafb;
    --color-text-secondary: #e5e7eb;
    --color-text-tertiary: #d1d5db;
    --color-text-muted: #6b7280;
    --color-text-inverse: #111827;

    /* Border Colors Dark Mode */
    --color-border: #334155;
    --color-border-subtle: #374151;
    --color-border-focus: #fb923c;

    /* Interactive States Dark Mode */
    --color-hover: rgba(249, 115, 22, 0.1);
    --color-active: rgba(249, 115, 22, 0.2);
    --color-focus-ring: rgba(251, 146, 60, 0.5);
  }
}

/* Manual dark mode class (for toggle) */
[data-theme="dark"] {
  /* Same as prefers-color-scheme: dark */
  --color-primary-50: #431407;
  --color-primary-100: #7c2d12;
  --color-primary-200: #9a3412;
  --color-primary-300: #c2410c;
  --color-primary-400: #ea580c;
  --color-primary-500: #f97316;
  --color-primary-600: #fb923c;
  --color-primary-700: #fdba74;
  --color-primary-800: #fed7aa;
  --color-primary-900: #ffedd5;

  --color-gray-50: #111827;
  --color-gray-100: #1f2937;
  --color-gray-200: #374151;
  --color-gray-300: #4b5563;
  --color-gray-400: #6b7280;
  --color-gray-500: #9ca3af;
  --color-gray-600: #d1d5db;
  --color-gray-700: #e5e7eb;
  --color-gray-800: #f3f4f6;
  --color-gray-900: #f9fafb;

  --color-success: #34d399;
  --color-success-bg: #064e3b;
  --color-success-dark: #10b981;

  --color-warning: #fbbf24;
  --color-warning-bg: #451a03;
  --color-warning-dark: #f59e0b;

  --color-error: #f87171;
  --color-error-bg: #450a0a;
  --color-error-dark: #ef4444;

  --color-info: #60a5fa;
  --color-info-bg: #1e3a8a;
  --color-info-dark: #3b82f6;

  --badge-fe-bg: #059669;
  --badge-be-bg: #d97706;
  --badge-mobile-bg: #2563eb;
  --badge-ai-bg: #7c3aed;
  --badge-devops-bg: #db2777;
  --badge-design-bg: #0d9488;

  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-surface-elevated: #334155;
  --color-surface-subtle: #1f2937;

  --color-text-primary: #f9fafb;
  --color-text-secondary: #e5e7eb;
  --color-text-tertiary: #d1d5db;
  --color-text-muted: #6b7280;
  --color-text-inverse: #111827;

  --color-border: #334155;
  --color-border-subtle: #374151;
  --color-border-focus: #fb923c;

  --color-hover: rgba(249, 115, 22, 0.1);
  --color-active: rgba(249, 115, 22, 0.2);
  --color-focus-ring: rgba(251, 146, 60, 0.5);
}

/* ============================================
   3. TYPOGRAPHY SYSTEM
   ============================================ */

:root {
  /* Font Families */
  --font-family-primary:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", sans-serif;
  --font-family-mono:
    "JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", monospace;
  --font-family-thai: "IBM Plex Sans Thai", "Sarabun", "Kanit", sans-serif;

  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
}

/* ============================================
   4. SPACING SYSTEM
   ============================================ */

:root {
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  --section-padding-y: 4rem;
  --container-max: 1280px;
  --container-padding-x: 1.5rem;
}

/* ============================================
   5. SHADOWS & EFFECTS
   ============================================ */

:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md:
    0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl:
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 0 20px rgba(249, 115, 22, 0.3);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);

  --shadow-dark-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-dark-md:
    0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);

  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md:
      0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
    --shadow-lg:
      0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5);
    --shadow-xl:
      0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 30px rgba(249, 115, 22, 0.4);
  }
}

[data-theme="dark"] {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md:
    0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
  --shadow-lg:
    0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5);
  --shadow-xl:
    0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 30px rgba(249, 115, 22, 0.4);
}

/* ============================================
   6. Z-INDEX SCALE
   ============================================ */

:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  --z-toast: 800;
}

/* ============================================
   7. BREAKPOINTS
   ============================================ */

:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* ============================================
   8. ANIMATIONS
   ============================================ */

:root {
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
}

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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-fadeIn {
  animation: fadeIn var(--duration-normal) ease-out forwards;
}
.animate-fadeInUp {
  animation: fadeInUp var(--duration-slow) ease-out forwards;
}
.animate-scaleIn {
  animation: scaleIn var(--duration-normal) ease-out forwards;
}
.animate-slideInRight {
  animation: slideInRight var(--duration-normal) ease-out forwards;
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}

/* ============================================
   9. REDUCED MOTION
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Import Instructions

Add to `src/index.css`:

```css
@import "./styles/theme.css";
```

Add Google Fonts to `public/index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```
