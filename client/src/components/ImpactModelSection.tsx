import { ArrowRight, Check, School, Sparkles, Target } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const impactModels = [
  {
    label: 'Pilot Project',
    title: 'Valide um desafio com escopo enxuto e time sob medida.',
    description:
      'Entrada ideal para liderancas de ESG, RH ou inovacao que precisam provar valor sem comecar com uma operacao grande.',
    includes: [
      '1 brief priorizado',
      'shortlist com justificativa de fit',
      'squad piloto com kickoff e sprint curta',
      'relatorio executivo final',
    ],
    href: '/login/empresa',
    cta: 'Solicitar piloto',
    highlight: 'Perfeito para primeira compra',
    icon: Target,
    theme: 'primary',
  },
  {
    label: 'Managed Squad',
    title: 'Transforme uma frente recorrente em operacao acompanhada.',
    description:
      'Para empresas que ja querem fluxo continuo de squads, checkpoints, dados e maior integracao com times internos.',
    includes: [
      'multiplos desafios ou sprints',
      'curadoria recorrente',
      'trilha de evidencias e monitoramento',
      'camada para RH, ESG e inovacao no mesmo fluxo',
    ],
    href: '/para-empresas',
    cta: 'Ver modelo gerenciado',
    highlight: 'Categoria mais escalavel da plataforma',
    icon: Sparkles,
    theme: 'secondary',
  },
  {
    label: 'University Partner',
    title: 'Ative extensao, empregabilidade e projetos reais na sua IES.',
    description:
      'Oferta institucional para universidades que querem levar desafios reais ao curriculo com mais dados e menos atrito operacional.',
    includes: [
      'onboarding institucional',
      'mapeamento de cursos e talentos',
      'relatorios de participacao e horas',
      'canal dedicado com empresas parceiras',
    ],
    href: '/para-universidades',
    cta: 'Abrir parceria institucional',
    highlight: 'Entrada dedicada para extensao e coordenacao',
    icon: School,
    theme: 'outline',
  },
];

const ImpactModelSection = () => {
  return (
    <section id="ofertas" className="relative overflow-hidden border-y border-border bg-background py-24 lg:py-32">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center animate-fade-in-up">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Ofertas compraveis</div>
          <h2 className="mb-6 font-display text-[2.5rem] font-bold leading-[1.1] text-foreground lg:text-[3.5rem]">
            A mesma tese, em <span className="italic font-light text-primary">tres portas de entrada</span>
          </h2>
          <p className="text-[1.125rem] font-medium text-muted-foreground">
            O benchmark mostrou que a clareza da oferta importa tanto quanto a clareza da categoria. Aqui, cada modelo tem buyer, escopo e promessa claros.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {impactModels.map((model, index) => {
            const Icon = model.icon;

            return (
              <Card
                key={model.label}
                className={cn(
                  'rounded-[1.5rem] border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-primary/5',
                  index === 1 && 'border-primary/30 bg-primary/5'
                )}
              >
                <CardHeader className="space-y-5 px-8 pt-8">
                  <div className="flex items-center justify-between gap-4">
                    <Badge
                      variant={model.theme === 'secondary' ? 'default' : 'outline'}
                      className={cn(
                        'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]',
                        model.theme === 'secondary' && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {model.label}
                    </Badge>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-secondary/40">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-display text-[1.7rem] leading-[1.15] tracking-tighter text-foreground">
                    {model.title}
                  </CardTitle>
                  <p className="text-[15px] font-medium leading-7 text-muted-foreground">
                    {model.description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col px-8 pb-8">
                  <div className="mb-6 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-primary">
                    {model.highlight}
                  </div>

                  <ul className="mb-8 space-y-4">
                    {model.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-[14px] font-medium leading-6 text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={model.href}
                    className={cn(
                      buttonVariants({ variant: index === 1 ? 'default' : 'outline', size: 'lg' }),
                      'mt-auto h-12 rounded-full text-sm font-bold uppercase tracking-[0.14em]',
                      index === 1 && 'text-primary-foreground'
                    )}
                  >
                    {model.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactModelSection;
