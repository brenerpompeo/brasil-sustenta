import { BookOpen, Users, Globe2, Target, Briefcase, Sparkles, Building2, Trees, Droplets, HeartPulse, Scale, Factory, Lightbulb } from 'lucide-react';

const allOds = [
  { id: 3, title: 'Saúde e Bem-Estar', color: 'bg-[#4C9F38]', icon: <HeartPulse className="w-5 h-5 text-white" /> },
  { id: 4, title: 'Educação de Qualidade', color: 'bg-[#C5192D]', icon: <BookOpen className="w-5 h-5 text-white" /> },
  { id: 6, title: 'Água Potável', color: 'bg-[#26BDE2]', icon: <Droplets className="w-5 h-5 text-white" /> },
  { id: 7, title: 'Energia Limpa', color: 'bg-[#FCC30B]', icon: <Lightbulb className="w-5 h-5 text-white" /> },
  { id: 8, title: 'Trabalho Decente', color: 'bg-[#A21942]', icon: <Briefcase className="w-5 h-5 text-white" /> },
  { id: 9, title: 'Inovação', color: 'bg-[#FD6925]', icon: <Factory className="w-5 h-5 text-white" /> },
  { id: 10, title: 'Menos Desigualdades', color: 'bg-[#DD1367]', icon: <Users className="w-5 h-5 text-white" /> },
  { id: 11, title: 'Cidades Sustentáveis', color: 'bg-[#FD9D24]', icon: <Building2 className="w-5 h-5 text-white" /> },
  { id: 13, title: 'Ação Climática', color: 'bg-[#3F7E44]', icon: <Globe2 className="w-5 h-5 text-white" /> },
  { id: 15, title: 'Vida Terrestre', color: 'bg-[#56C02B]', icon: <Trees className="w-5 h-5 text-white" /> },
  { id: 16, title: 'Paz e Justiça', color: 'bg-[#00689D]', icon: <Scale className="w-5 h-5 text-white" /> },
  { id: 17, title: 'Parcerias', color: 'bg-[#19486A]', icon: <Target className="w-5 h-5 text-white" /> },
];

const ODSSection = () => {
  // Duplicating the array to create a seamless infinite marquee effect
  const marqueeItems = [...allOds, ...allOds];

  return (
    <section className="py-24 bg-background relative overflow-hidden border-y border-border">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#C5192D]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-[#3F7E44]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto relative z-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-border rounded-full text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6">
              <Sparkles className="w-3 h-3 text-primary" />
              Impacto ESG e Agenda 2030
            </div>
            
            <h2 className="font-display text-[2rem] lg:text-[2.75rem] font-bold text-foreground leading-[1.1]">
              Integração aos Objetivos de <span className="italic font-light text-primary">Desenvolvimento Sustentável</span> da ONU
            </h2>
          </div>
          
          <div className="md:max-w-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <p className="text-[15px] text-muted-foreground font-medium leading-relaxed border-l-2 border-primary pl-4">
              Nossa abordagem potencializa as diretrizes globais de sustentabilidade, conectando jovens talentos a empresas comprometidas com metas de <strong className="text-foreground">Valor Compartilhado</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Linha Flutuante */}
      <div className="relative w-full overflow-hidden flex items-center py-4 bg-white/5 backdrop-blur shadow-sm border-y border-white/5">
        {/* Gradients on edges to fade the items */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-[200%] animate-marquee">
          <div className="flex w-1/2 justify-around px-4 gap-6">
            {allOds.map((ods, idx) => (
              <div 
                key={`${ods.id}-1-${idx}`} 
                className="flex-shrink-0 flex items-center gap-4 bg-card border border-border rounded-2xl p-4 min-w-[260px] shadow-lg hover:border-primary/30 transition-all cursor-default group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform ${ods.color}`}>
                  {ods.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-0.5 block">ODS {ods.id}</span>
                  <h3 className="text-[14px] font-bold text-foreground leading-tight">{ods.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-1/2 justify-around px-4 gap-6">
            {allOds.map((ods, idx) => (
              <div 
                key={`${ods.id}-2-${idx}`} 
                className="flex-shrink-0 flex items-center gap-4 bg-white border border-paper-3 rounded-2xl p-4 min-w-[260px] shadow-sm hover:shadow-md transition-shadow cursor-default group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform ${ods.color}`}>
                  {ods.icon}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-ink-4 uppercase tracking-widest mb-0.5 block">ODS {ods.id}</span>
                  <h3 className="text-[14px] font-bold text-ink leading-tight">{ods.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ODSSection;
