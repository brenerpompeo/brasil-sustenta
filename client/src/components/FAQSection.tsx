import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'empresas' | 'estudantes' | 'geral';
}

const faqs: FAQItem[] = [
  // Para Empresas
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
    answer: 'Todos os talentos da plataforma são estudantes ou recém-formados de universidades parceiras (USP, UFRJ, UNICAMP, PUC, FGV, UFMG). Passam por processo de vetagem que avalia competências técnicas, experiência em projetos ESG e alinhamento com valores de sustentabilidade. Para cada projeto, selecionamos os perfis mais adequados às necessidades específicas.',
  },
  {
    category: 'empresas',
    question: 'Posso acompanhar o desenvolvimento do projeto?',
    answer: 'Sim! Oferecemos acompanhamento semanal com relatórios de progresso, reuniões de alinhamento e entregas parciais. Você terá visibilidade total sobre o andamento do projeto e poderá dar feedbacks em cada etapa.',
  },
  {
    category: 'empresas',
    question: 'O que acontece se o resultado não atender às expectativas?',
    answer: 'Trabalhamos com critérios claros de avaliação definidos no início do projeto. Caso haja necessidade de ajustes, oferecemos revisões e garantimos que o resultado final esteja alinhado aos objetivos acordados. Nossa taxa de satisfação de 95% reflete nosso compromisso com a qualidade.',
  },
  
  // Para Estudantes
  {
    category: 'estudantes',
    question: 'Quem pode se cadastrar como talento na plataforma?',
    answer: 'Estudantes universitários a partir do 2º ano de graduação e recém-formados (até 2 anos) de universidades parceiras podem se cadastrar. É necessário demonstrar interesse em projetos ESG, sustentabilidade e impacto social, além de passar pelo processo de vetagem de competências.',
  },
  {
    category: 'estudantes',
    question: 'Como funciona a remuneração dos projetos?',
    answer: 'Os talentos recebem remuneração proporcional ao escopo e duração do projeto. Os valores são competitivos com o mercado e pagos de acordo com as entregas estabelecidas. Além da remuneração, você ganha experiência prática, networking com grandes empresas e certificação de participação.',
  },
  {
    category: 'estudantes',
    question: 'Preciso ter experiência prévia em projetos ESG?',
    answer: 'Não é obrigatório ter experiência prévia, mas é importante demonstrar interesse genuíno em sustentabilidade e impacto social. Valorizamos estudantes com projetos acadêmicos, voluntariado ou iniciativas relacionadas a ESG. Oferecemos orientação e suporte durante os projetos.',
  },
  {
    category: 'estudantes',
    question: 'Posso participar de mais de um projeto simultaneamente?',
    answer: 'Sim, desde que você consiga gerenciar o tempo e cumprir os compromissos de cada projeto. Recomendamos avaliar a carga horária e prazos antes de aceitar múltiplos projetos para garantir qualidade nas entregas.',
  },
  {
    category: 'estudantes',
    question: 'Como posso me destacar e ser selecionado para projetos?',
    answer: 'Mantenha seu perfil atualizado com suas habilidades, experiências e projetos anteriores. Demonstre proatividade ao manifestar interesse em projetos alinhados com suas competências. Avaliações positivas de projetos anteriores aumentam suas chances de seleção para novos desafios.',
  },

  // Gerais
  {
    category: 'geral',
    question: 'O que é o modelo Squad as a Service?',
    answer: 'Squad as a Service é um modelo flexível de contratação onde formamos equipes multidisciplinares sob demanda para projetos específicos. Elimina a burocracia de contratação tradicional, oferece flexibilidade total e garante expertise diversificada para resolver desafios complexos de ESG.',
  },
  {
    category: 'geral',
    question: 'Quais tipos de projetos ESG vocês atendem?',
    answer: 'Atendemos diversos tipos de projetos: estratégias de sustentabilidade empresarial, relatórios ESG, políticas de direitos humanos, projetos ODS, comunicação corporativa sustentável, marketing com propósito, design de experiências digitais sustentáveis, e desenvolvimento web para impacto social.',
  },
  {
    category: 'geral',
    question: 'Como garantem a qualidade dos projetos entregues?',
    answer: 'Garantimos qualidade através de: vetagem rigorosa de talentos, formação de squads com expertise adequada, acompanhamento contínuo dos projetos, revisões em cada etapa, e avaliação final com critérios objetivos. Nossa nota média de 4.9/5.0 e taxa de retenção de 87% comprovam nosso padrão de excelência.',
  },
];

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState<'empresas' | 'estudantes' | 'geral'>('empresas');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(faq => faq.category === activeTab);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Perguntas Frequentes</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Tire suas <span className="text-primary">Dúvidas</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Respostas para as perguntas mais comuns sobre a plataforma Brasil Sustenta
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('empresas')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'empresas'
                ? 'bg-primary text-black'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            Para Empresas
          </button>
          <button
            onClick={() => setActiveTab('estudantes')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'estudantes'
                ? 'bg-primary text-black'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            Para Estudantes
          </button>
          <button
            onClick={() => setActiveTab('geral')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'geral'
                ? 'bg-primary text-black'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            Geral
          </button>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <button className="text-primary hover:underline font-semibold">
            Entre em contato com nossa equipe →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
