import SectionHeading from "@/components/shared/SectionHeading";
import TrackGrid from "@/components/tracks/TrackGrid";
import { getTracks } from "@/lib/content";

export default function TracksPage() {
  const tracks = getTracks();

  return (
    <div className="w-full surface-page py-16 md:py-24 px-6">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-12">
        {/* Page Header */}
        <SectionHeading
          eyebrow="Scope & Topics"
          title="Technical Program Tracks"
          description="IIC-AIR 2027 welcomes original research papers addressing challenges across artificial intelligence, IoT, and robotics."
        />

        {/* Track summary pills */}
        <div className="flex flex-wrap gap-2 -mt-4">
          {[
            { label: "Artificial Intelligence", color: "bg-ruby/10 text-ruby" },
            { label: "Internet of Things", color: "bg-primary/10 text-primary" },
            { label: "Robotics & Automation", color: "bg-[#24a148]/10 text-[#24a148]" },
            { label: "Cross-Track Applications", color: "bg-lemon/15 text-[#9b6829]" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className={`inline-flex items-center px-3 py-1 rounded-none text-[11px] font-sans uppercase tracking-wider border border-hairline ${color}`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Tracks Grid */}
        <TrackGrid tracks={tracks} />

        {/* Scope note — warning yellow */}
        <div className="border-l-4 border-l-lemon border border-hairline bg-canvas-soft p-4 sm:p-5 flex gap-4 items-start">
          <div className="shrink-0 mt-0.5">
            <svg className="h-5 w-5 text-lemon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-ink">Cross-track submissions</p>
            <p className="text-[13px] leading-relaxed text-ink-secondary font-[300] mt-0.5">
              Papers at the intersection of multiple tracks are welcome. Authors should indicate the most relevant primary track at submission time. The TPC will route interdisciplinary work to reviewers from all relevant areas.
            </p>
          </div>
        </div>

        {/* Final submission note — full-bleed Carbon blue CTA */}
        <div className="bg-primary px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-[18px] font-[300] text-white leading-tight">
              Selected papers archived in ACM Digital Library.
            </p>
            <p className="text-[13px] text-white/70 font-[300] mt-1">
              All tracks follow a double-blind peer-review mechanism.
            </p>
          </div>
          <a
            href="https://openreview.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-none bg-white px-6 text-[14px] font-medium text-primary transition-colors hover:bg-white/90 shrink-0"
          >
            Submit to OpenReview →
          </a>
        </div>
      </div>
    </div>
  );
}
