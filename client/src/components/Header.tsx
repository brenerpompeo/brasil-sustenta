import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const portals = [
  { name: "Manifesto", href: "/manifesto" },
  { name: "Para Universitarios", href: "/para-jovens" },
  { name: "Para Empresas", href: "/para-empresas" },
  { name: "Para IES", href: "/para-universidades" },
];

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = (href: string) =>
    cn(
      "inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-200",
      location === href
        ? "border-[--leaf]/60 bg-[--leaf]/10 text-[--leaf]"
        : "border-white/[0.08] bg-white/[0.03] text-[--ink]/60 hover:border-[--leaf]/30 hover:bg-[--leaf]/5 hover:text-[--ink]"
    );

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 font-body">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[--paper]/80 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          aria-label="Ir para a home do Brasil Sustenta"
          className="group flex min-w-0 items-center gap-3 rounded-full border border-transparent px-2 py-1 transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.04]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[--leaf] text-[10px] font-black tracking-[0.28em] text-[--paper] shadow-[0_0_16px_rgba(0,255,133,0.4)]">
            BS
          </div>
          <div className="min-w-0">
            <div className="truncate font-display text-lg font-black leading-none tracking-tight text-[--ink]">
              Brasil <span className="text-[--leaf] italic font-light">Sustenta</span>
            </div>
            <div className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-[--ink]/40">
              Plataforma ESG
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Navegacao principal">
          {portals.map(portal => (
            <Link key={portal.href} href={portal.href} className={navLinkClass(portal.href)}>
              {portal.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-9 rounded-full bg-[--leaf] px-5 text-[11px] font-black uppercase tracking-[0.2em] text-[--paper] shadow-[0_0_20px_rgba(0,255,133,0.3)] hover:shadow-[0_0_32px_rgba(0,255,133,0.5)] transition-all duration-200"
            )}
          >
            Entrar
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full border-white/[0.12] bg-transparent px-4 text-[11px] font-black uppercase tracking-[0.18em] text-[--ink]/70 hover:border-[--leaf]/30 hover:text-[--ink]"
            )}
          >
            Entrar
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              aria-label="Abrir menu principal"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-full border-white/[0.12] bg-transparent text-[--ink]/70 hover:border-[--leaf]/30 hover:text-[--ink]"
              )}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] border-l border-white/[0.08] bg-[--paper] p-0">
              <SheetHeader className="border-b border-white/[0.08] px-6 py-5 text-left">
                <SheetTitle className="font-display text-2xl font-black tracking-tight text-[--ink]">
                  Brasil Sustenta
                </SheetTitle>
                <SheetDescription className="text-sm leading-6 text-[--ink]/50">
                  Navegacao principal — portais e acesso rapido.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-3 px-6 py-6">
                {portals.map(portal => (
                  <Link
                    key={portal.href}
                    href={portal.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-sm font-black uppercase tracking-[0.18em] transition-all duration-200",
                      location === portal.href
                        ? "border-[--leaf]/40 bg-[--leaf]/10 text-[--leaf]"
                        : "border-white/[0.08] bg-white/[0.03] text-[--ink]/70 hover:border-[--leaf]/20 hover:bg-[--leaf]/5 hover:text-[--ink]"
                    )}
                  >
                    {portal.name}
                  </Link>
                ))}

                <Link
                  href="/comunidade"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-[--ink]/70 hover:border-[--leaf]/20 hover:bg-[--leaf]/5 hover:text-[--ink] transition-all duration-200"
                >
                  Comunidade
                </Link>

                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-2 rounded-2xl bg-[--leaf] text-[12px] font-black uppercase tracking-[0.2em] text-[--paper] shadow-[0_0_24px_rgba(0,255,133,0.3)]"
                  )}
                >
                  Escolher portal
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
