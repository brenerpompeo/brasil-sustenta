import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Link } from "wouter";

import { MetricBlock } from "@/components/ds/MetricBlock";
import { cn } from "@/lib/utils";

export type AccentTone = "green" | "blue" | "yellow";

export interface AuthPortalMetric {
  value: string | number;
  label: string;
  context?: string;
}

export interface AuthPortalHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AuthPortalLayoutProps {
  tone: AccentTone;
  secondaryTone?: AccentTone;
  portalLabel: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  icon: LucideIcon;
  metadata?: string[];
  metrics?: AuthPortalMetric[];
  highlights?: AuthPortalHighlight[];
  children: ReactNode;
}

const toneStyles = {
  green: {
    accent: "var(--color-leaf-bright)",
    accentDeep: "var(--color-leaf)",
    accentSoft: "var(--color-leaf-soft)",
    glow: "rgba(0, 168, 107, 0.28)",
  },
  blue: {
    accent: "var(--color-atlantic-bright)",
    accentDeep: "var(--color-atlantic)",
    accentSoft: "var(--color-atlantic-soft)",
    glow: "rgba(59, 130, 246, 0.28)",
  },
  yellow: {
    accent: "var(--color-sun-bright)",
    accentDeep: "var(--color-sun)",
    accentSoft: "var(--color-sun-soft)",
    glow: "rgba(255, 217, 61, 0.24)",
  },
} as const;

export function AuthPortalLayout({
  tone,
  secondaryTone,
  portalLabel,
  eyebrow,
  title,
  description,
  icon: PortalIcon,
  metadata = [],
  metrics = [],
  highlights = [],
  children,
}: AuthPortalLayoutProps) {
  const reduceMotion = useReducedMotion();
  const primary = toneStyles[tone];
  const secondary = secondaryTone ? toneStyles[secondaryTone] : null;

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-white selection:text-[color:var(--color-ink)]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-90"
        style={{
          background: [
            `radial-gradient(circle at 12% 18%, ${primary.glow} 0, transparent 36%)`,
            `radial-gradient(circle at 82% 16%, ${secondary?.glow ?? primary.glow} 0, transparent 30%)`,
            `radial-gradient(circle at 78% 78%, ${primary.glow} 0, transparent 34%)`,
          ].join(", "),
        }}
      />

      <div className="relative grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,540px)]">
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          className="relative flex flex-col justify-between border-b border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:min-h-screen lg:border-b-0 lg:border-r lg:border-white/10 lg:px-10 lg:py-10 xl:px-14"
        >
          <div className="space-y-8 lg:space-y-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-white/65 transition-colors hover:text-white"
              >
                <ArrowLeft className="size-4" />
                Voltar ao manifesto
              </Link>

              <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-white/72">
                <span
                  className="inline-flex size-8 items-center justify-center rounded-full text-[color:var(--color-ink)]"
                  style={{ backgroundColor: primary.accent }}
                >
                  <PortalIcon className="size-4" />
                </span>
                {portalLabel}
              </div>
            </div>

            <div className="space-y-5">
              <p
                className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.24em]"
                style={{
                  borderColor: "rgba(255,255,255,0.16)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: primary.accent,
                }}
              >
                <span
                  className="inline-block size-2 rounded-full"
                  style={{ backgroundColor: primary.accent }}
                />
                {eyebrow}
              </p>

              <div className="max-w-3xl space-y-5">
                <h1 className="font-display text-[clamp(2.9rem,7vw,6rem)] font-black leading-[0.88] tracking-[-0.05em]">
                  {title}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                  {description}
                </p>
              </div>
            </div>

            {metadata.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {metadata.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.22em] text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 space-y-6 lg:mt-12">
            {metrics.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map(metric => (
                  <div
                    key={`${metric.label}-${metric.value}`}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-sm"
                  >
                    <MetricBlock
                      value={metric.value}
                      label={metric.label}
                      accentColor={primary.accent}
                      className="gap-1.5"
                    />
                    {metric.context ? (
                      <p className="mt-3 text-sm leading-6 text-white/52">
                        {metric.context}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}

            {highlights.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {highlights.map(highlight => (
                  <div
                    key={highlight.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                  >
                    <div
                      className="inline-flex size-11 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: primary.accentSoft,
                        color: primary.accentDeep,
                      }}
                    >
                      <highlight.icon className="size-5" />
                    </div>
                    <h2 className="mt-5 font-display text-[1.45rem] font-bold leading-tight tracking-[-0.03em] text-white">
                      {highlight.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-6 text-white/60">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <PortalIcon
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-16 hidden size-72 rotate-[-12deg] opacity-[0.08] lg:block xl:size-[24rem]"
            style={{ color: primary.accent }}
          />
        </motion.aside>

        <main className="relative flex items-center justify-center px-4 py-7 sm:px-6 sm:py-10 lg:px-8 xl:px-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              ease: [0.22, 0.61, 0.36, 1],
              delay: reduceMotion ? 0 : 0.08,
            }}
            className={cn(
              "relative w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-black/10 bg-[color:var(--color-paper)] text-[color:var(--color-ink)] shadow-[0_28px_80px_rgba(0,0,0,0.42)]",
              "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-transparent before:via-transparent before:to-transparent"
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
              style={{
                background: secondary
                  ? `linear-gradient(90deg, ${primary.accentDeep} 0%, ${secondary.accentDeep} 100%)`
                  : `linear-gradient(90deg, ${primary.accentDeep} 0%, ${primary.accent} 100%)`,
              }}
            />

            <div className="border-b border-[color:var(--color-border)] px-6 py-6 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="inline-flex size-12 items-center justify-center rounded-[1.1rem] border border-black/10 text-[color:var(--color-ink)] shadow-sm"
                    style={{ backgroundColor: primary.accentSoft }}
                  >
                    <PortalIcon className="size-5" style={{ color: primary.accentDeep }} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-ink-4)]">
                      Brasil Sustenta
                    </p>
                    <p className="font-display text-[1.1rem] font-bold tracking-[-0.03em] text-[color:var(--color-ink)]">
                      {portalLabel}
                    </p>
                  </div>
                </div>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-3)] transition-colors hover:text-[color:var(--color-ink)]"
                >
                  Acesso
                </Link>
              </div>
            </div>

            <div className="px-6 py-7 sm:px-8 sm:py-8">{children}</div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
