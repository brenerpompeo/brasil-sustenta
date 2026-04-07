import { FileText, Users, Rocket, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Empresa Publica',
    description: 'A empresa publica o desafio ESG na plataforma de forma direcionada.',
    icon: FileText,
    items: [
      'Definição de escopo',
      'Critérios ODS',
      'Orçamento previsto',
    ],
  },
  {
    number: '02',
    title: 'Talentos Aplicam',
    description: 'Universitários vetados avaliam o escopo e postulam ao projeto.',
    icon: Users,
    items: [
      'Match por competência',
      'Formação de interesse',
      'Análise de perfil',
    ],
  },
  {
    number: '03',
    title: 'Squad Formado',
    description: 'A plataforma consolida o Squad ideal com as skills exigidas.',
    icon: Rocket,
    items: [
      'Alinhamento técnico',
      'Reunião de Kickoff',
      'Papéis definidos',
    ],
  },
  {
    number: '04',
    title: 'Entrega de Impacto',
    description: 'Trabalho contínuo até a entrega da solução sustentável.',
    icon: CheckCircle,
    items: [
      'Sprints estruturadas',
      'Reporte semanal',
      'Apresentação final',
    ],
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-paper-3">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-leaf-1 rounded-full blur-[100px]"></div>
      </div>

      <div className="container relative z-10 px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-widest uppercase text-leaf-2 mb-4">Jornada de Inovação</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-black text-ink leading-[1.1] mb-6">
            Como <span className="italic font-light text-leaf-1">Funciona</span>
          </h2>
          <p className="text-[1.125rem] text-ink-3 font-medium">
            Dinâmica corporativa simplificada em 4 estágios de alto valor.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative group animate-fade-in-up flex flex-col h-full"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[50px] right-[-15px] w-[30px] h-0.5 bg-paper-3 z-0"></div>
                )}

                <div className="bg-white border border-paper-3 shadow-sm rounded-2xl p-8 hover:border-leaf-2/50 hover:shadow-[0_8px_30px_rgb(28,107,58,0.06)] transition-all duration-300 flex-1 flex flex-col">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 bg-paper border border-paper-3 rounded-xl flex items-center justify-center group-hover:bg-leaf/5 transition-colors">
                      <Icon className="w-6 h-6 text-leaf-1" />
                    </div>
                    <span className="font-display text-4xl font-black text-ink-4 group-hover:text-leaf-3 transition-colors">{step.number}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-ink mb-3 group-hover:text-leaf-1 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-ink-3 mb-6 font-medium leading-relaxed">
                    {step.description}
                  </p>

                  {/* Items List */}
                  <ul className="space-y-3 mt-auto pt-6 border-t border-paper-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-center space-x-3 text-[13px] font-semibold text-ink-2">
                        <div className="w-1.5 h-1.5 bg-leaf-1 rounded-full flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"></div>
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
        <div className="text-center mt-24">
          <p className="font-display text-2xl font-black text-ink mb-8">
            Traga o seu desafio ODS para nós.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-ink hover:bg-ink-1 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
              Publicar Projeto ESG
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-paper-3 bg-white hover:bg-paper text-ink font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              Conhecer Talentos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
