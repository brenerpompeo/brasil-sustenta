import { Database, Network, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { editorialViewport, fadeUpTarget } from "@/lib/motion";

const phases = [
  {
    phase: "01",
    label: "INGESTÃO",
    title: "Mapeamento",
    description:
      "A empresa publica o desafio com ODS, escopo e budget. A IA mapeia a rede de talentos e gera shortlist com fit score explicável.",
    icon: Database,
    color: "#2E5BFF",
  },
  {
    phase: "02",
    label: "DEPLOY",
    title: "Execução",
    description:
      "A curadoria humana compõe o squad multidisciplinar. Kickoff, checkpoints, sprints e acompanhamento com entregáveis parciais.",
    icon: Network,
    color: "#F5FF00",
  },
  {
    phase: "03",
    label: "SCALE",
    title: "Soberania",
    description:
      "Empresa recebe relatório executivo com trilha de evidência. Sinais para hiring, compliance GRI/TCFD e impacto mensurável.",
    icon: Activity,
    color: "#00FF85",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative z-10 border-t border-black/8 bg-[--paper]">
      <div className="grid grid-cols-1 divide-y divide-black/8 border-b border-black/8 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {phases.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 24 }}
              whileInView={fadeUpTarget(i * 0.12, 24)}
              viewport={editorialViewport}
              className="group relative bg-white p-12 transition-all duration-300 hover:bg-black/[0.02] lg:p-16"
            >
              {/* Progress bar on hover */}
              <div
                className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                style={{ backgroundColor: p.color }}
              />

              {/* Icon + phase label */}
              <div className="mb-12 flex items-center justify-between">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-black/8 bg-[--paper-2]"
                  style={{ color: p.color }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]"
                  style={{ color: p.color }}
                >
                  PHASE_{p.phase} // {p.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-8 font-display text-4xl font-black italic lg:text-5xl">
                {p.title}
              </h3>

              {/* Description */}
              <p className="font-body text-base leading-relaxed text-[--ink]/40 lg:text-lg">
                {p.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorksSection;
