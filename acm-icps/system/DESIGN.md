# DESIGN.md — IIC-AIR 2027

## Visual Inspiration

| Aspect | Reference |
|---|---|
| Primary feel | Stripe Sessions |
| Secondary system | IBM Carbon |
| Typography | Apple |
| Motion | Linear |
| Conference layout | NeurIPS, ICRA, CVPR, IROS |
| Developer experience | Vercel |

Light theme only. Not dark. Academic trust over flashy.

## Design Principles

Every UI decision must satisfy:
- Academic first
- Readable
- Premium
- Minimal
- Timeless
- Research-focused
- Motion with purpose (never decorative-only)
- Accessibility over aesthetics
- Whitespace over decoration

## Color Tokens

```css
--bg: #FFFFFF;
--bg-subtle: #F8FAFC;
--surface: #FFFFFF;
--surface-alt: #F1F5F9;
--border: #E2E8F0;
--ink: #0F172A;
--ink-muted: #475569;
--ink-faint: #94A3B8;
--primary: #2563EB;
--primary-hover: #1D4ED8;
--accent: #06B6D4;
--success: #16A34A;
--warning: #D97706;
--danger: #DC2626;
```

Verify `#06B6D4` on white fails AA for body text at 16px — reserve accent for graphics/icons/large headings only, use `--ink` or `--primary` for readable text.

## Typography Scale (px)

| Role | Size |
|---|---|
| Hero | 72 / 64 / 56 (responsive steps) |
| H1 | 48 |
| H2 | 36 |
| H3 | 28 |
| Body | 18 / 16 |
| Caption | 14 / 12 |

Fonts: Inter (400/600/700) for UI text, JetBrains Mono for dates/track tags/code.

## Layout System

- 12-column grid
- Max container: 1440px
- Max content width: 1280px
- Section vertical padding: 96px
- Standard spacing unit: 64px (sections), 24px (cards)
- Sticky nav, fixed height
- Footer: multi-column, fixed min-height for CLS stability

## Radius & Elevation

- Cards: 8px radius
- Buttons: 6px radius
- Pills/tags: 999px
- Shadows: soft only — `shadow-sm` default, `shadow-lg` on hover elevation. No hard drop shadows.

## Iconography

Lucide icons only, 1.5px stroke, sized to type scale (20px inline, 24px standalone, 32px feature).

## Illustration Style

No custom illustrations for MVP — use geometric/abstract SVG patterns (grid lines, network nodes) as background texture only, never literal robot/blockchain clip-art.
