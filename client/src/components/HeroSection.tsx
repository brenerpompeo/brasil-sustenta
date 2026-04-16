import { Plus, Target, BarChart3, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[--paper]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-64 -top-20 h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,255,133,0.05) 0%, transparent 68%)' }}
        />
        <div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(46,91,255,0.04) 0%, transparent 68%)' }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[100rem] xl:min-h-screen xl:grid-cols-[1.3fr_0.7fr]">
        {/* Left — Manifesto Hero */}
        <div className="relative flex flex-col justify-center border-b border-white/10 px-8 py-20 sm:px-12 lg:border-b-0 lg:border-r lg:border-white/10 lg:px-24 xl:py-32">
          {/* Background image overlay */}
          <div
            className="pointer-events-none absolute inset-0 rotate-3 scale-110 opacity-[0.12] mix-blend-overlay grayscale"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Phase indicator */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-12 flex items-center gap-8"
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[2px] w-8 bg-[--leaf]" />
              ))}
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/40">
              PHASE_ONE : INITIALIZE_IMPACT
            </span>
          </motion.div>

          {/* Massive headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative z-10 font-display text-7xl font-black leading-[0.8] tracking-tighter sm:text-8xl lg:text-[11rem]"
          >
            Nova
            <br />
            Ordem
            <br />
            Do{' '}
            <span className="text-[--leaf]" style={{ filter: 'drop-shadow(0 0 30px rgba(0,255,133,0.3))' }}>
              Impacto.
            </span>
          </motion.h1>

          {/* Subtitle + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="relative z-10 mt-16 flex flex-col items-start gap-12 md:flex-row"
          >
            <p className="max-w-xl border-l-4 border-[--leaf] pl-10 font-body text-xl leading-snug text-[--ink]/50 md:text-2xl">
              Convertendo o capital intelectual universitário em infraestrutura regenerativa para a soberania nacional.
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href="/para-empresas/publicar"
                className="inline-flex items-center gap-3 bg-[--leaf] px-12 py-7 font-mono text-xs font-black uppercase tracking-[0.3em] text-black shadow-[0_0_50px_rgba(0,255,133,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(0,255,133,0.4)]"
              >
                Publicar Desafio
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/para-jovens"
                className="inline-flex items-center gap-3 border border-white/20 px-12 py-7 font-mono text-xs font-black uppercase tracking-[0.3em] text-[--ink]/60 backdrop-blur-xl transition-all hover:bg-white hover:text-black"
              >
                Submeter Perfil
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right — Stats Infrastructure */}
        <div className="grid grid-rows-3">
          {/* Stat 1 — Nodes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="group relative flex flex-col justify-center overflow-hidden border-b border-white/10 p-12 transition-colors hover:bg-white/[0.03] lg:p-16"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[--leaf]/5 blur-3xl" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/30 mb-8">
              [01] TALENT_NODES
            </span>
            <div className="flex items-baseline gap-4">
              <h3 className="font-display text-8xl font-black italic lg:text-9xl">12K</h3>
              <Plus className="h-10 w-10 text-[--leaf]" />
            </div>
            <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.4em] text-[--ink]/30">
              Cérebros Validados
            </p>
          </motion.div>

          {/* Stat 2 — ODS Coverage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="group relative flex flex-col justify-center border-b border-white/10 p-12 transition-colors hover:bg-white/[0.03] lg:p-16"
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--sun] mb-8">
              [02] ODS_COVERAGE
            </span>
            <div className="flex items-baseline gap-4">
              <h3 className="font-display text-8xl font-black italic text-[--sun] lg:text-9xl">18</h3>
              <Target className="h-10 w-10 text-[--sun]" />
            </div>
            <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.4em] text-[--ink]/30">
              KPIs em Monitoramento
            </p>
          </motion.div>

          {/* Stat 3 — Impact CTA (green block) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="group relative flex flex-col justify-center overflow-hidden bg-[--leaf] p-12 lg:p-16"
          >
            <BarChart3 className="pointer-events-none absolute -bottom-5 -right-5 h-72 w-72 rotate-[-15deg] text-black/5 transition-transform duration-1000 group-hover:rotate-0" />
            <span className="relative z-10 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-black mb-8">
              [03] LIQUID_IMPACT
            </span>
            <div className="relative z-10 flex items-baseline gap-4 text-black">
              <h3 className="font-display text-8xl font-black italic lg:text-9xl">+4M</h3>
            </div>
            <p className="relative z-10 mt-6 font-body text-xs font-black uppercase tracking-[0.4em] text-black">
              Shared Value (BRL)
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
