import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import { getSpeakers } from "@/lib/content";
import { resolveAssetPath } from "@/lib/utils";

export default function SpeakersPage() {
  const speakers = getSpeakers();

  return (
    <div className="w-full bg-canvas py-12 md:py-24 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-4xl flex flex-col gap-10 md:gap-14">
        {/* Page Header */}
        <SectionHeading
          eyebrow="Keynote Program"
          title="Keynote Speakers"
          description="Leading academic researchers and industry architects will present keynotes on the future of intelligent, automated, and secure computing systems."
        />

        {speakers.length === 0 ? (
          <div className="flex flex-col items-center gap-10 mt-4">
            {/* Main empty state — flat dashed border */}
            <div className="border border-dashed border-hairline bg-canvas-soft p-8 sm:p-12 text-center w-full max-w-xl">
              {/* Speaker icon placeholder in blue-tinted block */}
              <div className="mx-auto mb-6 h-14 w-14 flex items-center justify-center bg-primary/10">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[15px] font-semibold text-ink">Speakers to be announced</p>
              <p className="text-[13px] text-ink-secondary font-[300] mt-2 max-w-md mx-auto leading-relaxed">
                The selection committee is currently finalizing speaking details. Once confirmed, full bio and abstract notes will be posted here.
              </p>
              <span className="inline-block mt-5 font-mono text-[11px] uppercase tracking-wider text-primary border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-none">
                Expected · September 2026
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10 mt-4">
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className="p-6 sm:p-8 border border-hairline border-l-4 border-l-primary bg-canvas-soft flex flex-col md:flex-row gap-6 sm:gap-8 rounded-none hover:border-primary transition-colors"
              >
                 {/* Speaker avatar block with local image or fallback SVG */}
                <div className="h-24 w-24 sm:h-32 sm:w-32 bg-canvas-soft overflow-hidden flex items-center justify-center shrink-0 border border-hairline relative">
                  {speaker.photo && speaker.photo !== "/placeholder-speaker.png" ? (
                    <Image
                      src={resolveAssetPath(speaker.photo)}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 128px"
                    />
                  ) : (
                    <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>

                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="inline-flex px-2 py-0.5 border border-[#24a148]/20 bg-[#24a148]/10 text-[#24a148] text-[9px] font-mono uppercase tracking-wider leading-none">
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
                      {!speaker.links?.scholar && speaker.links?.site && (
                        <a
                          href={speaker.links.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 border border-primary/20 bg-primary/10 text-primary text-[9px] font-mono uppercase tracking-wider leading-none hover:bg-primary/20 transition-colors"
                        >
                          Profile
                          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <h3 className="text-[20px] font-semibold text-ink leading-tight">{speaker.name}</h3>
                    <p className="text-[13px] text-ink-secondary font-[300] leading-normal mt-0.5">
                      {speaker.title} &mdash; {speaker.institution}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-[12px] font-semibold text-ink uppercase tracking-wider">Research Specialization</h4>
                    <p className="text-[13px] text-ink-secondary font-[300] leading-relaxed">
                      {speaker.researchArea}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-[12px] font-semibold text-ink uppercase tracking-wider">Biography</h4>
                    <p className="text-[13px] text-ink-secondary font-[300] leading-relaxed">
                      {speaker.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Why Attend — 3-panel info row */}
        <div className="w-full border-t border-hairline pt-8">
          <h3 className="text-[14px] font-semibold text-ink border-b border-hairline pb-2.5 mb-5">What to Expect from Keynotes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 border border-hairline bg-canvas rounded-none">
              <div className="h-7 w-7 bg-[#24a148]/10 flex items-center justify-center mb-3">
                <svg className="h-4 w-4 text-[#24a148]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-[13px] font-semibold text-ink">Foundational Research</h4>
              <p className="text-[12px] text-ink-secondary font-[300] mt-1">Frontier breakthroughs in AI and Robotics from world-class institutions.</p>
            </div>
            <div className="p-4 sm:p-5 border border-hairline bg-canvas rounded-none">
              <div className="h-7 w-7 bg-primary/10 flex items-center justify-center mb-3">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-[13px] font-semibold text-ink">Industry Perspectives</h4>
              <p className="text-[12px] text-ink-secondary font-[300] mt-1">Technology leaders sharing practical applications and real-world deployment insights.</p>
            </div>
            <div className="p-4 sm:p-5 border border-hairline bg-canvas rounded-none">
              <div className="h-7 w-7 bg-ruby/10 flex items-center justify-center mb-3">
                <svg className="h-4 w-4 text-ruby" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-[13px] font-semibold text-ink">Open Q&A Sessions</h4>
              <p className="text-[12px] text-ink-secondary font-[300] mt-1">Interactive panels with time allocated for audience questions and discussion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
