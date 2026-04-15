import { BrainCircuit, ShieldCheck, Workflow, ArrowUpRight, Building2, GraduationCap, Sparkles } from 'lucide-react';
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

          {/* Eyebrow — label de sistema */}
          <div className="mb-8 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-none border border-[--leaf]/25 bg-[--leaf]/[0.06] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[--leaf]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[--leaf]" />
              CORP // ESG_FRAMEWORK
            </span>
          </div>

          {/* Headline editorial — peso máximo */}
          <h1
            className="max-w-[580px] font-display font-bold leading-[0.88] tracking-tight text-[--ink]"
            style={{ fontSize: 'clamp(3.2rem, 7vw, 6.4rem)' }}
          >
            Valor
            <span className="block font-light italic text-[--leaf]"> compartilhado</span>
            via protocolo.
          </h1>

          {/* Subtítulo — tom manifesto */}
          <div className="mt-7 max-w-lg">
            <p className="text-[0.875rem] font-bold uppercase leading-[1.9] tracking-[0.05em] text-[--ink]/45">
              Escalabilidade de impacto não é caridade. É compliance, infraestrutura e criatividade aplicada.
              Acesse squads universitários como serviço.
            </p>
          </div>

          {/* Proof points — unidade econômica real */}
          <div className="mt-8 flex flex-wrap gap-7 border-y border-white/[0.05] py-7">
            {proofPoints.map(({ value, label, sub }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-[1.65rem] font-black leading-none text-[--leaf]">{value}</span>
                <span className="mt-0.5 text-[11px] font-semibold text-[--ink]/60">{label}</span>
                <span className="text-[10px] text-[--ink]/28">{sub}</span>
              </div>
            ))}
          </div>

          {/* CTAs — linguagem de comando */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/para-empresas/publicar"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-none border border-[--leaf] bg-[--leaf] px-7 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[--paper] shadow-[0_0_28px_rgba(0,255,133,0.25)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(0,255,133,0.42)]"
            >
              Publicar_Desafio
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/para-jovens/oportunidades"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-none border border-white/[0.12] bg-transparent px-7 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[--ink]/55 transition-all duration-200 hover:border-white/[0.22] hover:text-[--ink]"
            >
              Submeter_Perfil
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Sub-linha de portais */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[--ink]/28">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3 w-3 text-[--leaf]/45" />
              <Link href="/para-empresas" className="transition-colors hover:text-[--ink]/55">Organizações</Link>
            </span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-3 w-3 text-[--leaf]/45" />
              <Link href="/para-universidades" className="transition-colors hover:text-[--ink]/55">IES</Link>
            </span>
            <span className="text-white/10">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[--leaf]/45" />
              <Link href="/para-jovens" className="transition-colors hover:text-[--ink]/55">Talentos</Link>
            </span>
          </div>
        </div>

        {/* ── Coluna direita — signal cards em grade editorial ── */}
        <div className="flex flex-col">
          {signals.map((signal) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.title}
                className={`group flex flex-col gap-4 border-b border-white/[0.05] px-7 py-9 last:border-b-0 transition-all duration-300 sm:px-8 ${
                  signal.accent
                    ? 'bg-[--leaf]/[0.055] hover:bg-[--leaf]/[0.085]'
                    : 'hover:bg-white/[0.015]'
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center border transition-all duration-300 ${
                    signal.accent
                      ? 'border-[--leaf]/30 bg-[--leaf]/10 text-[--leaf]'
                      : 'border-white/[0.08] bg-white/[0.03] text-[--ink]/38 group-hover:border-[--leaf]/18 group-hover:text-[--leaf]/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div>
                  <h3 className={`font-mono text-[11px] font-bold uppercase tracking-[0.22em] ${
                    signal.accent ? 'text-[--leaf]' : 'text-[--ink]/55'
                  }`}>
                    {signal.title}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium leading-[1.8] text-[--ink]/38">
                    {signal.description}
                  </p>
                </div>

                <span className={`font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] ${
                  signal.accent ? 'text-[--leaf]/45' : 'text-[--ink]/22'
                }`}>
                  {signal.tag}
                </span>
              </div>
            );
          })}

          {/* Bottom bar — sem menção a parceria Pacto Global */}
          <div className="flex items-center justify-between border-t border-white/[0.05] bg-white/[0.012] px-7 py-4 sm:px-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[--ink]/28">
              SYSTEM_STATUS: <span className="text-[--leaf]/60">ONLINE</span> // ODS_ENGINE_V2
            </p>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[--leaf]/60" />
              <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-[--ink]/28">Live</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
