import { Briefcase, Users, Building, TrendingUp, Clock, Star, RefreshCw } from 'lucide-react';

const mainStats = [
  { icon: Briefcase, value: '2.5k+', label: 'Projetos ESG', color: 'text-leaf-1', border: 'border-t-leaf-1' },
  { icon: Users, value: '8.5k+', label: 'Jovens Talentos', color: 'text-sky-1', border: 'border-t-sky-1' },
  { icon: Building, value: '500+', label: 'Empresas', color: 'text-earth-1', border: 'border-t-earth-1' },
  { icon: TrendingUp, value: '95%', label: 'Satisfação', color: 'text-violet-1', border: 'border-t-violet-1' },
];

const additionalStats = [
  { icon: Clock, value: '7–10 dias', label: 'Da publicação ao squad formado' },
  { icon: Star, value: '4.9/5.0', label: 'Avaliação média dos projetos' },
  { icon: RefreshCw, value: '87%', label: 'Taxa de retenção corporativa' },
];

const StatsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-ink relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-[#0A1128] to-transparent pointer-events-none"></div>

      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4">Resultados Comprovados</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-black text-white leading-[1.1] mb-6">
            Impacto em <span className="italic font-light text-leaf-3">Números</span>
          </h2>
          <p className="text-[1.125rem] text-white/60 font-medium">
            Métricas que comprovam a eficácia da ponte entre academia e corporação.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-[#0A1128] border border-[#1E293B] ${stat.border} border-t-[3px] rounded-2xl p-8 text-center hover:bg-[#0D1530] transition-all duration-300 group animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="font-display text-[2.8rem] font-black text-white leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[12px] font-bold text-white/50 uppercase tracking-widest">
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
                className="bg-white/[0.03] border border-white/10 rounded-xl px-6 py-5 flex items-center space-x-4 hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <p className="font-display text-lg font-black text-white">{stat.value}</p>
                  <p className="text-[11px] font-semibold text-white/40 leading-tight">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <p className="text-[11px] font-bold tracking-widest uppercase text-white/25">
            Dados atualizados em 2025
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
