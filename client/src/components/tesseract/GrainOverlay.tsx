"use client";

/**
 * Film grain overlay – CSS-only approach using SVG feTurbulence.
 * Renders a fixed full-viewport grain texture with subtle animation.
 * Pointer-events are disabled so it never blocks interaction.
 */
export default function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-9999 opacity-[0.035] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="tesseract-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#tesseract-grain)"
          opacity="1"
        />
      </svg>
    </div>
  );
}
