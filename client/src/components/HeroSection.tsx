import { BrainCircuit, Building2, GraduationCap, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const signals = [
  {
    icon: BrainCircuit,
    title: 'Matching por IA',
    description: 'O match considera skills, portfolio, ODS, disponibilidade e contexto real do desafio.',
  },
  {
    icon: Workflow,
    title: 'Squads prontos para operar',
    description: 'Da publicacao do brief ao kickoff com curadoria humana, onboarding e checkpoints.',
  },
  {
    icon: ShieldCheck,
    title: 'Entrega auditavel',
    description: 'Relatorio executivo, log de sprint e visibilidade para RH, ESG e inovacao.',
  },
];

const HeroSection = () => {
  return (
    <section className="border-b border-border bg-background pt-[72px]">
      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1280px] xl:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-center border-b border-border px-6 py-14 sm:px-8 lg:border-b-0 lg:border-r lg:px-16 lg:py-20">
          <Badge variant="outline" className="mb-8 w-fit border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            AI-first // ESG squads // universidade
          </Badge>

          <h1 className="max-w-4xl font-display text-[3rem] font-bold leading-[0.92] tracking-tight text-foreground sm:text-[4.5rem] lg:text-[6.3rem]">
            Desafios ESG em
            <span className="block italic font-light text-primary"> squads universitarios</span>
            com IA e entrega real.
          </h1>

          <div className="mt-8 max-w-2xl border-l-[3px] border-primary pl-5">
            <p className="text-base font-medium leading-8 text-foreground/78 sm:text-[1.05rem]">
              O Brasil Sustenta conecta empresas, universidades e talentos em uma camada operacional de match, curadoria e execucao.
              Em vez de vender vaga ou discurso, a plataforma transforma um desafio ESG em squad, sprint e entrega mensuravel.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/para-empresas"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 rounded-full px-6 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-[0_14px_40px_rgba(0,148,68,0.18)]'
              )}
            >
              Publicar desafio
            </Link>
            <Link
              href="/para-universidades"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-12 rounded-full border-border px-6 text-sm font-bold uppercase tracking-[0.16em]'
              )}
            >
              Sou universidade
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1.5">RH</span>
            <span className="rounded-full border border-border px-3 py-1.5">ESG</span>
            <span className="rounded-full border border-border px-3 py-1.5">Inovacao</span>
            <span className="rounded-full border border-border px-3 py-1.5">Extensao universitaria</span>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            <span>Entrada dedicada para empresas e universidades</span>
            <span className="text-border">/</span>
            <GraduationCap className="h-4 w-4 text-primary" />
            <Link href="/para-jovens" className="font-semibold text-foreground hover:text-primary">
              Talentos entram por oportunidades reais
            </Link>
          </div>
        </div>

        <div className="grid gap-px bg-border p-px">
          {signals.map((signal, index) => {
            const Icon = signal.icon;

            return (
              <Card
                key={signal.title}
                className={cn(
                  'rounded-none border-0 bg-card/95 px-1 shadow-none',
                  index === 0 && 'bg-primary text-primary-foreground'
                )}
              >
                <CardHeader className="px-6 pt-8 sm:px-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-current/15 bg-background/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className={cn('font-display text-[1.7rem] tracking-tight', index === 0 ? 'text-white' : 'text-foreground')}>
                    {signal.title}
                  </CardTitle>
                  <CardDescription className={cn('max-w-sm text-sm font-medium leading-7', index === 0 ? 'text-primary-foreground/75' : 'text-muted-foreground')}>
                    {signal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-8 sm:px-8">
                  <div className={cn('text-[11px] font-bold uppercase tracking-[0.18em]', index === 0 ? 'text-primary-foreground/65' : 'text-muted-foreground')}>
                    {index === 0 && 'Portfolio + skills + ODS'}
                    {index === 1 && 'Brief -> shortlist -> kickoff'}
                    {index === 2 && 'Relatorio final + trilha de evidencia'}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <div className="flex items-center justify-between bg-card px-6 py-5 text-sm sm:px-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">Nao e job board. Nao e consultoria pura.</span>
            </div>
            <span className="font-bold uppercase tracking-[0.18em] text-foreground">Categoria propria</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
