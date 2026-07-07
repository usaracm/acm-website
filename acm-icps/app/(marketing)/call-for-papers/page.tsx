import SectionHeading from "@/components/shared/SectionHeading";

export default function CallForPapersPage() {
  return (
    <div className="w-full surface-page py-12 md:py-24 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-4xl flex flex-col gap-10 md:gap-14">
        {/* Page Header */}
        <SectionHeading
          eyebrow="Technical Submissions"
          title="Call for Papers"
          description="IIC-AIR 2027 invites original, high-quality research papers presenting theoretical and practical advances in artificial intelligence, IoT, and robotics."
        />

        {/* Callout Card: Submit / Guidelines — blue-60 left accent */}
        <div className="border-l-4 border-l-primary border border-hairline bg-canvas-soft p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="text-[18px] font-semibold text-ink">Submission Portal</h3>
            <p className="text-[14px] leading-relaxed text-ink-secondary font-[300]">
              All submissions are handled via OpenReview under a double-blind peer-review model. Papers must not exceed 8 pages including references.
            </p>
          </div>
          <a
            href="https://openreview.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-none bg-primary px-6 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-primary-deep active:bg-primary-press shrink-0 w-full md:w-auto"
          >
            Open Submission Portal
          </a>
        </div>

        {/* Info row: 2 semantic info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Success: Paper Length */}
          <div className="flex gap-4 p-4 sm:p-5 border border-hairline bg-canvas rounded-none">
            <div className="h-8 w-8 rounded-none bg-[#24a148]/10 flex items-center justify-center shrink-0">
              <svg className="h-4 w-4 text-[#24a148]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-ink">Max 8 Pages</h4>
              <p className="text-[12px] text-ink-secondary font-[300] mt-0.5">Including all references and appendices. Overlength papers are desk-rejected without review.</p>
            </div>
          </div>
          {/* Error / Alert: Blind review */}
          <div className="flex gap-4 p-4 sm:p-5 border border-hairline bg-canvas rounded-none">
            <div className="h-8 w-8 rounded-none bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-ink">Double-Blind Review</h4>
              <p className="text-[12px] text-ink-secondary font-[300] mt-0.5">Author names, affiliations, and any identifying references must be completely removed from the manuscript.</p>
            </div>
          </div>
        </div>

        {/* Paper Categories & Scope */}
        <section className="flex flex-col gap-6">
          <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink border-b border-hairline pb-2.5">
            Peer-Review & Submission Policies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-[14px] leading-relaxed text-ink-secondary font-[300]">
            <div className="flex flex-col gap-3 p-5 border border-hairline bg-canvas rounded-none hover:border-primary transition-colors">
              <h4 className="font-semibold text-ink text-[15px]">Double-Blind Model</h4>
              <p>
                Author identities must be completely anonymized. Omit author names, affiliations, and explicit self-references in the body of the submitted manuscript. Failure to do so will result in immediate desk rejection.
              </p>
            </div>
            <div className="flex flex-col gap-3 p-5 border border-hairline bg-canvas rounded-none hover:border-primary transition-colors">
              <h4 className="font-semibold text-ink text-[15px]">Originality Statement</h4>
              <p>
                Submissions must represent unpublished work. Parallel submissions to other journals or conferences with proceedings are strictly prohibited. Plagiarism checks are run automatically upon entry.
              </p>
            </div>
          </div>
        </section>

        {/* Template Downloads — warm canvas-soft with left rule */}
        <section className="flex flex-col gap-6">
          <h3 className="text-[20px] font-[300] tracking-[-0.2px] text-ink border-b border-hairline pb-2.5">
            Manuscript Templates
          </h3>
          <p className="text-[14px] leading-relaxed text-ink-secondary font-[300]">
            Papers must be formatted strictly in accordance with ACM conference specifications. Accepted papers will be published in the ACM Digital Library.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LaTeX Template */}
            <div className="p-5 border border-hairline bg-canvas rounded-none flex flex-col justify-between items-start gap-5 hover:border-primary transition-colors group">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-none bg-[#24a148]/10 text-[#24a148] text-[10px] font-sans uppercase tracking-wider mb-3">Recommended</span>
                <h4 className="text-[15px] font-semibold text-ink">ACM LaTeX Template</h4>
                <p className="text-[12px] text-ink-secondary font-[300] mt-1.5">
                  Highly recommended formatting template for LaTeX authors. Uses the official <code className="font-sans text-primary">acmart</code> class.
                </p>
              </div>
              <a
                href="https://www.acm.org/publications/proceedings-template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:text-primary-deep transition-colors"
              >
                Download LaTeX Package
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Word Template */}
            <div className="p-5 border border-hairline bg-canvas rounded-none flex flex-col justify-between items-start gap-5 hover:border-primary transition-colors group">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-none bg-canvas-soft text-ink-secondary text-[10px] font-sans uppercase tracking-wider mb-3">Alternative</span>
                <h4 className="text-[15px] font-semibold text-ink">ACM MS Word Template</h4>
                <p className="text-[12px] text-ink-secondary font-[300] mt-1.5">
                  Official Word template for draft submission. Ensure strict column margin alignment.
                </p>
              </div>
              <a
                href="https://www.acm.org/publications/proceedings-template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:text-primary-deep transition-colors"
              >
                Download Word Doc
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Banner — Carbon full-bleed blue block */}
        <div className="rounded-none bg-primary px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-[18px] font-[300] text-white leading-tight">Ready to submit your research?</p>
            <p className="text-[13px] text-white/75 font-[300] mt-1">Deadline: Check the Important Dates page for current cutoffs.</p>
          </div>
          <a
            href="https://openreview.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-none bg-white px-6 text-[14px] font-medium text-primary transition-colors hover:bg-white/90 shrink-0"
          >
            Submit Now →
          </a>
        </div>

        {/* Contact info / final note */}
        <footer className="border-t border-hairline pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-ink-mute font-sans">
            Submission queries may be directed to the Technical Program Chairs.
          </p>
          {/* IEEE Sustainability badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-5 w-5 rounded-none bg-[#24a148]/10 flex items-center justify-center">
              <svg className="h-3 w-3 text-[#24a148]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16s1-1 3-1 4 2 6 2 3-1 3-1V4s-1 1-3 1-4-2-6-2-3 1-3 1z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20v-4" />
              </svg>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#24a148]">
              IEEE Sustainability Initiative
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
