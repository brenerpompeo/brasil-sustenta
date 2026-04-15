import { BrainCircuit, Building2, GraduationCap, ShieldCheck, Sparkles, Workflow, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

// ── Dados ─────────────────────────────────────────────────────────────────────

const signals = [
  {
    icon: BrainCircuit,
    title: 'Motor de Matching IA',
    description: 'Traduz portfólios em vetores ODS. Conecta talento e desafio com similaridade matemática — sem triagem manual.',
    tag: 'Cosine similarity · 17 ODS · 24h',
    accent: true,
  },
  {
    icon: Workflow,
    title: 'Squad as a Service',
    description: 'Do brief ao kickoff com curadoria humana, onboarding estruturado e checkpoints de entrega.',
    tag: 'Brief → Shortlist → Kickoff',
    accent: false,
  },
  {
    icon: ShieldCheck,
    title: 'Entrega Auditável',
    description: 'Relatório executivo, log de sprint completo e rastreabilidade para RH, ESG e Inovação.',
    tag: 'GRI · TCFD · Evidência real',
    accent: false,
  },
];

const proofPoints = [
  { value: 'R$2.500', label: 'Squad Box entry', sub: 'por projeto entregue' },
  { value: '20–30%', label: 'Take-rate', sub: 'margem da plataforma' },
  { value: 'CAC 0', label: 'via IES', sub: 'alunos chegam pela universidade' },
];

// ── Component ─────────────────────────────────────────────────────────────────

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[--paper] pt-[calc(3.5rem+1.75rem)]">

      {/* ── Camadas de fundo ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="dot-grid absolute inset-0 opacity-[0.35]" />
        <div
          className="absolute -left-64 top-[-80px] h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,255,133,0.055) 0%, transparent 68%)' }}
        />
        <div
          className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.035) 0%, transparent 68%)' }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] xl:min-h-[calc(100svh-5.75rem)] xl:grid-cols-[1.15fr_0.85fr]">

        {/* ── Coluna esquerda — headline + CTAs ── */}
        <div className="flex flex-col justify-center border-b border-white/[0.05] px-6 py-16 sm:px-8 lg:border-b-0 lg:border-r lg:border-white/[0.05] lg:px-14 xl:py-20">

          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[--leaf]/20 bg-[--leaf]/[0.07] px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-[--leaf]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[--leaf]" />
              Squad as a Service · ESG · IA
            </span>
          </div>

          {/* Headline principal */}
          <h1 className="max-w-[560px] font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)' }}>
            Seu desafio ESG
            <span className="block font-light italic text-[--leaf]"> virou um squad</span>
            universitário.
          </h1>

          {/* Tensão narrativa */}
          <div className="mt-7 max-w-xl">
            <p className="text-[0.975rem] font-medium leading-[1.85] text-[--ink]/55">
              Não é consultoria. Não é job board.{' '}
              <span className="font-semibold text-[--ink]/80">
                É uma nova categoria:
              </span>{' '}
              a plataforma que transforma metas ESG em projetos multidisciplinares executados por talentos universitários — com IA, método e entrega rastreável.
            </p>
          </div>

          {/* Proof points — unidade econômica real */}
          <div className="mt-8 flex flex-wrap gap-6 border-y border-white/[0.05] py-7">
            {proofPoints.map(({ value, label, sub }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-[1.6rem] font-black leading-none text-[--leaf]">{value}</span>
                <span className="mt-0.5 text-[11px] font-semibold text-[--ink]/60">{label}</span>
                <span className="text-[10.5px] text-[--ink]/30">{sub}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/para-empresas/publicar"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[--leaf] px-7 text-[12px] font-black uppercase tracking-[0.18em] text-[--paper] shadow-[0_0_28px_rgba(0,255,133,0.28)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(0,255,133,0.45)]"
            >
              Publicar desafio ESG
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/para-jovens/oportunidades"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-transparent px-7 text-[12px] font-black uppercase tracking-[0.18em] text-[--ink]/60 transition-all duration-200 hover:border-white/[0.18] hover:text-[--ink]"
            >
              Quero entrar num squad
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Sub-linha de portais */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-[--ink]/30">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[--leaf]/50" />
              <Link href="/para-empresas" className="transition-colors hover:text-[--ink]/60">Organizações ESG</Link>
            </span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-[--leaf]/50" />
              <Link href="/para-universidades" className="transition-colors hover:text-[--ink]/60">IES Parceiras</Link>
            </span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[--leaf]/50" />
              <Link href="/para-jovens" className="transition-colors hover:text-[--ink]/60">Talentos universitários</Link>
            </span>
          </div>
        </div>

        {/* ── Coluna direita — signal cards ── */}
        <div className="flex flex-col">
          {signals.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.title}
                className={`group flex flex-col gap-4 border-b border-white/[0.05] px-7 py-9 last:border-b-0 transition-all duration-300 sm:px-8 ${
                  signal.accent
                    ? 'bg-[--leaf]/[0.06] hover:bg-[--leaf]/[0.09]'
                    : 'hover:bg-white/[0.015]'
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                    signal.accent
                      ? 'border-[--leaf]/25 bg-[--leaf]/10 text-[--leaf]'
                      : 'border-white/[0.07] bg-white/[0.03] text-[--ink]/40 group-hover:border-[--leaf]/20 group-hover:text-[--leaf]/70'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className={`font-display text-[1.35rem] font-bold leading-tight tracking-tight ${
                    signal.accent ? 'text-[--leaf]' : 'text-[--ink]/85'
                  }`}>
                    {signal.title}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium leading-[1.75] text-[--ink]/40">
                    {signal.description}
                  </p>
                </div>

                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  signal.accent ? 'text-[--leaf]/50' : 'text-[--ink]/25'
                }`}>
                  {signal.tag}
                </span>
              </div>
            );
          })}

          {/* Bottom bar */}
          <div className="flex items-center justify-between border-t border-white/[0.05] bg-white/[0.015] px-7 py-4 sm:px-8">
            <p className="text-[12px] font-medium text-[--ink]/35">
              Parceiro oficial da{' '}
              <span className="font-semibold text-[--ink]/60">Rede Pacto Global ONU Brasil</span>
            </p>
            <Link
              href="/quem-somos/parceiros"
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[--ink]/30 transition-colors hover:text-[--leaf]/70"
            >
              Ver parceiros
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
