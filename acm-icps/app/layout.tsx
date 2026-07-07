import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IIC-AIR 2027 | Indraprastha International Conference on AI, IoT & Robotics",
  description: "1st Indraprastha International Conference on Artificial Intelligence, IoT and Robotics (IIC-AIR) 2027. Organized by GGSIPU EDC ACM Student Chapter at USAR.",
  keywords: [
    "IIC-AIR 2027",
    "International Conference",
    "Artificial Intelligence Conference",
    "Internet of Things",
    "IoT",
    "Robotics",
    "GGSIPU",
    "USAR",
    "ACM Student Chapter",
    "Research Papers",
    "Delhi Conference"
  ],
  authors: [{ name: "GGSIPU EDC ACM Student Chapter" }],
  openGraph: {
    title: "IIC-AIR 2027 | Indraprastha International Conference on AI, IoT & Robotics",
    description: "1st Indraprastha International Conference on Artificial Intelligence, IoT and Robotics (IIC-AIR) 2027. Submit your original research papers.",
    url: "https://usar.acm.org/iic-air/",
    siteName: "IIC-AIR 2027",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IIC-AIR 2027 | International Conference on AI, IoT & Robotics",
    description: "Join us for IIC-AIR 2027. Organized by GGSIPU EDC ACM Student Chapter.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
