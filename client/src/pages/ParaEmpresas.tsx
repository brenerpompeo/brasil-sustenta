import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  LineChart,
  ShieldCheck,
  Target,
  Users2,
} from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { editorialEase, editorialViewport } from "@/lib/motion";

const valueProps = [
  {
    icon: Target,
    title: "Shortlist com Fit Score",
    body: "3 a 5 talentos rankeados por ODS Fit Score decomposto. Nunca caixa-preta.",
  },
  {
    icon: Users2,
    title: "Squad em sprint",
    body: "Equipe formada com competências, ODS e cidade do HUB. Checkpoints quinzenais.",
  },
  {
    icon: FileCheck2,
    title: "Relatório auditável",
    body: "Trilha de evidência por entrega. ESG vira artefato comprável, não decoração.",
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

const proof = [
  { value: "2026", label: "Primeiros pilots" },
  { value: "6 sem", label: "Sprint médio projetado" },
  { value: "4", label: "Etapas do protocolo" },
  { value: "100%", label: "Transparência de processo" },
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
          title={
            <>
              Desafio ESG vira{" "}
              <span className="italic text-[color:var(--color-leaf)]">squad</span>{" "}
              em até 6 semanas.
            </>
          }
          lede="Brief com contexto, shortlist com Fit Score explicável, squad universitário em sprint e relatório auditável. Estamos construindo o modelo que tira ESG do PowerPoint e transforma em operação."
          actions={
            <>
              <Button asChild size="xl" variant="leaf">
                <Link href="/auth/empresa">
                  Ser um dos primeiros buyers
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="#produtos">Ver produtos</Link>
              </Button>
            </>
          }
          side={<EmpresaSidePanel />}
        />

        {/* Value props ====================== */}
        <section className="container-editorial section-y border-t border-[color:var(--color-border)]">
          <div className="grid gap-6 md:grid-cols-12 md:gap-12 md:items-end">
            <div className="md:col-span-7">
              <span className="text-eyebrow-bright">O que muda</span>
              <h2 className="text-headline mt-5 max-w-[16ch]">
                Três coisas que você não tem hoje.
              </h2>
            </div>
            <p className="text-body md:col-span-5">
              Não vendemos uma plataforma. Vendemos uma operação completa de
              ESG com universidade, território e auditoria embutidos.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-3">
            {valueProps.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-7">
                <Icon className="size-7 text-[color:var(--color-leaf)]" strokeWidth={1.5} />
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

        {/* Fluxo ============================ */}
        <section className="surface-paper-2 border-y border-[color:var(--color-border)] section-y">
          <div className="container-editorial">
            <div className="max-w-2xl">
              <span className="text-eyebrow">Fluxo operacional</span>
              <h2 className="text-headline mt-5">
                Do brief ao relatório em 4 passos legíveis.
              </h2>
            </div>

            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-2 lg:grid-cols-4">
              {flow.map(({ n, label, title, body }) => (
                <li key={n} className="bg-white p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    <Badge variant="leaf">{label}</Badge>
                    <span className="font-mono text-xs font-semibold text-[color:var(--color-ink-4)]">
                      {n}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-xl font-bold leading-snug tracking-[-0.02em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Produtos ========================= */}
        <section id="produtos" className="container-editorial section-y">
          <div className="grid gap-6 md:grid-cols-12 md:gap-12 md:items-end">
            <div className="md:col-span-7">
              <span className="text-eyebrow-bright">Produtos</span>
              <h2 className="text-headline mt-5 max-w-[14ch]">
                Dois formatos. Buyer escolhe.
              </h2>
            </div>
            <p className="text-body md:col-span-5">
              Pilot para validar. Managed Squad para escalar. Em ambos: brief,
              shortlist, squad, sprint, relatório.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {products.map(p => (
              <ProductDetail key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* Provas ========================== */}
        <section className="surface-ink section-y border-y border-white/10">
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
              <div className="lg:col-span-5">
                <span className="text-eyebrow text-white/55">Provas</span>
                <h2 className="text-headline mt-5 text-white">
                  O modelo está sendo construído com transparência.
                </h2>
                <p className="text-body mt-7 text-white/72">
                  Cada formato gera métricas auditáveis desde o primeiro pilot.
                  Pediu, entregou, documentou.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-px bg-white/12 sm:grid-cols-2">
                  {proof.map(p => (
                    <div key={p.label} className="bg-[color:var(--color-ink)] p-7">
                      <p className="text-numeric text-[color:var(--color-leaf-bright)]">
                        {p.value}
                      </p>
                      <p className="mt-4 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/55">
                        {p.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Garantias ======================= */}
        <section className="container-editorial section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="text-eyebrow-bright">Garantias</span>
              <h2 className="text-headline mt-5">O que entra no contrato.</h2>
              <p className="text-body mt-7 max-w-md">
                Sem letra miúda. As regras do squad estão na proposta — antes
                de assinar.
              </p>
            </div>
            <ul className="grid gap-3 lg:col-span-7">
              {guarantees.map((g, i) => (
                <motion.li
                  key={g}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={editorialViewport}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: editorialEase }}
                  className="flex items-start gap-4 border-b border-[color:var(--color-border)] pb-5 last:border-b-0"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[color:var(--color-leaf)]" />
                  <p className="text-base font-medium leading-relaxed text-[color:var(--color-ink)]">
                    {g}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA ============================= */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-leaf rounded-3xl p-10 md:p-14 lg:p-16">
            <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <div className="md:col-span-7">
                <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Próximo passo
                </span>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
                  Envie o brief. Receba shortlist em 72h.
                </h2>
              </div>
              <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
                <Link
                  href="/auth/empresa"
                  className="btn-base min-h-13 w-full justify-between bg-white text-[color:var(--color-ink)] hover:bg-[color:var(--color-paper)]"
                >
                  Ser early adopter
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/quem-somos/impacto"
                  className="btn-base min-h-13 w-full justify-between border border-white/30 bg-white/5 text-white hover:bg-white hover:text-[color:var(--color-ink)]"
                >
                  Ver camada de evidência
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
