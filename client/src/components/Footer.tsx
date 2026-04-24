import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import { memo } from "react";
import {
  NAV_FOOTER_GROUPS,
  NAV_SUPPORT_LINKS,
} from "@/constants/navigation-data";

const NAV_SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/brasilsustenta", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/brasilsustenta", icon: Linkedin },
  { label: "Contato", href: "mailto:contato@brasilsustenta.org", icon: Mail },
];

function Footer() {
  return (
    <footer style={{ viewTransitionName: "site-footer" }} className="surface-ink relative overflow-hidden">
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
        <div className="grid gap-12 pt-12 md:grid-cols-2 md:pt-16 xl:grid-cols-[1.4fr_repeat(4,1fr)]">
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
                  rel="noreferrer"
                  target="_blank"
                  className="inline-grid size-10 place-items-center rounded-full border border-white/16 text-white/72 transition-colors hover:bg-white hover:text-[color:var(--color-ink)] focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {NAV_FOOTER_GROUPS.map((group) => (
            <FooterColumn key={group.id} title={group.title} items={group.items} />
          ))}
        </div>

        {/* bottom rule */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-8 text-xs text-white/52 md:flex-row md:items-center md:justify-between">
          <p className="font-mono uppercase tracking-[0.22em]">
            © {new Date().getFullYear()} Brasil Sustenta · Todos os direitos reservados
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {NAV_SUPPORT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
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

const FooterColumn = memo(({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) => {
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
});

FooterColumn.displayName = "FooterColumn";

export default memo(Footer);
