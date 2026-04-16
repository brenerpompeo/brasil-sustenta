import { motion } from "framer-motion";
import { GraduationCap, Quote } from "lucide-react";

const universities = [
  "PUC-Campinas",
  "UNICAMP",
  "USP",
  "UFRJ",
  "Mackenzie",
  "ESPM",
  "FGV",
  "Insper",
];

const testimonials = [
  {
    quote:
      "A plataforma resolveu um problema que a gente tentava resolver há 2 anos: conectar metas ESG com execução real, sem virar consultoria pesada.",
    author: "Diretora de ESG",
    org: "Multinacional de Bens de Consumo",
    color: "#00FF85",
  },
  {
    quote:
      "Pela primeira vez os alunos saíram da extensão com portfólio de entrega corporativa, não só horas complementares.",
    author: "Coordenador de Extensão",
    org: "PUC-Campinas",
    color: "#2E5BFF",
  },
  {
    quote:
      "Entrei no squad como designer e saí com repertório de ESG, pitch e produto. Nenhum estágio me deu isso.",
    author: "Talento — Design",
    org: "Squad Box #14",
    color: "#F5FF00",
  },
];

const SocialProofSection = () => {
  return (
    <section className="relative z-10 overflow-hidden border-t border-black/8 bg-[--paper]">
      {/* Universities marquee */}
      <div className="overflow-hidden border-b border-black/8 py-10">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...universities, ...universities].map((uni, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <GraduationCap className="h-4 w-4 text-[--ink]/15" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[--ink]/20">
                {uni}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials grid */}
      <div className="grid grid-cols-1 divide-y divide-black/8 border-b border-black/8 md:grid-cols-3 md:divide-x md:divide-y-0">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.55 }}
            className="group relative flex flex-col justify-between bg-white p-12 transition-colors hover:bg-black/[0.02] lg:p-16"
          >
            {/* Quote icon */}
            <div
              className="mb-10 flex h-12 w-12 items-center justify-center rounded-[1rem] border border-black/8 bg-[--paper-2]"
              style={{ color: t.color }}
            >
              <Quote className="h-5 w-5" />
            </div>

            {/* Quote text */}
            <blockquote className="mb-12 font-display text-xl font-bold italic leading-snug text-[--ink]/70 lg:text-2xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="border-t border-black/8 pt-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[--ink]/40">
                {t.author}
              </p>
              <p
                className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: `${t.color}88` }}
              >
                {t.org}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialProofSection;
