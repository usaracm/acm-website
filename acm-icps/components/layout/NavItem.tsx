"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
}

export default function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center h-full text-[14px] font-medium tracking-tight transition-colors duration-200 text-ink-secondary hover:text-ink px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none",
        isActive && "text-ink font-semibold"
      )}
    >
      <span>{label}</span>
      {isActive && (
        <span
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-none"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
