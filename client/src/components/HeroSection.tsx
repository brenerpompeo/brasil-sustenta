import { BrainCircuit, ShieldCheck, Workflow, ArrowUpRight, Building2, GraduationCap, Sparkles, BarChart2, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

// ── Animações ─────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
});

// ── Bento cells da coluna direita ─────────────────────────────────────────────
// Grade assimétrica: célula grande (destaque IA) + 2 células médias + 2 cells pequenas

const BentoCells = () => (
  <div className="flex h-full flex-col divide-y divide-white/[0.05]">

    {/* Célula 1 — Destaque: Motor de Matching IA (grande) */}
    <div className="group relative flex flex-col justify-between overflow-hidden bg-[--leaf]/[0.055] px-7 py-8 transition-all duration-300 hover:bg-[--leaf]/[0.08] sm:px-8">
      {/* Glow background */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-48 w-48 opacity-30"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(0,255,133,0.15) 0%, transparent 70%)' }}
      />
      <div className="relative flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center border border-[--leaf]/28 bg-[--leaf]/10 text-[--leaf]">
          <BrainCircuit className="h-4 w-4" />
        </div>
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[--leaf]/45">
          Motor central
        </span>
      </div>
      <div className="relative mt-6">
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[--leaf]/70">
          Matching por IA
        </h3>
        <p className="mt-2 text-[13px] font-medium leading-[1.8] text-[--ink]/42">
          Cosine similarity sobre vetores ODS. Conecta talento e desafio em até 24h — sem triagem manual.
        </p>
        <p className="mt-3 font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-[--leaf]/35">
          17 ODS · NLP · Computer Vision
        </p>
      </div>
    </div>

    {/* Linha: Células 2 + 3 lado a lado */}
    <div className="grid grid-cols-2 divide-x divide-white/[0.05]">
      {/* Célula 2 — Squad as a Service */}
      <div className="group flex flex-col gap-3 px-5 py-6 transition-all duration-300 hover:bg-white/[0.015] sm:px-6">
        <div className="flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-white/[0.03] text-[--ink]/38 transition-all group-hover:border-white/[0.12] group-hover:text-[--ink]/60">
          <Workflow className="h-3.5 w-3.5" />
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[--ink]/45">
            Squad as a Service
          </p>
          <p className="mt-1.5 text-[11.5px] leading-[1.75] text-[--ink]/32">
            Do brief ao kickoff com curadoria humana e checkpoints.
          </p>
        </div>
      </div>

      {/* Célula 3 — Entrega Auditável */}
      <div className="group flex flex-col gap-3 px-5 py-6 transition-all duration-300 hover:bg-white/[0.015] sm:px-6">
        <div className="flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-white/[0.03] text-[--ink]/38 transition-all group-hover:border-white/[0.12] group-hover:text-[--ink]/60">
          <ShieldCheck className="h-3.5 w-3.5" />
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[--ink]/45">
            Entrega Auditável
          </p>
          <p className="mt-1.5 text-[11.5px] leading-[1.75] text-[--ink]/32">
            GRI · TCFD · Log de sprint para RH e ESG.
          </p>
        </div>
      </div>
    </div>

    {/* Linha: Células 4 + 5 — métricas de negócio */}
    <div className="grid grid-cols-2 divide-x divide-white/[0.05]">
      <div className="flex flex-col gap-1.5 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-3.5 w-3.5 text-[--leaf]/45" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[--ink]/28">Take-rate</span>
        </div>
        <p className="font-display text-2xl font-black text-[--leaf]/80">20–30%</p>
        <p className="font-mono text-[9.5px] text-[--ink]/28">por projeto entregue</p>
      </div>
      <div className="flex flex-col gap-1.5 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-3.5 w-3.5 text-[--sun]/45" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[--ink]/28">CAC</span>
        </div>
        <p className="font-display text-2xl font-black text-[--sun]/70">Zero</p>
        <p className="font-mono text-[9.5px] text-[--ink]/28">talentos via IES parceiras</p>
      </div>
    </div>

    {/* Status bar */}
    <div className="flex items-center justify-between px-7 py-3.5 sm:px-8">
      <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-[--ink]/25">
        SYSTEM_STATUS: <span className="text-[--leaf]/55">ONLINE</span> // ODS_ENGINE_V2
      </p>
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[--leaf]/55" />
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[--ink]/25">Live</span>
      </span>
    </div>

  </div>
);

// ── HeroSection ───────────────────────────────────────────────────────────────

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[--paper] pt-[calc(3.5rem+1.75rem)]">

      {/* Fundo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="dot-grid absolute inset-0 opacity-[0.32]" />
        <div
          className="absolute -left-64 -top-20 h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,255,133,0.048) 0%, transparent 68%)' }}
        />
        <div
          className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.028) 0%, transparent 68%)' }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] xl:min-h-[calc(100svh-5.75rem)] xl:grid-cols-[1.15fr_0.85fr]">

        {/* ── Coluna esquerda ── */}
        <div className="flex flex-col justify-center border-b border-white/[0.05] px-6 py-16 sm:px-8 lg:border-b-0 lg:border-r lg:border-white/[0.05] lg:px-14 xl:py-20">

          {/* Eyebrow — label de sistema */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <span className="inline-flex items-center gap-2 border border-[--leaf]/22 bg-[--leaf]/[0.055] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[--leaf]/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[--leaf]" />
              CORP // ESG_FRAMEWORK
            </span>
          </motion.div>

          {/* Headline dramática */}
          <motion.h1
            {...fadeUp(0.07)}
            className="max-w-[580px] font-display font-bold leading-[0.88] tracking-tight text-[--ink]"
            style={{ fontSize: 'clamp(3.4rem, 7.2vw, 6.6rem)' }}
          >
            Valor
            <span className="block font-light italic text-[--leaf]"> compartilhado</span>
            via protocolo.
          </motion.h1>

          {/* Subtítulo manifesto */}
          <motion.div {...fadeUp(0.14)} className="mt-6 max-w-[500px]">
            <p className="text-[0.85rem] font-bold uppercase leading-[2] tracking-[0.055em] text-[--ink]/42">
              Escalabilidade de impacto não é caridade.{' '}
              <span className="text-[--ink]/60">É compliance, infraestrutura e criatividade aplicada.</span>{' '}
              Acesse squads universitários como serviço.
            </p>
          </motion.div>

          {/* Squad Box entry */}
          <motion.div {...fadeUp(0.2)} className="mt-7 border-b border-white/[0.05] pb-7">
            <div className="inline-flex items-baseline gap-1.5">
              <span className="font-display text-[2.2rem] font-black leading-none text-[--leaf]/85">R$2.500</span>
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-[--ink]/35">
                Squad Box entry · por projeto
              </span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.25)} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/para-empresas/publicar"
              className="group inline-flex h-11 cursor-pointer items-center justify-center gap-2 border border-[--leaf] bg-[--leaf] px-7 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[--paper] shadow-[0_0_24px_rgba(0,255,133,0.22)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,133,0.4)]"
            >
              Publicar_Desafio
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/para-jovens/oportunidades"
              className="group inline-flex h-11 cursor-pointer items-center justify-center gap-2 border border-white/[0.1] bg-transparent px-7 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[--ink]/52 transition-all duration-200 hover:border-white/[0.2] hover:text-[--ink]"
            >
              Submeter_Perfil
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Portais */}
          <motion.div {...fadeUp(0.3)} className="mt-6 flex flex-wrap items-center gap-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[--ink]/25">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3 w-3 text-[--leaf]/38" />
              <Link href="/para-empresas" className="cursor-pointer transition-colors hover:text-[--ink]/50">Organizações</Link>
            </span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3 w-3 text-[--leaf]/38" />
              <Link href="/para-universidades" className="cursor-pointer transition-colors hover:text-[--ink]/50">IES</Link>
            </span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[--leaf]/38" />
              <Link href="/para-jovens" className="cursor-pointer transition-colors hover:text-[--ink]/50">Talentos</Link>
            </span>
          </motion.div>
        </div>

        {/* ── Coluna direita — Bento editorial ── */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="border-t border-white/[0.05] xl:border-t-0"
        >
          <BentoCells />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
