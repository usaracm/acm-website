import SectionHeading from "@/components/shared/SectionHeading";

const CATEGORIES = [
  {
    tier: "Student",
    badge: "bg-primary/10 text-primary",
    description: "Requires valid institutional ID (student) verification at time of registration.",
    icon: (
      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    tier: "Academic Faculty",
    badge: "bg-[#24a148]/10 text-[#24a148]",
    description: "Standard academic discount for professors, lecturers, and full-time researchers at recognized institutions.",
    icon: (
      <svg className="h-5 w-5 text-[#24a148]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    tier: "Industry Delegate",
    badge: "bg-lemon/15 text-[#9b6829]",
    description: "For corporate research teams, technology developers, and industry practitioners.",
    icon: (
      <svg className="h-5 w-5 text-[#9b6829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    tier: "International Authors",
    badge: "bg-ruby/10 text-ruby",
    description: "USD-mapped pricing for attendees from outside India. Visa invitation letters provided on request.",
    icon: (
      <svg className="h-5 w-5 text-ruby" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const PERIODS = ["Early Bird", "Regular", "Late Registration"];
const PERIOD_COLORS = [
  "bg-[#24a148]/10 text-[#24a148]",
  "bg-primary/10 text-primary",
  "bg-ruby/10 text-ruby",
];

export default function RegistrationPage() {
  return (
    <div className="w-full surface-page py-12 md:py-24 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-4xl flex flex-col gap-10 md:gap-14">
        {/* Page Header */}
        <SectionHeading
          eyebrow="Registration & Fees"
          title="Registration Fees"
          description="Registration provides access to all technical tracks, keynote presentations, workshop sessions, and digital conference proceedings."
        />

        {/* Pending Confirmation — yellow warning left rule */}
        <div className="border-l-4 border-l-lemon border border-hairline bg-canvas-soft p-4 sm:p-5 flex gap-4 items-start">
          <div className="h-5 w-5 shrink-0 mt-0.5">
            <svg className="h-5 w-5 text-lemon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-ink">Pending confirmation from the Finance Chair</p>
            <p className="text-[13px] leading-relaxed text-ink-secondary font-[300] mt-0.5">
              Registration schedules and tier amounts (early/regular/late periods) will be published once finalized. Amounts will be updated 60 days before the submission deadline.
            </p>
          </div>
        </div>

        {/* Registration Periods */}
        <section className="flex flex-col gap-6">
          <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink border-b border-hairline pb-2.5">
            Registration Periods
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PERIODS.map((period, idx) => (
              <div key={period} className="p-4 sm:p-5 border border-hairline bg-canvas rounded-none flex flex-col gap-2">
                <span className={`inline-flex self-start px-2 py-0.5 rounded-none text-[10px] font-sans uppercase tracking-wider ${PERIOD_COLORS[idx]}`}>
                  {period}
                </span>
                <p className="text-[12px] text-ink-secondary font-[300] mt-1">
                  {idx === 0 && "Lowest rates. Available for a limited time after registration opens."}
                  {idx === 1 && "Standard pricing window. Open until approximately 3 weeks before the event."}
                  {idx === 2 && "Highest rates apply. Available at the venue. Subject to seat availability."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Category Cards */}
        <section className="flex flex-col gap-6">
          <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink border-b border-hairline pb-2.5">
            Registration Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map(({ tier, badge, description, icon }) => (
              <div key={tier} className="p-4 sm:p-5 border border-hairline bg-canvas rounded-none hover:border-primary transition-colors flex gap-4 items-start">
                <div className="h-10 w-10 rounded-none bg-canvas-soft border border-hairline flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div className="flex flex-col gap-1">
                  <div className={`inline-flex self-start px-2 py-0.5 rounded-none text-[10px] font-sans uppercase tracking-wider mb-1 ${badge}`}>
                    {tier}
                  </div>
                  <p className="text-[12px] text-ink-secondary font-[300] leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner — Carbon full-bleed blue */}
        <div className="rounded-none bg-[#161616] px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-transparent">
          <div>
            <p className="text-[16px] font-[300] text-white leading-tight">Have a registration inquiry?</p>
            <p className="text-[13px] text-white/60 font-[300] mt-1">Contact the Finance Chair or Organizing Committee directly.</p>
          </div>
          <a
            href="mailto:dr.atultripathi22@gmail.com"
            className="inline-flex h-11 items-center justify-center rounded-none bg-primary px-6 text-[14px] font-medium text-white transition-colors hover:bg-primary-deep shrink-0"
          >
            Email Finance Chair
          </a>
        </div>
      </div>
    </div>
  );
}
