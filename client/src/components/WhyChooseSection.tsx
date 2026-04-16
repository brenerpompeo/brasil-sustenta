import { motion } from "framer-motion";
import { BrainCircuit, ShieldCheck, Workflow } from "lucide-react";
import {
  editorialViewport,
  fadeInTarget,
  fadeUpTarget,
  fadeUpVariants,
  staggerContainer,
} from "@/lib/motion";

const benefits = [
  {
    icon: BrainCircuit,
    label: "MATCHING // IA_EXPLICAVEL",
    title: "Motor de Matching IA que justifica o fit",
    description:
      "O Brasil Sustenta não só ranqueia. Ele mostra porque aquele talento e aquele squad fazem sentido para aquele desafio. Sem caixa-preta.",
    accent: "var(--leaf)",
  },
  {
    icon: Workflow,
    label: "ENTREGA // SQUAD_BOX",
    title: "Entrega Auditável em formato Squad Box",
    description:
      "A compra deixa de ser vaga ou consultoria aberta. A empresa recebe um time montado, um ritmo de execução e uma trilha de entregas com checkpoints reais.",
    accent: "var(--sky)",
  },
  {
    icon: ShieldCheck,
    label: "PROVA // GRI_TCFD",
    title: "Prova ESG sem greenwashing",
    description:
      "Brief, sprints, evidências e relatório final tornam a narrativa de impacto concreta para stakeholders internos e externos. GRI/TCFD ready.",
    accent: "var(--sun)",
  },
];

const containerVariants = staggerContainer(0.12);
const itemVariants = fadeUpVariants(24, 0.55);

const WhyChooseSection = () => {
  return (
    <section className="border-t border-white/[0.05] bg-[--paper] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={fadeUpTarget()}
          viewport={editorialViewport}
          className="mb-20 max-w-2xl"
        >
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
            CATEGORIA // POR_QUE_IMPORTA
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Não é job board.
            <br />
            Não é consultoria.
            <br />É uma camada de
            <span className="font-light italic text-[--leaf]"> execução</span>.
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={editorialViewport}
          className="mb-20 grid grid-cols-1 gap-0 md:grid-cols-3"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group border border-white/[0.05] p-10 hover:bg-white/[0.018] transition-colors duration-300"
                style={{ borderLeft: index > 0 ? "none" : undefined }}
              >
                <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                  {benefit.label}
                </p>
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center border border-white/[0.07]"
                  style={{ color: benefit.accent }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 font-display text-[1.35rem] font-bold leading-tight tracking-tight text-[--ink]">
                  {benefit.title}
                </h3>
                <p className="font-sans text-[14px] font-medium leading-relaxed text-[--ink]/50">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom manifest strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={fadeInTarget(0.2, 0.6)}
          viewport={editorialViewport}
          className="border border-white/[0.05] px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="h-2 w-2 flex-shrink-0 bg-[--leaf] shadow-[0_0_8px_rgba(0,255,133,0.6)]" />
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[--ink]/50">
            Comprável por{" "}
            <span className="text-[--leaf]">RH, ESG ou Inovação</span> — sem
            mudar a tese do produto
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
