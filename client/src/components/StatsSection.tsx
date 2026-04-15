import { BrainCircuit, Clock, FileStack, Layers3, Target, Users } from 'lucide-react';

const mainStats = [
  { icon: FileStack, value: '1', label: 'brief central por desafio', color: 'text-leaf-1', border: 'border-t-leaf-1' },
  { icon: Users, value: '3', label: 'entradas dedicadas na rede', color: 'text-sky-1', border: 'border-t-sky-1' },
  { icon: Clock, value: '7-10', label: 'dias para formar um squad', color: 'text-earth-1', border: 'border-t-earth-1' },
  { icon: Target, value: '18', label: 'ODS e causas mapeaveis', color: 'text-violet-1', border: 'border-t-violet-1' },
];

const additionalStats = [
  { icon: BrainCircuit, value: 'IA explicavel', label: 'Justificativa de fit para shortlist e squad' },
  { icon: Layers3, value: 'Sprints', label: 'Entregas parciais com checkpoints e feedback' },
  { icon: FileStack, value: 'Relatorio final', label: 'Trilha de evidencia para RH, ESG e inovacao' },
];

const StatsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-background to-transparent pointer-events-none"></div>

      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40 mb-4">Arquitetura operacional</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
            Sinais de produto para <span className="italic font-light text-primary">escalar com clareza</span>
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium">
            Menos promessa abstrata, mais estrutura visivel de como a plataforma opera para diferentes buyers.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-card border border-border ${stat.border} border-t-[3px] rounded-2xl p-8 text-center hover:bg-secondary/20 transition-all duration-300 group animate-fade-in-up shadow-sm`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-5 border border-white/5">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="font-display text-[2.8rem] font-bold text-foreground leading-none mb-2 tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[900px] mx-auto animate-fade-in-up delay-500">
          {additionalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/5 border border-white/5 rounded-xl px-6 py-5 flex items-center space-x-4 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground tracking-tighter">{stat.value}</p>
                  <p className="text-[11px] font-semibold text-muted-foreground/60 leading-tight">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/30">
            Indicadores de arquitetura e jornada do produto
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
