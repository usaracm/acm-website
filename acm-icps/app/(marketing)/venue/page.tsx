import Image from "next/image";
import { resolveAssetPath } from "@/lib/utils";

const TRANSIT_STEPS = [
  {
    method: "Delhi Metro",
    color: "bg-primary/10 text-primary",
    icon: (
      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    steps: [
      { label: "Karkarduma Court Metro Station", detail: "Pink Line — ~1.1 km, 4-min transit / auto-rickshaw ride." },
      { label: "Karkarduma Metro Station", detail: "Blue Line & Pink Line — ~1.5 km, 5-min transit / auto-rickshaw ride." },
      { label: "Mansarovar Park Metro Station", detail: "Red Line — ~3.0 km, 10-min transit / auto-rickshaw ride." },
    ],
  },
  {
    method: "From Airport",
    color: "bg-[#24a148]/10 text-[#24a148]",
    icon: (
      <svg className="h-5 w-5 text-[#24a148]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    steps: [
      { label: "Indira Gandhi International Airport (DEL)", detail: "~26 km via airport taxi or Metro Airport Express line." },
      { label: "New Delhi Railway Station (NDLS)", detail: "~12 km. Blue Line metro from Rajiv Chowk transit point." },
    ],
  },
];

export default function VenuePage() {
  return (
    <div className="w-full surface-page">

      {/* Hero Image — Aerial USAR campus with light-theme treatment */}
      <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden">
        <Image
          src={resolveAssetPath("/3.jpg")}
          alt="Aerial view of USAR — University School of Automation and Robotics, GGSIPU East Delhi Campus"
          fill
          priority
          className="object-cover object-center brightness-110 saturate-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/52" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/90 via-[#f5f9ff]/85 to-transparent" />
        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="bg-white/88 backdrop-blur-[2px] px-6 py-4 border border-white/90">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink mb-3 block">Conference Venue</span>
            <h1 className="text-[28px] sm:text-[42px] font-[400] text-ink tracking-[-0.5px] leading-tight max-w-xl">
              University School of Automation<br />& Robotics
            </h1>
            <p className="text-[14px] text-ink font-[400] mt-3">
              Guru Gobind Singh Indraprastha University, East Delhi Campus
            </p>
          </div>
        </div>
      </div>
      <div className="py-12 md:py-20 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-10 md:gap-14">

          {/* Address Card — flat, primary left rule */}
          <div className="border-l-4 border-l-primary border border-hairline bg-canvas-soft p-5 sm:p-8 flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Physical Location
              </span>
              <address className="not-italic text-[16px] font-[300] leading-relaxed text-ink font-sans">
                Guru Gobind Singh Indraprastha University,<br />
                East Delhi Campus (EDC),<br />
                Surajmal Vihar, Delhi-110032, India
              </address>
              <a
                href="https://maps.google.com/?q=Guru+Gobind+Singh+Indraprastha+University+East+Delhi+Campus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:text-primary-deep transition-colors mt-1"
              >
                Open in Google Maps
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="flex flex-col gap-2 sm:text-right shrink-0">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-mute">
                Host School
              </span>
              <span className="text-[14px] leading-relaxed text-ink-secondary font-[300]">
                University School of Automation<br />& Robotics (USAR)
              </span>
              <span className="inline-block mt-1 font-sans text-[10px] uppercase tracking-wider text-[#24a148] border border-[#24a148]/30 bg-[#24a148]/5 px-2 py-1 self-start sm:self-end rounded-none">
                Active Venue
              </span>
            </div>
          </div>

          {/* Photo gallery — 3 images in a grid */}
          <section className="flex flex-col gap-4">
            <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink border-b border-hairline pb-2.5">
              Campus Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Gate / entrance */}
              <div className="relative aspect-[4/3] overflow-hidden border border-hairline">
                <Image
                  src={resolveAssetPath("/1.jpg")}
                  alt="GGSIPU main gate entrance — Guru Gobind Singh Indraprastha University"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#161616]/60 px-3 py-1.5">
                  <span className="text-[10px] font-sans text-white/80 uppercase tracking-wider">Main Gate</span>
                </div>
              </div>
              {/* Auditorium */}
              <div className="relative aspect-[4/3] overflow-hidden border border-hairline">
                <Image
                  src={resolveAssetPath("/2.jpg")}
                  alt="GGSIPU grand auditorium — conference venue interior"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#161616]/60 px-3 py-1.5">
                  <span className="text-[10px] font-sans text-white/80 uppercase tracking-wider">Grand Auditorium</span>
                </div>
              </div>
              {/* Aerial USAR */}
              <div className="relative aspect-[4/3] overflow-hidden border border-hairline">
                <Image
                  src={resolveAssetPath("/3.jpg")}
                  alt="Aerial view of USAR building — University School of Automation and Robotics"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#161616]/60 px-3 py-1.5">
                  <span className="text-[10px] font-sans text-white/80 uppercase tracking-wider">USAR Campus</span>
                </div>
              </div>
            </div>
          </section>

          {/* Campus Description */}
          <section className="flex flex-col gap-4 text-[14px] leading-relaxed text-ink-secondary font-[300]">
            <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink border-b border-hairline pb-2.5">
              About East Delhi Campus (EDC)
            </h3>
            <p>
              The East Delhi Campus of GGSIPU is a newly developed, ecologically conscious academic hub designed to cultivate next-generation research in engineering and robotic arts. The campus features smart auditorium halls, specialized robotics laboratories, high-performance computing centers, and modern seminar wings tailored for hosting high-density international conferences.
            </p>

            {/* Facilities strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {["Smart Auditorium", "Robotics Labs", "HPC Center", "Seminar Wings"].map((facility, i) => {
                const fColors = ["text-primary bg-primary/10", "text-[#24a148] bg-[#24a148]/10", "text-ruby bg-ruby/10", "text-[#9b6829] bg-lemon/15"];
                return (
                  <div key={facility} className={`p-3 rounded-none border border-hairline flex flex-col items-center text-center gap-1.5 text-[11px] font-sans uppercase tracking-wider ${fColors[i]}`}>
                    {facility}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Travel & Transit Guide */}
          <section className="flex flex-col gap-6">
            <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink border-b border-hairline pb-2.5">
              Travel & Transit Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TRANSIT_STEPS.map(({ method, color, icon, steps }) => (
                <div key={method} className="p-4 sm:p-5 border border-hairline bg-canvas rounded-none flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-none flex items-center justify-center shrink-0 ${color}`}>
                      {icon}
                    </div>
                    <h4 className="text-[15px] font-semibold text-ink">Via {method}</h4>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {steps.map(({ label, detail }) => (
                      <li key={label} className="flex gap-3 text-[13px] text-ink-secondary font-[300]">
                        <span className="mt-1.5 h-1.5 w-1.5 bg-primary/50 rounded-none shrink-0" aria-hidden="true" />
                        <div>
                          <strong className="text-ink font-semibold text-[13px]">{label}</strong>
                          <span className="block text-[12px] font-[300] text-ink-secondary mt-0.5">{detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Accommodations */}
          <section className="flex flex-col gap-6 border-t border-hairline pt-8">
            <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink">
              Recommended Accommodations
            </h3>
            <p className="text-[13px] text-ink-secondary font-[300] -mt-2 leading-relaxed">
              For the convenience of delegates, we recommend the following hotels located near GGSIPU East Delhi Campus.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border border-hairline bg-canvas rounded-none flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] font-semibold text-ink leading-tight">The Leela Ambience Convention Hotel</span>
                  <span className="text-[13px] text-ink-secondary font-[300] leading-relaxed">
                    A luxury 5-star hotel offering premium amenities, fine dining, and excellent business facilities.
                  </span>
                  <span className="text-[12px] text-ink-mute font-[300]">
                    Distance to college: ~500 m (approx. 5-min walk)
                  </span>
                </div>
                <div className="flex gap-4 border-t border-hairline pt-3 mt-1 text-[12px] font-sans">
                  <a
                    href="https://maps.app.goo.gl/jcbgYKkwdHTdkuzP9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-deep font-medium transition-colors"
                  >
                    View Map
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="p-5 border border-hairline bg-canvas rounded-none flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] font-semibold text-ink leading-tight">Ginger East Delhi</span>
                  <span className="text-[13px] text-ink-secondary font-[300] leading-relaxed">
                    A modern, reliable mid-range business hotel providing comfortable smart rooms and essential services.
                  </span>
                  <span className="text-[12px] text-ink-mute font-[300]">
                    Distance to college: ~450 m (approx. 5-min walk)
                  </span>
                </div>
                <div className="flex gap-4 border-t border-hairline pt-3 mt-1 text-[12px] font-sans">
                  <a
                    href="https://maps.app.goo.gl/n3oQZ8NHeRTZ9ReHA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-deep font-medium transition-colors"
                  >
                    View Map
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
