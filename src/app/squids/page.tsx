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

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${apiUrl}/api/squid-stats`, {
      cache: 'no-store' 
    });

    if (res.ok) {
      const data = await res.json();
      stats = {
        survivorCount: data.survivorCount ?? stats.survivorCount,
        eliminatedCount: data.eliminatedCount ?? stats.eliminatedCount,
        totalPlayers: data.totalPlayers ?? stats.totalPlayers,
        contestUrl: data.contestUrl ?? stats.contestUrl
      };
    } else {
      console.error("Failed to fetch from backend. Status:", res.status);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Backend fetch failed. Is the server running?", message);
  }

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