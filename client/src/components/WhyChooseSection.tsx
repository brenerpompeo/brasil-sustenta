import { Target, GraduationCap, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: 'Impacto ESG Mensurável',
    description:
      'Projetos com métricas claras de sustentabilidade e impacto, alinhados aos Objetivos de Desenvolvimento Sustentável da ONU, gerando valor real para sua empresa e sociedade.',
  },
  {
    icon: GraduationCap,
    title: 'Talentos Universitários Vetados',
    description:
      'Acesso a estudantes e recém-formados das melhores universidades do Brasil, previamente avaliados por competências e alinhamento com projetos ESG.',
  },
  {
    icon: Zap,
    title: 'Squad as a Service',
    description:
      'Equipes multidisciplinares formadas sob demanda, eliminando a burocracia de contratação tradicional e oferecendo flexibilidade total para seus projetos de sustentabilidade.',
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Por que escolher o <span className="text-primary">Brasil Sustenta</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            A plataforma que une talentos brasileiros e soluções ESG em um
            ecossistema de inovação sustentável e conexão inteligente entre
            empresas e jovens talentos.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Badge */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-semibold">
              Mais de +200 projetos ESG concluídos com sucesso
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
