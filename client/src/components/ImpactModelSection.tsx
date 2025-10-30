import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const impactModels = [
  {
    type: 'impact',
    title: 'Squad Box de Impacto: Talento Jovem, Soluções Reais.',
    description:
      'Modelos flexíveis de squads, com estudantes das jovens talentos universitários que trazem novas ideias para resolver desafios de sustentabilidade da Brasil Sustenta. Experiência e inovação em cada projeto.',
    highlight: 'A partir de R$2.500,00 para um Squad de 3 profissionais por 15 dias',
    packages: [
      { name: 'Squad ESG Starter', duration: '15 dias', price: 'R$ 12.500' },
      { name: 'Squad Digital Impact', duration: '30 dias', price: 'R$ 18.500' },
      { name: 'Squad ODS Accelerator', duration: '60 dias', price: 'R$ 28.500' },
    ],
    cta: 'Ver Pacotes e Preços',
    bgColor: 'from-emerald-900/40 to-green-900/40',
    borderColor: 'border-primary/30',
  },
  {
    type: 'premium',
    title: 'Soluções Premium: Estratégia e Liderança.',
    description:
      'Para desafios complexos que necessitam estratégias avançadas, nossos squads premium oferecem liderança sênior e expertise especializada.',
    services: [
      'Consultoria estratégica personalizada',
      'Squad dedicado de especialistas sênior',
      'Acompanhamento executivo de perto',
      'Relatórios detalhados de impacto',
      'Suporte técnico prioritário',
    ],
    cta: 'Falar com um Consultor',
    bgColor: 'from-yellow-900/30 to-amber-900/30',
    borderColor: 'border-yellow-600/30',
  },
];

const ImpactModelSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Nosso Modelo de Impacto
          </h2>
          <p className="text-xl text-muted-foreground">
            Oferecemos diferentes níveis de serviço, com foco nas soluções de
            impacto da proposta do MVP.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {impactModels.map((model, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${model.bgColor} border ${model.borderColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300`}
            >
              {/* Title */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {model.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {model.description}
              </p>

              {/* Highlight (for impact model) */}
              {model.highlight && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                  <p className="text-primary font-semibold text-sm">
                    {model.highlight}
                  </p>
                </div>
              )}

              {/* Packages (for impact model) */}
              {model.packages && (
                <div className="space-y-3 mb-6">
                  {model.packages.map((pkg, i) => (
                    <div
                      key={i}
                      className="bg-card/50 border border-border rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{pkg.name}</p>
                        <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                      </div>
                      <p className="text-lg font-bold text-primary">{pkg.price}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Services (for premium model) */}
              {model.services && (
                <ul className="space-y-3 mb-6">
                  {model.services.map((service, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{service}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  model.type === 'impact'
                    ? 'bg-primary hover:bg-primary/90 text-black'
                    : 'bg-transparent border-2 border-yellow-600 text-yellow-500 hover:bg-yellow-600/10'
                } font-semibold`}
              >
                {model.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Modelo flexível participante e disponibilidade conforme a demanda.{' '}
            <button className="text-primary hover:underline">
              Conheça mais a respeito dos serviços
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactModelSection;
