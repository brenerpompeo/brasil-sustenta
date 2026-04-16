import React from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Dna,
  FileText,
  BarChart2,
  Network,
  MapPin,
  Handshake,
  Rocket,
  Search,
  BadgeCheck,
  GraduationCap,
  BookOpen,
  Users,
  Briefcase,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Building2,
  BrainCircuit,
  Workflow,
  ScanLine,
  LineChart,
  Calendar,
  Newspaper,
  LogIn,
  UserPlus,
} from "lucide-react";

// ── Dados dos menus ──────────────────────────────────────────────────────────

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
};

const quemSomos: NavItem[] = [
  {
    title: "DNA da Plataforma",
    href: "/quem-somos/dna",
    icon: Dna,
    description: "Nossa origem, missão e valores fundadores",
  },
  {
    title: "Manifesto",
    href: "/manifesto",
    icon: FileText,
    description: "O que acreditamos e por que isso importa",
  },
  {
    title: "Impacto",
    href: "/quem-somos/impacto",
    icon: BarChart2,
    description: "Projetos, ODS mapeados e resultados reais",
  },
  {
    title: "Stakeholders",
    href: "/quem-somos/stakeholders",
    icon: Network,
    description: "Os quatro atores da Quádrupla Hélice",
  },
  {
    title: "HUBs Regionais",
    href: "/quem-somos/hubs",
    icon: MapPin,
    description: "Presença e operação em todo o Brasil",
  },
  {
    title: "Apoiadores e Parceiros",
    href: "/quem-somos/parceiros",
    icon: Handshake,
    description: "Quem acredita e amplifica a missão",
  },
];

const paraJovens: NavItem[] = [
  {
    title: "Como Funciona",
    href: "/para-jovens/como-funciona",
    icon: Rocket,
    description: "Do portfólio ao primeiro squad em dias",
  },
  {
    title: "Oportunidades Abertas",
    href: "/para-jovens/oportunidades",
    icon: Search,
    description: "Desafios ESG reais disponíveis agora",
  },
  {
    title: "Perfil Público ESG",
    href: "/para-jovens/perfil",
    icon: BadgeCheck,
    description: 'O seu "LinkedIn Verde" verificado por IA',
  },
  {
    title: "Extensão Universitária",
    href: "/para-jovens/extensao",
    icon: GraduationCap,
    description: "Horas complementares + certificação real",
  },
  {
    title: "Comunidade",
    href: "/para-jovens/comunidade",
    icon: Users,
    description: "Rede de talentos criativos e de impacto",
  },
  {
    title: "Guia dos 17 ODS",
    href: "/para-jovens/ods",
    icon: BookOpen,
    description: "A linguagem que conecta talento e empresa",
  },
];

const paraOrganizacoes: NavItem[] = [
  {
    title: "Como Contratar um Squad",
    href: "/para-empresas/como-funciona",
    icon: Briefcase,
    description: "Brief → Matching IA → Kickoff em 24h",
  },
  {
    title: "Publicar Desafio ESG",
    href: "/para-empresas/publicar",
    icon: Lightbulb,
    description: "Transforme sua meta ESG em sprint real",
  },
  {
    title: "Relatório de Impacto",
    href: "/para-empresas/relatorio",
    icon: ShieldCheck,
    description: "Evidências auditáveis para RH e ESG",
  },
  {
    title: "Squad Box — Planos",
    href: "/para-empresas/planos",
    icon: TrendingUp,
    description: "R$2.500 a R$10.000 por projeto entregue",
  },
  {
    title: "Casos de Sucesso",
    href: "/para-empresas/casos",
    icon: Building2,
    description: "Empresas que já inovaram com squads",
  },
  {
    title: "Signatárias do Pacto Global",
    href: "/para-empresas/pacto-global",
    icon: Handshake,
    description: "Canal exclusivo para a rede ONU Brasil",
  },
];

const paraIES: NavItem[] = [
  {
    title: "Plugin de Extensão",
    href: "/para-universidades/como-funciona",
    icon: Rocket,
    description: "Resolva a Resolução MEC 7/2018 sem esforço",
  },
  {
    title: "Extensão e ODS na Prática",
    href: "/para-universidades/extensao",
    icon: GraduationCap,
    description: "Conecte currículo ao mundo corporativo real",
  },
  {
    title: "Hub IES",
    href: "/para-universidades/hub",
    icon: BarChart2,
    description: "Dashboard da sua universidade e alunos ativos",
  },
  {
    title: "Parcerias Institucionais",
    href: "/para-universidades/parceria",
    icon: Handshake,
    description: "Formalize convênio e aumente seu ranking",
  },
  {
    title: "Gestão de Talentos",
    href: "/para-universidades/talentos",
    icon: Users,
    description: "Acompanhe seus alunos em projetos reais",
  },
];

const solucao: NavItem[] = [
  {
    title: "Motor de Matching IA",
    href: "/solucao/matching",
    icon: BrainCircuit,
    description: "Cosine similarity sobre vetores ODS em tempo real",
  },
  {
    title: "Squad as a Service",
    href: "/solucao/squads",
    icon: Workflow,
    description: "Times multidisciplinares prontos para operar",
  },
  {
    title: "ODS Score Engine",
    href: "/solucao/ods-score",
    icon: ScanLine,
    description: "IA que lê portfólios e converte em métricas ODS",
  },
  {
    title: "Entrega Auditável",
    href: "/solucao/entrega",
    icon: ShieldCheck,
    description: "Log de sprint, checkpoint e relatório executivo",
  },
  {
    title: "Analytics de Impacto",
    href: "/solucao/analytics",
    icon: LineChart,
    description: "GRI, TCFD e evidências para ESG reporting",
  },
];

const cadastroPortais = [
  { label: "Sou Jovem Talento", href: "/cadastro/jovem", icon: GraduationCap },
  { label: "Sou Organização", href: "/cadastro/organizacao", icon: Building2 },
  { label: "Sou IES", href: "/cadastro/ies", icon: BookOpen },
];

const acessarPortais = [
  { label: "Portal do Talento", href: "/entrar/jovem", icon: GraduationCap },
  {
    label: "Portal da Organização",
    href: "/entrar/organizacao",
    icon: Building2,
  },
  { label: "Portal da IES", href: "/entrar/ies", icon: BookOpen },
];

// ── Hook de scroll ───────────────────────────────────────────────────────────

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);
  React.useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  React.useEffect(() => {
    onScroll();
  }, [onScroll]);
  return scrolled;
}

// ── DropdownItem ─────────────────────────────────────────────────────────────

function DropdownItem({ title, href, icon: Icon, description }: NavItem) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="group flex cursor-pointer items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-[--leaf]/5"
      >
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-black/8 bg-white text-[--ink]/40 transition-all duration-200 group-hover:border-[--leaf]/25 group-hover:text-[--leaf]">
          <Icon className="h-[15px] w-[15px]" />
        </div>
        <div className="min-w-0 pt-0.5">
          <div className="text-[12.5px] font-semibold leading-none text-[--ink]/75 transition-colors group-hover:text-[--ink]">
            {title}
          </div>
          <div className="mt-1 text-[11px] leading-relaxed text-[--ink]/30">
            {description}
          </div>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

function DropdownGrid({ items }: { items: NavItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-0.5" style={{ width: 468 }}>
      {items.map(item => (
        <li key={item.href}>
          <DropdownItem {...item} />
        </li>
      ))}
    </ul>
  );
}

// ── CTA com dropdown próprio ─────────────────────────────────────────────────

type Portal = { label: string; href: string; icon: React.ElementType };

function CtaDropdown({
  label,
  portais,
  variant,
}: {
  label: string;
  portais: Portal[];
  variant: "primary" | "ghost";
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-4 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200",
          variant === "primary"
            ? "bg-[--leaf] text-[--foreground] shadow-[0_18px_32px_rgba(0,255,133,0.18)] hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(0,255,133,0.24)]"
            : "border border-black/10 bg-white text-[--ink]/60 hover:border-black/18 hover:text-[--ink]"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-black/8 bg-white/95 shadow-[0_20px_50px_rgba(5,5,5,0.08)] backdrop-blur-xl">
          {portais.map(({ label: l, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex cursor-pointer items-center gap-3 px-4 py-3 text-[13px] font-medium text-[--ink]/60 transition-all hover:bg-[--leaf]/5 hover:text-[--ink]"
            >
              <Icon className="h-4 w-4 text-[--leaf]/50" />
              {l}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Trigger style compartilhado ───────────────────────────────────────────────

const triggerCls =
  "h-8 cursor-pointer rounded-full bg-transparent px-3 text-[12px] font-medium text-[--ink]/60 hover:bg-black/[0.035] hover:text-[--ink] data-[state=open]:bg-black/[0.035] data-[state=open]:text-[--ink] transition-colors duration-200";

const contentWrap =
  "rounded-2xl border border-black/8 bg-white/96 p-2 shadow-[0_20px_50px_rgba(5,5,5,0.08)] backdrop-blur-xl";

// ── Menu Mobile ───────────────────────────────────────────────────────────────

type Section = { label: string; items: NavItem[] };

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || typeof window === "undefined") return null;

  const sections: Section[] = [
    { label: "Quem Somos", items: quemSomos },
    { label: "Para Jovens", items: paraJovens },
    { label: "Para Organizações", items: paraOrganizacoes },
    { label: "Para IES", items: paraIES },
    { label: "Solução", items: solucao },
  ];

  const extras = [
    { label: "Eventos", href: "/eventos", icon: Calendar },
    { label: "Notícias", href: "/noticias", icon: Newspaper },
  ];

  return createPortal(
    <div className="fixed inset-0 top-[calc(3.5rem+1.25rem)] z-40 overflow-y-auto bg-[--paper]/98 backdrop-blur-xl">
      <div className="flex flex-col gap-5 px-5 py-6 pb-24">
        {sections.map(({ label, items }) => (
          <div key={label}>
            <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-[--ink]/30">
              {label}
            </p>
            <div className="grid grid-cols-1 gap-0.5">
              {items.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[--ink]/60 transition-all hover:bg-[--leaf]/5 hover:text-[--ink]"
                  >
                    <Icon className="h-4 w-4 flex-shrink-0 text-[--leaf]/40" />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-[--ink]/30">
            Mais
          </p>
          {extras.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[--ink]/60 transition-all hover:bg-[--leaf]/5 hover:text-[--ink]"
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-[--leaf]/40" />
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-black/8 pt-5">
          <p className="mb-1 text-[10px] font-black uppercase tracking-[0.24em] text-[--ink]/30">
            Entrar na plataforma
          </p>
          {acessarPortais.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/8 px-4 py-3 text-sm font-medium text-[--ink]/60 transition-all hover:border-[--leaf]/20 hover:bg-[--leaf]/5 hover:text-[--ink]"
            >
              <Icon className="h-4 w-4 text-[--leaf]/50" />
              {label}
            </Link>
          ))}
          <Link
            href="/cadastro"
            onClick={onClose}
            className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[--leaf] px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-[--foreground] shadow-[0_18px_36px_rgba(0,255,133,0.16)]"
          >
            <UserPlus className="h-4 w-4" />
            Cadastrar gratuitamente
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Header principal ──────────────────────────────────────────────────────────

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const scrolled = useScroll(12);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-300",
          scrolled ? "top-0 px-0" : "top-4 px-4"
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-2 transition-all duration-300",
            scrolled
              ? "rounded-none border-b border-black/8 bg-[--paper]/92 px-6 backdrop-blur-xl"
              : "rounded-[1.4rem] border border-black/8 bg-white/84 px-4 shadow-[0_18px_48px_rgba(5,5,5,0.06)] backdrop-blur-xl sm:px-5"
          )}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="Brasil Sustenta — voltar ao início"
            className="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-transparent px-1.5 py-1 transition-all duration-200 hover:border-black/8 hover:bg-black/[0.03]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/8 bg-[--ink] text-[9px] font-black tracking-widest text-[--paper] shadow-[0_14px_28px_rgba(5,5,5,0.08)]">
              BS
            </div>
            <span className="font-display text-[15px] font-black leading-none tracking-tight text-[--ink]">
              Brasil{" "}
              <span className="font-light italic text-[--leaf-1]">
                Sustenta
              </span>
            </span>
          </Link>

          {/* ── Nav desktop ── */}
          <NavigationMenu className="hidden xl:flex">
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Quem Somos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={contentWrap}>
                    <DropdownGrid items={quemSomos} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Para Jovens
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={contentWrap}>
                    <DropdownGrid items={paraJovens} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Para Organizações
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={contentWrap}>
                    <DropdownGrid items={paraOrganizacoes} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Para IES
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={contentWrap}>
                    <DropdownGrid items={paraIES} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={triggerCls}>
                  Solução
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={contentWrap}>
                    <DropdownGrid items={solucao} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/eventos"
                    className="inline-flex h-8 cursor-pointer items-center rounded-full px-3 text-[12px] font-medium text-[--ink]/55 transition-colors hover:bg-black/[0.035] hover:text-[--ink]"
                  >
                    Eventos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/noticias"
                    className="inline-flex h-8 cursor-pointer items-center rounded-full px-3 text-[12px] font-medium text-[--ink]/55 transition-colors hover:bg-black/[0.035] hover:text-[--ink]"
                  >
                    Notícias
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* ── CTAs desktop ── */}
          <div className="hidden items-center gap-2 xl:flex">
            <CtaDropdown
              label="Cadastre-se"
              portais={cadastroPortais}
              variant="ghost"
            />
            <CtaDropdown
              label="Acessar"
              portais={acessarPortais}
              variant="primary"
            />
          </div>

          {/* ── Hamburger mobile ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu principal"
            aria-expanded={mobileOpen}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-[--ink]/60 transition-all hover:border-black/18 hover:text-[--ink] xl:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;
