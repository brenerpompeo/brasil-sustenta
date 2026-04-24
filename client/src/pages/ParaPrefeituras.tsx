import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Landmark,
  ScrollText,
} from "lucide-react";
import { ProofStrip, SectionHeader } from "@/components/ds";
import { WaitlistCTA } from "@/components/LeadCaptureComponents";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { editorialEase, editorialViewport } from "@/lib/motion";

const programDeliverables = [
  "HUB Local ativo com Líder Embaixador da prefeitura",
  "4 eventos anuais de mobilização ESG e ODS",
  "Rede de universidades signatárias do município",
  "Empresas locais como parceiras de squad",
  "Dashboard público de impacto por ODS",
  "Relatório institucional anual com Agenda 2030",
];

// ODS tags strip across full width
const odsStrip = [
  { n: 4, label: "Educação", color: "#C5192D" },
  { n: 8, label: "Trabalho", color: "#A21942" },
  { n: 11, label: "Cidades", color: "#FD9D24" },
  { n: 12, label: "Consumo", color: "#BF8B2E" },
  { n: 13, label: "Clima", color: "#3F7E44" },
  { n: 16, label: "Paz", color: "#00689D" },
  { n: 17, label: "Parcerias", color: "#19486A" },
];

const odsImpact = [
  { ods: 4, label: "Educação de Qualidade", value: 85 },
  { ods: 8, label: "Trabalho Decente", value: 72 },
  { ods: 11, label: "Cidades Sustentáveis", value: 91 },
  { ods: 13, label: "Ação Climática", value: 64 },
];

const publicPolicyClaims = [
  "Alinhamento com Plano Diretor e LDO",
  "Indicadores ODS por secretaria",
  "Prestação de contas em sessão pública",
  "Relatório anual com Agenda 2030",
];

const heroTrustItems = [
  { value: "R$80k–200k", label: "Faixa anual do programa", tone: "atlantic" as const },
  { value: "4 eventos", label: "Mobilização por ano", tone: "sun" as const },
  { value: "Agenda 2030", label: "Compatibilidade institucional", tone: "default" as const },
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
          metaRail={<Badge variant="atlantic">Linguagem de política pública, não de startup</Badge>}
          title={
            <>
              Coloque sua cidade no mapa das{" "}
              <span className="italic text-[color:var(--color-atlantic)]">
                cidades ODS
              </span>{" "}
              2030.
            </>
          }
          lede="Um programa concreto de engajamento de juventude local com relatório público de impacto."
          actions={
            <>
              <Button asChild size="xl" variant="atlantic">
                <Link href="/auth/prefeitura">
                  Agendar reunião institucional
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/modelo-ods">Ver modelo do Programa Municipal ODS</Link>
              </Button>
            </>
          }
          trustRail={
            <ProofStrip
              compact
              ariaLabel="Sinais de confiança para prefeituras"
              items={heroTrustItems}
            />
          }
          side={<PrefeituraSidePanel />}
        />

        {/* ODS TAG STRIP — full-width, formal institutional feel */}
        <div className="border-y border-[color:var(--color-atlantic)]/20 bg-[color:var(--color-atlantic-soft)] overflow-x-auto">
          <div className="container-editorial py-5">
            <div className="flex items-center gap-3 min-w-max">
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-atlantic-deep)] shrink-0 mr-2">
                ODS Atendidos
              </span>
              {odsStrip.map((ods) => (
                <div
                  key={ods.n}
                  className="flex items-center gap-2 rounded border px-3 py-1.5 shrink-0"
                  style={{ borderColor: ods.color + "40", backgroundColor: ods.color + "12" }}
                >
                  <span
                    className="inline-grid size-6 place-items-center rounded font-mono text-xs font-black text-white"
                    style={{ backgroundColor: ods.color }}
                  >
                    {ods.n}
                  </span>
                  <span
                    className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: ods.color }}
                  >
                    {ods.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ASYMMETRIC 2-COL — big stat left, institutional text right */}
        <section className="surface-atlantic section-y border-b border-white/10">
          <div className="container-editorial">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-0 lg:divide-x lg:divide-white/15 lg:items-stretch">
              {/* Big stat left panel */}
              <div className="lg:col-span-4 lg:pr-12 flex flex-col justify-center">
                <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white/50">
                  Investimento municipal
                </span>
                <p className="mt-6 font-mono text-[5rem] md:text-[6rem] font-black leading-none tracking-[-0.04em] text-white">
                  R$80k
                </p>
                <p className="font-mono text-xl text-white/60 leading-none">
                  — R$200k / ano
                </p>
                <div className="mt-8 h-px bg-white/15" />
                <p className="mt-8 text-base leading-relaxed text-white/70">
                  Contrato anual com entregáveis definidos, prazos auditáveis e relatório
                  público de impacto ao final de cada ciclo.
                </p>
                <Badge variant="outline" className="mt-8 border-white/30 text-white w-fit">
                  Contrato anual · Agenda 2030
                </Badge>
              </div>

              {/* Deliverables right panel */}
              <div className="lg:col-span-8 lg:pl-12">
                <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white/50">
                  Entregáveis do contrato
                </span>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
                  O que o município recebe.
                </h2>

                <ul className="mt-10 space-y-0 divide-y divide-white/12">
                  {programDeliverables.map((d, i) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={editorialViewport}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: editorialEase }}
                      className="flex items-start gap-5 py-5 first:pt-0 last:pb-0"
                    >
                      <span className="font-mono text-[0.6875rem] font-bold text-white/30 shrink-0 mt-0.5 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[color:var(--color-sun)]" />
                      <p className="text-base leading-relaxed text-white/85">{d}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ODS IMPACT DASHBOARD + POLICY CLAIMS — 2-col */}
        <section className="container-editorial section-y">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
            {/* Policy language left */}
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Agenda 2030 · ODS"
                title="Linguagem de política pública."
                subtitle="O Programa Municipal ODS Jovem dialoga com Plano Diretor, Agenda 2030 e estratégias setoriais — sem importar jargão de startup."
                tone="bright"
                showRule
              />

              <ul className="mt-8 divide-y divide-[color:var(--color-ink)]">
                {publicPolicyClaims.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={editorialViewport}
                    transition={{ duration: 0.38, delay: i * 0.07, ease: editorialEase }}
                    className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <ScrollText className="mt-0.5 size-5 shrink-0 text-[color:var(--color-atlantic)]" />
                    <span className="text-base leading-relaxed text-[color:var(--color-ink-3)]">
                      {p}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Dashboard right — institutional chart mockup */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border-2 border-[color:var(--color-atlantic)]/20 bg-white p-7 md:p-9">
                <div className="flex items-center justify-between border-b border-[color:var(--color-border)] pb-6 mb-8">
                  <div>
                    <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-atlantic)]">
                      Painel municipal · 2026
                    </span>
                    <p className="mt-2 font-display text-2xl font-bold tracking-[-0.025em]">
                      Indicadores ODS
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[color:var(--color-atlantic-soft)] px-3 py-2">
                    <BarChart3 className="size-4 text-[color:var(--color-atlantic)]" />
                    <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-[color:var(--color-atlantic-deep)]">
                      Público
                    </span>
                  </div>
                </div>

                <ul className="space-y-6">
                  {odsImpact.map((o, i) => (
                    <motion.li
                      key={o.ods}
                      initial={{ opacity: 0, scaleX: 0.6 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={editorialViewport}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)]">
                          <span className="inline-grid size-8 place-items-center rounded-lg bg-[color:var(--color-atlantic-soft)] text-[color:var(--color-atlantic-deep)] text-[0.6875rem] font-black">
                            {o.ods}
                          </span>
                          {o.label}
                        </span>
                        <span className="font-mono text-lg font-bold text-[color:var(--color-ink)]">
                          {o.value}
                          <span className="text-xs text-[color:var(--color-ink-4)]">/100</span>
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[color:var(--color-atlantic-soft)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${o.value}%` }}
                          viewport={editorialViewport}
                          transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full bg-[color:var(--color-atlantic)]"
                        />
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3 rounded-xl bg-[color:var(--color-atlantic-soft)] p-4">
                  <Landmark className="size-4 text-[color:var(--color-atlantic)]" />
                  <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-atlantic-deep)]">
                    Compatível com Agenda 2030 · Exportável para câmara
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-ink rounded-3xl p-10 md:p-14 lg:p-16">
            <WaitlistCTA personaLabel="programa municipal B2G" isDark />
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
