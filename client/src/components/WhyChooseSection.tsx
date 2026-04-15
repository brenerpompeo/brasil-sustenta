import { BrainCircuit, ShieldCheck, Workflow } from 'lucide-react';

const benefits = [
  {
    icon: BrainCircuit,
    title: 'IA que explica o match',
    description:
      'O Brasil Sustenta nao so ranqueia. Ele mostra porque aquele talento e aquele squad fazem sentido para aquele desafio.',
    color: 'text-primary',
    bg: 'bg-primary/5',
    border: 'group-hover:border-primary/50',
    shadow: 'group-hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)]'
  },
  {
    icon: Workflow,
    title: 'Entrega em formato squad',
    description:
      'A compra deixa de ser vaga ou consultoria aberta. A empresa recebe um time montado, um ritmo de execucao e uma trilha de entregas.',
    color: 'text-sky-400',
    bg: 'bg-sky-400/5',
    border: 'group-hover:border-sky-400/50',
    shadow: 'group-hover:shadow-[0_8px_30px_rgb(56,189,248,0.15)]'
  },
  {
    icon: ShieldCheck,
    title: 'Prova ESG sem greenwashing',
    description:
      'Brief, sprints, evidencias e relatorio final tornam a narrativa de impacto mais concreta para stakeholders internos e externos.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/5',
    border: 'group-hover:border-amber-400/50',
    shadow: 'group-hover:shadow-[0_8px_30px_rgb(251,191,36,0.15)]'
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background border-y border-border relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-6">Por que essa categoria importa</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tighter mb-8">
            Nao e job board. Nao e consultoria pura. E uma camada de <span className="italic font-light text-primary text-glow-emerald text-center">execucao</span>.
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            O benchmark mostrou um espaco claro: empresa, universidade e talento conectados por um produto AI-first, com squads e entrega auditavel.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`bg-card border border-border rounded-[1.5rem] p-10 transition-all duration-300 group ${benefit.border} ${benefit.shadow} animate-fade-in-up shadow-sm hover:shadow-primary/5 shadow-primary/5`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-secondary border border-border group-hover:bg-primary/5 transition-colors`}>
                  <Icon className={`w-8 h-8 ${benefit.color}`} />
                </div>

                {/* Title */}
                <h3 className="font-display text-[1.5rem] font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-[1.2]">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] font-medium text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Badge Premium */}
        <div className="text-center animate-fade-in-up delay-500">
          <div className="inline-flex items-center space-x-3 bg-card border border-border shadow-2xl px-8 py-4 rounded-full hover:border-primary/50 transition-colors cursor-default">
            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span className="text-[12px] font-bold tracking-[0.1em] text-foreground uppercase">
              Compra possivel por <span className="text-primary italic">RH, ESG ou inovacao</span> sem mudar a tese do produto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
