import { Target, Heart, CheckCircle, MessageSquare, Briefcase, Palette, Lightbulb, Globe } from 'lucide-react';

const squads = [
  {
    icon: Target,
    title: 'ESG',
    description: 'Estratégias de sustentabilidade empresarial',
  },
  {
    icon: Heart,
    title: 'Direitos Humanos',
    description: 'Políticas inclusivas e equitativas',
  },
  {
    icon: CheckCircle,
    title: 'ODS',
    description: 'Objetivos de Desenvolvimento Sustentável',
  },
  {
    icon: MessageSquare,
    title: 'Comunicação',
    description: 'Estratégias de comunicação corporativa',
  },
  {
    icon: Briefcase,
    title: 'Marketing',
    description: 'Campanhas de marketing com propósito',
  },
  {
    icon: Palette,
    title: 'UI e UX Design',
    description: 'Experiências digitais inovadoras',
  },
  {
    icon: Lightbulb,
    title: 'Design Thinking',
    description: 'Inovação centrada no usuário',
  },
  {
    icon: Globe,
    title: 'Website',
    description: 'Desenvolvimento web e digital',
  },
];

const SquadsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Squads Sob Medida para sua Empresa
          </h2>
          <p className="text-xl text-muted-foreground">
            Montamos equipes de acordo com a sua necessidade.
          </p>
        </div>

        {/* Squads Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {squads.map((squad, index) => {
            const Icon = squad.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {squad.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {squad.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SquadsSection;
