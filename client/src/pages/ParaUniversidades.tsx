import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  School,
} from "lucide-react";
import { SectionHeader } from "@/components/ds";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: GraduationCap,
    title: "Projetos locais",
    body: "Projetos reais com empresas locais — não simulações genéricas",
  },
  {
    icon: ClipboardCheck,
    title: "Horas registradas",
    body: "Horas de extensão registradas e relatório institucional por semestre",
  },
  {
    icon: BookOpen,
    title: "Relatório MEC",
    body: "Dados de empregabilidade e ODS dos alunos — material para o MEC",
  },
];

const offerings = [
  {
    title: "Campus dentro do HUB",
    body: "Universidade vira nó territorial. Líder Campus coordena alunos no HUB local.",
  },
  {
    title: "Projetos com NDA institucional",
    body: "Empresas trazem desafios reais, com confidencialidade garantida.",
  },
  {
    title: "Relatório semestral MEC",
    body: "Dados consolidados de horas, ODS e empregabilidade — pronto para auditoria.",
  },
  {
    title: "Visibilidade do campus",
    body: "Aparece no mapa territorial nacional como universidade ESG-ativa.",
  },
];

export default function ParaUniversidades() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Para Universidades — Extensão com entregável real | Brasil Sustenta"
        description="Campus dentro do HUB local. Horas registradas, projetos com empresas, dados para o MEC."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="Para universidades · IES"
          variant="paper"
          title={
            <>
              Extensão com{" "}
              <span className="italic text-[color:var(--color-clay)]">projetos reais.</span>{" "}
              Portfólio com empresas da cidade.
            </>
          }
          lede="Seu campus dentro do HUB Local. Alunos em squads com evidências para o MEC."
          actions={
            <>
              <Button asChild size="xl" variant="default">
                <Link href="/auth/ies">
                  Ativar campus
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/contato">Falar com coordenação</Link>
              </Button>
            </>
          }
          side={<UniversidadeSidePanel />}
        />

        {/* Benefícios ============= */}
        <section className="container-editorial section-y border-t border-[color:var(--color-border)]">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
            <SectionHeader
              eyebrow="Por que ativar"
              title="Extensão que vira evidência."
              showRule
              className="md:col-span-7"
            />
            <p className="text-body md:col-span-5">
              Seu campus passa a entregar projetos reais com empresas da
              cidade. Mais empregabilidade, mais ODS, mais dados.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-7">
                <Icon
                  className="size-7 text-[color:var(--color-clay)]"
                  strokeWidth={1.5}
                />
                <h3 className="mt-7 font-display text-2xl font-bold tracking-[-0.025em]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* O que entra ============= */}
        <section className="surface-paper-2 border-y border-[color:var(--color-border)] section-y">
          <div className="container-editorial">
            <div className="max-w-2xl">
              <SectionHeader
                eyebrow="O que entra"
                title="Quatro entregas no contrato de parceria."
                showRule
              />
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {offerings.map(o => (
                <article
                  key={o.title}
                  className="surface-card flex gap-5 rounded-2xl p-7"
                >
                  <div className="mt-1 inline-grid size-10 shrink-0 place-items-center rounded-full bg-[color:var(--color-clay-soft)] text-[color:var(--color-clay-deep)]">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em]">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                      {o.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Quem participa ========== */}
        <section className="container-editorial section-y">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Quem participa"
                title="Coordenação, líder, alunos."
                subtitle="A parceria entra com 3 papéis institucionais — coordenação acadêmica, Líder Campus e alunos engajados."
                tone="bright"
                showRule
              />

              <div className="mt-9 flex flex-wrap gap-2">
                <Badge variant="clay">Pró-reitoria · Extensão</Badge>
                <Badge variant="clay">Líder Campus</Badge>
                <Badge variant="clay">Alunos do squad</Badge>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="surface-ink rounded-3xl p-7 md:p-9">
                <span className="text-eyebrow text-white/55">
                  Convite institucional
                </span>
                <p className="mt-5 font-display text-2xl font-semibold leading-tight text-white">
                  "A universidade sai do papel de fornecedora de estagiários e
                  entra como parceira de operação ESG real na cidade."
                </p>
                <p className="mt-5 text-sm text-white/55">
                  — Carta-manifesto Brasil Sustenta para reitorias
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA ==================== */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-clay rounded-3xl p-10 md:p-14 lg:p-16">
            <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <div className="md:col-span-7">
                <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Próximo passo
                </span>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
                  Coloque seu campus no mapa.
                </h2>
              </div>
              <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
                <Link
                  href="/auth/ies"
                  className="btn-base min-h-13 w-full justify-between bg-white text-[color:var(--color-ink)] hover:bg-[color:var(--color-paper)]"
                >
                  Ativar campus
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/quem-somos/hubs"
                  className="btn-base min-h-13 w-full justify-between border border-white/30 bg-white/5 text-white hover:bg-white hover:text-[color:var(--color-clay-deep)]"
                >
                  Ver HUBs e campi
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function UniversidadeSidePanel() {
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-7 md:p-8">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow">University Partner</span>
        <School className="size-4 text-[color:var(--color-ink-4)]" />
      </div>
      <p className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
        R$ 5k–12k <span className="text-base text-[color:var(--color-ink-4)]">/ semestre</span>
      </p>
      <ul className="mt-7 space-y-3 border-t border-[color:var(--color-border)] pt-7 text-sm">
        {[
          "Campus dentro do HUB local",
          "Líder Campus formalizado",
          "Min. 1 squad ativo / semestre",
          "Relatório semestral MEC",
          "Acesso a base de empresas-buyer",
        ].map(item => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[color:var(--color-clay)]" />
            <span className="leading-relaxed text-[color:var(--color-ink-3)]">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex items-center gap-2 rounded-xl bg-[color:var(--color-clay-soft)] p-4 text-[color:var(--color-clay-deep)]">
        <Building className="size-4" />
        <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
          Primeiras universidades em diálogo · Campinas
        </span>
      </div>
    </div>
  );
}
