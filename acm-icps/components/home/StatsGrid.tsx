import StatCard from "./StatCard";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  isTarget?: boolean;
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  if (stats.length === 0) return null;

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, idx) => (
        <StatCard key={`${stat.label}-${idx}`} stat={stat} />
      ))}
    </div>
  );
}
