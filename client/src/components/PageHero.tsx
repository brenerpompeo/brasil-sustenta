import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  actions?: ReactNode;
  side?: ReactNode;
  metaRail?: ReactNode;
  trustRail?: ReactNode;
  variant?: "paper" | "ink" | "leaf" | "atlantic" | "sun";
};

const variantClass: Record<NonNullable<PageHeroProps["variant"]>, string> = {
  paper: "bg-[color:var(--color-paper)] text-[color:var(--color-ink)]",
  ink: "surface-ink",
  leaf: "surface-leaf",
  atlantic: "surface-atlantic",
  sun: "surface-sun",
};

export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  side,
  metaRail,
  trustRail,
  variant = "paper",
}: PageHeroProps) {
  const dark = variant === "ink" || variant === "leaf" || variant === "atlantic";
  return (
    <section className={cn(variantClass[variant], "relative overflow-hidden")}>
      <div className="container-editorial pt-14 pb-14 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div
            className={cn(
              "animate-fade-up",
              side ? "lg:col-span-7" : "lg:col-span-9"
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-block h-0.5 w-10",
                  dark ? "bg-white/60" : "bg-[color:var(--color-leaf)]"
                )}
              />
              <span
                className={cn(
                  "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em]",
                  dark ? "text-white/60" : "text-[color:var(--color-ink-4)]"
                )}
              >
                {eyebrow}
              </span>
            </div>

            {metaRail ? <div className="mt-6">{metaRail}</div> : null}

            <h1
              className={cn(
                "text-display mt-7 max-w-[20ch] text-balance",
                dark ? "text-white" : ""
              )}
            >
              {title}
            </h1>

            <p
              className={cn(
                "text-lede mt-7 max-w-2xl",
                dark ? "text-white/72" : ""
              )}
            >
              {lede}
            </p>

            {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
            {trustRail ? <div className="mt-8">{trustRail}</div> : null}
          </div>

          {side && (
            <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
              {side}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
