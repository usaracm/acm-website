"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Homepage uses its own layout (Ozge Keles style)
  const isHomepage = pathname === "/";

  if (isHomepage) {
    // Homepage has its own header and footer built in
    return <>{children}</>;
  }

  // All other pages use the standard dark navbar and footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
