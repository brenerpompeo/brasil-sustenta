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
    <div className="bg-[color:var(--color-paper-2)] p-10 xl:p-16 flex flex-col justify-center border-r border-[color:var(--color-ink)] relative">
      <div className="flex flex-col gap-12">
        <div className="space-y-8">
          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--color-ink)] border border-[color:var(--color-ink)] px-4 py-2 inline-flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-[color:var(--color-ink)]" />
            {section.panel.eyebrow}
          </span>

          <div className="space-y-6">
            <h2 className="max-w-[12ch] font-display text-5xl xl:text-7xl font-black lowercase tracking-tighter text-[color:var(--color-ink)] leading-[0.9]">
              {section.panel.title}
            </h2>
            <p className="max-w-md font-mono text-sm text-[color:var(--color-ink-3)] leading-relaxed border-l-2 border-[color:var(--color-ink)] pl-4">
              {section.panel.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Button asChild size="lg" className="rounded-none border-2 border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-white hover:bg-white hover:text-[color:var(--color-ink)] text-xs uppercase tracking-[0.2em] font-mono font-bold transition-colors shadow-none px-8 py-6">
            <Link href={section.panel.ctaHref}>
              {section.panel.ctaLabel}
              <ArrowUpRight className="size-4 ml-3" />
            </Link>
          </Button>
          
          {NAV_SUPPORT_LINKS.slice(0, 2).map((link) => (
             <Link key={link.href} href={link.href} className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-[color:var(--color-ink-3)] hover:text-[color:var(--color-ink)] hover:underline underline-offset-4 transition-all">
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
      className="grid auto-rows-[minmax(160px,1fr)] gap-px bg-[color:var(--color-ink)]"
      style={{
        gridTemplateColumns: `repeat(${section.panel.gridCols}, minmax(0, 1fr))`,
      }}
    >
      {section.panel.tiles.map((tile, i) => (
        <motion.div
          key={tile.href}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: i * 0.04 }}
          style={{
            gridColumn: `span ${tile.colSpan} / span ${tile.colSpan}`,
            gridRow: `span ${tile.rowSpan ?? 1} / span ${tile.rowSpan ?? 1}`,
          }}
          className="bg-[color:var(--color-paper-2)] hover:bg-[color:var(--color-ink)] group transition-colors duration-300 relative"
        >
          <PanelTile tile={tile} />
        </motion.div>
      ))}
    </div>
  );
}

function PanelTile({ tile }: { tile: NavPanelTile }) {
  const Icon = navIcons[tile.iconKey];

  return (
    <Link
      href={tile.href}
      className="flex h-full w-full flex-col justify-between p-6"
    >
      <div className="flex items-start justify-between">
        <Icon className="size-6 text-[color:var(--color-ink)] group-hover:text-[color:var(--color-paper-2)] transition-colors" />
        <ArrowUpRight className="size-4 text-[color:var(--color-ink-4)] group-hover:text-[color:var(--color-paper-2)] opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 delay-75" />
      </div>
      <div>
        <h4 className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[color:var(--color-ink)] group-hover:text-white transition-colors mb-2">
          {tile.label}
        </h4>
        <p className="font-mono text-xs text-[color:var(--color-ink-3)] group-hover:text-[color:var(--color-ink-4)] transition-colors pr-4">
          {tile.description}
        </p>
      </div>
    </Link>
  );
}
