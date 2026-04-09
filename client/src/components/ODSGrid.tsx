import { useState } from 'react';
import { Target, Leaf, Heart, MonitorPlay, Users, Droplets, Zap, Briefcase, Factory, Scale, Building2, Recycle, CloudRain, Fish, TreePine, Shield, Network, Handshake } from 'lucide-react';

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

export function ODSGrid() {
  const [hoveredCode, setHoveredCode] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="flex flex-col mb-12 items-center text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          <Target className="w-3.5 h-3.5" />
          Norteadores de Impacto
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
          Direcionados <br className="md:hidden" /> pelos <span className="italic font-serif font-light text-primary">Objetivos Globais</span>.
        </h2>
        <p className="text-muted-foreground font-medium max-w-2xl text-[1rem] leading-relaxed">
           A Agenda 2030 nos move. Projetamos nossos esquadrões de talentos visando atender e escalar soluções de inovação para sanar os 18 pilares críticos da humanidade.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4 max-w-6xl mx-auto px-4">
        {ODS_DATA.map((ods) => (
          <div
            key={ods.id}
            onMouseEnter={() => setHoveredCode(ods.id)}
            onMouseLeave={() => setHoveredCode(null)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:z-10"
            style={{ 
              backgroundColor: hoveredCode === ods.id ? ods.color : '#1A1A1A', // Dark mode background
              border: `1px solid ${hoveredCode === ods.id ? ods.color : '#333333'}`
            }}
          >
             <div className="absolute inset-0 p-4 sm:p-5 flex flex-col items-start justify-between z-10 transition-colors duration-300">
                <span className={`font-display text-2xl sm:text-3xl font-black ${hoveredCode === ods.id ? 'text-white' : 'text-muted-foreground'} transition-colors`}>
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
             <span className="absolute -bottom-4 -right-4 font-display text-[8rem] font-black opacity-5 pointer-events-none text-white selection:bg-transparent">
                {ods.id}
             </span>
             {/* Glossy overlay layer */}
             <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
