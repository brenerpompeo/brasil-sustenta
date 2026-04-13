import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const impactModels = [
  {
    type: 'impact',
    label: 'Squad Box',
    title: 'Squad Criativo ODS.',
    description:
      'Squads com talentos criativos de elite que transformam desafios ESG em ativos de comunicação e inovação. Impacto real com design-thinking.',
    highlight: 'A partir de R$ 2.500 por Sprint de Impacto',
    packages: [
      { name: 'Creative ESG Starter', duration: '15 dias', price: 'R$ 12.500' },
      { name: 'Impact Narrative', duration: '30 dias', price: 'R$ 22.500' },
      { name: 'Cultural ODS Hub', duration: '60 dias', price: 'R$ 38.500' },
    ],
    cta: 'Ver Pacotes Criativos',
    accent: 'primary',
    borderTop: 'bg-primary',
  },
  {
    type: 'premium',
    label: 'Corporate',
    title: 'Hub de Valor Compartilhado.',
    description:
      'Estratégia avançada para ecossistemas sustentáveis de alta performance. Auditoria criativa e inteligência de reputação.',
    services: [
      'Auditoria de Impacto Criativo',
      'Squad dedicado de especialistas sênior',
      'Estratégias de Valor Compartilhado',
      'Relatórios de Impacto Visual (RIV)',
      'Suporte técnico e criativo prioritário',
    ],
    cta: 'Falar com Hub de Estratégia',
    accent: 'secondary',
    borderTop: 'bg-white/10',
  },
];

const ImpactModelSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background border-y border-border relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Investimento</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
            Modelos de <span className="italic font-light text-primary">Impacto</span>
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium">
            Diferentes níveis de engajamento para qualquer escala organizacional.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
          {impactModels.map((model, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-[1.5rem] overflow-hidden hover:border-primary/20 transition-all duration-300 flex flex-col animate-fade-in-up shadow-sm hover:shadow-primary/5"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Top accent bar */}
              <div className={`h-1.5 ${model.borderTop}`}></div>

              <div className="p-10 flex flex-col flex-1">
                  {/* Label */}
                  <span className="inline-block self-start px-3 py-1 bg-secondary/20 border border-border rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-6">
                    {model.label}
                  </span>
  
                  {/* Title */}
                  <h3 className="font-display text-[1.75rem] font-bold text-foreground mb-4 leading-[1.2] tracking-tighter">
                    {model.title}
                  </h3>
  
                  {/* Description */}
                  <p className="text-[15px] text-muted-foreground mb-8 font-medium leading-relaxed">
                    {model.description}
                  </p>

                {/* Highlight (for impact model) */}
                {model.highlight && (
                  <div className="bg-leaf/5 border border-leaf-2/20 rounded-xl p-4 mb-8">
                    <p className="text-leaf-1 font-bold text-[14px]">
                      {model.highlight}
                    </p>
                  </div>
                )}

                {/* Packages (for impact model) */}
                {model.packages && (
                  <div className="space-y-3 mb-8">
                    {model.packages.map((pkg, i) => (
                        <div
                          key={i}
                          className="bg-secondary/10 border border-border rounded-xl p-5 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                        >
                          <div>
                            <p className="font-bold text-[15px] text-foreground">{pkg.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] mt-0.5">{pkg.duration}</p>
                          </div>
                          <p className="font-display text-xl font-bold text-primary tracking-tighter">{pkg.price}</p>
                        </div>
                    ))}
                  </div>
                )}

                {/* Services (for premium model) */}
                {model.services && (
                  <ul className="space-y-4 mb-8">
                    {model.services.map((service, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-[14px] font-medium text-foreground/80">{service}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                  <div className="mt-auto">
                    <Link
                      href={model.type === 'impact' ? '/para-empresas' : '/para-empresas'}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-[15px] transition-all hover:scale-[1.02] active:scale-[0.98] ${
                        model.type === 'impact'
                          ? 'bg-primary text-black hover:bg-primary/90 shadow-lg'
                          : 'border border-border text-foreground hover:bg-white/5'
                      }`}
                    >
                      {model.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactModelSection;
