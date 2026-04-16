import { CheckCircle, FileText, Rocket, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const steps = [
  {
    number: '01',
    title: 'Brief do desafio',
    description: 'A empresa estrutura objetivo, contexto, ODS, escopo, prazo e budget em um fluxo único.',
    icon: FileText,
    items: ['Objetivo de negócio', 'ODS e critério de impacto', 'Escopo e prioridade'],
    tag: 'INPUT',
  },
  {
    number: '02',
    title: 'IA + curadoria',
    description: 'A plataforma prioriza perfis por fit e a curadoria humana fecha a composição do squad.',
    icon: Users,
    items: ['Fit score explicável', 'Portfólio e disponibilidade', 'Composição multidisciplinar'],
    tag: 'MATCHING',
  },
  {
    number: '03',
    title: 'Squad em execução',
    description: 'O desafio vira sprint com kickoff, alinhamentos, entregáveis parciais e acompanhamento.',
    icon: Rocket,
    items: ['Kickoff e onboarding', 'Ritmo de sprint', 'Feedback e mentoria'],
    tag: 'EXECUÇÃO',
  },
  {
    number: '04',
    title: 'Entrega auditável',
    description: 'Empresa recebe evidências, relatório executivo e sinais de talento observados em trabalho real.',
    icon: CheckCircle,
    items: ['Log de entregas', 'Relatório executivo', 'Sinais para hiring'],
    tag: 'OUTPUT',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="relative overflow-hidden border-t border-white/[0.05] bg-[--paper]">

      {/* ── Cabeçalho da seção ── */}
      <div className="border-b border-white/[0.05] px-6 py-10 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                FLUXO // DO_BRIEF_À_ENTREGA
              </p>
              <h2
                className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                Um fluxo de categoria
                <span className="font-light italic text-[--leaf]"> nova</span>.
              </h2>
            </div>
            <p className="mt-4 max-w-sm text-[13px] font-medium leading-relaxed text-[--ink]/40 sm:mt-0 sm:text-right">
              Desenhado para tirar fricção entre RH, ESG, inovação e universidade — tudo em um pipeline.
            </p>
          </div>
        </div>
      </div>

      {/* ── Grid de steps ── */}
      <div className="mx-auto grid max-w-[1280px] border-b border-white/[0.05] sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.09, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              className="group relative flex flex-col gap-6 border-b border-r border-white/[0.05] p-7 transition-all duration-300 last:border-r-0 hover:bg-white/[0.018] sm:last:border-r sm:odd:last:border-r-0 lg:border-b-0 lg:last:border-r-0"
            >
              {/* Número + ícone */}
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center border border-white/[0.07] bg-white/[0.03] text-[--ink]/38 transition-all duration-300 group-hover:border-[--leaf]/22 group-hover:text-[--leaf]/65">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-display text-4xl font-black leading-none text-white/[0.06] transition-colors duration-300 group-hover:text-[--leaf]/18">
                  {step.number}
                </span>
              </div>

              {/* Tag */}
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.26em] text-[--ink]/28">
                {step.tag}
              </p>

              {/* Título + descrição */}
              <div>
                <h3 className="font-display text-xl font-bold leading-tight text-[--ink]/80 transition-colors duration-300 group-hover:text-[--ink]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[12.5px] font-medium leading-[1.85] text-[--ink]/38">
                  {step.description}
                </p>
              </div>

              {/* Items */}
              <ul className="mt-auto flex flex-col gap-2 border-t border-white/[0.05] pt-5">
                {step.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[11.5px] font-semibold text-[--ink]/35">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[--leaf]/35 transition-all duration-300 group-hover:bg-[--leaf]/65" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Conector → */}
              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 items-center justify-center lg:flex">
                  <div className="border border-white/[0.06] bg-[--paper] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[--ink]/22">
                    →
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-8 lg:px-14">
        <p className="font-display text-xl font-bold text-[--ink]/65">
          Comece pelo desafio,{' '}
          <span className="font-light italic text-[--ink]/40">não pelo currículo.</span>
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/para-empresas/publicar"
            className="inline-flex h-10 cursor-pointer items-center gap-2 border border-[--leaf] bg-[--leaf] px-6 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[--paper] shadow-[0_0_20px_rgba(0,255,133,0.2)] transition-all hover:shadow-[0_0_32px_rgba(0,255,133,0.38)]"
          >
            Publicar_Desafio
          </Link>
          <Link
            href="/para-jovens"
            className="inline-flex h-10 cursor-pointer items-center gap-2 border border-white/[0.1] bg-transparent px-6 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[--ink]/50 transition-all hover:border-white/[0.2] hover:text-[--ink]"
          >
            Submeter_Perfil
          </Link>
        </div>
      </div>

    </section>
  );
};

export default HowItWorksSection;
