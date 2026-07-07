"use client";

import { useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/call-for-papers", label: "Call for Papers" },
  { href: "/tracks", label: "Tracks" },
  { href: "/dates", label: "Dates" },
  { href: "/speakers", label: "Speakers" },
  { href: "/committee", label: "Committee" },
  { href: "/registration", label: "Registration" },
  { href: "/venue", label: "Venue" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-[48px] max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none"
          onClick={closeMenu}
        >
          <span className="font-sans text-[14px] font-bold tracking-tight text-ink">
            IIC-AIR <span className="text-primary">2027</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* CTA Button (Carbon flat square button) */}
        <div className="hidden lg:flex items-center h-full">
          <a
            href="https://openreview.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-full items-center justify-center bg-primary px-5 text-[14px] font-medium text-white transition-all duration-160 hover:bg-primary-deep active:bg-primary-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Submit Paper
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-none text-ink-mute-2 hover:text-ink lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer (with fade transition) */}
      {isOpen && (
        <div className="lg:hidden border-t border-hairline bg-canvas px-6 py-4 animate-fade-in">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-ink-mute-2 hover:text-ink py-1.5 border-b border-hairline/50"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://openreview.net"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex h-10 items-center justify-center bg-primary w-full text-[14px] font-medium text-white transition-all duration-160 hover:bg-primary-deep active:bg-primary-press"
              onClick={closeMenu}
            >
              Submit Paper
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
