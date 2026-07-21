# DissolveLabs — Take-Home Submission

Production-quality, animation-rich, responsive React website for **DissolveLabs**. Built against exact Figma-exported reference HTML design tokens and specifications.

---

## 🚀 Live Demo & Repository
- **Local Location**: `d:\Project files\dissolvelabs`
- **Tech Stack**: React 18, Vite, TypeScript, Tailwind CSS v4, Framer Motion, React Router v6

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build & type-check
npm run build

# Preview production build
npm run preview
```

---

## 📄 Pages Built

1. `/` — **Home**
   - **Hero**: Canvas-based 4-layer sine-wave animation with dual-harmonic wave dynamics, DPR scaling, spring-physics mouse tracking, and animated fishing trawler ship.
   - **01 Services**: 6 service cards with custom pastel chip styling and hover lift.
   - **02 Process**: 4 phase cards ("Dissolve", "Distill", "Synthesize", "Stabilize") with staggered scroll reveal.
   - **03 Selected Work**: 4 case study cards featuring count-up number animations triggered on viewport entry, hover reveal descriptions, and dissolve mark watermark.
   - **04 Stack**: Categorized tech stack grid featuring Devicon & SimpleIcons CDN logos with grayscale hover transitions.
   - **05 Careers Teaser**: "Join the lab" recruitment section.
   - **06 Contact**: Interactive form with local state success micro-interaction and animated flying mail SVG.

2. `/divisions/ai-solutions` — **AI Solutions**
   - Breadcrumb navigation (`Home / Divisions / AI Solutions`)
   - Hero with custom violet neural network radial glow background (`#a78bfa`)
   - 4 Sub-divisions: Computer vision, Predictive ML, LLM copilots & RAG, MLOps & evaluation
   - 3-step "How we engage" methodology section
   - Shared contact section & global footer

3. `/divisions/industrial-automation` — **Industrial Automation**
   - Breadcrumb navigation (`Home / Divisions / Industrial Automation`)
   - Hero with custom industrial blueprint grid texture & amber radial glow background (`#f59e0b`)
   - 4 Sub-divisions: PLC programming, SCADA systems, Line control & robotics, OEE & downtime analytics
   - 3-step "How we engage" methodology section
   - Shared contact section & global footer

---

## 🎨 Design System & Tokens

Exact ground-truth design tokens applied throughout:
- `--acid`: `#2563EB` (Primary accent blue)
- `--txt`: `#14170F` (Primary text, near-black)
- `--bg`: `#F6F7F3` (Off-white page background)
- `--panel`: `#EEF3FF` (Light blue panel background)
- `--dim`: `#1E2D4A` (Dark navy text/cards)
- `--faint`: `#5B6B8A` (Muted secondary text)
- `--line`: `rgba(16,20,12,0.1)` (Hairline borders)
- **Typography**: Bricolage Grotesque (display/headings), Instrument Sans (body copy), JetBrains Mono (eyebrows/buttons/chips)

---

## 📱 Responsiveness & Accessibility

- Mobile hamburger menu below 900px with smooth slide-in panel (`AnimatePresence`).
- Responsive typography scaling (`clamp()`) for zero horizontal overflow at 360px.
- Grid transitions across breakpoints: Services (3→2→1 col), Sub-divisions (2→1 col), Work (2→1 col), Contact (2→1 col).
- Accessibility: Semantic HTML5 elements (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`), explicit form label bindings (`htmlFor`), button ARIA labels, and `prefers-reduced-motion` fallbacks for all Canvas and Framer Motion animations.

---

## 🎯 Tradeoffs & What I'd Do With More Time

1. **Scrollable Submarine Experience**:
   - *Simplified*: The Home page prompt specified building a clean 6-card services grid instead of the 620vh SVG submarine.
   - *With More Time*: I'd implement the full scroll-driven SVG x-ray submarine experience using Framer Motion scroll progress or GSAP ScrollTrigger for an interactive 3D/hull breakdown.

2. **Backend & Form Handling**:
   - *Simplified*: Contact form uses local state micro-interaction to demonstrate success states without a backend.
   - *With More Time*: Integrate Resend, Postmark, or Formspree API route for real email delivery, plus Turnstile captcha protection.

3. **CMS & Remaining 8 Division Pages**:
   - *Simplified*: Built 2 division pages (`AI Solutions` and `Industrial Automation`) using a single typed data-driven `DivisionPage` template.
   - *With More Time*: Connect Sanity or Contentful CMS to dynamically generate all 10 division pages and case study detail pages.

4. **Image & Asset Optimization**:
   - *Simplified*: Tech icons loaded directly via Devicon/SimpleIcons CDNs with SVG fallbacks.
   - *With More Time*: Pre-bundle icons as inline SVG symbols or WebP sprites to eliminate network requests.

5. **Automated Testing**:
   - *Simplified*: Verified build with TypeScript strict mode, Vite compiler, and manual responsive audit.
   - *With More Time*: Add Playwright end-to-end tests for routing, contact form submission, and visual regression snapshot testing across mobile and desktop viewports.
