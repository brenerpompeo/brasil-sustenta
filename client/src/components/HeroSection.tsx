import { BrainCircuit, Building2, GraduationCap, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const signals = [
  {
    icon: BrainCircuit,
    title: 'Matching por IA',
    description: 'O match considera skills, portfolio, ODS, disponibilidade e contexto real do desafio.',
    tag: 'Portfolio + skills + ODS',
    highlight: true,
  },
  {
    icon: Workflow,
    title: 'Squads prontos para operar',
    description: 'Da publicacao do brief ao kickoff com curadoria humana, onboarding e checkpoints.',
    tag: 'Brief → shortlist → kickoff',
    highlight: false,
  },
  {
    icon: ShieldCheck,
    title: 'Entrega auditavel',
    description: 'Relatorio executivo, log de sprint e visibilidade para RH, ESG e inovacao.',
    tag: 'Relatorio final + trilha de evidencia',
    highlight: false,
  },
];

const stats = [
  { value: '3x', label: 'mais rapido que consultoria' },
  { value: '47+', label: 'universidades parceiras' },
  { value: '200+', label: 'desafios ESG entregues' },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[--paper] pt-[calc(3.5rem+2rem)]">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="gradient-mesh absolute inset-0" />
        <div
          className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #00FF85 0%, transparent 70%)' }}
        />
        <div
          className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #CCFF00 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] xl:grid-cols-[1.2fr_0.8fr]">
        {/* Left: headline + CTAs */}
        <div className="flex flex-col justify-center border-b border-white/[0.06] px-6 py-16 sm:px-8 lg:border-b-0 lg:border-r lg:border-white/[0.06] lg:px-16 lg:py-24">
          <Badge
            variant="outline"
            className="mb-8 w-fit border-[--leaf]/25 bg-[--leaf]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[--leaf]"
          >
            AI-first &nbsp;//&nbsp; ESG squads &nbsp;//&nbsp; universidade
          </Badge>

          <h1 className="max-w-4xl font-display text-[3rem] font-bold leading-[0.92] tracking-tight text-[--ink] sm:text-[4.5rem] lg:text-[6.3rem]">
            Desafios ESG em
            <span className="block font-light italic text-[--leaf]"> squads universitarios</span>
            com IA e entrega real.
          </h1>

          <div className="mt-8 max-w-2xl border-l-[3px] border-[--leaf]/50 pl-5">
            <p className="text-base font-medium leading-8 text-[--ink]/60 sm:text-[1.05rem]">
              O Brasil Sustenta conecta empresas, universidades e talentos em uma camada operacional de match, curadoria e execucao.
              Em vez de vender vaga ou discurso, a plataforma transforma um desafio ESG em squad, sprint e entrega mensuravel.
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex flex-wrap gap-6 border-b border-white/[0.06] pb-10">
            {stats.map(stat => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="font-display text-2xl font-black text-[--leaf]">{stat.value}</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[--ink]/40">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/para-empresas"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 rounded-full bg-[--leaf] px-6 text-sm font-bold uppercase tracking-[0.16em] text-[--paper] shadow-[0_0_32px_rgba(0,255,133,0.3)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,255,133,0.5)]'
              )}
            >
              Publicar desafio
            </Link>
            <Link
              href="/para-universidades"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-12 rounded-full border-white/[0.12] bg-transparent px-6 text-sm font-bold uppercase tracking-[0.16em] text-[--ink]/70 hover:border-[--leaf]/30 hover:text-[--ink] transition-all duration-200'
              )}
            >
              Sou universidade
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[--ink]/35">
            {['RH', 'ESG', 'Inovacao', 'Extensao universitaria'].map(tag => (
              <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-1.5">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-[--ink]/40">
            <Building2 className="h-4 w-4 text-[--leaf]" />
            <span>Entrada dedicada para empresas e universidades</span>
            <span className="text-white/10">/</span>
            <GraduationCap className="h-4 w-4 text-[--leaf]" />
            <Link href="/para-jovens" className="font-semibold text-[--ink]/70 transition-colors hover:text-[--leaf]">
              Talentos entram por oportunidades reais
            </Link>
          </div>
        </div>

        {/* Right: signal cards */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {signals.map((signal) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.title}
                className={cn(
                  'flex flex-col gap-4 px-6 py-8 transition-all duration-300 sm:px-8',
                  signal.highlight
                    ? 'bg-[--leaf]/10 border-l-2 border-[--leaf]/40'
                    : 'hover:bg-white/[0.02]'
                )}
              >
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-2xl border',
                    signal.highlight
                      ? 'border-[--leaf]/30 bg-[--leaf]/15 text-[--leaf]'
                      : 'border-white/[0.08] bg-white/[0.04] text-[--ink]/50'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3
                    className={cn(
                      'font-display text-[1.5rem] tracking-tight',
                      signal.highlight ? 'text-[--leaf]' : 'text-[--ink]'
                    )}
                  >
                    {signal.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-1.5 max-w-sm text-sm font-medium leading-7',
                      signal.highlight ? 'text-[--ink]/60' : 'text-[--ink]/45'
                    )}
                  >
                    {signal.description}
                  </p>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[--ink]/30">
                  {signal.tag}
                </span>
              </div>
            );
          })}

          <div className="flex items-center justify-between bg-white/[0.02] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-2 text-sm text-[--ink]/40">
              <Sparkles className="h-4 w-4 text-[--leaf]" />
              <span className="font-medium">Nao e job board. Nao e consultoria pura.</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[--ink]/60">Categoria propria</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
