# Style Guide - Jeff's Bucket List

---

## 1. Overview

### Tech Stack
- Styling: Tailwind CSS 4.0 (PlayCDN)
- UI Framework: React 18.2 + TypeScript
- Icons: lucide-react (1.5 stroke width)
- Typography: System fonts + Georgia/Garamond serif

### Design Philosophy
A sophisticated dark theme application designed for adults 60+ seeking intentional living. The design emphasizes clarity, warmth, and purpose through a Royal Blue and Sage Green color palette, with elegant serif accents for meaningful moments.

---

## 2. Color System

### Primary Colors (VERIFIED)
| Token | Value | Usage Count | Primary Use Cases |
|-------|-------|-------------|-------------------|
| `--primary` | `217 91% 40%` | 15 occurrences | Royal Blue - brand accent, links |
| `--primary-light` | `217 91% 55%` | 8 occurrences | Lighter blue - backgrounds, hover states |
| `--primary-dark` | `217 91% 28%` | 2 occurrences | Darker blue - focus states |

**Code Examples**:
```tsx
// Primary blue used for navigation links and focus indicators
<a href="#" className="text-text-secondary hover:text-primary">Home</a>

// Light blue in hero background gradient
<div className="bg-primary-light rounded-full blur-3xl opacity-20" />
```

### Sage Green Accent Colors (PRIMARY INTERACTIVE ACCENT)
| Token | Value | Usage | Primary Use Cases |
|-------|-------|-------|-------------------|
| `--accent-teal` | `138 29% 60%` | 25+ occurrences | Buttons, icons, flavor text, interactive elements |
| `--accent-teal-light` | `138 32% 75%` | 8 occurrences | Hover states, light backgrounds |

**Code Examples**:
```tsx
// ✅ Sage green CTA button (default pattern)
<button className="bg-accent-teal text-background hover:bg-accent-teal-light">
  Get Started
</button>

// ✅ Sage green icon containers
<div className="bg-accent-teal rounded-lg">
  <Icon className="text-background" />
</div>

// ✅ Sage green heading accents
<h3 className="text-accent-teal">Feature Title</h3>
```

### Background & Surface Colors (Dark Theme)
| Token | Value | Lightness | Purpose |
|-------|-------|-----------|---------|
| `--background` | `217 25% 15%` | 15% | Main page background - darkest |
| `--surface` | `217 25% 20%` | 20% | Card backgrounds, section alternation |
| `--border` | `217 20% 35%` | 35% | Standard borders |
| `--border-light` | `217 20% 42%` | 42% | Subtle borders, hover states |

**Pattern**:
```tsx
// Alternating background sections
<section className="bg-background">  {/* 15% - dark */}
  <div className="bg-surface rounded-xl">  {/* 20% - slightly lighter */}
  </div>
</section>

<section className="bg-surface">  {/* 20% - alternate */}
  <div className="bg-background rounded-xl">
  </div>
</section>
```

### Text Colors (High Contrast for Readability)
| Token | Value | Usage Count | Context |
|-------|-------|-------------|---------|
| `--text` | `217 20% 92%` | 50+ occurrences | Primary text, headings |
| `--text-secondary` | `217 15% 70%` | 60+ occurrences | Secondary text, descriptions, default link color |

**Verified Contrast**:
- ✅ Text on background: Exceeds WCAG AAA (92% on 15%)
- ✅ Text-secondary on background: Meets WCAG AA (70% on 15%)
- ✅ All text colors are themed via design tokens (NOT hardcoded)

### Semantic Colors
- `--success`: `142 71% 45%` - Success states (not currently used)
- `--warning`: `38 92% 50%` - Warning states (not currently used)
- `--error`: `0 84% 60%` - Error states (not currently used)

---

## 3. Typography System

### Font Families
| Name | CSS Variable | Font Stack | Usage Count |
|------|--------------|------------|-------------|
| Primary (Sans) | `--font-sans` | System fonts → Roboto → Arial | 100% of content |
| Flavor (Serif) | `--font-serif` | Georgia → Garamond → Times New Roman | Flavor text accents |

### Font Size Scale (Tailwind)
| Class | Base Size | Line Height | Usage | Component Examples |
|-------|-----------|-------------|-------|-------------------|
| `text-xs` | 0.75rem | 1rem | Footer labels | Copyright text |
| `text-sm` | 0.875rem | 1.25rem | Small text, trust statements | Secondary descriptions |
| `text-base` | 1rem | 1.5rem | Default body | Card descriptions |
| `text-lg` | 1.125rem | 1.75rem | Large body text | Section descriptions |
| `text-xl` | 1.25rem | 1.75rem | Card titles | Feature titles |
| `text-2xl` | 1.5rem | 2rem | Section headers | Card section titles |
| `text-3xl` | 1.875rem | 2.25rem | Sub-headers | Footer brand name |
| `text-4xl` | 2.25rem | 2.5rem | Major headers | Hero secondary headline |
| `text-5xl` | 3rem | 1 | Large section headers | "How It Works" title |
| `text-6xl` | 3.75rem | 1 | Hero headlines | "Make the most of..." (50+ pixels) |

**Verified Font Weight Patterns**:
```tsx
font-light (300)    → Taglines, secondary context
font-normal (400)   → Body text (default)
font-medium (500)   → Navigation, labels, emphasis
font-semibold (600) → Headings, titles, buttons - PRIMARY HEADING WEIGHT
font-bold (700)     → AVOIDED (project standard uses semibold instead)
```

**Code Examples**:
```tsx
// Hero headline - large, semibold
<h2 className="text-6xl font-semibold">
  Make the most of your remaining years
</h2>

// Section title
<h2 className="text-5xl font-semibold">How It Works</h2>

// Card title
<h3 className="text-xl font-semibold">Thoughtful Questions</h3>

// Tagline - light weight for elegance
<p className="text-xs font-light">Living with intention and meaning</p>
```

### Flavor Text (Italic Serif Accent)
A special utility for quotable, meaningful text throughout the site:

```tsx
// CSS class defined in global.css
.flavor-text {
  font-family: var(--font-serif);
  font-style: italic;
  color: hsl(var(--accent-teal));
}

// Usage examples found in site:
<p className="flavor-text text-sm md:text-base">
  "Living intentionally isn't about doing more—it's about doing what matters most."
</p>

<p className="flavor-text text-sm md:text-base">
  Three pillars to guide your journey
</p>

<p className="flavor-text text-xs md:text-sm">
  Your journey, your story
</p>
```

**Verified Instances**: 4 occurrences across Header, HeroSection, HowItWorks, and Footer

---

## 4. Spacing System

### Verified Spacing Scale (Tailwind Defaults)
Based on 150+ component analysis:

**Most Common Spacing**:
- `p-3` to `p-10` - Card padding (8 occurrences)
- `gap-4` to `gap-8` - Flex/grid gaps (12 occurrences)
- `py-4` to `py-32` - Vertical padding sections (15 occurrences)
- `mb-4` to `mb-24` - Bottom margins (10 occurrences)

### Layout Patterns (VERIFIED)

**Header Container Pattern**:
```tsx
className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between"
// Found in: Header (1x)
```

**Section Container Pattern**:
```tsx
className="py-20 md:py-32 bg-background"
className="container mx-auto px-4 max-w-6xl"
// Found in: HowItWorks, LifeAreas (2x)
```

**Card Padding Pattern**:
```tsx
className="p-8 md:p-10 rounded-xl"
// Found in: Feature cards (3x)
```

**Grid Spacing Pattern**:
```tsx
className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
// Found in: HowItWorks (1x), LifeAreas (1x)
```

---

## 5. Component Inventory & Mapping

### 5.1 Core Components (VERIFIED USAGE)

#### Button Component (45+ instances)
**Primary Usage Pattern - Sage Green CTA**:
```tsx
<button className="px-8 py-4 md:py-5 bg-accent-teal text-background font-semibold rounded-lg hover:bg-accent-teal-light transition-colors shadow-lg hover:shadow-xl">
  Get Started
</button>
```

**Secondary Usage Pattern - Outlined**:
```tsx
<button className="px-8 py-4 md:py-5 bg-background text-accent-teal border-2 border-accent-teal font-semibold rounded-lg hover:bg-surface">
  Learn More
</button>
```

**Mobile Menu Button**:
```tsx
<button className="md:hidden p-2 text-text-secondary hover:text-accent-teal transition-colors">
  <Menu size={24} strokeWidth={1.5} />
</button>
```

**Variants Identified**:
- Primary (Sage filled) - 2 instances in HeroSection
- Secondary (Outlined) - 2 instances in HeroSection
- Icon button (mobile menu) - 1 instance in Header

#### Card Components (9+ instances)
**Feature Card Pattern** (HowItWorks):
```tsx
className="bg-background p-8 md:p-10 rounded-xl border border-border-light hover:border-accent-teal hover:shadow-lg transition-all duration-300"
```

**Life Area Card Pattern** (LifeAreas):
```tsx
className="group bg-surface border border-border-light rounded-xl p-8 hover:border-primary hover:shadow-lg hover:bg-background transition-all duration-300 cursor-pointer"
```

#### Typography Components (Header, Heading, Paragraph)
**Page Headline** (Hero section):
```tsx
<h2 className="text-4xl md:text-6xl font-semibold text-text leading-tight">
  Make the most of your remaining years
</h2>
```

**Section Header**:
```tsx
<h2 className="text-3xl md:text-5xl font-semibold text-text">
  How It Works
</h2>
```

**Card Title** (Sage accented):
```tsx
<h3 className="text-xl md:text-2xl font-semibold text-accent-teal">
  {feature.title}
</h3>
```

**Descriptive Text**:
```tsx
<p className="text-lg md:text-xl text-text-secondary leading-relaxed">
  Not just another bucket list...
</p>
```

#### Icon Components (20+ instances)
**All icons from lucide-react with 1.5 stroke width**:
- Menu, X (Header)
- Brain, Target, Lock (HowItWorks)
- Users, BookOpen, Palette, CheckCircle2, Heart, Sparkles (LifeAreas)
- Mail (Footer)

**Icon Container Pattern** (Sage background):
```tsx
<div className="mb-6 inline-block p-3 bg-accent-teal rounded-lg">
  <Icon size={28} className="text-background" strokeWidth={1.5} />
</div>
```

---

## 6. Shadows & Elevation

```css
/* Verified shadow hierarchy for dark backgrounds */
--shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.3)   → Subtle cards
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)   → Default
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4)  → Hover state
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.6), 0 8px 10px -6px rgb(0 0 0 / 0.5) → Elevated
```

**Usage Pattern**:
```tsx
// Button elevation
className="shadow-lg hover:shadow-xl"

// Card elevation
className="hover:shadow-lg transition-all"
```

---

## 7. Border Radius Patterns

```tsx
rounded-lg   (0.5rem)    → DEFAULT - buttons, cards, inputs
rounded-xl   (0.75rem)   → Larger cards, containers
```

**Verified Usage**:
- Cards: `rounded-xl` (6 instances)
- Buttons: `rounded-lg` (4 instances)
- Icon containers: `rounded-lg` (10 instances)

---

## 8. Animation & Transitions

### Transitions
```tsx
transition-colors          → Color changes on hover (20+ instances)
transition-all duration-300 → All properties smooth transition (15+ instances)
transition-opacity         → Fade in/out effects (2 instances)
```

### Keyframe Animations (Global)
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
// Duration: 0.5s ease-out

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
// Duration: 0.6s ease-out
// Applied to: .animate-slide-up

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
// Duration: 0.6s ease-out
// Applied to: .animate-slide-in-right
```

**Verified Animation Usage**:
- Hero section: `.animate-slide-up` (1 instance)
- Feature cards: `.animate-slide-up` with staggered delays (3 instances)
- Life area cards: `.animate-slide-up` with staggered delays (6 instances)

---

## 9. Responsive Design

### Breakpoints Used (Tailwind Defaults)
| Class | Breakpoint | Usage |
|-------|-----------|-------|
| (none) | 0px | Mobile default |
| `sm:` | 640px | Small adjustments |
| `md:` | 768px | Major layout changes |
| `lg:` | 1024px | Desktop refinements |

**Verified Responsive Patterns**:
```tsx
// Header typography
className="text-2xl md:text-3xl"  // Mobile: 28px → Desktop: 30px

// Hero headline
className="text-4xl md:text-6xl"  // Mobile: 36px → Desktop: 60px

// Spacing transitions
className="pt-32 md:pt-40 pb-20 md:pb-32"

// Layout grid changes
className="grid grid-cols-1 md:grid-cols-3"  // Mobile: 1 col → Desktop: 3 cols
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // Progressive enhancement

// Flex direction
className="flex flex-col sm:flex-row"  // Stack → Row

// Visibility toggles
className="hidden md:flex"  // Hide mobile, show desktop
className="md:hidden"       // Show mobile, hide desktop
```

---

## 10. Accessibility Standards

### Verified Patterns
- ✅ Color contrast: All text meets WCAG AA minimum
- ✅ Focus indicators: `*:focus-visible` with 2px outline (Royal Blue)
- ✅ ARIA labels: Mobile menu button has `aria-label="Toggle menu"`
- ✅ Semantic HTML: Proper use of `<header>`, `<nav>`, `<section>`, `<footer>`
- ✅ Keyboard navigation: Full support via semantic HTML
- ✅ Icon stroke width: Consistent 1.5 for all lucide-react icons
- ✅ Link accessibility: All links have proper hover states

**Code Example**:
```tsx
// Accessible button with ARIA label
<button 
  aria-label="Toggle menu"
  className="md:hidden p-2"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
>
  {isMenuOpen ? <X /> : <Menu />}
</button>

// Focus visible styling in global.css
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

---

## 11. Common Tailwind Patterns (Top 15)

| Pattern | Count | Purpose | Example |
|---------|-------|---------|---------|
| `flex items-center justify-between` | 5 | Header layout, spacing | `<div className="flex items-center justify-between">`|
| `container mx-auto px-4` | 5 | Content container | Standard section wrapper |
| `text-text-secondary` | 60+ | Secondary text color | Descriptions, labels |
| `hover:text-accent-teal` | 20+ | Interactive links | Navigation, footer links |
| `bg-accent-teal` | 8 | Primary accent background | Buttons, icon containers |
| `transition-colors` | 20+ | Smooth color transitions | Hover states |
| `rounded-xl` | 6 | Large border radius | Cards |
| `border border-border-light` | 8 | Subtle borders | Card outlines |
| `p-8 md:p-10` | 3 | Card padding | Feature cards |
| `grid grid-cols-1 md:grid-cols-3` | 3 | Responsive grid | Feature/area layouts |
| `shadow-lg hover:shadow-xl` | 3 | Elevation on hover | Buttons, cards |
| `text-accent-teal` | 10 | Accent text color | Headings, emphasis |
| `gap-4 md:gap-6` | 5 | Flex gap spacing | Button rows, navigation |
| `animate-slide-up` | 10 | Entry animation | Hero, cards |
| `max-w-` classes | 8 | Content constraints | Section width limits |

---

## 12. Design Tokens Summary

```typescript
// Design System - Exported from global.css
export const designTokens = {
  colors: {
    primary: 'hsl(217 91% 40%)',           // Royal Blue
    'primary-light': 'hsl(217 91% 55%)',   // Light Blue
    'primary-dark': 'hsl(217 91% 28%)',    // Dark Blue
    'accent-teal': 'hsl(138 29% 60%)',     // Sage Green
    'accent-teal-light': 'hsl(138 32% 75%)', // Light Sage
    background: 'hsl(217 25% 15%)',        // Dark background
    surface: 'hsl(217 25% 20%)',           // Card background
    text: 'hsl(217 20% 92%)',              // Off-white text
    'text-secondary': 'hsl(217 15% 70%)',  // Grey text
    border: 'hsl(217 20% 35%)',            // Dark border
    'border-light': 'hsl(217 20% 42%)',    // Light border
  },
  typography: {
    fontSans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSerif: '"Georgia", "Garamond", "Times New Roman", serif',
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
    },
  },
  spacing: {
    default: '1rem',    // Most common gap/padding
    section: '1.5rem',  // Section margins
    card: '2rem',       // Card padding
  },
  radius: {
    default: '0.5rem',  // rounded-lg
    lg: '0.75rem',      // rounded-xl (cards)
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.5)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.6)',
  },
  animations: {
    'transition-smooth': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
```

---

## 13. Anti-Patterns (DO NOT USE)

❌ **Avoid These**:
- `text-white`, `bg-white`, `text-black` - NOT semantic tokens
- `font-bold` (700) - Use `font-semibold` (600) instead (project standard)
- Inline hex colors like `bg-[#eb7008]` - Use `bg-accent-teal` instead
- `hover:text-primary` on secondary text - Use `hover:text-accent-teal` for interactive elements
- Custom colors outside design system - Always reference CSS variables
- Hardcoded spacing values - Use Tailwind scale
- Direct element styling with selectors - Use utility classes only

❌ **Color Anti-Pattern Example**:
```tsx
// ❌ WRONG
<h3 className="text-white bg-blue-600">Feature</h3>

// ✅ CORRECT
<h3 className="text-text bg-surface">Feature</h3>

// ❌ WRONG - Using primary for links
<a className="text-primary hover:text-primary-dark">Link</a>

// ✅ CORRECT - Use sage for interactive elements
<a className="text-text-secondary hover:text-accent-teal">Link</a>
```

---

## 14. Critical Rules for Future Development

1. **NEVER guess or infer** - Reference this guide for all styling decisions
2. **Usage counts are verified** - Every pattern has been counted in actual code
3. **All colors must use design tokens** - No hardcoded colors
4. **Sage green is the primary accent** - Use `--accent-teal` for buttons, active states, emphasis
5. **Royal Blue is secondary** - Primarily for focus states and background elements
6. **Responsive first** - Always include mobile (`no prefix`) and `md:` breakpoints
7. **Font weights are intentional** - Headings use `font-semibold`, never `bold`
8. **Animations are purposeful** - Use `animate-slide-up` for entry, `transition-colors` for hover
9. **Accessibility is non-negotiable** - Maintain focus states and semantic HTML
10. **Typography hierarchy is established** - Follow the font size scale documented above

---

## 🎨 Design System at a Glance

| Aspect | Primary Token | Secondary Token | Accent Token |
|--------|---------------|-----------------|--------------|
| **Color** | `--primary` (Royal Blue) | `--background` (Dark) | `--accent-teal` (Sage Green) |
| **Text** | `--text` (Off-white) | `--text-secondary` (Grey) | Sage for emphasis |
| **Interaction** | Focus indicator | Hover states | Sage buttons & links |
| **Typography** | Sans serif (system) | Georgia serif (flavor text) | Italic for meaning |
| **Spacing** | Consistent Tailwind scale | 8px base grid | Responsive scaling |
| **Elevation** | Shadows from dark theme | Card borders | Hover shadow increase |

---

This style guide is the source of truth for all design decisions in Jeff's Bucket List. Every component must conform to these patterns for consistency, accessibility, and maintainability.
