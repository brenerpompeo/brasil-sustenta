import { ArrowUpRight, BarChart3, Plus, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { editorialEase, fadeInTarget, fadeUpTarget } from "@/lib/motion";

const metrics = [
  { label: "Talent nodes", value: "12K", accent: "var(--leaf)" },
  { label: "ODS monitorados", value: "18", accent: "var(--sun)" },
  { label: "Shared value", value: "+4M", accent: "var(--sky)" },
  { label: "HUBs mapeados", value: "05", accent: "var(--ink)" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[--paper] pt-[calc(3.5rem+2.25rem)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,133,0.08),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(46,91,255,0.05),transparent_24%)]" />

      <div className="mx-auto max-w-[100rem] px-6 pb-10 sm:px-8 lg:px-16">
        <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="editorial-panel rounded-[2.5rem] px-8 py-10 lg:px-14 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={fadeUpTarget()}
              className="mb-10 flex items-center gap-6"
            >
              <div className="flex gap-1.5">
                <div className="h-[2px] w-10 bg-[--ink]" />
                <div className="h-[2px] w-10 bg-[--leaf]" />
                <div className="h-[2px] w-10 bg-[--sun]" />
              </div>
              <span className="editorial-kicker">
                Phase one // initialize impact
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={fadeUpTarget(0.08, 30, 0.7)}
              className="max-w-5xl font-display text-[clamp(4rem,10vw,8.8rem)] font-black italic leading-[0.78] tracking-[-0.06em] text-[--ink]"
            >
              Nova
              <br />
              Ordem
              <br />
              do{" "}
              <motion.span
                animate={{ y: [0, -4, 0], opacity: [1, 0.9, 1] }}
                transition={{
                  duration: 3.8,
                  ease: editorialEase,
                  repeat: Infinity,
                }}
                className="inline-block text-[--leaf-1]"
              >
                impacto.
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={fadeUpTarget(0.18, 22, 0.62)}
              className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto]"
            >
              <p className="max-w-2xl border-l-[3px] border-[--leaf] pl-6 text-lg font-medium leading-8 text-[--ink]/62 md:text-[1.2rem]">
                Convertendo capital intelectual universitario em infraestrutura
                regenerativa para soberania, empregabilidade e execucao com
                trilha de evidencia.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/para-empresas/publicar"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[--ink] px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-[--paper] transition-all hover:-translate-y-0.5 hover:bg-[--leaf-1]"
                >
                  Publicar desafio
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/para-jovens"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-[--ink] transition-all hover:-translate-y-0.5 hover:border-black/18 hover:bg-[--paper-2]"
                >
                  Entrar como talento
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, x: 26 }}
              animate={fadeUpTarget(0.14, 24, 0.62)}
              className="editorial-panel relative overflow-hidden rounded-[2.5rem] border border-black/8"
            >
              <div
                className="aspect-[4/4.2] w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(5,5,5,0.08), rgba(5,5,5,0.2)), url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
                  Cover story // squads universitarios
                </p>
                <p className="max-w-md font-display text-3xl font-black italic leading-[0.92]">
                  Editorial de impacto para redes, empresas e instituicoes.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={fadeUpTarget(0.24, 24, 0.55)}
                className="editorial-panel rounded-[2rem] px-6 py-7"
              >
                <span className="editorial-kicker text-[--leaf]">
                  [01] Talent nodes
                </span>
                <div className="mt-5 flex items-end gap-3">
                  <h3 className="font-display text-6xl font-black italic text-[--ink]">
                    12K
                  </h3>
                  <Plus className="mb-2 h-6 w-6 text-[--leaf]" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={fadeUpTarget(0.3, 24, 0.55)}
                className="editorial-panel rounded-[2rem] px-6 py-7"
              >
                <span className="editorial-kicker text-[--sun]">
                  [02] ODS coverage
                </span>
                <div className="mt-5 flex items-end gap-3">
                  <h3 className="font-display text-6xl font-black italic text-[--ink]">
                    18
                  </h3>
                  <Target className="mb-2 h-6 w-6 text-[--sun]" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={fadeUpTarget(0.36, 24, 0.55)}
                className="rounded-[2rem] bg-[--ink] px-6 py-7 text-[--paper]"
              >
                <span className="editorial-kicker text-white/48">
                  [03] Liquid impact
                </span>
                <div className="mt-5 flex items-end gap-3">
                  <h3 className="font-display text-6xl font-black italic text-white">
                    +4M
                  </h3>
                  <BarChart3 className="mb-2 h-6 w-6 text-[--leaf]" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={fadeInTarget(0.34, 0.7)}
          className="editorial-grid mt-6 grid-cols-2 sm:grid-cols-4"
        >
          {metrics.map(metric => (
            <div key={metric.label} className="editorial-cell px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[--ink]/35">
                {metric.label}
              </p>
              <p
                className="mt-3 font-display text-4xl font-black italic"
                style={{ color: metric.accent }}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
