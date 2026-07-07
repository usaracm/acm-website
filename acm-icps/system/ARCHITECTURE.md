# ARCHITECTURE.md — IIC-AIR 2027

## Stack

Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4, shadcn/ui, Framer Motion, Lenis, Lucide, MDX + JSON content layer, Vercel deploy.

## Rendering Rules

- Server Components by default. Client Components only where interactivity requires it (countdown, accordion, modal, tabs).
- No unnecessary `useEffect` — prefer server data fetching, derive state where possible.
- Suspense boundaries around any async data section.
- Streaming enabled for slow sections (e.g. speaker grid if backed by future CMS).
- ISR: `dates.json`-driven page revalidates daily (`revalidate: 86400`). All other MVP pages fully static (`generateStaticParams`/no dynamic segments).
- Edge-compatible where no Node-only APIs used; Server Actions (email) run on Node runtime explicitly.
- Typed content layer — every JSON file has a matching TypeScript type, imported and validated at build time (zod recommended).

## File Structure

```
app/
├─ (marketing)/
│  ├─ page.tsx
│  ├─ call-for-papers/page.tsx
│  ├─ tracks/page.tsx
│  ├─ dates/page.tsx
│  ├─ speakers/page.tsx
│  ├─ committee/page.tsx
│  ├─ registration/page.tsx
│  └─ venue/page.tsx
├─ api/
│  └─ contact/route.ts
├─ layout.tsx
├─ error.tsx
├─ sitemap.ts
└─ robots.ts

components/
├─ layout/  Navbar.tsx  MegaMenu.tsx  Footer.tsx  MobileNav.tsx
├─ home/    Hero.tsx  Countdown.tsx  StatsGrid.tsx  TrustLogos.tsx  TrackPreview.tsx  WhyAttend.tsx
├─ shared/  Timeline.tsx  SpeakerCard.tsx  PricingTable.tsx  Accordion.tsx  Tabs.tsx  SectionHeading.tsx
├─ tracks/  TrackCard.tsx  TrackGrid.tsx
└─ ui/      (shadcn primitives)

content/
├─ dates.json
├─ speakers.json
├─ committee.json
├─ tracks.json
├─ news.json
└─ cfp.mdx

lib/
├─ content.ts     → typed loaders + zod validation for all content/*.json
└─ utils.ts

tests/
├─ unit/          → Vitest
└─ e2e/           → Playwright
```

## Data Flow

Components never import raw JSON directly — all reads go through `lib/content.ts` typed loaders, which validate shape at build time and throw a clear build-time error if content is malformed (fail fast, not silent fallback to fake data).

## Tooling

pnpm, ESLint, Prettier, TypeScript strict, Vitest (unit), Playwright (e2e), GitHub Actions CI (lint + typecheck + unit + build on every PR).
