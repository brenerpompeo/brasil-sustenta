import { useEffect, useState, memo } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import {
  NAV,
  NAV_DRAWER_GROUPS,
  NAV_SUPPORT_LINKS,
  PORTAL_ACCESS,
} from "@/constants/navigation-data";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Header() {
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

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-paper)]/96 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "shadow-[0_10px_30px_rgba(10,10,10,0.08)]" : ""
        )}
      >
        <div className="flex min-h-[4.75rem] items-stretch">
          <button
            type="button"
            aria-controls="public-shell-drawer"
            aria-expanded={open}
            aria-label="Abrir navegação principal"
            className="flex w-[4.75rem] shrink-0 items-center justify-center border-r border-[color:var(--color-border)] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-paper-2)] focus-visible:bg-[color:var(--color-paper-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-leaf)] focus-visible:ring-inset"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>

          <Link
            href="/"
            className="flex flex-1 items-center border-r border-[color:var(--color-border)] px-4 sm:px-5 lg:min-w-[12rem] lg:flex-none lg:shrink-0 lg:px-6"
          >
            <span
              translate="no"
              className="font-display text-[1.55rem] font-black uppercase leading-[0.84] tracking-[-0.06em] text-[color:var(--color-ink)] sm:text-[1.75rem]"
            >
              Brasil
              <br />
              <span className="text-[color:var(--color-leaf)]">Sustenta</span>
            </span>
          </Link>

          <nav
            aria-label="Navegação primária"
            className="hidden min-w-0 flex-1 items-stretch lg:flex"
          >
            {NAV.map((item) => {
              const href = item.href ?? "/";
              const active = isActivePath(location, href);

              return (
                <Link
                  key={item.id}
                  href={href}
                  className={cn(
                    "flex min-w-0 flex-1 items-center justify-center border-r border-[color:var(--color-border)] px-4 font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-paper-2)] focus-visible:bg-[color:var(--color-paper-2)]",
                    active
                      ? "bg-[color:var(--color-leaf-soft)] text-[color:var(--color-leaf-deep)]"
                      : ""
                  )}
                >
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/login"
            className="hidden shrink-0 items-center justify-between gap-4 border-l border-[color:var(--color-border)] bg-[color:var(--color-leaf)] px-8 font-mono text-[0.75rem] font-black uppercase tracking-[0.26em] text-white transition-colors hover:bg-[color:var(--color-leaf-deep)] focus-visible:bg-[color:var(--color-leaf-deep)] lg:flex lg:min-w-[12rem]"
          >
            Acessar
            <ArrowRight className="size-4" aria-hidden="true" />
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
        <button
          type="button"
          aria-label="Fechar super menu"
          className={cn(
            "absolute inset-0 bg-[color:var(--color-ink)]/70 backdrop-blur-md transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        <aside
          id="public-shell-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navegação principal do Brasil Sustenta"
          className={cn(
            "absolute inset-0 flex flex-col bg-[color:var(--color-paper-2)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="flex h-[4.75rem] items-center justify-between border-b border-[color:var(--color-ink)] bg-white px-6 lg:px-12">
            <div>
              <p className="font-mono text-[0.625rem] font-black uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                Brasil Sustenta
              </p>
              <p className="font-display text-xl font-bold tracking-[-0.03em] text-[color:var(--color-ink)]">
                Navega&ccedil;&atilde;o Institucional
              </p>
            </div>

            <button
              type="button"
              aria-label="Fechar navegação principal"
              className="inline-flex size-11 items-center justify-center border-2 border-[color:var(--color-ink)] bg-white text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--color-leaf)]"
              onClick={() => setOpen(false)}
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain overflow-x-hidden bg-[color:var(--color-ink)] hidescrollbar">
            <section className="border-b border-white/10 px-6 py-8 md:px-12">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/45">
                    Navega&ccedil;&atilde;o Principal
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
                    Uma leitura r&aacute;pida da opera&ccedil;&atilde;o p&uacute;blica, das frentes institucionais e das portas de acesso por persona.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="w-full justify-between rounded-none border-2 border-[color:var(--color-leaf)] bg-[color:var(--color-leaf)] px-8 py-8 font-mono text-[0.75rem] font-black uppercase tracking-[0.24em] text-white shadow-none transition-colors hover:bg-[color:var(--color-leaf-deep)] md:w-auto"
                >
                  <Link href="/login">
                    Acessar Opera&ccedil;&otilde;es
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <nav
                aria-label="Rotas principais"
                className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/10 lg:grid-cols-2"
              >
                {NAV.map((item, index) => {
                  const href = item.href ?? "/";
                  const active = isActivePath(location, href);

                  return (
                    <Link
                      key={item.id}
                      href={href}
                      className={cn(
                        "group flex min-w-0 flex-col gap-2 bg-black/25 px-6 py-6 transition-colors hover:bg-white/6 focus-visible:bg-white/6 md:px-8",
                        active ? "bg-white/8" : ""
                      )}
                    >
                      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/40 transition-colors group-hover:text-[color:var(--color-leaf-bright)]">
                        BS_INFRA // {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 text-balance font-display text-[1.7rem] font-black lowercase leading-[0.9] tracking-[-0.03em] text-white md:text-[2rem]">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </section>

            <div className="grid gap-8 border-b border-white/10 px-6 py-8 md:grid-cols-2 md:px-12">
              {NAV_DRAWER_GROUPS.map((group) => (
                <section key={group.id} aria-labelledby={`drawer-group-${group.id}`}>
                  <p
                    id={`drawer-group-${group.id}`}
                    className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/45"
                  >
                    {group.title}
                  </p>
                  <ul className="mt-5 grid gap-3">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex min-w-0 flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-white/20 hover:bg-white/8"
                        >
                          <span className="text-sm font-semibold text-white">
                            {item.label}
                          </span>
                          {item.description ? (
                            <span className="text-sm leading-relaxed text-white/55">
                              {item.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <section className="px-6 py-8 md:px-12">
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white/45">
                Acessos Restritos
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {PORTAL_ACCESS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex min-w-0 flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[color:var(--color-leaf-bright)]">
                      {link.label}
                    </span>
                    <span className="text-sm leading-relaxed text-white/70">
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="border-t border-white/10 bg-black px-6 py-6 md:px-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/45">
                Documentos &amp; Governan&ccedil;a
              </p>
              <div className="flex flex-wrap gap-3">
                {NAV_SUPPORT_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/5 px-4 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/65 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default memo(Header);
