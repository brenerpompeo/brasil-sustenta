import { motion } from "framer-motion";
import { ArrowRight, Check, School, Sparkles, Target } from "lucide-react";
import { Link } from "wouter";
import {
  editorialViewport,
  fadeUpTarget,
  fadeUpVariants,
  staggerContainer,
} from "@/lib/motion";

const impactModels = [
  {
    code: "01",
    label: "ENTRADA // PILOT_PROJECT",
    title: "Valide um desafio com escopo enxuto e time sob medida.",
    description:
      "Entrada ideal para lideranças de ESG, RH ou inovação que precisam provar valor sem começar com uma operação grande.",
    includes: [
      "1 brief priorizado",
      "Shortlist com justificativa de fit",
      "Squad piloto com kickoff e sprint curta",
      "Relatório executivo final",
    ],
    href: "/auth/empresa",
    cta: "Solicitar piloto",
    highlight: "PERFEITO PARA PRIMEIRA COMPRA",
    icon: Target,
    featured: false,
  },
  {
    code: "02",
    label: "ENTRADA // MANAGED_SQUAD",
    title: "Transforme uma frente recorrente em operação acompanhada.",
    description:
      "Para empresas que já querem fluxo contínuo de squads, checkpoints, dados e maior integração com times internos.",
    includes: [
      "Múltiplos desafios ou sprints",
      "Curadoria recorrente",
      "Trilha de evidências e monitoramento",
      "Camada para RH, ESG e inovação no mesmo fluxo",
    ],
    href: "/para-empresas",
    cta: "Ver modelo gerenciado",
    highlight: "CATEGORIA MAIS ESCALÁVEL DA PLATAFORMA",
    icon: Sparkles,
    featured: true,
  },
  {
    code: "03",
    label: "ENTRADA // UNIVERSITY_PARTNER",
    title: "Ative extensão, empregabilidade e projetos reais na sua IES.",
    description:
      "Oferta institucional para universidades que querem levar desafios reais ao currículo com mais dados e menos atrito operacional.",
    includes: [
      "Onboarding institucional",
      "Mapeamento de cursos e talentos",
      "Relatórios de participação e horas",
      "Canal dedicado com empresas parceiras",
    ],
    href: "/para-universidades",
    cta: "Abrir parceria institucional",
    highlight: "ENTRADA DEDICADA PARA EXTENSÃO E COORDENAÇÃO",
    icon: School,
    featured: false,
  },
];

const containerVariants = staggerContainer(0.12);
const itemVariants = fadeUpVariants(24, 0.55);

const ImpactModelSection = () => {
  return (
    <section
      id="ofertas"
      className="border-t border-white/[0.05] bg-[--paper] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={fadeUpTarget()}
          viewport={editorialViewport}
          className="mb-20 max-w-2xl"
        >
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
            OFERTAS // TRÊS_PORTAS_DE_ENTRADA
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            A mesma tese, em três
            <span className="font-light italic text-[--leaf]">
              {" "}
              portas de entrada
            </span>
            .
          </h2>
          <p className="mt-6 font-sans text-[15px] font-medium leading-relaxed text-[--ink]/40">
            A clareza da oferta importa tanto quanto a clareza da categoria.
            Cada modelo tem buyer, escopo e promessa definidos.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={editorialViewport}
          className="grid gap-0 lg:grid-cols-3"
        >
          {impactModels.map((model, index) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.code}
                variants={itemVariants}
                className="flex flex-col border border-white/[0.05] p-10 hover:bg-white/[0.018] transition-colors duration-300"
                style={{
                  borderLeft: index > 0 ? "none" : undefined,
                  ...(model.featured
                    ? {
                        borderColor: "rgba(0,255,133,0.12)",
                        background: "rgba(0,255,133,0.025)",
                      }
                    : {}),
                }}
              >
                {/* Code + Icon */}
                <div className="mb-6 flex items-start justify-between">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                    {model.label}
                  </p>
                  <div
                    className="flex h-10 w-10 items-center justify-center border border-white/[0.07]"
                    style={{
                      color: model.featured ? "var(--leaf)" : "var(--ink)",
                    }}
                  >
                    <Icon className="h-5 w-5 opacity-60" />
                  </div>
                </div>

                {/* Highlight */}
                <div
                  className="mb-6 border px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.22em]"
                  style={
                    model.featured
                      ? {
                          borderColor: "rgba(0,255,133,0.25)",
                          color: "var(--leaf)",
                        }
                      : {
                          borderColor: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.25)",
                        }
                  }
                >
                  {model.highlight}
                </div>

                {/* Title */}
                <h3 className="mb-4 font-display text-[1.35rem] font-bold leading-tight tracking-tight text-[--ink]">
                  {model.title}
                </h3>

                <p className="mb-8 font-sans text-[14px] leading-relaxed text-[--ink]/50">
                  {model.description}
                </p>

                {/* Includes */}
                <ul className="mb-10 space-y-3">
                  {model.includes.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center border"
                        style={
                          model.featured
                            ? {
                                borderColor: "rgba(0,255,133,0.4)",
                                color: "var(--leaf)",
                              }
                            : {
                                borderColor: "rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.3)",
                              }
                        }
                      >
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span className="font-sans text-[13px] font-medium leading-relaxed text-[--ink]/60">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={model.href}
                  className="mt-auto inline-flex h-11 cursor-pointer items-center justify-center gap-2 border font-mono text-[11px] font-black uppercase tracking-[0.2em] transition-colors"
                  style={
                    model.featured
                      ? {
                          borderColor: "var(--leaf)",
                          background: "var(--leaf)",
                          color: "var(--paper)",
                          boxShadow: "0 0 24px rgba(0,255,133,0.22)",
                        }
                      : {
                          borderColor: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.5)",
                        }
                  }
                >
                  {model.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactModelSection;
