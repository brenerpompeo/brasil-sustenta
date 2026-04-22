import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Compass,
  FileCheck2,
  FileText,
  Globe2,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  MapPin,
  Network,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
} from "lucide-react";
import { Link, useLocation } from "wouter";

import {
  NAV,
  NAV_SUPPORT_LINKS,
  type NavAccent,
  type NavIconKey,
  type NavPanelTile,
  type NavSection,
} from "@/constants/navigation-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navIcons: Record<NavIconKey, LucideIcon> = {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Compass,
  FileCheck2,
  FileText,
  Globe2,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  MapPin,
  Network,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
};

const accentStyles: Record<
  NavAccent,
  {
    text: string;
    softSurface: string;
    strongSurface: string;
    badge: string;
    button: "default" | "leaf" | "sun" | "atlantic";
  }
> = {
  paper: {
    text: "text-[color:var(--color-ink)]",
    softSurface: "bg-[color:var(--color-paper)] text-[color:var(--color-ink)]",
    strongSurface: "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]",
    badge:
      "border-[color:var(--color-border)] bg-white text-[color:var(--color-ink-4)]",
    button: "default",
  },
  green: {
    text: "text-[color:var(--color-leaf)]",
    softSurface:
      "bg-[color:var(--color-leaf-soft)] text-[color:var(--color-leaf-deep)]",
    strongSurface: "bg-[color:var(--color-leaf)] text-white",
    badge:
      "border-[color:var(--color-leaf)]/20 bg-[color:var(--color-leaf-soft)] text-[color:var(--color-leaf-deep)]",
    button: "leaf",
  },
  yellow: {
    text: "text-[color:var(--color-sun-deep)]",
    softSurface:
      "bg-[color:var(--color-sun-soft)] text-[color:var(--color-sun-deep)]",
    strongSurface: "bg-[color:var(--color-sun)] text-[color:var(--color-ink)]",
    badge:
      "border-[color:var(--color-sun-deep)]/20 bg-[color:var(--color-sun-soft)] text-[color:var(--color-sun-deep)]",
    button: "sun",
  },
  blue: {
    text: "text-[color:var(--color-atlantic)]",
    softSurface:
      "bg-[color:var(--color-atlantic-soft)] text-[color:var(--color-atlantic-deep)]",
    strongSurface: "bg-[color:var(--color-atlantic)] text-white",
    badge:
      "border-[color:var(--color-atlantic)]/20 bg-[color:var(--color-atlantic-soft)] text-[color:var(--color-atlantic-deep)]",
    button: "atlantic",
  },
  clay: {
    text: "text-[color:var(--color-clay-deep)]",
    softSurface:
      "bg-[color:var(--color-clay-soft)] text-[color:var(--color-clay-deep)]",
    strongSurface: "bg-[color:var(--color-clay)] text-white",
    badge:
      "border-[color:var(--color-clay-deep)]/20 bg-[color:var(--color-clay-soft)] text-[color:var(--color-clay-deep)]",
    button: "default",
  },
  ink: {
    text: "text-[color:var(--color-ink)]",
    softSurface: "bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)]",
    strongSurface: "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]",
    badge:
      "border-[color:var(--color-ink)]/20 bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)]",
    button: "default",
  },
};

function matchesPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function sectionIsActive(section: NavSection, pathname: string) {
  if (section.href && matchesPath(pathname, section.href)) return true;
  if (!section.panel) return false;

  return [section.panel.ctaHref, ...section.panel.tiles.map(tile => tile.href)].some(
    href => matchesPath(pathname, href)
  );
}

export function SuperMenu() {
  const [location] = useLocation();
  const [openSection, setOpenSection] = useState("");
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const currentSection = useMemo(
    () => NAV.find(section => section.id === openSection && section.panel),
    [openSection]
  );

  useEffect(() => {
    setOpenSection("");
  }, [location]);

  useEffect(() => {
    if (!openSection) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenSection("");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSection]);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setOpenSection(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setOpenSection("");
    }, 150);
  };

  return (
    <nav
      ref={wrapperRef}
      className="relative hidden min-w-0 lg:block flex-1"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      }}
      onBlurCapture={event => {
        const nextTarget = event.relatedTarget as Node | null;
        if (!nextTarget || !wrapperRef.current?.contains(nextTarget)) {
          setOpenSection("");
        }
      }}
    >
      <ul className="flex min-w-0 h-[4.75rem] border-l border-[color:var(--color-border)]">
        {NAV.filter(s => !s.hideInHeader).map(section => {
          const active = sectionIsActive(section, location);
          
          if (section.hasPanel) {
            return (
              <li key={section.id} className="min-w-0 flex-1 flex">
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter(section.id)}
                  onFocus={() => handleMouseEnter(section.id)}
                  onClick={() => handleMouseEnter(section.id)}
                  className={cn(
                    "flex h-[4.75rem] w-full items-center justify-center border-r border-[color:var(--color-border)] px-6 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)] transition-colors",
                    "hover:bg-[color:var(--color-paper-2)] hover:text-[color:var(--color-ink)]",
                    (active || openSection === section.id) &&
                      "bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)]"
                  )}
                  aria-expanded={openSection === section.id}
                >
                  {section.label}
                </button>
              </li>
            );
          }

          return (
            <li key={section.id} className="min-w-0 flex-1 flex" onMouseEnter={() => handleMouseEnter("")}>
              <Link
                href={section.href ?? "/"}
                className={cn(
                  "flex h-[4.75rem] w-full items-center justify-center border-r border-[color:var(--color-border)] px-6 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)] transition-colors",
                  active
                    ? "bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)]"
                    : "hover:bg-[color:var(--color-paper-2)] hover:text-[color:var(--color-ink)]"
                )}
              >
                {section.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <AnimatePresence initial={false} mode="wait">
        {currentSection?.panel ? (
          <motion.div
            key={currentSection.id}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: -12, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -10, filter: "blur(4px)" }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.24,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            className="fixed inset-x-0 top-[4.75rem] z-40 border-t border-b border-[color:var(--color-ink)] bg-[color:var(--color-ink)]"
          >
            <div className="w-full bg-[color:var(--color-ink)] flex justify-center border-t border-[color:var(--color-ink)]">
              <div className="w-full max-w-7xl overflow-hidden bg-[color:var(--color-ink)] border-x border-[color:var(--color-ink)]">
                <div className="grid gap-[1px] bg-[color:var(--color-ink)] lg:grid-cols-[1fr_2fr]">
                  <PanelHero section={currentSection} />
                  <PanelTileGrid section={currentSection} />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}

function PanelHero({ section }: { section: NavSection }) {
  if (!section.panel) return null;

  return (
    <div className="bg-[color:var(--color-ink)] p-10 xl:p-16 flex flex-col justify-center border-r border-[color:var(--color-ink)] relative overflow-hidden group">
      {/* Background Image / Overlay */}
      {section.backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${section.backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 mix-blend-multiply" />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-12">
        <div className="space-y-8">
          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white/80 border border-white/30 px-4 py-2 inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm">
            <span className="inline-block size-1.5 rounded-full bg-white/80 animate-pulse" />
            {section.panel.eyebrow}
          </span>

          <div className="space-y-6">
            <h2 className="max-w-[12ch] font-display text-5xl xl:text-7xl font-black lowercase tracking-tighter text-white leading-[0.9] drop-shadow-md">
              {section.panel.title}
            </h2>
            <p className="max-w-md font-mono text-sm text-white/80 leading-relaxed border-l-2 border-white/60 pl-4 bg-black/10 backdrop-blur-sm p-4">
              {section.panel.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Button asChild size="lg" className="rounded-none border-2 border-white bg-white text-black hover:bg-[color:var(--color-paper-2)] text-xs uppercase tracking-[0.2em] font-mono font-bold transition-colors shadow-none px-8 py-6">
            <Link href={section.panel.ctaHref}>
              {section.panel.ctaLabel}
              <ArrowUpRight className="size-4 ml-3" />
            </Link>
          </Button>
          
          {NAV_SUPPORT_LINKS.slice(0, 2).map((link) => (
             <Link key={link.href} href={link.href} className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:underline underline-offset-4 transition-all bg-black/40 px-3 py-2">
                {link.label}
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelTileGrid({ section }: { section: NavSection }) {
  if (!section.panel) return null;

  return (
    <div
      className="grid auto-rows-[minmax(160px,1fr)] gap-px bg-[color:var(--color-ink)] p-px"
      style={{
        gridTemplateColumns: `repeat(${section.panel.gridCols}, minmax(0, 1fr))`,
      }}
    >
      {section.panel.tiles.map((tile, i) => {
        // Obter os estilos de accent definidos (fallback para paper)
        const accent = tile.accent && accentStyles[tile.accent] ? accentStyles[tile.accent] : accentStyles.paper;

        return (
          <motion.div
            key={tile.href}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: i * 0.03, ease: "easeOut" }}
            style={{
              gridColumn: `span ${tile.colSpan} / span ${tile.colSpan}`,
              gridRow: `span ${tile.rowSpan ?? 1} / span ${tile.rowSpan ?? 1}`,
            }}
            className={cn(
              "group relative overflow-hidden transition-all duration-300",
              "bg-[color:var(--color-paper)] border border-transparent hover:border-[color:var(--color-ink)] hover:z-10",
              "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            )}
          >
            {/* High-Production Accent Overlay */}
            <div className={cn(
              "absolute inset-0 translate-y-full opacity-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-10",
              accent.strongSurface
            )} />
            
            {/* Neon Accent Line */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-[3px] scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100",
              accent.strongSurface
            )} />

            <PanelTile tile={tile} accent={accent} />
          </motion.div>
        );
      })}
    </div>
  );
}

function PanelTile({ tile, accent }: { tile: NavPanelTile, accent: any }) {
  const Icon = navIcons[tile.iconKey];

  return (
    <Link
      href={tile.href}
      className="relative z-10 flex h-full w-full flex-col justify-between p-6 xl:p-8"
    >
      <div className="flex items-start justify-between">
        <div className="relative">
           <div className={cn(
             "absolute -inset-2 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40",
             accent.strongSurface
           )} />
           <Icon className={cn(
             "relative size-7 transition-all duration-300",
             "text-[color:var(--color-ink)] group-hover:text-[color:var(--color-ink)] group-hover:-translate-y-0.5 group-hover:scale-110"
           )} />
        </div>
        <ArrowUpRight className="size-5 text-[color:var(--color-ink-4)] opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[color:var(--color-ink)] transition-all duration-300" />
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
           <span className={cn("size-1.5 rounded-full transition-all duration-300 group-hover:scale-150", accent.strongSurface)} />
           <h4 className="font-mono text-[0.75rem] xl:text-[0.8rem] font-bold uppercase tracking-[0.25em] text-[color:var(--color-ink)] transition-colors">
             {tile.label}
           </h4>
        </div>
        <p className="font-sans text-sm text-[color:var(--color-ink-3)] group-hover:text-[color:var(--color-ink)] transition-colors pr-4 leading-relaxed line-clamp-2">
          {tile.description}
        </p>
      </div>
    </Link>
  );
}
