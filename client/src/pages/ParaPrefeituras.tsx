import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  FileBadge2,
  Landmark,
  ScrollText,
  Users,
} from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const programPillars = [
  {
    icon: Users,
    title: "Juventude engajada",
    body: "Talentos universitários mapeados por ODS na sua cidade. Modelo em construção.",
  },
  {
    icon: Landmark,
    title: "HUB ativo no município",
    body: "Cidade vira nó territorial com universidades e empresas parceiras.",
  },
  {
    icon: FileBadge2,
    title: "Relatório de impacto",
    body: "Documento público para câmara, sociedade civil e prestação de contas.",
  },
];

const programDeliverables = [
  "HUB Local ativo com Líder Embaixador da prefeitura",
  "4 eventos anuais de mobilização ESG e ODS",
  "Rede de universidades signatárias do município",
  "Empresas locais como parceiras de squad",
  "Dashboard público de impacto por ODS",
  "Relatório institucional anual com Agenda 2030",
];

export default function ParaPrefeituras() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Para Prefeituras — Programa Municipal ODS Jovem | Brasil Sustenta"
        description="Programa de engajamento de juventude municipal com Agenda 2030, HUB ativo e relatório público de impacto."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="Para prefeituras · B2G"
          variant="paper"
          title={
            <>
              Coloque sua cidade no mapa das{" "}
              <span className="italic text-[color:var(--color-atlantic)]">
                cidades ODS
              </span>{" "}
              2030.
            </>
          }
          lede="Programa Municipal ODS Jovem é um contrato concreto de engajamento de juventude universitária local — com HUB ativo, eventos anuais e relatório público de impacto alinhado à Agenda 2030. Formato em construção a partir de Campinas."
          actions={
            <>
              <Button asChild size="xl" variant="atlantic">
                <Link href="/auth/prefeitura">
                  Agendar reunião institucional
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/quem-somos/hubs">Ver HUBs ativos</Link>
              </Button>
            </>
          }
          side={<PrefeituraSidePanel />}
        />

        {/* Pilares ================ */}
        <section className="container-editorial section-y border-t border-[color:var(--color-border)]">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
            <div className="md:col-span-7">
              <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-atlantic)]">
                Três pilares
              </span>
              <h2 className="text-headline mt-5 max-w-[16ch]">
                ODS como operação municipal.
              </h2>
            </div>
            <p className="text-body md:col-span-5">
              Não é evento isolado. É infraestrutura permanente para
              acompanhamento da Agenda 2030 com juventude, universidades e
              empresas locais.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-3">
            {programPillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-7">
                <Icon
                  className="size-7 text-[color:var(--color-atlantic)]"
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

        {/* Entregáveis ============ */}
        <section className="surface-atlantic section-y border-y border-white/10">
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <span className="text-eyebrow text-white/55">
                  Entregáveis do contrato
                </span>
                <h2 className="text-headline mt-5 text-white">
                  O que o município recebe.
                </h2>
                <p className="text-body mt-7 text-white/72">
                  Cada entrega tem prazo, evidência e indicador. Programa
                  desenhado para auditoria pública.
                </p>
                <Badge variant="outline" className="mt-7 border-white/30 text-white">
                  Contrato anual
                </Badge>
              </div>
              <ul className="grid gap-3 lg:col-span-7">
                {programDeliverables.map(d => (
                  <li
                    key={d}
                    className="flex items-start gap-4 border-b border-white/12 pb-4 last:border-b-0"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[color:var(--color-sun)]" />
                    <p className="text-base leading-relaxed text-white/85">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Linguagem institucional == */}
        <section className="container-editorial section-y">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-eyebrow-bright">Agenda 2030 · ODS</span>
              <h2 className="text-headline mt-5 max-w-[14ch]">
                Linguagem de política pública.
              </h2>
              <p className="text-body mt-7 max-w-md">
                O Programa Municipal ODS Jovem dialoga com Plano Diretor,
                Agenda 2030 e estratégias setoriais — sem importar jargão de
                startup.
              </p>

              <ul className="mt-8 grid gap-3 text-sm">
                {[
                  "Alinhamento com Plano Diretor e LDO",
                  "Indicadores ODS por secretaria",
                  "Prestação de contas em sessão pública",
                  "Relatório anual com Agenda 2030",
                ].map(p => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 border-b border-[color:var(--color-border)] pb-3 last:border-b-0"
                  >
                    <ScrollText className="mt-0.5 size-4 shrink-0 text-[color:var(--color-atlantic)]" />
                    <span className="leading-relaxed text-[color:var(--color-ink-3)]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <PrefeituraDashboardMockup />
            </div>
          </div>
        </section>

        {/* CTA ==================== */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-ink rounded-3xl p-10 md:p-14 lg:p-16">
            <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <div className="md:col-span-7">
                <span className="text-eyebrow text-white/55">
                  Próximo passo
                </span>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
                  Reunião institucional em até 5 dias.
                </h2>
              </div>
              <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
                <Link
                  href="/auth/prefeitura"
                  className="btn-base min-h-13 w-full justify-between bg-[color:var(--color-atlantic)] text-white hover:bg-[color:var(--color-atlantic-deep)]"
                >
                  Agendar reunião
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/quem-somos/impacto"
                  className="btn-base min-h-13 w-full justify-between border border-white/30 bg-white/5 text-white hover:bg-white hover:text-[color:var(--color-ink)]"
                >
                  Ver modelo do programa
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

function PrefeituraSidePanel() {
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-7 md:p-8">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow">Programa Municipal ODS</span>
        <Landmark className="size-4 text-[color:var(--color-atlantic)]" />
      </div>
      <p className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
        R$ 80k–200k <span className="text-base text-[color:var(--color-ink-4)]">/ ano</span>
      </p>
      <ul className="mt-7 space-y-3 border-t border-[color:var(--color-border)] pt-7 text-sm">
        {[
          "HUB Local com embaixador",
          "Universidades parceiras na cidade",
          "Empresas locais como buyers",
          "Talentos mapeados por ODS",
          "4 eventos / ano",
          "Relatório anual público",
        ].map(item => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[color:var(--color-atlantic)]" />
            <span className="leading-relaxed text-[color:var(--color-ink-3)]">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex items-center gap-2 rounded-xl bg-[color:var(--color-atlantic-soft)] p-4 text-[color:var(--color-atlantic-deep)]">
        <BarChart3 className="size-4" />
        <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
          Compatível com Agenda 2030
        </span>
      </div>
    </div>
  );
}

function PrefeituraDashboardMockup() {
  const odsImpact = [
    { ods: 4, label: "Educação", value: 85 },
    { ods: 8, label: "Trabalho decente", value: 72 },
    { ods: 11, label: "Cidades sustentáveis", value: 91 },
    { ods: 13, label: "Ação climática", value: 64 },
  ];
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-7 md:p-8">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow">Painel municipal · 2026</span>
        <BarChart3 className="size-4 text-[color:var(--color-ink-4)]" />
      </div>
      <p className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
        Indicadores ODS
      </p>

      <ul className="mt-7 space-y-5">
        {odsImpact.map(o => (
          <li key={o.ods}>
            <div className="flex items-baseline justify-between">
              <span className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)]">
                <span className="inline-grid size-7 place-items-center rounded-full bg-[color:var(--color-atlantic-soft)] text-[color:var(--color-atlantic-deep)] text-[0.6875rem]">
                  {o.ods}
                </span>
                {o.label}
              </span>
              <span className="font-mono text-sm font-semibold text-[color:var(--color-ink)]">
                {o.value}
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[color:var(--color-paper-3)]">
              <div
                className="h-full rounded-full bg-[color:var(--color-atlantic)]"
                style={{ width: `${o.value}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
