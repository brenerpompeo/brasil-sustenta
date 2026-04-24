import { motion } from "framer-motion";
import { ProofStrip, SectionHeader } from "@/components/ds";
import { WaitlistCTA } from "@/components/LeadCaptureComponents";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  LineChart,
  ShieldCheck,
} from "lucide-react";
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
    n: "01",
    title: "Squad com Fit Score explicável",
    body: "Squad com 3-5 talentos selecionados por ODS Fit Score explicável — sem caixa-preta.",
  },
  {
    n: "02",
    title: "Sprint com trilha de evidência",
    body: "Sprint de 6-8 semanas com checkpoints e trilha de evidência por entrega.",
  },
  {
    n: "03",
    title: "Relatório auditável",
    body: "Relatório final auditável — o entregável que prova o resultado para ESG real.",
  },
];

const flow = [
  {
    n: "01",
    label: "Brief ESG",
    title: "Você descreve o desafio.",
    body: "Buyer interno, ODS prioritários, prazo, ticket e tipo de entrega — tudo claro antes do match.",
  },
  {
    n: "02",
    label: "Shortlist 72h",
    title: "Shortlist explicável.",
    body: "Em até 72h, 3-5 talentos universitários rankeados por Fit Score com explicação em PT-BR.",
  },
  {
    n: "03",
    label: "Squad",
    title: "Squad formado.",
    body: "Você seleciona o squad final. Curadoria humana valida. Sprint começa em até 7 dias.",
  },
  {
    n: "04",
    label: "Entrega",
    title: "Relatório auditável.",
    body: "Ao final, dossiê completo com artefatos, métricas de impacto e badges de ODS atendidos.",
  },
];

const products = [
  {
    tag: "Pilot",
    name: "Pilot Project",
    ticket: "R$ 15k–25k",
    duration: "4–6 semanas",
    body: "Validação de buyer, escopo enxuto, entrega única.",
    bullets: ["1 desafio ESG", "Squad de 3 talentos", "1 entrega final"],
    cta: "Iniciar pilot",
  },
  {
    tag: "Recorrente",
    name: "Managed Squad",
    ticket: "R$ 35k–60k",
    duration: "8–12 semanas",
    body: "Squad estável em sprint contínuo. Mais previsibilidade, mais maturidade.",
    bullets: [
      "Múltiplos desafios",
      "Squad de 4–5 talentos",
      "Checkpoints quinzenais",
      "Relatórios mensais",
    ],
    cta: "Ativar squad",
    highlight: true,
  },
];

const metrics = [
  { value: "6 sem", label: "Sprint médio projetado" },
  { value: "72h", label: "Shortlist entregue" },
  { value: "4", label: "Etapas do protocolo" },
  { value: "100%", label: "Transparência de processo" },
];

const heroTrustItems = [
  { value: "72h", label: "Shortlist explicável", tone: "leaf" as const },
  { value: "NDA", label: "Base contratual padrão", tone: "atlantic" as const },
  { value: "4 etapas", label: "Protocolo auditável", tone: "default" as const },
];

const guarantees = [
  "Confidencialidade contratual com NDA padrão",
  "Curadoria humana antes da apresentação",
  "Substituição de talento em até 5 dias úteis",
  "Trilha de evidência por checkpoint",
];

export default function ParaEmpresas() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Para Empresas — Seu desafio ESG vira squad em 6 semanas | Brasil Sustenta"
        description="Brief → shortlist com Fit Score → squad em sprint → relatório auditável. Os primeiros pilots estão sendo construídos."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="Para empresas · B2B"
          variant="paper"
          metaRail={<Badge variant="leaf">Pilots corporativos em curadoria</Badge>}
          title={
            <>
              Seu desafio ESG vira{" "}
              <span className="italic text-[color:var(--color-leaf)]">squad, sprint e relatório</span>{" "}
              em 6 semanas.
            </>
          }
          lede="Brief → Shortlist com Fit Score IA → Squad otimizado → Entrega auditável."
          actions={
            <>
              <Button asChild size="xl" variant="leaf">
                <Link href="/auth/empresa">
                  Enviar brief ESG
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="#produtos">Agendar discovery call</Link>
              </Button>
            </>
          }
          trustRail={
            <ProofStrip
              compact
              ariaLabel="Sinais de confiança para empresas"
              items={heroTrustItems}
            />
          }
          side={<EmpresaSidePanel />}
        />

        {/* NUMBERED BENEFIT LIST — editorial B2B gravitas */}
        <section className="border-t border-[color:var(--color-ink)] section-y">
          <div className="container-editorial">
            {/* Pull-quote Fraunces italic — breaks the grid */}
            <blockquote className="border-l-4 border-[color:var(--color-leaf)] pl-6 md:pl-10 mb-16">
              <p className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium italic leading-[1.15] tracking-[-0.02em] text-[color:var(--color-ink)] max-w-3xl">
                "Não vendemos uma plataforma. Vendemos uma operação completa de ESG com
                universidade, território e auditoria embutidos."
              </p>
              <cite className="mt-4 block font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)] not-italic">
                — Brasil Sustenta · Proposta de valor B2B
              </cite>
            </blockquote>

            {/* Numbered benefit list — full-width, divider-ruled */}
            <div className="flex items-baseline gap-6 mb-10">
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                O que muda
              </span>
              <div className="flex-1 h-px bg-[color:var(--color-ink)]" />
            </div>

            <ol className="divide-y divide-[color:var(--color-ink)]">
              {benefits.map(({ n, title, body }, i) => (
                <motion.li
                  key={n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={editorialViewport}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: editorialEase }}
                  className="grid grid-cols-12 gap-4 py-10 md:py-12 items-baseline"
                >
                  {/* Number — oversized editorial anchor */}
                  <span className="col-span-2 md:col-span-1 font-mono text-[2.5rem] font-bold leading-none text-[color:var(--color-leaf)] tracking-tighter">
                    {n}
                  </span>
                  <h3 className="col-span-10 md:col-span-4 font-display text-[1.6rem] md:text-[2rem] font-bold leading-tight tracking-[-0.025em]">
                    {title}
                  </h3>
                  <p className="col-span-12 md:col-span-7 text-base leading-relaxed text-[color:var(--color-ink-3)]">
                    {body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* METRICS STRIP — JetBrains Mono numbers, full-width dark band */}
        <section className="surface-ink border-y border-white/10">
          <div className="container-editorial">
            <div className="grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={editorialViewport}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="px-8 py-10 md:py-12"
                >
                  <p className="font-mono text-[3rem] md:text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-[color:var(--color-leaf-bright)]">
                    {m.value}
                  </p>
                  <p className="mt-3 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FLUXO — horizontal 4-step with hard dividers */}
        <section className="surface-paper-2 border-b border-[color:var(--color-ink)] section-y">
          <div className="container-editorial">
            <div className="flex items-baseline gap-6 mb-12">
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                Fluxo operacional
              </span>
              <div className="flex-1 h-px bg-[color:var(--color-ink)]" />
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                4 passos
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[color:var(--color-ink)]">
              {flow.map(({ n, label, title, body }) => (
                <div key={n} className="py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0">
                  <div className="flex items-center justify-between mb-6">
                    <Badge variant="leaf">{label}</Badge>
                    <span className="font-mono text-[2rem] font-bold leading-none text-[color:var(--color-ink)] opacity-15">
                      {n}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em] mb-3">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUTOS — 2-col asymmetric */}
        <section id="produtos" className="container-editorial section-y">
          <div className="flex items-baseline gap-6 mb-12">
            <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
              Produtos
            </span>
            <div className="flex-1 h-px bg-[color:var(--color-ink)]" />
            <span className="font-display text-lg font-bold italic text-[color:var(--color-leaf)]">
              Dois formatos. Buyer escolhe.
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {products.map(p => (
              <ProductDetail key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* GARANTIAS — full-width checklist with strong rule */}
        <section className="surface-paper-2 border-t border-[color:var(--color-ink)] section-y">
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-[color:var(--color-ink-4)]">
                  Garantias
                </span>
                <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                  O que entra no contrato.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[color:var(--color-ink-3)] max-w-xs">
                  Sem letra miúda. As regras do squad estão na proposta — antes de assinar.
                </p>
              </div>
              <ul className="lg:col-span-8 divide-y divide-[color:var(--color-ink)]">
                {guarantees.map((g, i) => (
                  <motion.li
                    key={g}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={editorialViewport}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: editorialEase }}
                    className="flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[color:var(--color-leaf)]" />
                    <p className="text-lg font-medium leading-relaxed text-[color:var(--color-ink)]">
                      {g}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-leaf rounded-3xl p-10 md:p-14 lg:p-16">
            <WaitlistCTA personaLabel="programa Corporativo" isDark />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProductDetail({
  tag,
  name,
  ticket,
  duration,
  body,
  bullets,
  cta,
  highlight,
}: {
  tag: string;
  name: string;
  ticket: string;
  duration: string;
  body: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <article
      className={
        highlight
          ? "surface-ink relative flex flex-col rounded-2xl p-8 md:p-10"
          : "surface-card flex flex-col rounded-2xl p-8 md:p-10"
      }
    >
      {highlight && (
        <Badge variant="solidLeaf" className="absolute -top-3 left-8">
          Mais escolhido
        </Badge>
      )}
      <div className="flex items-center justify-between">
        <Badge
          variant={highlight ? "outline" : "leaf"}
          className={highlight ? "border-white/40 text-white" : ""}
        >
          {tag}
        </Badge>
        <span
          className={
            highlight
              ? "font-mono text-xs font-semibold text-white/55"
              : "font-mono text-xs font-semibold text-[color:var(--color-ink-4)]"
          }
        >
          {duration}
        </span>
      </div>
      <h3
        className={
          highlight
            ? "mt-7 font-display text-3xl font-bold tracking-[-0.025em] text-white"
            : "mt-7 font-display text-3xl font-bold tracking-[-0.025em]"
        }
      >
        {name}
      </h3>
      <p
        className={
          highlight
            ? "mt-2 font-display text-2xl font-semibold text-[color:var(--color-leaf-bright)]"
            : "mt-2 font-display text-2xl font-semibold text-[color:var(--color-leaf)]"
        }
      >
        {ticket}
      </p>
      <p
        className={
          highlight
            ? "mt-5 text-sm leading-relaxed text-white/72"
            : "mt-5 text-sm leading-relaxed text-[color:var(--color-ink-3)]"
        }
      >
        {body}
      </p>
      <ul
        className={
          highlight
            ? "mt-7 space-y-3 border-t border-white/12 pt-7"
            : "mt-7 space-y-3 border-t border-[color:var(--color-border)] pt-7"
        }
      >
        {bullets.map(b => (
          <li key={b} className="flex items-start gap-2.5">
            <CheckCircle2
              className={
                highlight
                  ? "mt-0.5 size-4 shrink-0 text-[color:var(--color-leaf-bright)]"
                  : "mt-0.5 size-4 shrink-0 text-[color:var(--color-leaf)]"
              }
            />
            <span
              className={
                highlight
                  ? "text-sm leading-relaxed text-white/85"
                  : "text-sm leading-relaxed text-[color:var(--color-ink-3)]"
              }
            >
              {b}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-2">
        <Button
          asChild
          size="lg"
          variant={highlight ? "leaf" : "default"}
          className="w-full justify-between"
        >
          <Link href="/auth/empresa">
            {cta}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

function EmpresaSidePanel() {
  return (
    <div className="rounded-3xl border border-[color:var(--color-border)] bg-white p-7 md:p-8">
      <div className="flex items-center justify-between">
        <span className="text-eyebrow">Brief padrão</span>
        <ClipboardList className="size-4 text-[color:var(--color-ink-4)]" />
      </div>
      <p className="mt-6 font-display text-xl font-semibold leading-tight tracking-[-0.02em]">
        O que entra no brief
      </p>
      <ul className="mt-5 grid gap-2.5 text-sm">
        {[
          { k: "Buyer interno", v: "Quem aprova e cobra" },
          { k: "ODS prioritários", v: "1 a 3 dos 17" },
          { k: "Tipo de entrega", v: "Estudo · Pilot · Implementação" },
          { k: "Prazo", v: "4 a 12 semanas" },
          { k: "Ticket", v: "R$ 15k–60k" },
          { k: "HUB", v: "Cidade preferencial" },
        ].map(item => (
          <li
            key={item.k}
            className="flex items-baseline justify-between border-b border-[color:var(--color-border)] pb-2.5 last:border-b-0"
          >
            <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-4)]">
              {item.k}
            </span>
            <span className="text-right text-[0.8125rem] font-medium text-[color:var(--color-ink)]">
              {item.v}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex items-center justify-between rounded-xl bg-[color:var(--color-paper-2)] p-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-4 text-[color:var(--color-leaf)]" />
          <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
            NDA padrão incluso
          </span>
        </div>
        <LineChart className="size-4 text-[color:var(--color-ink-4)]" />
      </div>
    </div>
  );
}
