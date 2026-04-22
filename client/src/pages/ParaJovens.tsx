import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ds";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Compass,
  GraduationCap,
  MapPin,
  Sparkles,
  Trophy,
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

const benefits = [
  {
    icon: Trophy,
    title: "Match explicado",
    body: "\"Você tem fit com ODS 13 por causa de...\" — sem caixa-preta, sem promessa vaga.",
  },
  {
    icon: Compass,
    title: "Empresa real na sua cidade",
    body: "Squad com empresa real da sua cidade — não simulação, não case fictício.",
  },
  {
    icon: Award,
    title: "Portfolio que empresas veem",
    body: "Cada projeto vira prova no seu portfolio público com evidência auditável.",
  },
];

const journey = [
  {
    n: "01",
    title: "Crie seu perfil",
    body: "Skills, ODS de interesse, histórico acadêmico e disponibilidade.",
  },
  {
    n: "02",
    title: "Receba matches",
    body: "Projetos abertos no HUB da sua cidade com Fit Score explicado.",
  },
  {
    n: "03",
    title: "Candidate-se",
    body: "Curadoria humana valida. Você fica na shortlist da empresa.",
  },
  {
    n: "04",
    title: "Entregue & cresça",
    body: "Sprint com squad, avaliação e portfolio público crescente.",
  },
];

const odsBadges = [4, 7, 8, 11, 12, 13, 15, 17];

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
          side={<JovemMatchPreview />}
        />

        {/* Benefits ============== */}
        <section className="container-editorial section-y border-t border-[color:var(--color-border)]">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
            <SectionHeader
              eyebrow="Por que aqui"
              title="Não é vaga. É curadoria."
              tone="bright"
              showRule
              className="md:col-span-7"
            />
            <p className="text-body md:col-span-5">
              Aqui você não compete em job board. Aqui você é convidado para
              um projeto onde seu perfil tem fit explicado.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-7">
                <Icon className="size-7 text-[color:var(--color-sun-deep)]" strokeWidth={1.5} />
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

        {/* Jornada ================ */}
        <section className="surface-sun border-y border-[color:var(--color-sun-deep)]/20 section-y">
          <div className="container-editorial">
            <div className="max-w-2xl">
              <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-sun-deep)]">
                Sua jornada
              </span>
              <h2 className="text-headline mt-5 text-[color:var(--color-ink)]">
                Do perfil ao portfolio em 4 passos.
              </h2>
            </div>

            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-sun-deep)]/20 bg-[color:var(--color-sun-deep)]/20 md:grid-cols-2 lg:grid-cols-4">
              {journey.map(({ n, title, body }) => (
                <li key={n} className="bg-[color:var(--color-sun)] p-7 md:p-8">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-sun-deep)]">
                    Passo {n}
                  </p>
                  <h3 className="mt-6 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-[color:var(--color-ink)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-2)]">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ODS ==================== */}
        <section className="container-editorial section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="ODS em foco"
                title="Sua área de impacto, mapeada."
                subtitle="Você escolhe seus ODS prioritários. O sistema aprende com seu histórico de projetos. O Fit Score evolui com você."
                tone="bright"
                showRule
              />

              <div className="mt-9 flex flex-wrap gap-2.5">
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
                    className="inline-grid size-12 place-items-center rounded-full border border-[color:var(--color-border)] bg-white font-mono text-sm font-bold text-[color:var(--color-ink)]"
                  >
                    {n}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <PortfolioMockup />
            </div>
          </div>
        </section>

        {/* CTA ==================== */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-ink relative overflow-hidden rounded-3xl p-10 md:p-14 lg:p-16">
              <div className="md:col-span-12">
                <WaitlistCTA personaLabel="talento jovem" isDark />
              </div>
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

function PortfolioMockup() {
  const items = [
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
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-white">
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
        {items.map(item => (
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
  );
}
