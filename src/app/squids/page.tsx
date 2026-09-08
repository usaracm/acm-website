// app/page.jsx
import HeroSection from "@/components/squids/HeroSection";

export const metadata = {
  title: "Squid Game | ACM",
  description: "7 day survival game.",
};

export default async function SquidsPage() {
  let stats = {
    survivorCount: 0,
    eliminatedCount: 0,
    totalPlayers: 0,
    contestUrl: ""
  };

  

  return (
    <main className="bg-black min-h-screen">
      <HeroSection 
        survivorCount={stats.survivorCount} 
        eliminatedCount={stats.eliminatedCount} 
        totalPlayers={stats.totalPlayers} 
        contestUrl={stats.contestUrl} 
      />
      {/* Leaderboard and other sections will go here later */}
    </main>
  );
}