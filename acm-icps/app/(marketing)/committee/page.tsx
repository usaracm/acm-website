import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";
import { getCommittee } from "@/lib/content";
import { resolveAssetPath } from "@/lib/utils";

const GROUP_TITLES: Record<string, string> = {
  patron: "Patrons",
  chair: "General Chairs",
  advisory: "Advisory Board",
  local: "Local Organizing Committee",
  finance: "Finance Committee",
  web_publicity: "Web & Publicity Committee",
  tpc: "Technical Program Committee (TPC)",
};

const COLOR_MAP: Record<string, { badge: string; border: string }> = {
  patron: { badge: "bg-primary/10 text-primary border-primary/20", border: "border-primary" },
  chair: { badge: "bg-primary/10 text-primary border-primary/20", border: "border-primary" },
  advisory: { badge: "bg-ruby/10 text-ruby border-ruby/20", border: "border-ruby" },
  local: { badge: "bg-lemon/15 text-[#9b6829] border-lemon/30", border: "border-[#9b6829]/30" },
  finance: { badge: "bg-[#24a148]/10 text-[#24a148] border-[#24a148]/20", border: "border-[#24a148]" },
  web_publicity: { badge: "bg-primary/10 text-primary border-primary/20", border: "border-primary" },
  tpc: { badge: "bg-canvas-soft text-ink-secondary border-hairline", border: "border-hairline" },
};

export default function CommitteePage() {
  const committee = getCommittee();

  // Group committee members
  const grouped: Record<string, typeof committee> = {
    patron: [],
    chair: [],
    advisory: [],
    local: [],
    finance: [],
    web_publicity: [],
    tpc: [],
  };

  committee.forEach((member) => {
    if (grouped[member.group]) {
      grouped[member.group].push(member);
    }
  });

  return (
    <div className="w-full bg-canvas py-12 md:py-24 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-4xl flex flex-col gap-10 md:gap-14">
        {/* Page Header */}
        <SectionHeading
          eyebrow="Organization"
          title="Organizing Committee"
          description="The conference is managed by a coalition of academic faculty, researchers, and advisory experts from recognized universities and organizations."
        />

        {/* Dynamic Groups Rendering */}
        {Object.keys(grouped).map((groupKey) => {
          const members = grouped[groupKey];
          if (members.length === 0) return null;

          const title = GROUP_TITLES[groupKey];
          const colors = COLOR_MAP[groupKey];

          // TPC is rendered as a clean list/grid of tags to save space, others are cards
          if (groupKey === "tpc") {
            return (
              <section key={groupKey} className="flex flex-col gap-5 border-t border-hairline pt-8">
                <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink">
                  {title}
                </h3>
                <p className="text-[13px] text-ink-secondary font-[300] -mt-2 leading-relaxed">
                  Assistant Professors from University School of Automation &amp; Robotics (USAR), GGSIPU.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {members.map((member) => (
                    <div
                      key={member.name}
                      className="p-3.5 border border-hairline bg-canvas-soft flex flex-col gap-1 rounded-none"
                    >
                      <span className="text-[14px] font-semibold text-ink leading-tight">{member.name}</span>
                      <span className="text-[11px] text-ink-secondary font-[300] leading-none">{member.role}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return (
            <section key={groupKey} className="flex flex-col gap-6 border-t border-hairline pt-8">
              <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink">
                {title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {members.map((member) => (
                  <div
                    key={member.name}
                    className={`p-5 border border-hairline border-l-4 ${colors.border} bg-canvas rounded-none hover:border-primary transition-colors flex flex-col justify-between gap-3`}
                  >
                    <div className="flex gap-4 items-start">
                      {member.photo && (
                        <div className="h-16 w-16 relative shrink-0 border border-hairline bg-canvas-soft overflow-hidden">
                          <Image
                            src={resolveAssetPath(member.photo)}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-1 flex-1">
                        <span className="text-[16px] font-semibold text-ink leading-tight">{member.name}</span>
                        <span className="text-[13px] text-ink-secondary font-[300] mt-0.5 leading-relaxed">
                          {member.affiliation}
                        </span>
                        {(member.email || member.contact) && (
                          <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-hairline text-[11px] text-ink-secondary font-sans">
                            {member.email && (
                              <div className="flex items-center gap-1.5">
                                <svg className="h-3 w-3 text-ink-mute-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">{member.email}</a>
                              </div>
                            )}
                            {member.contact && (
                              <div className="flex items-center gap-1.5">
                                <svg className="h-3 w-3 text-ink-mute-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{member.contact}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`inline-flex self-start px-2 py-0.5 border text-[10px] font-sans uppercase tracking-wider ${colors.badge}`}>
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Host Institution Info */}
        <div className="border-l-4 border-l-primary border border-hairline bg-canvas-soft p-5 mt-4">
          <p className="text-[13px] text-ink-secondary font-[300] leading-relaxed">
            <strong className="text-ink font-semibold">Host Institution:</strong> Guru Gobind Singh Indraprastha University (GGSIPU) — University School of Automation and Robotics (USAR), East Delhi Campus, Surajmal Vihar, Delhi-110032.
          </p>
        </div>
      </div>
    </div>
  );
}
