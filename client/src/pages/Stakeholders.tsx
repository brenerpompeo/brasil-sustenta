import {
  Building2,
  GraduationCap,
  Handshake,
  Landmark,
  School,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const cards = [
  {
    icon: Building2,
    role: "Empresa · B2B",
    body: "Compradora de squad. Resolve desafio ESG com brief, sprint e relatório auditável.",
    persona: "leaf" as const,
  },
  {
    icon: Users2,
    role: "Jovem talento",
    body: "Operadora de impacto. Match explicado, projeto real, portfolio público.",
    persona: "sun" as const,
  },
  {
    icon: GraduationCap,
    role: "Universidade · IES",
    body: "Capital intelectual. Campus dentro do HUB local com horas e relatório MEC.",
    persona: "clay" as const,
  },
  {
    icon: Landmark,
    role: "Prefeitura · B2G",
    body: "Articuladora territorial. Programa Municipal ODS Jovem com Agenda 2030.",
    persona: "atlantic" as const,
  },
  {
    icon: Handshake,
    role: "Embaixador de HUB",
    body: "Líder local. Coordena cidade, eventos e relacionamento com prefeitura.",
    persona: "default" as const,
  },
  {
    icon: ShieldCheck,
    role: "Apoiadores institucionais",
    body: "Câmaras, secretarias, fundações que validam o protocolo brasileiro.",
    persona: "default" as const,
  },
];

const surfaces: Record<string, string> = {
  leaf: "surface-leaf",
  sun: "surface-sun",
  clay: "surface-clay",
  atlantic: "surface-atlantic",
  default: "surface-card",
};

export default function Stakeholders() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Stakeholders — Brasil Sustenta"
        description="Quem entra na rede e quais valores cada parte recebe da operação ESG-territorial."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="Atores da rede"
          variant="paper"
          title={
            <>
              Seis papéis,{" "}
              <span className="italic text-[color:var(--color-leaf)]">
                uma operação
              </span>
              .
            </>
          }
          lede="A rede só funciona quando cada parte recebe valor próprio. Empresa entrega resultado. Jovem entrega portfolio. Universidade entrega extensão. Prefeitura entrega relatório."
          actions={
            <Button asChild size="xl" variant="default">
              <Link href="/quem-somos">
                Ver DNA da rede
              </Link>
            </Button>
          }
        />

        <section className="container-editorial section-y border-t border-[color:var(--color-border)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map(c => {
              const Icon = c.icon;
              const dark = c.persona === "leaf" || c.persona === "atlantic";
              return (
                <article
                  key={c.role}
                  className={`${surfaces[c.persona]} flex h-full min-h-[16rem] flex-col rounded-2xl p-7`}
                >
                  <Icon className="size-6 opacity-80" strokeWidth={1.5} />
                  <h3 className="mt-7 font-display text-2xl font-bold leading-tight tracking-[-0.025em]">
                    {c.role}
                  </h3>
                  <p
                    className={
                      dark
                        ? "mt-3 text-sm leading-relaxed text-white/72"
                        : "mt-3 text-sm leading-relaxed text-[color:var(--color-ink-3)]"
                    }
                  >
                    {c.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
