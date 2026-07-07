import { Metadata } from "next";
import TeamsPageClient from "./TeamsPageClient";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the passionate students, faculty advisors, and office bearers driving innovation at GGSIPU EDC ACM Student Chapter.",
};

export default function TeamsPage() {
  return <TeamsPageClient />;
}
