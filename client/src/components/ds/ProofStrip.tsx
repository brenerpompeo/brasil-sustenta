import { cn } from "@/lib/utils";

export type ProofStripTone =
  | "default"
  | "leaf"
  | "sun"
  | "atlantic"
  | "clay"
  | "inverse";

export type ProofStripItem = {
  value: string;
  label: string;
  note?: string;
  tone?: ProofStripTone;
};

export interface ProofStripProps {
  items: ProofStripItem[];
  className?: string;
  compact?: boolean;
  ariaLabel?: string;
}

const toneClass: Record<ProofStripTone, string> = {
  default: "text-[color:var(--color-leaf)]",
  leaf: "text-[color:var(--color-leaf)]",
  sun: "text-[color:var(--color-sun-deep)]",
  atlantic: "text-[color:var(--color-atlantic)]",
  clay: "text-[color:var(--color-clay-deep)]",
  inverse: "text-white",
};

export function ProofStrip({
  items,
  className,
  compact = false,
  ariaLabel = "Indicadores de confiança",
}: ProofStripProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white",
        className
      )}
    >
      <ul
        aria-label={ariaLabel}
        className={cn(
          "grid gap-px bg-[color:var(--color-border)]",
          compact ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {items.map((item) => (
          <li key={`${item.value}-${item.label}`} className="bg-white p-5 md:p-6">
            <p
              className={cn(
                "font-display font-black leading-none tracking-[-0.045em]",
                compact ? "text-[1.9rem]" : "text-[2.3rem]",
                toneClass[item.tone ?? "default"]
              )}
            >
              {item.value}
            </p>
            <p className="mt-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
              {item.label}
            </p>
            {item.note ? (
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                {item.note}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProofStrip;
