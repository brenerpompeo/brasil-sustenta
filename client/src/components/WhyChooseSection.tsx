import { Target, GraduationCap, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: 'Impacto ESG Mensurável',
    description:
      'Projetos com métricas claras de sustentabilidade, alinhados aos ODS da ONU, gerando valor tangível e reportável para a sua organização.',
    color: 'text-leaf-1',
    bg: 'bg-leaf/10',
    border: 'group-hover:border-leaf-1',
    shadow: 'group-hover:shadow-[0_8px_30px_rgb(28,107,58,0.1)]'
  },
  {
    icon: GraduationCap,
    title: 'Talentos Universitários Vetados',
    description:
      'Acesso exclusivo à elite emergente acadêmica. Estudantes previamente filtrados por competência técnica e alinhamento de propósito.',
    color: 'text-sky-1',
    bg: 'bg-sky/10',
    border: 'group-hover:border-sky-1',
    shadow: 'group-hover:shadow-[0_8px_30px_rgb(56,189,248,0.1)]'
  },
  {
    icon: Zap,
    title: 'Squad as a Service',
    description:
      'Equipes ágeis montadas sob demanda. Eliminamos burocracias de contratação fornecendo escopos fechados, flexíveis e objetivos.',
    color: 'text-violet-1',
    bg: 'bg-violet/10',
    border: 'group-hover:border-violet-1',
    shadow: 'group-hover:shadow-[0_8px_30px_rgb(139,92,246,0.1)]'
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#F8FAFC] border-y border-paper-3 relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-widest uppercase text-ink-3 mb-4">Diferencial</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-black text-ink leading-[1.1] mb-6">
            Por que escolher o <span className="italic font-light text-leaf-1">Brasil Sustenta</span>?
          </h2>
          <p className="text-[1.125rem] text-ink-3 font-medium">
            Um ecossistema de ponta que converte ideias corporativas em impacto sustentável executado.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`bg-white border border-paper-3 rounded-[1.5rem] p-10 transition-all duration-300 group ${benefit.border} ${benefit.shadow} animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-paper border border-paper-2 group-hover:bg-white transition-colors`}>
                  <Icon className={`w-8 h-8 ${benefit.color}`} />
                </div>

                {/* Title */}
                <h3 className="font-display text-[1.5rem] font-bold text-ink mb-4 group-hover:text-ink transition-colors leading-[1.2]">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] font-medium text-ink-3 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Badge Premium */}
        <div className="text-center animate-fade-in-up delay-500">
          <div className="inline-flex items-center space-x-3 bg-white border border-paper-3 shadow-sm px-8 py-4 rounded-full hover:border-leaf-2 transition-colors cursor-default">
            <div className="w-2.5 h-2.5 bg-leaf-1 rounded-full animate-pulse shadow-[0_0_8px_rgba(28,107,58,0.6)]"></div>
            <span className="text-[13px] font-bold tracking-wider text-ink uppercase">
              Inovando em mais de <span className="text-leaf-1">200 projetos ESG</span> neste ano
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
