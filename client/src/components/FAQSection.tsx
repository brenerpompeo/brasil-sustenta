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
    answer: 'A empresa abre um brief com desafio, contexto, ODS, prazo e prioridade. A plataforma organiza uma shortlist com fit score, a curadoria fecha a composicao do squad e o projeto entra em sprint com acompanhamento e entregas parciais.',
  },
  {
    category: 'empresas',
    question: 'Qual é o investimento necessário para contratar um squad?',
    answer: 'A oferta depende do formato escolhido: Pilot Project, Managed Squad ou modelo institucional em parceria com universidade. O valor varia conforme escopo, profundidade, prazo e necessidade de acompanhamento operacional.',
  },
  {
    category: 'empresas',
    question: 'Como são selecionados os talentos para meu projeto?',
    answer: 'O match combina leitura de skills, portfolio, disponibilidade, afinidade com ODS e contexto do desafio. Depois disso, a curadoria humana ajusta a composicao final do squad para garantir aderencia e diversidade de perfis.',
  },
  {
    category: 'empresas',
    question: 'Posso acompanhar o desenvolvimento do projeto?',
    answer: 'Sim. O fluxo inclui kickoff, checkpoints, entregas parciais e relatorio final. A ideia e dar visibilidade sem transformar a experiencia em uma consultoria pesada para o time comprador.',
  },
  {
    category: 'estudantes',
    question: 'Quem pode se cadastrar como talento na plataforma?',
    answer: 'Estudantes universitários a partir do 2º ano de graduação e recém-formados (até 2 anos) de universidades parceiras podem se cadastrar. É necessário demonstrar interesse em projetos ESG, sustentabilidade e impacto social.',
  },
  {
    category: 'estudantes',
    question: 'Como funciona a remuneração dos projetos?',
    answer: 'A forma de remuneracao depende do modelo do desafio e da politica definida pela empresa contratante. Quando houver bolsa, fee ou pagamento por entregas, isso deve aparecer de forma transparente antes da candidatura.',
  },
  {
    category: 'estudantes',
    question: 'Preciso ter experiência prévia em projetos ESG?',
    answer: 'Nao. Experiencia previa ajuda, mas o principal e demonstrar repertorio, capacidade de execucao, motivacao e aderencia ao tipo de desafio. Portfolio academico, projetos autorais e vivencias interdisciplinares contam bastante.',
  },
  {
    category: 'geral',
    question: 'O que é o modelo Squad as a Service?',
    answer: 'E um modelo em que o comprador contrata um problema bem definido e recebe um squad montado com base em contexto, skills e disponibilidade. Isso reduz o atrito entre recrutamento, extensao universitaria e execucao de projeto.',
  },
  {
    category: 'geral',
    question: 'Quais tipos de projetos ESG vocês atendem?',
    answer: 'A plataforma e mais forte em desafios que combinam ESG, pesquisa aplicada, dados, produto, comunicacao, operacao, experiencia digital e ativacao institucional. O foco e transformar um desafio real em entregavel observavel.',
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
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">Suporte</div>
          <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-6">
            Perguntas <span className="italic font-light text-primary">Frequentes</span>
          </h2>
          <p className="text-[1.125rem] text-muted-foreground font-medium">
            Esclarecimentos sobre o ecossistema Brasil Sustenta.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setOpenIndex(0); }}
              className={`px-6 py-3 rounded-xl text-[12px] font-bold tracking-widest uppercase transition-all shadow-sm ${
                activeTab === tab.id
                  ? 'bg-primary text-black'
                  : 'bg-card border border-border text-muted-foreground hover:bg-white/5 hover:border-primary/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 group"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-[17px] font-semibold text-foreground pr-6 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-500 ${
                    openIndex === index ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 pt-0">
                  <p className="text-[15px] text-muted-foreground leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <p className="text-[14px] text-muted-foreground font-medium mb-3">
            Não encontrou o que procurava?
          </p>
          <a href="/login" className="text-[14px] text-primary hover:text-primary/80 font-bold tracking-tight transition-colors">
            Escolher entrada na plataforma →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
