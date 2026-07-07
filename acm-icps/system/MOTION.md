# MOTION.md — IIC-AIR 2027

Motion with purpose only. No animation longer than 600ms. Every animation below must respect `prefers-reduced-motion: reduce` — decorative motion disables entirely, functional transitions fall back to instant state change.

## Specified Animations

| Element | Behavior | Duration | Reduced-motion fallback |
|---|---|---|---|
| Hero reveal | Fade + slide-up 16px on load | 400ms | Instant render |
| Logo cloud (Trust) | Fade-in stagger, 60ms per logo | 300ms/logo | All visible instantly |
| Counter animation | Count-up on scroll-into-view | ≤1200ms | Final value renders instantly |
| Timeline reveal | Stagger reveal, 80ms per item | 300ms/item | All visible instantly |
| Card stagger | Grid items fade+slide, 60ms stagger | 300ms/item | All visible instantly |
| Scroll progress | Thin top bar tracks scroll % | continuous, no easing lag | Static/omitted |
| Page transition | Cross-fade between routes | 200ms | Instant navigation |
| Hover elevation | `translateY(-4px)` + shadow-lg | 150ms | Same (not decorative, keep) |
| Modal open/close | Fade + scale 0.98→1 | 200ms | Instant show/hide |
| Accordion expand | Height auto-animate | 300ms | Instant show/hide |

## Library

Framer Motion for all component-level animation. Lenis for smooth scroll only (no scroll-jacking, no disabling native scroll on mobile). No GSAP.

## Rules

- Never block interaction during animation (no animation gates a click).
- Never animate layout-critical content in a way that causes CLS.
- Background decorative elements (mesh gradients, blobs) run at low opacity, low z-index, `pointer-events: none`, and pause entirely under reduced-motion.
