import { motion } from "framer-motion";
import {
  editorialViewport,
  fadeUpTarget,
  fadeUpVariants,
  staggerContainer,
} from "@/lib/motion";

const universityCells = [
  {
    code: "01",
    name: "Extensão",
    fullName: "Projetos reais conectados ao currículo",
  },
  {
    code: "02",
    name: "NDE",
    fullName: "Evidências e relatórios para coordenação",
  },
  {
    code: "03",
    name: "Inovação",
    fullName: "Parcerias com desafios de empresas",
  },
  {
    code: "04",
    name: "Polos",
    fullName: "Distribuição regional de talento e oferta",
  },
  {
    code: "05",
    name: "Labs",
    fullName: "Ligação entre pesquisa aplicada e mercado",
  },
  {
    code: "06",
    name: "Carreiras",
    fullName: "Empregabilidade e portfólio observável",
  },
];

const containerVariants = staggerContainer(0.08);
const itemVariants = fadeUpVariants(16, 0.45);

const UniversityPartnersSection = () => {
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
            REDE_ACADÊMICA // SUPPLY_UNIVERSITÁRIO
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Camada universitária pronta para
            <span className="font-light italic text-[--leaf]"> escala</span>.
          </h2>
          <p className="mt-6 font-sans text-[15px] font-medium leading-relaxed text-[--ink]/40">
            O papel da universidade não é figurativo. Ela entra como canal de
            supply, prova institucional e operação de extensão.
          </p>
        </motion.div>

        {/* Cells Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={editorialViewport}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        >
          {universityCells.map((cell, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group aspect-square cursor-default border border-white/[0.05] p-6 flex flex-col items-start justify-between hover:bg-white/[0.018] transition-colors duration-300"
              style={{ borderLeft: index > 0 ? "none" : undefined }}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/20">
                {cell.code}
              </span>
              <div>
                <p className="font-display text-[1.1rem] font-bold tracking-tight text-[--ink] group-hover:text-[--leaf] transition-colors leading-tight">
                  {cell.name}
                </p>
                <p className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[--ink]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                  {cell.fullName}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UniversityPartnersSection;
