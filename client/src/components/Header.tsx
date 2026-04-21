import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

import { SuperMenu } from "@/components/SuperMenu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NAV, NAV_SUPPORT_LINKS } from "@/constants/navigation-data";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-paper)]/96 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_10px_30px_rgba(10,10,10,0.08)]"
        )}
      >
        <div className="flex min-h-[4.75rem] items-stretch">
          <button
            type="button"
            className="flex w-[4.75rem] shrink-0 items-center justify-center border-r border-[color:var(--color-border)] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-paper-2)] focus:bg-[color:var(--color-paper-2)] focus:outline-none"
            aria-label="Abrir super menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="size-6" />
          </button>

          <Link
            href="/"
            className="flex flex-1 lg:flex-none lg:shrink-0 items-center border-r border-[color:var(--color-border)] px-4 sm:px-5 lg:min-w-[12rem] lg:px-6"
          >
            <span className="font-display text-[1.55rem] font-black uppercase leading-[0.84] tracking-[-0.06em] text-[color:var(--color-ink)] sm:text-[1.75rem]">
              Brasil
              <br />
              <span className="text-[color:var(--color-leaf)]">Sustenta</span>
            </span>
          </Link>

          <div className="min-w-0 hidden lg:block flex-1">
            <SuperMenu />
          </div>

          <Link
            href="/login"
            className="hidden shrink-0 items-center justify-between gap-3 border-l border-[color:var(--color-border)] px-6 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-paper-2)] lg:flex lg:min-w-[11rem]"
          >
            Acesso
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[70]",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-[color:var(--color-ink)]/70 backdrop-blur-md transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        <aside
          className={cn(
            "absolute inset-0 flex flex-col bg-[color:var(--color-paper-2)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="flex h-[4.75rem] items-center justify-between border-b border-[color:var(--color-ink)] px-6 lg:px-12 bg-white">
            <div>
              <p className="font-mono text-[0.625rem] font-black uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                Brasil Sustenta
              </p>
              <p className="font-display text-xl font-bold tracking-[-0.03em] text-[color:var(--color-ink)]">
                Central de Informações
              </p>
            </div>

            <button
              type="button"
              className="inline-flex size-11 items-center justify-center border-2 border-[color:var(--color-ink)] bg-white text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-white transition-colors"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="flex-1 w-full bg-[color:var(--color-ink)] overflow-hidden flex flex-col">
            <div className="flex-1 flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 py-8 items-center hidescrollbar">
              {NAV.map(section => (
                <div
                  key={section.id}
                  className="snap-center shrink-0 w-[82vw] max-w-[320px] h-full max-h-[600px] min-h-[450px] relative flex flex-col justify-end overflow-hidden border border-white/10"
                >
                  {/* Background Image / Overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{ backgroundImage: `url(${section.backgroundImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col h-full justify-between p-6">
                    {/* Top Top */}
                    <div>
                      {section.hasPanel && section.panel?.eyebrow && (
                        <span className="font-mono text-[0.55rem] font-bold uppercase tracking-widest text-white/70 border border-white/30 px-3 py-1.5 inline-flex items-center gap-2 mb-4">
                          <span className="inline-block size-1.5 rounded-full bg-white/70" />
                          {section.panel.eyebrow}
                        </span>
                      )}
                    </div>

                    {/* Bottom Area */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h2 className="font-display text-4xl font-black lowercase leading-[0.9] tracking-[0.02em] text-white break-words">
                          {section.hasPanel && section.panel ? section.panel.title : section.label}
                        </h2>
                        {section.hasPanel && section.panel?.description && (
                          <p className="text-sm leading-6 text-white/70 font-mono border-l-2 border-white/30 pl-4 mt-4">
                            {section.panel.description}
                          </p>
                        )}
                      </div>

                      <Button asChild size="lg" className="w-full justify-between rounded-none bg-white text-black hover:bg-[color:var(--color-paper-2)] px-6 py-6 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors shadow-none">
                        <Link href={section.hasPanel && section.panel ? section.panel.ctaHref : section.href ?? "/"}>
                          {section.hasPanel && section.panel ? section.panel.ctaLabel : "Acessar Plataforma"}
                          <ArrowUpRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="snap-center shrink-0 w-[75vw] max-w-[280px] h-full max-h-[600px] min-h-[450px] relative flex flex-col justify-end p-6 border border-white/10 bg-black/40">
                <p className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.22em] text-white/60 mb-6">
                  Navegação Global
                </p>
                <div className="flex flex-col gap-px bg-white/10 border border-white/10">
                  {NAV_SUPPORT_LINKS.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center justify-between bg-black px-5 py-6 text-sm font-bold text-white hover:bg-white hover:text-black transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="size-4 text-white/60 group-hover:text-black transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-6 py-6 lg:px-12">
            <div className="mx-auto flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="hidden lg:flex items-center gap-8">
                {NAV_SUPPORT_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.2em] text-white hover:text-[color:var(--color-paper)] transition-colors underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Button asChild size="lg" className="w-full justify-between rounded-none border-2 border-white bg-white text-black hover:bg-[color:var(--color-paper-2)] lg:w-auto px-8 font-mono text-xs uppercase tracking-[0.2em] font-bold">
                  <Link href="/login">
                    Acesso por persona
                    <ArrowRight className="size-4 ml-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full justify-between rounded-none border-2 border-transparent bg-transparent text-white hover:bg-white/10 lg:w-auto px-8 font-mono text-xs uppercase tracking-[0.2em] font-bold shadow-none">
                  <Link href="/quem-somos/manifesto">
                    Ler manifesto
                    <ArrowUpRight className="size-4 ml-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
