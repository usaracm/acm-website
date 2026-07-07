"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
const NAV_ITEMS = [
  { label: "About", number: "1.0", href: "/about" },
  { label: "Events", number: "2.0", href: "/events" },
  { label: "Team", number: "3.0", href: "/teams" },
  { label: "Projects", number: "4.0", href: "/projects" },
  { label: "Blogs", number: "5.0", href: "/blogs" },
  {
    label: "IIC-AIR",
    number: "6.0",
    href: "/iicair/",
    special: true,
    external: true,
  },
];

// Mobile nav includes Home
const MOBILE_NAV_ITEMS = [
  { label: "Home", number: "0.0", href: "/" },
  ...NAV_ITEMS,
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!href || href === "#") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isHomeActive = isActive("/");

  return (
    <div className="sticky top-0 z-[100] w-full flex justify-center pt-4 px-4">
      <nav className="w-full max-w-[1200px]">
        {/* Desktop */}
        <div className="hidden w-full overflow-hidden rounded-2xl border border-white/10 bg-[#181818]/45 text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md md:flex">
          <div
            className={`flex items-center border-r border-white/5 px-6 transition-colors ${isHomeActive ? "bg-acm-blue/35" : "bg-transparent"
              }`}
          >
            <Link href="/" className="flex items-center">
              <div className="relative h-7 w-9">
                <Image
                  src="/ACM_Logo_white_text.webp"
                  alt="ACM Logo"
                  fill
                  className="object-contain"
                  sizes="128px"
                  priority
                />
              </div>
              <span
                className={`rounded-full text-[12px] font-semibold ${isHomeActive ? "text-white" : "text-white/70"
                  }`}
              >
                GGSIPU EDC ACM
              </span>
            </Link>
          </div>

          <ul className="flex flex-1 items-stretch text-xs uppercase tracking-[0.3em]">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="flex flex-1 min-w-[140px]">
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-1 items-center justify-center gap-2 border-r border-white/5 px-3 py-3 transition ${item.special ? "text-[#0085ca] hover:bg-[#0085ca]/10 hover:text-[#0085ca]" : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em]">
                      {item.number}
                    </span>
                    <span className="font-semibold tracking-[0.15em]">
                      {item.label}
                    </span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex flex-1 items-center justify-center gap-2 border-r border-white/5 px-3 py-3 transition ${isActive(item.href)
                        ? (item.special ? "bg-[#0085ca]/35 text-white" : "bg-acm-blue/35 text-white")
                        : (item.special ? "text-[#0085ca] hover:bg-[#0085ca]/10 hover:text-[#0085ca]" : "text-white/60 hover:bg-white/5 hover:text-white")
                      }`}
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em]">
                      {item.number}
                    </span>
                    <span className="font-semibold tracking-[0.15em]">
                      {item.label}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile */}
        <div className="flex w-full flex-col rounded-2xl border border-white/10 bg-[#181818]/45 text-white shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between px-1 py-1">
            <div className="relative h-8 w-12">
              <Image
                src="/ACM_Logo_white_text.webp"
                alt="ACM logo"
                fill
                className="object-contain"
                sizes="112px"
                priority
              />
            </div>
            <button
              className="rounded-xl border border-white/20 p-3"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <span className="block h-0.5 w-6 bg-white" />
              <span className="mt-1.5 block h-0.5 w-6 bg-white" />
              <span className="mt-1.5 block h-0.5 w-6 bg-white" />
            </button>
          </div>
          {mobileOpen && (
            <div className="border-t border-white/10 px-4 py-4">
              <ul className="space-y-4 text-sm uppercase tracking-[0.25em]">
                {MOBILE_NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between transition-colors ${item.special ? "text-[#0085ca]/80 hover:text-[#0085ca]" : "text-white/70 hover:text-white"
                          }`}
                      >
                        <span className="font-mono text-[11px]">{item.number}</span>
                        <span className="font-semibold">{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between transition-colors ${isActive(item.href)
                            ? (item.special ? "text-[#0085ca]" : "text-white")
                            : (item.special ? "text-[#0085ca]/80 hover:text-[#0085ca]" : "text-white/70 hover:text-white")
                          }`}
                      >
                        <span className="font-mono text-[11px]">{item.number}</span>
                        <span className="font-semibold">{item.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
