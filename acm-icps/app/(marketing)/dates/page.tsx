import SectionHeading from "@/components/shared/SectionHeading";
import Timeline from "@/components/shared/Timeline";
import { getMilestones } from "@/lib/content";

export default function DatesPage() {
  const milestones = getMilestones();

  return (
    <div className="w-full surface-page py-12 md:py-24 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-4xl flex flex-col gap-10 md:gap-14">
        {/* Page Header */}
        <SectionHeading
          eyebrow="Key Deadlines"
          title="Important Dates"
          description="Review the submission, notification, and camera-ready milestones below. All submission deadlines are strict."
          align="center"
        />

        {/* Timezone Notice — Carbon warning left-rule (lemon/yellow) */}
        <div className="border-l-4 border-l-lemon border border-hairline bg-canvas-soft p-4 sm:p-5 w-full max-w-2xl mx-auto flex gap-4 items-start">
          <div className="h-5 w-5 shrink-0 mt-0.5 flex items-center justify-center">
            <svg className="h-5 w-5 text-lemon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-ink">Timezone Notice</p>
            <p className="text-[13px] leading-relaxed text-ink-secondary font-[300] mt-0.5">
              All submission deadlines are set to <strong>23:59 Anywhere on Earth (AoE)</strong>. Late submissions will not be processed by the OpenReview portal.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-2">
          <Timeline milestones={milestones} />
        </div>

        {/* Info callout — blue accent */}
        <div className="border-l-4 border-l-primary border border-hairline bg-canvas-soft p-4 sm:p-5 w-full">
          <p className="text-[13px] text-ink-secondary font-[300] leading-relaxed">
            <strong className="text-ink font-semibold">Rolling notifications:</strong> Authors will receive reviewer assignments and decisions via the OpenReview portal. Check your OpenReview inbox regularly after the submission deadline.
          </p>
        </div>
      </div>
    </div>
  );
}
