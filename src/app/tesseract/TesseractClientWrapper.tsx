"use client";

import dynamic from "next/dynamic";

const TesseractPageContent = dynamic(
  () => import("@/components/tesseract/TesseractPage"),
  { ssr: false }
);

export default function TesseractClientWrapper() {
  return <TesseractPageContent />;
}
