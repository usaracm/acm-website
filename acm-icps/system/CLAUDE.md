# CLAUDE.md — Coding Rules for IIC-AIR 2027

Read PRODUCT.md, DESIGN.md, ARCHITECTURE.md, COMPONENTS.md, CONTENT.md, MOTION.md, SEO.md, and ACCESSIBILITY.md before generating any code. This file is the entry point — start here.

## Non-Negotiable Rules

1. Never invent conference data — speaker names, sponsors, committee members, fees, hotels, proceedings details, deadlines, statistics, acceptance rates. Only use `content/*.json`. Missing data → honest empty state (exact copy in CONTENT.md), never a fabricated placeholder presented as fact.
2. Light theme only. Use CSS variables from DESIGN.md — never hardcode hex values in components.
3. Server Components by default. Client Components only where interactivity requires it.
4. No `useEffect` for data fetching — use server data loading.
5. Every component gets the full spec treatment before code: Purpose, Props, Variants, Loading, Error, Empty, Animation, Accessibility, Tests (see COMPONENTS.md for the pattern).
6. Accessibility is not optional — every interactive component follows its WAI-ARIA APG pattern exactly, verified against ACCESSIBILITY.md.
7. Motion respects `prefers-reduced-motion` everywhere, no exceptions, no animation over 600ms.
8. Real `<table>` for tabular data (Registration comparison), real `<ol>` for ordered content (Timeline) — no div-soup pretending to be semantic HTML.
9. TypeScript strict mode, no `any`, content shapes validated with zod at build time.
10. Copy follows CONTENT.md voice rules — formal, factual, no marketing adjectives, no exclamation marks.

## Build Order

1. Scaffold Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui project per ARCHITECTURE.md file structure.
2. Implement typed content loaders (`lib/content.ts`) with zod validation for all `content/*.json` schemas from CONTENT.md.
3. Build shared components (COMPONENTS.md) in isolation first — Timeline, SpeakerCard, Accordion, PricingTable, Countdown, StatsGrid.
4. Build the 8 MVP pages (PRODUCT.md scope), wiring only to typed content loaders.
5. Add SEO metadata + structured data per SEO.md.
6. Accessibility pass per ACCESSIBILITY.md, verify with axe DevTools.
7. Performance pass — Lighthouse ≥95 all categories on Home and Registration.
8. Set up CI (GitHub Actions): lint, typecheck, unit tests (Vitest), e2e (Playwright), build.

## Definition of Done (MVP)

- [ ] All 8 routes build with zero TypeScript errors
- [ ] Lighthouse ≥95 all categories on Home and Registration
- [ ] axe DevTools zero critical/serious violations
- [ ] Zero hardcoded content strings in components — everything from `content/*.json`
- [ ] Zero fabricated speaker/sponsor/committee/fee data anywhere
- [ ] Deployed Vercel preview tested on mobile/tablet/desktop/ultra-wide

## Do Not

- Do not start on the remaining 19 pages (Sponsors, FAQs, Author Guidelines, etc.) until the 8 MVP pages pass every item in Definition of Done above.
- Do not add GSAP.
- Do not add dark mode.
- Do not build a custom paper submission form — deep-link to OpenReview only.
