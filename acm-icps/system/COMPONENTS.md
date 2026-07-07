# COMPONENTS.md — IIC-AIR 2027

Every component below must be specified this way before Claude writes code: Purpose, Props, Variants, Loading, Error, Empty, Animation, Accessibility, Tests.

## Countdown

- **Purpose:** live countdown to Nov 6, 2026, Asia/Kolkata timezone
- **Props:** `targetDate: string`
- **Variants:** hero (large), compact (footer/nav)
- **Loading:** render static date until client hydrates (no layout shift, no flash of "00:00:00")
- **Error:** invalid date → render formatted date string only, no broken countdown
- **Empty:** n/a (date always known)
- **Animation:** digit flip on second change, respects `prefers-reduced-motion` (falls back to static re-render, no flip)
- **Accessibility:** `aria-live="polite"`, not `assertive` (avoid interrupting screen readers every second — throttle announcement to minute-level)
- **Tests:** unit test timezone math, e2e test renders without hydration mismatch

## StatsGrid

- **Purpose:** animated count-up statistics
- **Props:** `stats: { label: string; value: number; suffix?: string; isTarget?: boolean }[]`
- **Variants:** 3-col, 4-col responsive
- **Loading:** skeleton boxes matching final dimensions
- **Error:** n/a (static data)
- **Empty:** if `stats.length === 0`, section not rendered at all
- **Animation:** count-up on scroll-into-view (IntersectionObserver), max 1.2s duration, respects reduced-motion (renders final value instantly)
- **Accessibility:** final numeric value present in DOM immediately (not animation-only), `aria-label` describes stat in full sentence
- **Tests:** unit test count-up math, visual regression on final state

## Timeline

- **Purpose:** Important Dates vertical timeline
- **Props:** `milestones: Milestone[]`
- **Variants:** desktop (vertical line + dots), mobile (stacked cards)
- **Loading:** skeleton rows
- **Error:** malformed date → build-time error via zod, never renders "Invalid Date" in production
- **Empty:** "Dates to be announced" state if array empty
- **Animation:** reveal-on-scroll stagger (80ms per item), current-date dot pulses (CSS animation, respects reduced-motion → static highlight instead)
- **Accessibility:** semantic `<ol>`, not divs; each item has visually-hidden status text ("completed" / "current" / "upcoming")
- **Tests:** unit test past/current/upcoming classification logic

## SpeakerCard

- **Purpose:** keynote/committee display
- **Props:** `speaker: Speaker; variant: "full" | "compact"`
- **Variants:** full (Speakers page, photo+bio), compact (Committee page, name+affiliation only)
- **Loading:** skeleton card matching aspect ratio
- **Error:** broken image → fallback initials avatar, never broken-image icon
- **Empty:** handled at page level ("Keynote speakers to be announced")
- **Animation:** hover lift (`translateY(-4px)`, shadow-lg), modal open/close fade+scale
- **Accessibility:** modal is accessible dialog (focus trap, ESC closes, focus returns to trigger), all photos have real alt text
- **Tests:** e2e test modal focus trap and keyboard close

## Accordion (Tracks, TPC list)

- **Purpose:** expandable content sections
- **Props:** `items: { title: string; content: ReactNode }[]`
- **Variants:** single-open, multi-open
- **Loading:** n/a (static content)
- **Error:** n/a
- **Empty:** n/a
- **Animation:** height auto-animate via Framer Motion `AnimatePresence`, max 300ms
- **Accessibility:** WAI-ARIA APG accordion pattern exactly — `aria-expanded`, `aria-controls`, keyboard arrow navigation between headers
- **Tests:** e2e keyboard navigation test

## PricingTable (Registration)

- **Purpose:** fee comparison across tiers
- **Props:** `tiers: Tier[]`
- **Variants:** card grid (mobile), full table (desktop)
- **Loading:** skeleton
- **Error:** n/a
- **Empty:** if fees unconfirmed, render `TODO: pending finance chair` badge per cell — never a fabricated number
- **Animation:** none required (data-dense, motion would hurt scanability)
- **Accessibility:** real `<table>` markup with `<caption>`, `scope="col"`/`scope="row"`
- **Tests:** unit test tier sorting/filtering if added later
