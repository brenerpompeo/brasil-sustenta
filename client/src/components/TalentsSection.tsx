import { motion } from "framer-motion";
import { BarChart3, Lightbulb, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import {
  editorialViewport,
  fadeInTarget,
  fadeUpTarget,
  fadeUpVariants,
  staggerContainer,
} from "@/lib/motion";

const talents = [
  {
    label: "PERFIL // DADOS_E_INDICADORES",
    title: "Pesquisa, dados e indicadores",
    context:
      "Administração, economia, engenharia, relações internacionais e áreas correlatas.",
    skills: ["Benchmark", "Pesquisa aplicada", "Indicadores", "Análise ESG"],
    bio: "Transformam desafios abertos em hipóteses, leituras de mercado, estrutura de indicadores e recomendações práticas.",
    icon: BarChart3,
  },
  {
    label: "PERFIL // PRODUTO_E_UX",
    title: "Produto, UX e operação",
    context: "Design, computação, produto, service design e tecnologia.",
    skills: ["UX", "Prototipagem", "Fluxos", "Solução digital"],
    bio: "Estruturam jornadas, protótipos, interfaces e operações capazes de levar a tese de impacto para a experiência real.",
    icon: Lightbulb,
  },
  {
    label: "PERFIL // NARRATIVA_E_ENGAJAMENTO",
    title: "Narrativa, comunicação e engajamento",
    context:
      "Comunicação, publicidade, jornalismo, marketing e áreas criativas.",
    skills: ["Storytelling", "Conteúdo", "Marca", "Engajamento"],
    bio: "Traduzem metas e entregas em mensagem clara para stakeholders, comunidades, lideranças internas e empregabilidade do projeto.",
    icon: Megaphone,
  },
];

const containerVariants = staggerContainer(0.12);
const itemVariants = fadeUpVariants(24, 0.55);

const TalentsSection = () => {
  return (
    <section className="border-t border-white/[0.05] bg-[--paper] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={fadeUpTarget()}
            viewport={editorialViewport}
            className="max-w-2xl"
          >
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
              TALENTOS // QUÁDRUPLA_HÉLICE
            </p>
            <h2
              className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Os perfis que entram
              <span className="font-light italic text-[--leaf]"> em squad</span>
              .
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={fadeInTarget(0.15)}
            viewport={editorialViewport}
          >
            <Link
              href="/para-empresas"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 border border-[--leaf] bg-[--leaf] px-7 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[--paper] shadow-[0_0_24px_rgba(0,255,133,0.22)]"
            >
              Explorar formatos de squad
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Talents Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={editorialViewport}
          className="grid grid-cols-1 gap-0 md:grid-cols-3"
        >
          {talents.map((talent, index) => {
            const Icon = talent.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col border border-white/[0.05] p-8 hover:bg-white/[0.018] transition-colors duration-300"
                style={{ borderLeft: index > 0 ? "none" : undefined }}
              >
                {/* Label + Icon */}
                <div className="mb-6 flex items-start justify-between">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                    {talent.label}
                  </p>
                  <div className="flex h-10 w-10 items-center justify-center border border-white/[0.07] text-[--leaf]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-3 font-display text-[1.25rem] font-bold leading-tight tracking-tight text-[--ink]">
                  {talent.title}
                </h3>

                {/* Context */}
                <p className="mb-6 font-sans text-[13px] leading-relaxed text-[--ink]/40">
                  {talent.context}
                </p>

                {/* Skills */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {talent.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="border border-white/[0.07] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[--ink]/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p className="mt-auto border-t border-white/[0.05] pt-6 font-sans text-[13px] leading-relaxed text-[--ink]/50">
                  {talent.bio}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TalentsSection;
