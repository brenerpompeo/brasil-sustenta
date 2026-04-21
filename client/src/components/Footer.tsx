import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

const NAV_PERSONAS = [
  { label: "Para empresas", href: "/para-empresas" },
  { label: "Para jovens", href: "/para-jovens" },
  { label: "Para universidades", href: "/para-universidades" },
  { label: "Para prefeituras", href: "/para-prefeituras" },
];

const NAV_REDE = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Manifesto", href: "/quem-somos/manifesto" },
  { label: "Impacto", href: "/quem-somos/impacto" },
  { label: "HUBs ativos", href: "/quem-somos/hubs" },
  { label: "Stakeholders", href: "/quem-somos/stakeholders" },
];

const NAV_CONTEUDO = [
  { label: "Notícias", href: "/blog" },
  { label: "Eventos", href: "/eventos" },
  { label: "Artigos", href: "/artigos" },
  { label: "Relatórios", href: "/relatorios" },
  { label: "Biblioteca", href: "/biblioteca" },
];

const NAV_SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/brasilsustenta", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/brasilsustenta", icon: Linkedin },
  { label: "Contato", href: "mailto:contato@brasilsustenta.org", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="surface-ink relative overflow-hidden">
      <div className="container-editorial relative section-y">
        {/* CTA banner */}
        <div className="grid gap-8 border-b border-white/12 pb-12 md:grid-cols-[1.4fr_auto] md:items-end md:gap-16 md:pb-16">
          <div>
            <p className="text-eyebrow text-white/50">Próximo passo</p>
            <h2 className="text-display mt-4 max-w-3xl text-white">
              Tem um desafio ESG?
              <span className="block text-[color:var(--color-leaf-bright)]">
                Vira squad em 6 semanas.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link
              href="/auth/empresa"
              className="btn-base btn-leaf min-h-13 text-base"
            >
              Publicar desafio
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/auth/jovem"
              className="btn-base text-base min-h-13 border border-white/20 bg-white/5 text-white hover:bg-white hover:text-[color:var(--color-ink)]"
            >
              Entrar como talento
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Nav grid */}
        <div className="grid gap-12 pt-12 md:grid-cols-2 md:pt-16 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="inline-grid size-10 place-items-center rounded-md bg-white text-[color:var(--color-ink)]">
                <span className="font-display text-base font-black leading-none">
                  BS
                </span>
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Brasil Sustenta
              </span>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/65">
              Squads ESG universitários com matching por IA, presença
              territorial e entregas mensuráveis. Operamos por HUBs locais —
              cidade como infraestrutura de impacto.
            </p>

            <div className="mt-7 flex items-center gap-2.5">
              {NAV_SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-grid size-10 place-items-center rounded-full border border-white/16 text-white/72 transition hover:bg-white hover:text-[color:var(--color-ink)]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Personas" items={NAV_PERSONAS} />
          <FooterColumn title="Rede" items={NAV_REDE} />
          <FooterColumn title="Conteúdo" items={NAV_CONTEUDO} />
        </div>

        {/* bottom rule */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-8 text-xs text-white/52 md:flex-row md:items-center md:justify-between">
          <p className="font-mono uppercase tracking-[0.22em]">
            © {new Date().getFullYear()} Brasil Sustenta · Todos os direitos reservados
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/quem-somos/parceiros" className="hover:text-white">
              Parceiros
            </Link>
            <Link href="/quem-somos/manifesto" className="hover:text-white">
              Princípios
            </Link>
            <a href="mailto:contato@brasilsustenta.org" className="hover:text-white">
              contato@brasilsustenta.org
            </a>
          </div>
        </div>
      </div>

      {/* mega type */}
      <div className="border-t border-white/8 bg-[color:var(--color-ink-2)] py-8">
        <div className="container-editorial">
          <p className="font-display text-[clamp(3rem,15vw,16rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/6">
            BRASIL SUSTENTA
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-eyebrow text-white/50">{title}</p>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-2 text-sm text-white/72 transition hover:text-white"
            >
              {item.label}
              <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
