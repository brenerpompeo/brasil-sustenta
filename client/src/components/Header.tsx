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
      "inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-colors",
      location === href
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-background text-foreground/75 hover:border-primary/30 hover:bg-secondary hover:text-foreground"
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 font-body backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Ir para a home do Brasil Sustenta"
          className="group flex min-w-0 items-center gap-3 rounded-full border border-transparent px-2 py-1 transition-colors hover:border-border hover:bg-secondary/60"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-[11px] font-black tracking-[0.28em] text-background">
            BS
          </div>
          <div className="min-w-0">
            <div className="truncate font-display text-xl font-black leading-none tracking-tight text-foreground">
              Brasil <span className="text-primary italic font-light">Sustenta</span>
            </div>
            <div className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Plataforma de inovacao ESG
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navegacao principal">
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
              "rounded-full px-5 text-[11px] font-black uppercase tracking-[0.2em]"
            )}
          >
            Entrar
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full border-border px-4 text-[11px] font-black uppercase tracking-[0.18em]"
            )}
          >
            Entrar
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              aria-label="Abrir menu principal"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-full border-border"
              )}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] border-l border-border bg-background p-0">
              <SheetHeader className="border-b border-border px-6 py-5 text-left">
                <SheetTitle className="font-display text-2xl font-black tracking-tight">
                  Brasil Sustenta
                </SheetTitle>
                <SheetDescription className="text-sm leading-6 text-muted-foreground">
                  Navegacao principal com foco em legibilidade e acesso rapido aos portais.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-3 px-6 py-6">
                {portals.map(portal => (
                  <Link
                    key={portal.href}
                    href={portal.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-sm font-black uppercase tracking-[0.18em] transition-colors",
                      location === portal.href
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-secondary"
                    )}
                  >
                    {portal.name}
                  </Link>
                ))}

                <Link
                  href="/comunidade"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl border border-border bg-card px-4 py-4 text-sm font-black uppercase tracking-[0.18em] text-foreground hover:border-primary/30 hover:bg-secondary"
                >
                  Comunidade
                </Link>

                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-2 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em]"
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
