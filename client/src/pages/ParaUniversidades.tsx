import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building,
  CheckCircle2,
  GraduationCap,
  School,
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

// Department/area tags — research-report visual
const departmentTags = [
  "Pró-reitoria · Extensão",
  "Engenharia Ambiental",
  "Administração · ESG",
  "Ciências Sociais",
  "Líder Campus",
  "Alunos do squad",
  "Gestão Pública",
  "Design Estratégico",
];

const semesterDeliverables = [
  { label: "Horas de extensão registradas", value: "120h", unit: "/ aluno / semestre" },
  { label: "Projetos ativos mínimos", value: "1", unit: "squad / semestre" },
  { label: "Relatório MEC gerado", value: "100%", unit: "automatizado" },
  { label: "Ticket de parceria", value: "R$ 5k", unit: "– 12k / semestre" },
];

const heroTrustItems = [
  { value: "120h", label: "Extensão por aluno", tone: "clay" as const },
  { value: "1 squad", label: "Mínimo por semestre", tone: "default" as const },
  { value: "MEC", label: "Relatório semestral pronto", tone: "atlantic" as const },
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
          trustRail={
            <ProofStrip
              compact
              ariaLabel="Sinais de confiança para universidades"
              items={heroTrustItems}
            />
          }
          side={<UniversidadeSidePanel />}
        />

        {/* SPLIT-SCREEN — dark panel left (Fraunces manifesto quote) + light benefits right */}
        <section className="border-t border-[color:var(--color-ink)] section-y">
          <div className="container-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-[color:var(--color-ink)] lg:gap-0 gap-10">
              {/* Dark left panel — academic manifesto tone */}
              <div className="lg:col-span-5 surface-ink rounded-2xl lg:rounded-none lg:bg-transparent lg:surface-ink p-10 md:p-12 lg:pr-12 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white/50">
                    Convite institucional
                  </span>
                  {/* Large Fraunces italic pull-quote */}
                  <blockquote className="mt-8">
                    <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium italic leading-[1.2] tracking-[-0.02em] text-white">
                      "A universidade sai do papel de fornecedora de estagiários e entra como
                      parceira de operação ESG real na cidade."
                    </p>
                    <cite className="mt-6 block font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/40 not-italic">
                      — Carta-manifesto Brasil Sustenta · Reitorias 2026
                    </cite>
                  </blockquote>
                </div>

                {/* Semester metrics at bottom of dark panel */}
                <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 gap-6">
                  {semesterDeliverables.map((d) => (
                    <div key={d.label}>
                      <p className="font-mono text-[2rem] font-bold leading-none tracking-[-0.04em] text-[color:var(--color-clay-soft)]">
                        {d.value}
                      </p>
                      <p className="mt-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/40 leading-snug">
                        {d.label}
                      </p>
                      <p className="mt-0.5 font-mono text-[0.6rem] text-white/25 uppercase tracking-[0.12em]">
                        {d.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Light right panel — benefits list */}
              <div className="lg:col-span-7 lg:pl-12 flex flex-col">
                <div className="mb-10">
                  <SectionHeader
                    eyebrow="Por que ativar"
                    title="Extensão que vira evidência."
                    subtitle="Seu campus passa a entregar projetos reais com empresas da cidade. Mais empregabilidade, mais ODS, mais dados."
                    tone="bright"
                    showRule
                  />
                </div>

                {/* Offerings as a research-report list */}
                <ol className="space-y-0 divide-y divide-[color:var(--color-ink)] flex-1">
                  {offerings.map((o, i) => (
                    <motion.li
                      key={o.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={editorialViewport}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: editorialEase }}
                      className="grid grid-cols-12 gap-4 py-7 first:pt-0 last:pb-0 items-start"
                    >
                      {/* Report-style item number */}
                      <span className="col-span-2 font-mono text-[0.6875rem] font-bold text-[color:var(--color-clay)] uppercase tracking-[0.15em] pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="col-span-10">
                        <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] mb-2">
                          {o.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                          {o.body}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* DEPARTMENT TAGS SECTION — research report visual */}
        <section className="surface-paper-2 border-y border-[color:var(--color-ink)] section-y">
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
              <div className="lg:col-span-5">
                <SectionHeader
                  eyebrow="Quem participa"
                  title="Coordenação, líder, alunos."
                  subtitle="A parceria entra com 3 papéis institucionais — coordenação acadêmica, Líder Campus e alunos engajados."
                  tone="bright"
                  showRule
                />

                <div className="mt-9">
                  <Button asChild size="lg" variant="default">
                    <Link href="/auth/ies">
                      Ativar campus agora
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Highlighted department tags — research-report feel */}
              <div className="lg:col-span-7">
                <div className="border border-[color:var(--color-ink)] rounded-2xl overflow-hidden">
                  {/* Header row like a report table */}
                  <div className="border-b border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-7 py-4">
                    <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white/70">
                      Áreas e papéis envolvidos · Mapeamento institucional
                    </span>
                  </div>
                  <div className="p-7">
                    <div className="flex flex-wrap gap-2.5">
                      {departmentTags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={editorialViewport}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="inline-flex items-center gap-2 border border-[color:var(--color-clay)]/30 bg-[color:var(--color-clay-soft)] px-3.5 py-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-clay-deep)]"
                        >
                          <BookOpen className="size-3 opacity-60" />
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-[color:var(--color-border)] pt-7 grid grid-cols-3 gap-5">
                      {[
                        { icon: GraduationCap, label: "Alunos ativos", value: "3–5 / squad" },
                        { icon: School, label: "Campus ativados", value: "Campinas · 2026" },
                        { icon: Building, label: "Relatório MEC", value: "Semestral" },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="text-center">
                          <Icon className="size-5 mx-auto text-[color:var(--color-clay)]" strokeWidth={1.5} />
                          <p className="mt-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[color:var(--color-ink-4)] leading-tight">
                            {label}
                          </p>
                          <p className="mt-1 font-display text-sm font-semibold text-[color:var(--color-ink)]">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-clay rounded-3xl p-10 md:p-14 lg:p-16">
            <WaitlistCTA personaLabel="campus" isDark />
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
