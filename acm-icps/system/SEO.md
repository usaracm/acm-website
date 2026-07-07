# SEO.md — IIC-AIR 2027

## Per-Page Requirements

Every route implements `generateMetadata`: title, description (unique per page, ≤160 chars), canonical URL, OG image (1200×630, generated via `next/og` or static per-page), Twitter card (`summary_large_image`).

## Structured Data

- `Event` JSON-LD on Home and `/dates` — name, startDate, endDate, location (GGSIPU USAR), eventStatus, eventAttendanceMode.
- `Organization` JSON-LD in root layout (GGSIPU EDC ACM Student Chapter).
- Breadcrumb JSON-LD on all sub-pages.

## Files

- `sitemap.ts` — all 8 MVP routes, `lastModified` from content update, `changeFrequency` weekly for Home/Dates, monthly for others.
- `robots.ts` — allow all, sitemap reference.

## Domain

Pending decision (see PRODUCT.md open decisions #3) — all canonical URLs and OG base URL depend on this; use environment variable `NEXT_PUBLIC_SITE_URL`, never hardcode domain in components.

## Performance-SEO overlap

Core Web Vitals directly affect ranking — see ARCHITECTURE.md rendering rules (static generation, `next/image`, minimal client JS) and enforce via Lighthouse CI gate (≥95 SEO score) in GitHub Actions.
