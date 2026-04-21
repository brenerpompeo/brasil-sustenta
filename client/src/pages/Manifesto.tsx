import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const declarations = [
  {
    n: "01",
    title: "ESG não é selo. É operação.",
    body: "Relatório frio, greenwashing e ações sem desenho de produto não resolvem nada. Brasil Sustenta está construindo a operação que torna ESG auditável: squad, sprint, evidência e relatório por entrega.",
  },
  {
    n: "02",
    title: "IA é artefato visível, não promessa.",
    body: "ODS Fit Score é decomposto em Skills + ODS + Contexto. Você sempre vê por que o match faz sentido. Sem caixa-preta, sem promessa de magia.",
  },
  {
    n: "03",
    title: "Universidade é capital intelectual.",
    body: "Squads universitários competem com consultorias em entrega — e em custo. A juventude não é estagiária. É operadora.",
  },
  {
    n: "04",
    title: "Território é infraestrutura.",
    body: "HUBs locais conectam universidades, empresas e prefeituras na mesma cidade. Território não entra como pano de fundo — entra como motor.",
  },
  {
    n: "05",
    title: "Anti-greenwashing por design.",
    body: "Cada entrega tem trilha de evidência por checkpoint. Sem proof, sem squad. Sem squad, sem produto.",
  },
  {
    n: "06",
    title: "Brasil pode liderar essa categoria.",
    body: "Estamos criando o protocolo brasileiro de ESG operacional, a partir de Campinas. Pode ser exportado para o mundo. Mas começa na nossa cidade, na nossa universidade, no nosso jovem.",
  },
];

export default function Manifesto() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)]">
      <SEO
        title="Manifesto — Brasil Sustenta"
        description="Seis declarações operacionais. ESG vira operação, IA vira artefato, território vira infraestrutura."
      />
      <Header />

      <main className="pt-16 md:pt-18">
        <PageHero
          eyebrow="Manifesto · 2026"
          variant="paper"
          title={
            <>
              ESG não é{" "}
              <span className="line-through decoration-[color:var(--color-leaf)] decoration-4">
                relatório.
              </span>{" "}
              É operação.
            </>
          }
          lede="Seis declarações operacionais. Não é manifesto poético. É contrato de princípios para todo squad, todo brief, toda entrega da rede Brasil Sustenta."
          actions={
            <Button asChild size="xl" variant="leaf">
              <Link href="/auth/empresa">
                Operar com a gente
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        {/* Declarations ========== */}
        <section className="container-editorial section-y border-t border-[color:var(--color-border)]">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-2">
            {declarations.map(d => (
              <li key={d.n} className="bg-white p-8 md:p-10">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-leaf)]">
                  Declaração {d.n}
                </span>
                <h3 className="mt-6 font-display text-3xl font-bold leading-tight tracking-[-0.025em]">
                  {d.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[color:var(--color-ink-3)]">
                  {d.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Pull quote =========== */}
        <section className="surface-ink section-y border-y border-white/10">
          <div className="container-editorial">
            <Quote
              className="mx-auto size-12 text-[color:var(--color-leaf-bright)]"
              strokeWidth={1.5}
            />
            <blockquote className="mx-auto mt-7 max-w-4xl text-center font-display text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              "Quando a universidade entra como capital intelectual e o
              território como infraestrutura, ESG deixa de ser narrativa
              corporativa e vira{" "}
              <span className="text-[color:var(--color-leaf-bright)]">
                operação pública e privada coordenada.
              </span>
              "
            </blockquote>
            <p className="mt-7 text-center font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/55">
              Brasil Sustenta · Carta-fundação
            </p>
          </div>
        </section>

        {/* Convite final ======== */}
        <section className="container-editorial pb-16 md:pb-24">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                label: "Sou empresa",
                title: "Quero escalar ESG via squad.",
                href: "/para-empresas",
                surface: "surface-leaf",
              },
              {
                label: "Sou jovem",
                title: "Quero deixar rastro de entrega.",
                href: "/para-jovens",
                surface: "surface-sun",
              },
              {
                label: "Sou universidade",
                title: "Quero ativar meu campus.",
                href: "/para-universidades",
                surface: "surface-clay",
              },
              {
                label: "Sou prefeitura",
                title: "Quero programa municipal ODS.",
                href: "/para-prefeituras",
                surface: "surface-atlantic",
              },
            ].map(c => (
              <Link
                key={c.href}
                href={c.href}
                className={`${c.surface} group flex flex-col justify-between rounded-2xl p-8 transition-transform hover:-translate-y-1 md:p-10`}
              >
                <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] opacity-70">
                  {c.label}
                </span>
                <div className="mt-12">
                  <h3 className="font-display text-3xl font-bold leading-tight tracking-[-0.025em]">
                    {c.title}
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Entrar
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
