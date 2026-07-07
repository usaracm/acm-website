import Image from "next/image";
import Hero from "@/components/home/Hero";
import SectionHeading from "@/components/shared/SectionHeading";
import TrackGrid from "@/components/tracks/TrackGrid";
import StatsGrid from "@/components/home/StatsGrid";
import Timeline from "@/components/shared/Timeline";
import { getTracks, getMilestones, getSpeakers } from "@/lib/content";
import { resolveAssetPath } from "@/lib/utils";

export default function HomePage() {
  const tracks = getTracks();
  const milestones = getMilestones();
  const speakers = getSpeakers();

  // Conference stats according to architecture
  const stats = [
    { label: "Technical Tracks", value: 4 },
    { label: "Keynote Panels", value: 5, suffix: "+" },
    { label: "Submitted Papers", value: 120, suffix: "+" },
    { label: "Days Conference", value: 2 },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Logos / Institutional Support Wall */}
      <section className="py-6 sm:py-10 bg-[#161616] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-white/65 shrink-0 text-center md:text-left">
            Organized by
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {/* GGSIPU Logo */}
            <div className="flex items-center h-10">
              <Image
                src={resolveAssetPath("/GGSIPU_LANDSCAPE.png")}
                alt="Guru Gobind Singh Indraprastha University"
                width={200}
                height={40}
                className="object-contain h-10 w-auto opacity-90"
              />
            </div>
            {/* Vertical divider */}
            <div className="hidden sm:block h-8 w-px bg-white/20" />
            {/* ACM Chapter Logo */}
            <div className="flex items-center gap-3">
              <Image
                src={resolveAssetPath("/BLUE WITH WHITE TEXT.png")}
                alt="GGSIPU EDC ACM Student Chapter"
                width={36}
                height={36}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-wider">ACM Chapter</span>
                <span className="text-[10px] text-white/65 font-[300]">GGSIPU EDC ACM Student Chapter</span>
              </div>
            </div>
            {/* USAR text badge */}
            <div className="flex flex-col items-center md:items-start">
              <span className="font-sans text-[12px] font-bold text-white uppercase tracking-wider">USAR</span>
              <span className="text-[10px] text-white/65 font-[300]">University School of Automation &amp; Robotics</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IEEE Sustainability Initiative Strip */}
      <section className="py-4 bg-[#24a148]/10 border-b border-[#24a148]/20">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* IEEE Leaf icon */}
            <div className="h-7 w-7 rounded-none bg-[#24a148]/20 flex items-center justify-center shrink-0">
              <svg className="h-4 w-4 text-[#24a148]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16s1-1 3-1 4 2 6 2 3-1 3-1V4s-1 1-3 1-4-2-6-2-3 1-3 1z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20v-4" />
              </svg>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#24a148]">
                IEEE Sustainability Initiative
              </span>
              <span className="hidden sm:inline h-3 w-px bg-[#24a148]/30" />
              <span className="text-[12px] text-ink-secondary font-[300]">
                IIC-AIR 2027 supports IEEE&apos;s Sustainability Initiative — promoting sustainable practices and technologies across computing systems.
              </span>
            </div>
          </div>
          <a
            href="https://www.ieee.org/about/corporate/sustainability.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-wider text-[#24a148] hover:text-[#1a7a38] transition-colors shrink-0"
          >
            Learn more →
          </a>
        </div>
      </section>

      {/* 4. Stats Summary Section */}
      <section className="py-12 sm:py-20 bg-canvas">
        <div className="mx-auto max-w-7xl px-6">
          <StatsGrid stats={stats} />
        </div>
      </section>

      {/* 5. Technical Program Tracks Section */}
      <section id="tracks-section" className="py-16 sm:py-24 surface-band-strong border-t border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-12 sm:gap-16">
          <SectionHeading
            title="Technical Program Tracks"
            description="IIC-AIR 2027 solicits original research papers in three key technical areas. All accepted publications will follow ACM conference standards."
          />
          <TrackGrid tracks={tracks} />
        </div>
      </section>

      {/* 6. Important Dates Section */}
      <section id="dates-section" className="py-16 sm:py-24 bg-canvas">
        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-10 sm:gap-12">
          <SectionHeading
            title="Important Dates"
            description="Please note the deadlines for abstract and full paper submissions. The double-blind review process will follow the schedule below."
            align="center"
          />
          <Timeline milestones={milestones} />
        </div>
      </section>

      {/* 7. Keynote Speakers Section (Dynamic Speaker Grid) */}
      <section id="speakers-section" className="py-16 sm:py-24 surface-band border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-10 sm:gap-12">
          <SectionHeading
            title="Keynote Speakers"
            description="Leading researchers and industry architects present keynotes on the future of artificial intelligence, IoT, and robotics."
          />

          {speakers.length === 0 ? (
            <div className="border border-dashed border-hairline bg-canvas p-8 sm:p-10 text-center w-full max-w-md mx-auto flex flex-col items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[14px] font-semibold text-ink">Keynote speakers to be announced</p>
              <p className="text-[12px] text-ink-secondary font-[300]">Expected · September 2026</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 w-full max-w-2xl mx-auto">
              {speakers.map((speaker) => (
                <div
                  key={speaker.name}
                  className="p-5 sm:p-6 border border-hairline border-l-4 border-l-primary bg-canvas rounded-none flex flex-col sm:flex-row gap-5 items-start"
                >
                  {/* Speaker photo block */}
                  {speaker.photo && speaker.photo !== "/placeholder-speaker.png" && (
                    <div className="h-20 w-20 relative shrink-0 border border-hairline bg-canvas-soft overflow-hidden">
                      <Image
                        src={resolveAssetPath(speaker.photo)}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex px-2 py-0.5 border border-[#24a148]/20 bg-[#24a148]/10 text-[#24a148] text-[9px] font-sans uppercase tracking-wider">
                        Keynote Speaker
                      </span>
                      {speaker.links?.scholar && (
                        <a
                          href={speaker.links.scholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 border border-primary/20 bg-primary/10 text-primary text-[9px] font-mono uppercase tracking-wider leading-none hover:bg-primary/20 transition-colors"
                        >
                          Google Scholar
                          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-[16px] font-semibold text-ink leading-tight">{speaker.name}</h4>
                      <p className="text-[12px] text-ink-secondary font-[300] leading-normal">{speaker.title} &mdash; {speaker.institution}</p>
                    </div>
                    <p className="text-[12px] text-ink-secondary font-[300] italic leading-relaxed pt-2 border-t border-hairline">
                      Specialization: {speaker.researchArea}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
