import { motion } from "framer-motion";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";

import {
  editorialViewport,
  fadeUpVariants,
  scaleInVariants,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type AccentTone = "leaf" | "sky" | "violet";

interface AuthFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AuthPortalLayoutProps {
  tone: AccentTone;
  portalLabel: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  icon: LucideIcon;
  features: AuthFeature[];
  children: ReactNode;
}

const toneStyles = {
  leaf: {
    selection: "selection:bg-leaf-5 selection:text-leaf-1",
    badge:
      "border-leaf/15 bg-leaf-5 text-leaf-1 shadow-[0_16px_36px_rgba(0,255,133,0.08)]",
    iconShell: "border-leaf/15 bg-leaf-5 text-leaf-1",
    panelGlow: "shadow-[0_32px_90px_rgba(0,255,133,0.08)]",
    accentLine: "from-leaf/30 via-leaf/10 to-transparent",
    orbClass:
      "bg-[radial-gradient(circle,_rgba(0,255,133,0.18)_0%,_transparent_72%)]",
    featureAccent: "text-leaf-1",
    mobileMark: "bg-leaf text-ink",
  },
  sky: {
    selection: "selection:bg-sky-3 selection:text-sky-1",
    badge:
      "border-sky/15 bg-sky-5 text-sky-1 shadow-[0_16px_36px_rgba(46,91,255,0.08)]",
    iconShell: "border-sky/15 bg-sky-5 text-sky-1",
    panelGlow: "shadow-[0_32px_90px_rgba(46,91,255,0.08)]",
    accentLine: "from-sky/30 via-sky/10 to-transparent",
    orbClass:
      "bg-[radial-gradient(circle,_rgba(46,91,255,0.18)_0%,_transparent_72%)]",
    featureAccent: "text-sky-1",
    mobileMark: "bg-sky text-white",
  },
  violet: {
    selection: "selection:bg-violet-3 selection:text-violet-1",
    badge:
      "border-violet/15 bg-violet-5 text-violet-1 shadow-[0_16px_36px_rgba(91,82,255,0.08)]",
    iconShell: "border-violet/15 bg-violet-5 text-violet-1",
    panelGlow: "shadow-[0_32px_90px_rgba(91,82,255,0.08)]",
    accentLine: "from-violet/30 via-violet/10 to-transparent",
    orbClass:
      "bg-[radial-gradient(circle,_rgba(91,82,255,0.18)_0%,_transparent_72%)]",
    featureAccent: "text-violet-1",
    mobileMark: "bg-violet text-white",
  },
} satisfies Record<
  AccentTone,
  {
    selection: string;
    badge: string;
    iconShell: string;
    panelGlow: string;
    accentLine: string;
    orbClass: string;
    featureAccent: string;
    mobileMark: string;
  }
>;

export function AuthPortalLayout({
  tone,
  portalLabel,
  eyebrow,
  title,
  description,
  icon: PortalIcon,
  features,
  children,
}: AuthPortalLayoutProps) {
  const styles = toneStyles[tone];

  return (
    <div
      className={cn(
        "min-h-screen bg-paper font-body text-ink",
        styles.selection
      )}
    >
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <motion.aside
          className="editorial-stage relative hidden overflow-hidden border-r border-paper-3 lg:flex"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12)}
        >
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-paper-4 to-transparent" />
          <div
            className={cn(
              "absolute -left-24 top-[-8rem] h-[28rem] w-[28rem] blur-3xl",
              styles.orbClass
            )}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper-4 to-transparent" />

          <div className="relative flex w-full flex-col justify-between gap-12 px-12 py-12 xl:px-16 xl:py-14">
            <motion.div variants={fadeUpVariants(22)} className="space-y-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-ink-4 transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Voltar para a home
              </Link>

              <div className="space-y-6">
                <div
                  className={cn(
                    "inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em]",
                    styles.badge
                  )}
                >
                  <PortalIcon className="h-3.5 w-3.5" />
                  {eyebrow}
                </div>

                <div className="space-y-5">
                  <div
                    className={cn(
                      "flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.8rem] border bg-white/80 shadow-[0_18px_42px_rgba(5,5,5,0.04)]",
                      styles.iconShell
                    )}
                  >
                    <PortalIcon className="h-8 w-8" />
                  </div>

                  <div className="max-w-2xl space-y-5">
                    <h1 className="mb-0 text-[3.8rem] leading-[0.88] tracking-[-0.06em] text-ink xl:text-[4.7rem]">
                      {title}
                    </h1>
                    <p className="max-w-xl text-lg font-medium leading-8 text-ink-3">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={scaleInVariants(0.98)}
              className="editorial-grid grid gap-0 overflow-hidden rounded-[2.2rem] bg-white/70 shadow-[0_20px_50px_rgba(5,5,5,0.04)]"
            >
              {features.map(feature => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="editorial-cell p-6 xl:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-white/85",
                          styles.iconShell
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <p
                          className={cn(
                            "text-sm font-black uppercase tracking-[0.18em]",
                            styles.featureAccent
                          )}
                        >
                          {feature.title}
                        </p>
                        <p className="text-sm leading-7 text-ink-3">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.aside>

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12">
          <div
            className={cn(
              "absolute top-0 left-0 h-px w-full bg-gradient-to-r",
              styles.accentLine
            )}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0))]" />
          <div
            className={cn(
              "absolute right-[-8rem] bottom-[-10rem] h-[24rem] w-[24rem] blur-3xl",
              styles.orbClass
            )}
          />

          <motion.div
            className={cn(
              "editorial-panel relative z-10 w-full max-w-[34rem] rounded-[2.3rem] border border-paper-3/80 bg-white/95 p-6 sm:p-8 lg:p-10",
              styles.panelGlow
            )}
            initial="hidden"
            whileInView="visible"
            viewport={editorialViewport}
            variants={staggerContainer(0.12)}
          >
            <motion.div
              variants={fadeUpVariants(18)}
              className="mb-8 flex items-center justify-between gap-4 border-b border-paper-3 pb-6"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_12px_26px_rgba(5,5,5,0.08)]",
                    styles.mobileMark
                  )}
                >
                  <span className="text-xs font-black tracking-[0.24em]">
                    BS
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-ink-4">
                    Brasil Sustenta
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    {portalLabel}
                  </p>
                </div>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-paper-3 bg-paper px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-ink-4 transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Início
              </Link>
            </motion.div>

            <motion.div variants={fadeUpVariants(18)}>{children}</motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
