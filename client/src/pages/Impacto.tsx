import { ArrowRight, BarChart3, FileCheck2, Target } from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { hubs } from "@/lib/hubs";

const odsCovered = [4, 7, 8, 11, 12, 13, 15, 17];

const layers = [
  {
    icon: Target,
    title: "Camada 1 — Alinhamento ODS",
    body: "Cada brief é mapeado em 1 a 3 ODS prioritários. Cada talento tem seu portfolio mapeado nos mesmos eixos.",
  },
  {
    icon: BarChart3,
    title: "Camada 2 — Métricas operacionais",
    body: "Squad ativo, sprint em andamento, checkpoints validados, horas de extensão registradas — tudo em dashboard.",
  },
  {
    icon: FileCheck2,
    title: "Camada 3 — Relatório auditável",
    body: "Ao final, dossiê com artefatos entregues, metas atingidas, ODS impactados e avaliações cruzadas.",
  },
];

export default function Impacto() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Impacto — Brasil Sustenta"
        description="Camada de evidência: como medimos, ODS atendidos e relatório auditável por entrega."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="Camada de evidência"
          variant="paper"
          title={
            <>
              Impacto que se{" "}
              <span className="italic text-[color:var(--color-leaf)]">
                audita
              </span>
              .
            </>
          }
          lede="Cada squad rodado deixa três camadas de evidência: alinhamento ODS, métricas operacionais e relatório auditável. Sem proof, sem entrega."
          actions={
            <Button asChild size="xl" variant="leaf">
              <Link href="/auth/empresa">
                Ver no contrato
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        {/* 3 camadas =========== */}
        <section className="container-editorial section-y border-t border-[color:var(--color-border)]">
          <div className="max-w-2xl">
            <span className="text-eyebrow-bright">3 camadas</span>
            <h2 className="text-headline mt-5">
              Como construímos evidência em cada projeto.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-3">
            {layers.map(({ icon: Icon, title, body }) => (
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

        {/* ODS covered ========== */}
        <section className="surface-paper-2 border-y border-[color:var(--color-border)] section-y">
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <span className="text-eyebrow">ODS em rotação</span>
                <h2 className="text-headline mt-5 max-w-[14ch]">
                  Os 8 ODS mais tocados.
                </h2>
                <p className="text-body mt-7 max-w-md">
                  A rede pode operar nos 17 ODS, mas naturalmente concentra
                  nos 8 mais demandados pelo buyer corporativo brasileiro.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-4 gap-3">
                  {odsCovered.map(n => (
                    <div
                      key={n}
                      className="aspect-square flex items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-white"
                    >
                      <span className="font-display text-3xl font-bold text-[color:var(--color-ink)]">
                        {n}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hubs ativos com métricas ===== */}
        <section className="container-editorial section-y">
          <div className="max-w-2xl">
            <span className="text-eyebrow-bright">Métricas territoriais</span>
            <h2 className="text-headline mt-5">
              Impacto distribuído por HUB.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hubs.slice(0, 3).map(hub => (
              <div
                key={hub.id}
                className="rounded-2xl border border-[color:var(--color-border)] bg-white p-7"
              >
                <p className="text-eyebrow">HUB {hub.name}</p>
                <p className="mt-3 font-display text-3xl font-bold tracking-[-0.025em]">
                  {hub.specialty}
                </p>
                <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-[color:var(--color-border)] pt-5">
                  {[
                    { v: hub.stats.talentos, l: "Talentos" },
                    { v: hub.stats.empresas, l: "Empresas" },
                    { v: hub.stats.projetos, l: "Projetos" },
                  ].map(s => (
                    <div key={s.l}>
                      <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-4)]">
                        {s.l}
                      </dt>
                      <dd className="mt-1 font-display text-xl font-bold leading-none">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="surface-leaf rounded-3xl p-10 md:p-14">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
              Faça parte da próxima rodada.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/empresa"
                className="btn-base min-h-13 bg-white text-[color:var(--color-ink)] hover:bg-[color:var(--color-paper)]"
              >
                Sou empresa
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/auth/jovem"
                className="btn-base min-h-13 border border-white/30 bg-white/5 text-white hover:bg-white hover:text-[color:var(--color-ink)]"
              >
                Sou talento
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
