import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Leaf,
  Heart,
  MonitorPlay,
  Users,
  Droplets,
  Zap,
  Briefcase,
  Factory,
  Scale,
  Building2,
  Recycle,
  CloudRain,
  Fish,
  TreePine,
  Shield,
  Network,
  Handshake,
} from "lucide-react";
import {
  editorialViewport,
  fadeInTarget,
  fadeUpTarget,
  scaleInVariants,
  staggerContainer,
} from "@/lib/motion";

export const ODS_DATA = [
  { id: 1, color: "#E5243B", title: "Erradicação da Pobreza", Icon: Target },
  { id: 2, color: "#DDA63A", title: "Fome Zero", Icon: Leaf },
  { id: 3, color: "#4C9F38", title: "Saúde e Bem-Estar", Icon: Heart },
  {
    id: 4,
    color: "#C5192D",
    title: "Educação de Qualidade",
    Icon: MonitorPlay,
  },
  { id: 5, color: "#FF3A21", title: "Igualdade de Gênero", Icon: Users },
  { id: 6, color: "#26BDE2", title: "Água Potável", Icon: Droplets },
  { id: 7, color: "#FCC30B", title: "Energia Limpa", Icon: Zap },
  { id: 8, color: "#A21942", title: "Trabalho Decente", Icon: Briefcase },
  { id: 9, color: "#FD6925", title: "Indústria e Inovação", Icon: Factory },
  { id: 10, color: "#DD1367", title: "Redução das Desigualdades", Icon: Scale },
  { id: 11, color: "#FD9D24", title: "Cidades Sustentáveis", Icon: Building2 },
  { id: 12, color: "#BF8B2E", title: "Consumo Responsável", Icon: Recycle },
  { id: 13, color: "#3F7E44", title: "Ação Climática", Icon: CloudRain },
  { id: 14, color: "#0A97D9", title: "Vida na Água", Icon: Fish },
  { id: 15, color: "#56C02B", title: "Vida Terrestre", Icon: TreePine },
  { id: 16, color: "#00689D", title: "Paz e Justiça", Icon: Shield },
  { id: 17, color: "#19486A", title: "Parcerias Inovadoras", Icon: Network },
  { id: 18, color: "#1D1D1B", title: "Igualdade Racial", Icon: Handshake },
];

const containerVariants = staggerContainer(0.04);
const itemVariants = scaleInVariants(0.95, 0.4);

const ODSSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="border-t border-white/[0.05] bg-[--paper] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={fadeUpTarget()}
            viewport={editorialViewport}
            className="max-w-xl"
          >
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
              ODS_SCORE_ENGINE // AGENDA_2030
            </p>
            <h2
              className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
            >
              Integração aos 18 Objetivos de
              <span className="font-light italic text-[--leaf]">
                {" "}
                Desenvolvimento Sustentável
              </span>
              .
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={fadeInTarget(0.15)}
            viewport={editorialViewport}
            className="max-w-sm"
          >
            <p className="border-l-2 border-[--leaf]/30 pl-4 font-sans text-[14px] font-medium leading-relaxed text-[--ink]/40">
              Nossa abordagem potencializa as diretrizes globais de
              sustentabilidade, conectando talentos a empresas comprometidas com{" "}
              <span className="text-[--ink]/70">Valor Compartilhado</span>.
            </p>
          </motion.div>
        </div>

        {/* ODS Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={editorialViewport}
          className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9"
        >
          {ODS_DATA.map(ods => {
            const isHovered = hoveredId === ods.id;
            return (
              <motion.div
                key={ods.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(ods.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative aspect-square cursor-pointer overflow-hidden border border-white/[0.05] transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? ods.color : "transparent",
                  borderColor: isHovered ? `${ods.color}60` : undefined,
                }}
              >
                <div className="absolute inset-0 flex flex-col items-start justify-between p-3">
                  <span
                    className="font-mono text-[11px] font-bold transition-colors"
                    style={{
                      color: isHovered
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {String(ods.id).padStart(2, "0")}
                  </span>
                  <div className="w-full">
                    <div
                      className="mb-2 transition-colors"
                      style={{
                        color: isHovered ? "rgba(255,255,255,0.9)" : ods.color,
                        opacity: isHovered ? 1 : 0.7,
                      }}
                    >
                      <ods.Icon
                        className="h-5 w-5"
                        strokeWidth={isHovered ? 2.5 : 1.5}
                      />
                    </div>
                    <h3
                      className="text-[9px] font-bold uppercase leading-tight tracking-wide transition-colors line-clamp-2"
                      style={{
                        color: isHovered
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {ods.title}
                    </h3>
                  </div>
                </div>
                {/* Ghost number */}
                <span className="pointer-events-none absolute -bottom-3 -right-2 select-none font-display text-[5rem] font-black opacity-[0.04] text-white group-hover:opacity-[0.08] transition-opacity">
                  {ods.id}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ODSSection;
