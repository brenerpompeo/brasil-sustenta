import { motion } from "framer-motion";
import {
  Target,
  Heart,
  CheckCircle,
  MessageSquare,
  Briefcase,
  Palette,
  Lightbulb,
  Globe,
} from "lucide-react";
import {
  editorialViewport,
  fadeUpTarget,
  fadeUpVariants,
  staggerContainer,
} from "@/lib/motion";

const squads = [
  {
    icon: Target,
    code: "01",
    title: "ESG Core",
    desc: "Estratégias centrais de sustentabilidade e mapeamento de materialidade",
  },
  {
    icon: Heart,
    code: "02",
    title: "Sociedade",
    desc: "Diversidade, política pública, inclusão e ODS 10",
  },
  {
    icon: CheckCircle,
    code: "03",
    title: "Compliance ODS",
    desc: "Auditorias voltadas para métricas GRI/TCFD e Agenda 2030",
  },
  {
    icon: MessageSquare,
    code: "04",
    title: "Comunicação",
    desc: "Narrativa de impacto, branding e relatórios para Stakeholders",
  },
  {
    icon: Briefcase,
    code: "05",
    title: "Operações Verdes",
    desc: "Supply Chain sustentável e logística de baixo carbono",
  },
  {
    icon: Palette,
    code: "06",
    title: "UI/UX Impact",
    desc: "Design e interface para causas ambientais e sociais",
  },
  {
    icon: Lightbulb,
    code: "07",
    title: "Inovação Aberta",
    desc: "Design Thinking para novos produtos e serviços ESG",
  },
  {
    icon: Globe,
    code: "08",
    title: "Engenharia",
    desc: "Infraestrutura tecnológica escalável para impacto",
  },
];

const containerVariants = staggerContainer(0.07);
const itemVariants = fadeUpVariants(20, 0.5);

const SquadsSection = () => {
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
            SQUAD_BOX // FRENTES_DE_DESAFIO
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Soluções modeladas em
            <span className="font-light italic text-[--leaf]"> Squads</span>.
          </h2>
          <p className="mt-6 font-sans text-[15px] font-medium leading-relaxed text-[--ink]/40">
            O squad não nasce por área acadêmica isolada. Ele nasce pelo tipo de
            desafio que a empresa precisa destravar.
          </p>
        </motion.div>

        {/* Squads Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={editorialViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {squads.map((squad, index) => {
            const Icon = squad.icon;
            const isTopRow = index < 4;
            const isLastCol = (index + 1) % 4 === 0;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group border-b border-r border-white/[0.05] p-8 hover:bg-white/[0.018] transition-colors duration-300 cursor-default"
                style={{
                  borderRight: isLastCol ? "none" : undefined,
                  borderBottom: index >= 4 ? "none" : undefined,
                }}
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/20">
                    {squad.code}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center border border-white/[0.07] text-[--ink]/30 group-hover:text-[--leaf] transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mb-2 font-display text-[1.1rem] font-bold leading-tight tracking-tight text-[--ink]">
                  {squad.title}
                </h3>
                <p className="font-sans text-[12px] leading-relaxed text-[--ink]/40">
                  {squad.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SquadsSection;
