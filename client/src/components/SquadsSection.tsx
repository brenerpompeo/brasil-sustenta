import { Target, Heart, CheckCircle, MessageSquare, Briefcase, Palette, Lightbulb, Globe } from 'lucide-react';

const squads = [
  { icon: Target, title: 'ESG Core', desc: 'Estratégias centrais de sustentabilidade' },
  { icon: Heart, title: 'Sociedade', desc: 'Diversidade, política pública e inclusão' },
  { icon: CheckCircle, title: 'Compliance ODS', desc: 'Auditorias voltadas para métricas da ONU' },
  { icon: MessageSquare, title: 'Comunicação', desc: 'Branding e relatórios para Stakeholders' },
  { icon: Briefcase, title: 'Operações Verdes', desc: 'Supply Chain sustentável e logística' },
  { icon: Palette, title: 'UI/UX Impact', desc: 'Design e interface para causas ambientais' },
  { icon: Lightbulb, title: 'Inovação Aberta', desc: 'Design Thinking para novos produtos' },
  { icon: Globe, title: 'Engenharia', desc: 'Infraestrutura tecnológica escalável' },
];

const SquadsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-widest uppercase text-leaf-2 mb-4">Múltiplas Frentes</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-black text-ink leading-[1.1] mb-6">
            Soluções modeladas em <span className="italic font-light text-leaf-1">Squads</span>
          </h2>
          <p className="text-[1.125rem] text-ink-3 font-medium">
            Escalonamos as expertises acadêmicas na nuvem exata da dores corporativas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {squads.map((squad, index) => {
            const Icon = squad.icon;
            return (
              <div
                key={index}
                className="bg-paper border border-paper-3 rounded-2xl p-8 hover:bg-white hover:border-leaf-2/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all duration-300 group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-white border border-paper-3 rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-leaf/5 transition-colors">
                  <Icon className="w-5 h-5 text-ink group-hover:text-leaf-1 transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-2 leading-tight">
                  {squad.title}
                </h3>
                <p className="text-[13px] text-ink-3 font-medium leading-relaxed">
                  {squad.desc}
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
