import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'empresas' | 'estudantes' | 'geral';
}

const faqs: FAQItem[] = [
  {
    category: 'empresas',
    question: 'Como funciona o processo de contratação de um squad?',
    answer: 'A empresa abre um brief com desafio, contexto, ODS, prazo e prioridade. A plataforma organiza uma shortlist com fit score, a curadoria fecha a composição do squad e o projeto entra em sprint com acompanhamento e entregas parciais.',
  },
  {
    category: 'empresas',
    question: 'Qual é o investimento necessário para contratar um squad?',
    answer: 'A oferta depende do formato escolhido: Pilot Project, Managed Squad ou modelo institucional em parceria com universidade. O valor varia conforme escopo, profundidade, prazo e necessidade de acompanhamento operacional.',
  },
  {
    category: 'empresas',
    question: 'Como são selecionados os talentos para meu projeto?',
    answer: 'O Motor de Matching IA combina leitura de skills, portfólio, disponibilidade, afinidade com ODS e contexto do desafio. Depois disso, a curadoria humana ajusta a composição final do squad para garantir aderência e diversidade de perfis.',
  },
  {
    category: 'empresas',
    question: 'Posso acompanhar o desenvolvimento do projeto?',
    answer: 'Sim. O fluxo inclui kickoff, checkpoints, entregas parciais e relatório final. A ideia é dar visibilidade sem transformar a experiência em uma consultoria pesada para o time comprador.',
  },
  {
    category: 'estudantes',
    question: 'Quem pode se cadastrar como talento na plataforma?',
    answer: 'Estudantes universitários a partir do 2º ano de graduação e recém-formados (até 2 anos) de universidades parceiras podem se cadastrar. É necessário demonstrar interesse em projetos ESG, sustentabilidade e impacto social.',
  },
  {
    category: 'estudantes',
    question: 'Como funciona a remuneração dos projetos?',
    answer: 'A forma de remuneração depende do modelo do desafio e da política definida pela empresa contratante. Quando houver bolsa, fee ou pagamento por entregas, isso deve aparecer de forma transparente antes da candidatura.',
  },
  {
    category: 'estudantes',
    question: 'Preciso ter experiência prévia em projetos ESG?',
    answer: 'Não. Experiência prévia ajuda, mas o principal é demonstrar repertório, capacidade de execução, motivação e aderência ao tipo de desafio. Portfólio acadêmico, projetos autorais e vivências interdisciplinares contam bastante.',
  },
  {
    category: 'geral',
    question: 'O que é o modelo Squad as a Service?',
    answer: 'É um modelo em que o comprador contrata um problema bem definido e recebe um Squad Box montado com base em contexto, skills e disponibilidade. Isso reduz o atrito entre recrutamento, extensão universitária e execução de projeto.',
  },
  {
    category: 'geral',
    question: 'Quais tipos de projetos ESG vocês atendem?',
    answer: 'A plataforma é mais forte em desafios que combinam ESG, pesquisa aplicada, dados, produto, comunicação, operação, experiência digital e ativação institucional. O foco é transformar um desafio real em entregável observável.',
  },
];

const tabs = [
  { id: 'empresas' as const, label: 'EMPRESAS' },
  { id: 'estudantes' as const, label: 'ESTUDANTES' },
  { id: 'geral' as const, label: 'GERAL' },
];

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState<'empresas' | 'estudantes' | 'geral'>('empresas');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter((faq) => faq.category === activeTab);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="border-t border-white/[0.05] bg-[--paper] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
            FAQ // SUPORTE_E_CLAREZA
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Perguntas
            <span className="font-light italic text-[--leaf]"> frequentes</span>.
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12 flex gap-0 border-b border-white/[0.05]"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(0);
              }}
              className="relative px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] transition-colors cursor-pointer"
              style={{
                color: activeTab === tab.id ? 'var(--leaf)' : 'rgba(255,255,255,0.25)',
              }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="faq-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[--leaf]"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Accordion */}
        <div className="max-w-3xl">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="border-b border-white/[0.05] last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full cursor-pointer items-start justify-between gap-6 py-7 text-left"
              >
                <span className="font-sans text-[15px] font-semibold leading-snug text-[--ink]/80 hover:text-[--ink] transition-colors">
                  {faq.question}
                </span>
                <div className="mt-0.5 flex-shrink-0 text-[--ink]/30">
                  {openIndex === index ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 font-sans text-[14px] font-medium leading-relaxed text-[--ink]/50">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14"
        >
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
            Não encontrou o que procurava?
          </p>
          <a
            href="/login"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[--leaf] hover:text-[--leaf]/70 transition-colors"
          >
            Escolher entrada na plataforma →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
