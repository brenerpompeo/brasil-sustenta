import { ArrowRight, ArrowUpRight, Network, ScrollText, Target } from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const dna = [
  {
    icon: Target,
    title: "Tese central",
    body: "ESG escala como operação, não como relatório. Squad universitário, território e evidência por entrega.",
  },
  {
    icon: Network,
    title: "Quádrupla hélice",
    body: "Empresa, juventude, universidade e prefeitura como partes do mesmo sistema operacional.",
  },
  {
    icon: ScrollText,
    title: "Categoria nova",
    body: "Não somos consultoria, job board ou ONG. Criamos a infraestrutura ESG-territorial brasileira.",
  },
];

const pathways = [
  {
    title: "Manifesto",
    body: "Seis declarações operacionais que organizam squad, brief e entrega.",
    href: "/quem-somos/manifesto",
  },
  {
    title: "Impacto",
    body: "Camada de evidência: como medimos, ODS e relatório auditável.",
    href: "/quem-somos/impacto",
  },
  {
    title: "Stakeholders",
    body: "Quem entra na rede e quais valores cada parte recebe.",
    href: "/quem-somos/stakeholders",
  },
  {
    title: "HUBs",
    body: "Mapa territorial com polos em abertura, planejamento e expansão.",
    href: "/quem-somos/hubs",
  },
];

export default function QuemSomos() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Quem somos — Brasil Sustenta"
        description="DNA, tese e arquitetura do Brasil Sustenta. Uma rede que conecta empresa, juventude, universidade e prefeitura em operação ESG real."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="DNA da rede"
          variant="paper"
          title={
            <>
              Uma rede para transformar impacto em{" "}
              <span className="italic text-[color:var(--color-leaf)]">
                operação
              </span>
              .
            </>
          }
          lede="O Brasil Sustenta organiza empresa, juventude universitária, campus e prefeitura em torno de uma mesma lógica: problemas reais entram, squads são montados com contexto e o resultado precisa ser legível para quem decide, executa e acompanha."
          actions={
            <>
              <Button asChild size="xl" variant="default">
                <Link href="/quem-somos/manifesto">
                  Ler manifesto
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/quem-somos/impacto">Ver impacto</Link>
              </Button>
            </>
          }
        />

        {/* DNA ================ */}
        <section className="container-editorial section-y border-t border-[color:var(--color-border)]">
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
            <div className="md:col-span-7">
              <span className="text-eyebrow-bright">O que sustenta</span>
              <h2 className="text-headline mt-5 max-w-[16ch]">
                Três pilares de tese.
              </h2>
            </div>
            <p className="text-body md:col-span-5">
              A rede não é institucional decorativa. É operação coordenada
              entre quatro persona-mercado.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-3">
            {dna.map(({ icon: Icon, title, body }) => (
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

        {/* Pathways ============ */}
        <section className="surface-paper-2 border-y border-[color:var(--color-border)] section-y">
          <div className="container-editorial">
            <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
              <div className="md:col-span-7">
                <span className="text-eyebrow">Arquitetura pública</span>
                <h2 className="text-headline mt-5 max-w-[18ch]">
                  Navegue pela rede em camadas.
                </h2>
              </div>
              <p className="text-body md:col-span-5">
                Cada página aprofunda uma parte da mesma arquitetura — tese,
                evidência, atores e território.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {pathways.map(p => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="surface-card group flex h-full flex-col rounded-2xl p-7 transition hover:-translate-y-1"
                >
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.025em]">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                    {p.body}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-ink)]">
                    Abrir seção
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
