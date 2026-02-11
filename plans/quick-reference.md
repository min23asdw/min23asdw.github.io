# Design System Quick Reference

## Color Palette

### Primary (Orange) - Light Mode

```
50   ████  #FFF7ED  - Lightest backgrounds
100  ████  #FFEDD5  - Hover states
200  ████  #FED7AA  - Subtle accents
300  ████  #FDBA74  - Secondary accents
400  ████  #FB923C  - Interactive elements
500  ████  #F97316  - PRIMARY BRAND COLOR
600  ████  #EA580C  - Hover primary
700  ████  #C2410C  - Active states
800  ████  #9A3412  - Emphasis
900  ████  #7C2D12  - Text on light
```

### Neutral (Gray) - Light Mode

```
50   ████  #F9FAFB  - Page background
100  ████  #F3F4F6  - Card backgrounds
200  ████  #E5E7EB  - Borders
300  ████  #D1D5DB  - Disabled
400  ████  #9CA3AF  - Placeholder text
500  ████  #6B7280  - Secondary text
600  ████  #4B5563  - Body text dim
700  ████  #374151  - Body text
800  ████  #1F2937  - Headings
900  ████  #111827  - Primary text
```

### Badge Colors

```
FE       ████  #10B981  (Green)
BE       ████  #F59E0B  (Amber)
Mobile   ████  #3B82F6  (Blue)
AI       ████  #8B5CF6  (Purple)
DevOps   ████  #EC4899  (Pink)
Design   ████  #14B8A6  (Teal)
```

### Semantic Colors

```
Success  ████  #10B981
Warning  ████  #F59E0B
Error    ████  #EF4444
Info     ████  #3B82F6
```

---

## Typography Scale

| Token         | Size | Usage                  |
| ------------- | ---- | ---------------------- |
| `--text-xs`   | 12px | Captions, badges       |
| `--text-sm`   | 14px | Body small, metadata   |
| `--text-base` | 16px | Body text              |
| `--text-lg`   | 18px | Lead text, card titles |
| `--text-xl`   | 20px | H6, small headings     |
| `--text-2xl`  | 24px | H5                     |
| `--text-3xl`  | 30px | H4                     |
| `--text-4xl`  | 36px | H3                     |
| `--text-5xl`  | 48px | H2, section titles     |
| `--text-6xl`  | 60px | H1, hero text          |

---

## Spacing Scale (4px base)

| Token        | Value | Common Use      |
| ------------ | ----- | --------------- |
| `--space-1`  | 4px   | Icon gaps       |
| `--space-2`  | 8px   | Tight spacing   |
| `--space-3`  | 12px  | Small padding   |
| `--space-4`  | 16px  | Default spacing |
| `--space-6`  | 24px  | Section gaps    |
| `--space-8`  | 32px  | Card padding    |
| `--space-12` | 48px  | Large sections  |
| `--space-16` | 64px  | Major sections  |

---

## Breakpoints

| Name | Min Width | Target         |
| ---- | --------- | -------------- |
| `sm` | 640px     | Small tablets  |
| `md` | 768px     | Tablets        |
| `lg` | 1024px    | Small desktops |
| `xl` | 1280px    | Desktops       |

---

## Common CSS Patterns

### Card

```css
.my-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  padding: var(--space-6);
}
```

### Button Primary

```css
.btn-primary {
  background: var(--color-primary-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
}

.btn-primary:hover {
  background: var(--color-primary-600);
}
```

### Section

```css
.section {
  padding: var(--section-padding-y) 0;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding-x);
}
```

---

## Z-Index Scale

| Token          | Value | Usage           |
| -------------- | ----- | --------------- |
| `--z-dropdown` | 100   | Dropdowns       |
| `--z-sticky`   | 200   | Sticky elements |
| `--z-fixed`    | 300   | Fixed navbar    |
| `--z-modal`    | 500   | Modals          |
| `--z-popover`  | 600   | Popovers        |
| `--z-tooltip`  | 700   | Tooltips        |
| `--z-toast`    | 800   | Toasts          |

---

## Critical Changes Summary

### 1. Viewport Fix (URGENT)

```html
<!-- public/index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 2. Import Theme

```css
/* src/index.css */
@import "./styles/theme.css";
```

### 3. Add Fonts

```html
<!-- public/index.html -->
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### 4. Remove Fixed Widths

```tsx
// Remove these from About.tsx:
// width: "40%"
// width: "60%"

// Use instead:
sx={{
  flex: { lg: '0 0 40%' }
}}
```

---

## Files Created

| File                            | Purpose                              |
| ------------------------------- | ------------------------------------ |
| `plans/design-system.md`        | Complete design system specification |
| `plans/theme-css-reference.md`  | CSS variables/tokens content         |
| `plans/migration-plan.md`       | Step-by-step migration guide         |
| `plans/component-guidelines.md` | Component styling patterns           |
| `plans/quick-reference.md`      | This file - quick lookup             |
| `src/styles/theme.css`          | CSS variables file (created)         |

---

## Next Steps

1. **Switch to Code mode** to implement the changes
2. Follow the migration plan phases
3. Start with critical viewport fix
4. Implement theme.css fully
5. Update components one by one
6. Test on mobile and desktop
7. Run accessibility audit
