import { motion } from "framer-motion";
import { ProofStrip, SectionHeader } from "@/components/ds";
import {
  ArrowRight,
  Award,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { WaitlistCTA } from "@/components/LeadCaptureComponents";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { editorialEase, editorialViewport } from "@/lib/motion";

const journey = [
  {
    n: "01",
    title: "Crie seu perfil",
    body: "Skills, ODS de interesse, histórico acadêmico e disponibilidade.",
    verb: "Construa",
  },
  {
    n: "02",
    title: "Receba matches",
    body: "Projetos abertos no HUB da sua cidade com Fit Score explicado.",
    verb: "Descubra",
  },
  {
    n: "03",
    title: "Candidate-se",
    body: "Curadoria humana valida. Você fica na shortlist da empresa.",
    verb: "Aplique",
  },
  {
    n: "04",
    title: "Entregue & cresça",
    body: "Sprint com squad, avaliação e portfolio público crescente.",
    verb: "Comprove",
  },
];

const odsBadges = [4, 7, 8, 11, 12, 13, 15, 17];

const portfolioItems = [
  {
    title: "Diagnóstico ESG · Fornecedores",
    empresa: "Empresa Beta",
    ods: [12, 13],
    rate: 5,
  },
  {
    title: "Estudo de impacto · Logística reversa",
    empresa: "Indústria Gama",
    ods: [11, 12],
    rate: 5,
  },
  {
    title: "Pilot de educação ambiental",
    empresa: "ONG Delta",
    ods: [4, 13],
    rate: 4,
  },
];

const heroTrustItems = [
  { value: "Campinas", label: "Primeiro HUB ativo", tone: "leaf" as const },
  { value: "91", label: "Fit score demonstrativo", tone: "sun" as const },
  { value: "6 sem", label: "Sprint médio de entrega", tone: "default" as const },
];

export default function ParaJovens() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Para Jovens — Seu match real está chegando | Brasil Sustenta"
        description="Match explicado, projeto real com empresa da sua cidade, portfolio que fala por você. Os primeiros projetos estão nascendo."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="Para jovens · talentos universitários"
          variant="paper"
          title={
            <>
              Projetos reais.{" "}
              <span className="text-[color:var(--color-sun-deep)]">
                Portfolio que empresas veem.
              </span>{" "}
              Match que faz sentido.
            </>
          }
          lede="Você sabe exatamente por que foi selecionado para cada desafio. Os primeiros matches estão sendo construídos em Campinas."
          actions={
            <>
              <Button asChild size="xl" variant="default">
                <Link href="/auth/jovem">
                  Ver matches para você
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/auth/jovem">Criar perfil</Link>
              </Button>
            </>
          }
          trustRail={
            <ProofStrip
              compact
              ariaLabel="Sinais de confiança para jovens"
              items={heroTrustItems}
            />
          }
          side={<JovemMatchPreview />}
        />

        {/* FULL-BLEED VERDE STRIP — energy, stat callouts */}
        <section className="bg-[color:var(--color-leaf)] border-y border-[color:var(--color-leaf-deep)]">
          <div className="container-editorial py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-white/20">
              {[
                { value: "+3.200", label: "Jovens na plataforma · projeção 2027" },
                { value: "91", label: "Fit score alto · match explicado" },
                { value: "6 sem", label: "Sprint médio para o primeiro projeto" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={editorialViewport}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: editorialEase }}
                  className="md:px-8 first:md:pl-0 last:md:pr-0"
                >
                  <p className="font-mono text-[3.5rem] md:text-[4rem] font-bold leading-none tracking-[-0.04em] text-white">
                    {stat.value}
                  </p>
                  <p className="mt-3 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/60">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* JORNADA — staggered steps with strong verb headlines */}
        <section className="section-y border-b border-[color:var(--color-ink)]">
          <div className="container-editorial">
            <div className="mb-14 grid gap-4 md:grid-cols-2 md:items-end">
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.035em] lowercase">
                Do perfil ao{" "}
                <span className="text-[color:var(--color-sun-deep)] italic">portfolio</span>{" "}
                em 4 passos.
              </h2>
              <p className="text-base leading-relaxed text-[color:var(--color-ink-3)] md:self-end">
                Aqui você não compete em job board. Aqui você é convidado para um projeto onde seu
                perfil tem fit explicado.
              </p>
            </div>

            {/* Staggered: alternating indent on desktop */}
            <ol className="space-y-0 divide-y divide-[color:var(--color-ink)]">
              {journey.map(({ n, title, body, verb }, i) => (
                <motion.li
                  key={n}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={editorialViewport}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: editorialEase }}
                  /* Alternate indent creates staggered feel */
                  className={`grid grid-cols-12 gap-4 py-10 md:py-12 items-center ${i % 2 !== 0 ? "md:pl-16" : ""}`}
                >
                  {/* Oversized step number */}
                  <span className="col-span-2 font-mono text-[2rem] font-bold leading-none text-[color:var(--color-sun-deep)] opacity-40">
                    {n}
                  </span>
                  {/* Strong verb — the "action" */}
                  <div className="col-span-10 md:col-span-3">
                    <span className="font-display text-[2.5rem] md:text-[3rem] font-black leading-none tracking-[-0.04em] text-[color:var(--color-ink)] block">
                      {verb}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <h3 className="font-display text-xl font-bold tracking-[-0.02em] mb-2">
                      {title}
                    </h3>
                    <p className="text-base leading-relaxed text-[color:var(--color-ink-3)]">
                      {body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ODS + PORTFOLIO — 2-col, ODS badges left, portfolio right */}
        <section className="surface-sun border-b border-[color:var(--color-sun-deep)]/20 section-y">
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
              {/* ODS side */}
              <div>
                <SectionHeader
                  eyebrow="ODS em foco"
                  title="Sua área de impacto, mapeada."
                  subtitle="Você escolhe seus ODS prioritários. O sistema aprende com seu histórico. O Fit Score evolui com você."
                  tone="bright"
                  showRule
                />
                <div className="mt-9 flex flex-wrap gap-3">
                  {odsBadges.map(n => (
                    <motion.span
                      key={n}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={editorialViewport}
                      transition={{
                        duration: 0.35,
                        delay: n * 0.025,
                        ease: editorialEase,
                      }}
                      className="inline-grid size-14 place-items-center rounded-full border-2 border-[color:var(--color-sun-deep)]/30 bg-white font-mono text-base font-bold text-[color:var(--color-ink)] shadow-sm"
                    >
                      {n}
                    </motion.span>
                  ))}
                </div>

                {/* Emphasized callout below badges */}
                <div className="mt-10 border-l-4 border-[color:var(--color-sun-deep)] pl-5">
                  <p className="font-display text-xl font-semibold italic leading-snug text-[color:var(--color-ink)]">
                    "Não é vaga. É curadoria. Você sabe por que foi escolhido."
                  </p>
                </div>
              </div>

              {/* Portfolio mockup */}
              <div className="rounded-3xl border border-[color:var(--color-sun-deep)]/20 bg-white overflow-hidden">
                <div className="flex items-center justify-between border-b border-[color:var(--color-border)] p-7">
                  <div>
                    <span className="text-eyebrow">Portfolio público</span>
                    <p className="mt-2 font-display text-2xl font-bold tracking-[-0.025em]">
                      Marina Souza
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[color:var(--color-ink-4)]">
                      <GraduationCap className="size-3.5" />
                      UNICAMP · Eng. Ambiental ·{" "}
                      <MapPin className="size-3" /> Campinas
                    </p>
                  </div>
                  <Award className="size-7 text-[color:var(--color-sun-deep)]" strokeWidth={1.5} />
                </div>
                <ul className="divide-y divide-[color:var(--color-border)]">
                  {portfolioItems.map(item => (
                    <li key={item.title} className="p-6">
                      <p className="font-display text-base font-semibold tracking-tight">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-[color:var(--color-ink-4)]">
                        {item.empresa}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex gap-1">
                          {item.ods.map(o => (
                            <span
                              key={o}
                              className="inline-grid size-6 place-items-center rounded-full bg-[color:var(--color-paper-2)] font-mono text-[0.625rem] font-bold"
                            >
                              {o}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < item.rate
                                  ? "text-[color:var(--color-sun-deep)]"
                                  : "text-[color:var(--color-ink-5)]"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-ink relative overflow-hidden rounded-3xl p-10 md:p-14 lg:p-16">
            <WaitlistCTA personaLabel="talento jovem" isDark />
            <Sparkles
              className="pointer-events-none absolute -right-6 -bottom-6 size-48 text-white/8"
              strokeWidth={1}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function JovemMatchPreview() {
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-7 md:p-8">
      <div className="flex items-center justify-between">
        <Badge variant="solidLeaf">Novo match</Badge>
        <span className="font-mono text-xs text-[color:var(--color-ink-4)]">
          há 2h
        </span>
      </div>
      <p className="mt-6 font-display text-xl font-semibold leading-tight tracking-[-0.02em]">
        Mapeamento de fornecedores para ODS 12
      </p>
      <p className="mt-2 text-sm text-[color:var(--color-ink-3)]">
        Empresa Beta · HUB Campinas · 6 semanas
      </p>

      <div className="mt-7 flex items-baseline gap-3">
        <p className="font-mono text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-[color:var(--color-leaf)]">
          91
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-4)]">
          / 100 · alto fit
        </p>
      </div>

      <p className="mt-6 border-t border-[color:var(--color-border)] pt-6 text-sm leading-relaxed text-[color:var(--color-ink-3)]">
        <span className="font-display font-semibold text-[color:var(--color-ink)]">
          Você tem fit alto
        </span>{" "}
        por 3 projetos de extensão em monitoramento ambiental e disponibilidade no HUB.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {[7, 12, 13].map(n => (
          <span
            key={n}
            className="inline-grid size-9 place-items-center rounded-full bg-[color:var(--color-paper-2)] font-mono text-xs font-bold text-[color:var(--color-ink)]"
          >
            {n}
          </span>
        ))}
      </div>

      <Button size="lg" variant="default" className="mt-7 w-full justify-between">
        Tenho interesse
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
