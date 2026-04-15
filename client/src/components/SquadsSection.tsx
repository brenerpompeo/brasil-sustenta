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
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Múltiplas Frentes</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
            Soluções modeladas em <span className="italic font-light text-primary">Squads</span>
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium">
            O squad nao nasce por area academica isolada. Ele nasce pelo tipo de desafio que a empresa precisa destravar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {squads.map((squad, index) => {
            const Icon = squad.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group cursor-pointer animate-fade-in-up shadow-sm hover:shadow-primary/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-secondary border border-border rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2 leading-tight tracking-tighter">
                  {squad.title}
                </h3>
                <p className="text-[13px] text-muted-foreground font-medium leading-relaxed">
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
