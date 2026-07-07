import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-[65ch] w-full",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-primary"
          aria-hidden="true"
        >
          {eyebrow}
        </span>
      )}
      <h2 className="text-[24px] sm:text-[34px] md:text-[48px] font-[300] tracking-[-0.96px] leading-[1.15] text-ink">
        {title}
      </h2>
      {description && (
        <p className="text-[14px] sm:text-[16px] font-[300] leading-relaxed text-ink-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
