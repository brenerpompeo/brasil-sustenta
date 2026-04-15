import { CheckCircle, FileText, Rocket, Users } from 'lucide-react';
import { Link } from 'wouter';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Brief do desafio',
    description: 'A empresa estrutura objetivo, contexto, ODS, escopo, prazo e budget em um fluxo unico.',
    icon: FileText,
    items: [
      'Objetivo de negocio',
      'ODS e criterio de impacto',
      'Escopo e prioridade',
    ],
  },
  {
    number: '02',
    title: 'IA + curadoria',
    description: 'A plataforma prioriza perfis por fit e a curadoria humana fecha a composicao do squad.',
    icon: Users,
    items: [
      'Fit score explicavel',
      'Portfolio e disponibilidade',
      'Composicao multidisciplinar',
    ],
  },
  {
    number: '03',
    title: 'Squad em execucao',
    description: 'O desafio vira sprint com kickoff, alinhamentos, entregaveis parciais e acompanhamento.',
    icon: Rocket,
    items: [
      'Kickoff e onboarding',
      'Ritmo de sprint',
      'Feedback de empresa e mentoria',
    ],
  },
  {
    number: '04',
    title: 'Entrega auditavel',
    description: 'Ao final, a empresa recebe evidencias, relatorio executivo e sinais de talento observados em trabalho real.',
    icon: CheckCircle,
    items: [
      'Log de entregas',
      'Relatorio executivo',
      'Sinais para hiring e reputacao',
    ],
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="relative overflow-hidden border-t border-border bg-background py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-leaf-1 rounded-full blur-[100px]"></div>
      </div>

      <div className="container relative z-10 px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Do brief a entrega</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tighter mb-8">
            Um fluxo de <span className="italic font-light text-primary text-glow-emerald">categoria nova</span>, mas facil de comprar.
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            A experiencia foi desenhada para tirar friccao de um processo que normalmente fica espalhado entre RH, ESG, inovacao e universidade.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative group animate-fade-in-up flex flex-col h-full"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[50px] right-[-15px] w-[30px] h-0.5 bg-border z-0"></div>
                )}

                <div className="bg-card border border-border shadow-sm rounded-2xl p-8 hover:border-primary/50 hover:shadow-primary/5 transition-all duration-300 flex-1 flex flex-col group">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-secondary border border-border rounded-xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-display text-4xl font-bold text-white/10 group-hover:text-primary transition-colors">{step.number}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[15px] text-muted-foreground mb-6 font-medium leading-relaxed">
                    {step.description}
                  </p>

                  {/* Items List */}
                  <ul className="space-y-3 mt-auto pt-6 border-t border-border">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-center space-x-3 text-[13px] font-semibold text-foreground/70">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <p className="font-display text-2xl font-bold text-foreground mb-8">
            Comece pelo desafio, nao pelo curriculo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/para-empresas"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'w-full rounded-full px-8 text-sm font-bold uppercase tracking-[0.16em] sm:w-auto'
              )}
            >
              Publicar desafio ESG
            </Link>
            <Link
              href="/para-jovens"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'w-full rounded-full border-border px-8 text-sm font-bold uppercase tracking-[0.16em] sm:w-auto'
              )}
            >
              Entrar como talento
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
