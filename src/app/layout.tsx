import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://usar.acm.org"),
  title: {
    template: "%s | GGSIPU EDC ACM Student Chapter",
    default: "GGSIPU EDC ACM Student Chapter",
  },
  description:
    "The official student chapter of ACM at GGSIPU East Delhi Campus. Empowering students to innovate, collaborate, and lead in computing through events, workshops, and projects.",
  keywords: [
    "ACM",
    "GGSIPU",
    "EDC",
    "Student Chapter",
    "East Delhi Campus",
    "USS",
    "USAR",
    "USDI",
    "Technology",
    "Computing",
    "Coding",
    "Events",
    "Workshops",
  ],
  authors: [{ name: "ACM GGSIPU EDC Team" }],
  creator: "ACM GGSIPU EDC",
  publisher: "ACM GGSIPU EDC",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://usar.acm.org",
    siteName: "GGSIPU EDC ACM Student Chapter",
    title: "GGSIPU EDC ACM Student Chapter",
    description:
      "Empowering students to innovate, collaborate, and lead in the world of computing.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "GGSIPU EDC ACM Student Chapter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GGSIPU EDC ACM Student Chapter",
    description:
      "Empowering students to innovate, collaborate, and lead in the world of computing.",
    images: ["/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/bebas-neue/BebasNeue-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/montserrat/Montserrat-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ClientLayout>
          <Navbar />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
