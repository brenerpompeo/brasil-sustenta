import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'empresas' | 'estudantes' | 'geral';
}

const faqs: FAQItem[] = [
  {
    category: 'empresas',
    question: 'Como funciona o processo de contratação de um squad?',
    answer: 'O processo é simples: você publica seu projeto ESG na plataforma, estudantes universitários vetados demonstram interesse, nossa equipe forma um squad multidisciplinar adequado ao seu desafio, e o squad executa o projeto com acompanhamento contínuo. Todo o processo leva de 7 a 10 dias desde a publicação até a formação do squad.',
  },
  {
    category: 'empresas',
    question: 'Qual é o investimento necessário para contratar um squad?',
    answer: 'Nossos pacotes começam a partir de R$ 12.500 para um Squad ESG Starter (15 dias com 3 profissionais). Oferecemos também o Squad Digital Impact (30 dias - R$ 18.500) e Squad ODS Accelerator (60 dias - R$ 28.500). Para projetos mais complexos, temos soluções premium personalizadas.',
  },
  {
    category: 'empresas',
    question: 'Como são selecionados os talentos para meu projeto?',
    answer: 'Todos os talentos da plataforma são estudantes ou recém-formados de universidades parceiras (USP, UFRJ, UNICAMP, PUC, FGV, UFMG). Passam por processo de vetagem que avalia competências técnicas, experiência em projetos ESG e alinhamento com valores de sustentabilidade.',
  },
  {
    category: 'empresas',
    question: 'Posso acompanhar o desenvolvimento do projeto?',
    answer: 'Sim! Oferecemos acompanhamento semanal com relatórios de progresso, reuniões de alinhamento e entregas parciais. Você terá visibilidade total sobre o andamento do projeto e poderá dar feedbacks em cada etapa.',
  },
  {
    category: 'estudantes',
    question: 'Quem pode se cadastrar como talento na plataforma?',
    answer: 'Estudantes universitários a partir do 2º ano de graduação e recém-formados (até 2 anos) de universidades parceiras podem se cadastrar. É necessário demonstrar interesse em projetos ESG, sustentabilidade e impacto social.',
  },
  {
    category: 'estudantes',
    question: 'Como funciona a remuneração dos projetos?',
    answer: 'Os talentos recebem remuneração proporcional ao escopo e duração do projeto. Os valores são competitivos com o mercado e pagos de acordo com as entregas estabelecidas. Além da remuneração, você ganha experiência prática e certificação.',
  },
  {
    category: 'estudantes',
    question: 'Preciso ter experiência prévia em projetos ESG?',
    answer: 'Não é obrigatório ter experiência prévia, mas é importante demonstrar interesse genuíno em sustentabilidade e impacto social. Valorizamos estudantes com projetos acadêmicos, voluntariado ou iniciativas relacionadas a ESG.',
  },
  {
    category: 'geral',
    question: 'O que é o modelo Squad as a Service?',
    answer: 'Squad as a Service é um modelo flexível de contratação onde formamos equipes multidisciplinares sob demanda para projetos específicos. Elimina a burocracia de contratação tradicional e oferece flexibilidade total.',
  },
  {
    category: 'geral',
    question: 'Quais tipos de projetos ESG vocês atendem?',
    answer: 'Atendemos diversos tipos de projetos: estratégias de sustentabilidade empresarial, relatórios ESG, políticas de direitos humanos, projetos ODS, comunicação corporativa sustentável, marketing com propósito e desenvolvimento web para impacto social.',
  },
];

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState<'empresas' | 'estudantes' | 'geral'>('empresas');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(faq => faq.category === activeTab);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const tabs = [
    { id: 'empresas' as const, label: 'Empresas', color: 'bg-leaf-1' },
    { id: 'estudantes' as const, label: 'Estudantes', color: 'bg-sky-1' },
    { id: 'geral' as const, label: 'Geral', color: 'bg-ink' },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-widest uppercase text-ink-4 mb-4">Suporte</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-black text-ink leading-[1.1] mb-6">
            Perguntas <span className="italic font-light text-leaf-1">Frequentes</span>
          </h2>
          <p className="text-[1.125rem] text-ink-3 font-medium">
            Esclarecimentos sobre o ecossistema Brasil Sustenta.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setOpenIndex(0); }}
              className={`px-6 py-3 rounded-xl text-[13px] font-bold tracking-wider uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-ink text-white shadow-lg'
                  : 'bg-paper border border-paper-3 text-ink-3 hover:bg-white hover:border-ink/10'
              }`}
            >
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${tab.color}`}></span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="bg-paper border border-paper-3 rounded-2xl overflow-hidden hover:bg-white hover:border-ink/10 transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className="text-[16px] font-bold text-ink pr-6 group-hover:text-leaf-1 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-ink-3 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-leaf-1' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 pt-0">
                  <p className="text-[15px] text-ink-2 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <p className="text-[14px] text-ink-3 font-medium mb-3">
            Não encontrou o que procurava?
          </p>
          <button className="text-[14px] text-leaf-1 hover:text-leaf-2 font-bold transition-colors">
            Contato Direto →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
