# ACCESSIBILITY.md — IIC-AIR 2027

Target: WCAG AA, verified with axe DevTools zero critical/serious violations before merge.

## Color Contrast

- All text/background pairs verified AA (4.5:1 normal text, 3:1 large text/UI components).
- `--accent` (#06B6D4) fails AA for body text on white — restrict to icons, large decorative headings, and graphics only. Use `--ink` or `--primary` for any readable text.

## Keyboard & Focus

- Full keyboard navigation on every interactive element — no mouse-only interactions.
- Visible focus rings on all focusable elements (do not remove default outline without a replacement of equal or greater visibility).
- Logical tab order matches visual order.
- Skip-to-content link at top of every page.

## Component Patterns (WAI-ARIA APG)

- Accordion: `aria-expanded`, `aria-controls`, arrow-key navigation between headers.
- Modal/Dialog: focus trap, `Escape` closes, focus returns to trigger element, `aria-modal="true"`, labeled via `aria-labelledby`.
- Tabs: `role="tablist"`/`role="tab"`/`role="tabpanel"`, arrow-key navigation.

## Motion

`prefers-reduced-motion: reduce` fully respected — see MOTION.md fallback column per animation. No animation may be the sole means of conveying information (e.g. count-up final value must exist in DOM regardless of animation state).

## Images & Media

- Real, descriptive alt text on every image — never filename-derived, never empty unless purely decorative (`alt=""` only for confirmed decorative images).
- Broken speaker/committee photos fall back to initials avatar, not a broken-image icon.

## Forms

- Every input has an associated `<label>`.
- Error messages linked via `aria-describedby`, announced via `aria-live="polite"`.
- Newsletter signup and contact form both keyboard- and screen-reader-operable end to end.

## Testing

- axe DevTools automated scan on every PR (CI gate).
- Manual keyboard-only pass on all 8 MVP pages before launch.
- Manual screen reader pass (VoiceOver or NVDA) on Home, Registration, Speakers at minimum.
