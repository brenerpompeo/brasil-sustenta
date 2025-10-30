import { FileText, Users, Rocket, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Empresa Publica Projeto',
    description: 'Sua empresa publica o desafio ESG, compartilhando necessidades e expectativas do projeto na nossa plataforma.',
    icon: FileText,
    items: [
      'Descrição detalhada do projeto',
      'Definição de objetivos',
      'Prazo e orçamento',
      'Critérios de avaliação',
    ],
  },
  {
    number: '02',
    title: 'Talentos Demonstram Interesse',
    description: 'Estudantes universitários vetados visualizam o projeto e demonstram interesse em participar.',
    icon: Users,
    items: [
      'Busca por perfis compatíveis',
      'Análise de competências',
      'Manifestação de interesse',
      'Formação de equipes',
    ],
  },
  {
    number: '03',
    title: 'Formação do Squad',
    description: 'Nossa equipe forma squads multidisciplinares com talentos mais adequados para o projeto.',
    icon: Rocket,
    items: [
      'Análise de perfis',
      'Montagem de equipe',
      'Alinhamento de expectativas',
      'Apresentação à empresa',
    ],
  },
  {
    number: '04',
    title: 'Execução e Entrega',
    description: 'O squad trabalha no projeto com acompanhamento contínuo, entregando soluções de alto impacto.',
    icon: CheckCircle,
    items: [
      'Kickoff do projeto',
      'Acompanhamento semanal',
      'Entregas parciais',
      'Avaliação final',
    ],
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Como <span className="text-primary">Funciona</span> o Processo
          </h2>
          <p className="text-xl text-muted-foreground">
            Um processo simples e eficiente que conecta empresas e talentos,
            iniciando ESG real em apenas 4 etapas.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative group"
              >
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full w-12 h-0.5 bg-border z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                )}

                <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Step Number & Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Items List */}
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Pronto para começar seu projeto ESG?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-black font-semibold rounded-lg transition-all">
              Publicar Projeto ESG
            </button>
            <button className="px-8 py-3 border-2 border-muted-foreground text-foreground hover:bg-muted font-semibold rounded-lg transition-all">
              Conhecer Talentos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
