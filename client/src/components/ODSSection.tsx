import { useState } from 'react';
import { Target, Leaf, Heart, MonitorPlay, Users, Droplets, Zap, Briefcase, Factory, Scale, Building2, Recycle, CloudRain, Fish, TreePine, Shield, Network, Handshake, Sparkles } from 'lucide-react';

export const ODS_DATA = [
  { id: 1, color: '#E5243B', title: 'Erradicação da Pobreza', Icon: Target },
  { id: 2, color: '#DDA63A', title: 'Fome Zero', Icon: Leaf },
  { id: 3, color: '#4C9F38', title: 'Saúde e Bem-Estar', Icon: Heart },
  { id: 4, color: '#C5192D', title: 'Educação de Qualidade', Icon: MonitorPlay },
  { id: 5, color: '#FF3A21', title: 'Igualdade de Gênero', Icon: Users },
  { id: 6, color: '#26BDE2', title: 'Água Potável', Icon: Droplets },
  { id: 7, color: '#FCC30B', title: 'Energia Limpa', Icon: Zap },
  { id: 8, color: '#A21942', title: 'Trabalho Decente', Icon: Briefcase },
  { id: 9, color: '#FD6925', title: 'Indústria e Inovação', Icon: Factory },
  { id: 10, color: '#DD1367', title: 'Redução das Desigualdades', Icon: Scale },
  { id: 11, color: '#FD9D24', title: 'Cidades Sustentáveis', Icon: Building2 },
  { id: 12, color: '#BF8B2E', title: 'Consumo Responsável', Icon: Recycle },
  { id: 13, color: '#3F7E44', title: 'Ação Climática', Icon: CloudRain },
  { id: 14, color: '#0A97D9', title: 'Vida na Água', Icon: Fish },
  { id: 15, color: '#56C02B', title: 'Vida Terrestre', Icon: TreePine },
  { id: 16, color: '#00689D', title: 'Paz e Justiça', Icon: Shield },
  { id: 17, color: '#19486A', title: 'Parcerias Inovadoras', Icon: Network },
  { id: 18, color: '#1D1D1B', title: 'Igualdade Racial', Icon: Handshake } // ODS 18 Brasil
];

const ODSSection = () => {
  const [hoveredCode, setHoveredCode] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background relative overflow-hidden border-y border-border">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#C5192D]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-[#3F7E44]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto relative z-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
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

        {/* 18 ODS Grid Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 w-full">
          {ODS_DATA.map((ods) => (
            <div
              key={ods.id}
              onMouseEnter={() => setHoveredCode(ods.id)}
              onMouseLeave={() => setHoveredCode(null)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:z-10 bg-card border border-border"
              style={{ 
                backgroundColor: hoveredCode === ods.id ? ods.color : undefined,
                borderColor: hoveredCode === ods.id ? ods.color : undefined
              }}
            >
               <div className="absolute inset-0 p-4 sm:p-5 flex flex-col items-start justify-between z-10 transition-colors duration-300">
                  <span className={`font-display text-2xl sm:text-3xl font-black ${hoveredCode === ods.id ? 'text-white' : 'text-muted-foreground/50'} transition-colors`}>
                    {ods.id}
                  </span>
                  
                  <div className="w-full">
                     <div className={`mb-3 transition-colors ${hoveredCode === ods.id ? 'text-white' : 'text-primary'}`}>
                        {<ods.Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={hoveredCode === ods.id ? 2.5 : 1.5} />}
                     </div>
                     <h3 className={`text-[10px] sm:text-xs font-bold leading-tight uppercase tracking-wide
                        ${hoveredCode === ods.id ? 'text-white' : 'text-foreground/80'} transition-colors line-clamp-2
                     `}>
                       {ods.title}
                     </h3>
                  </div>
               </div>
               {/* Subliminal number logic for depth */}
               <span className="absolute -bottom-4 -right-4 font-display text-[8rem] font-black opacity-[0.03] pointer-events-none text-white selection:bg-transparent transition-opacity group-hover:opacity-10">
                  {ods.id}
               </span>
               {/* Glossy overlay layer */}
               <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ODSSection;
