import { Briefcase, Users, Building, TrendingUp, Clock, Star, RefreshCw } from 'lucide-react';

const mainStats = [
  {
    icon: Briefcase,
    value: '2.5k+',
    label: 'Projetos',
    description: 'Projetos ESG concluídos',
  },
  {
    icon: Users,
    value: '8.5k+',
    label: 'Jovens',
    description: 'Talentos cadastrados',
  },
  {
    icon: Building,
    value: '500+',
    label: 'Empresas',
    description: 'Empresas parceiras',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Satisfação',
    description: 'Taxa de satisfação',
  },
];

const additionalStats = [
  {
    icon: Clock,
    label: 'Tempo Médio',
    value: '7-10 dias',
    description: 'Da publicação à formação do squad',
  },
  {
    icon: Star,
    label: 'Qualidade',
    value: '4.9/5.0',
    description: 'Avaliação média dos projetos',
  },
  {
    icon: RefreshCw,
    label: 'Retenção',
    value: '87%',
    description: 'Empresas que retornam para novos projetos',
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Impacto em <span className="text-primary">Números</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Resultados concretos que demonstram o poder da conexão entre
            empresas e jovens talentos para transformar o Brasil.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Value */}
                <p className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {additionalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 flex items-center space-x-4"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            📊 Dados atualizados em 2025
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
