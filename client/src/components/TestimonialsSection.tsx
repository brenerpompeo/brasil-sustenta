import { motion } from 'framer-motion';
import { Building2, GraduationCap, School2 } from 'lucide-react';

const voices = [
  {
    code: '01',
    label: 'VOZ // EMPRESA',
    name: 'Buyer Corporativo',
    role: 'RH / ESG / Inovação',
    text: 'Preciso de um fluxo simples para transformar desafio em squad, enxergar o fit dos talentos e acompanhar entregas sem virar um projeto pesado de consultoria.',
    icon: Building2,
    accent: 'var(--leaf)',
  },
  {
    code: '02',
    label: 'VOZ // UNIVERSIDADE',
    name: 'Buyer Institucional',
    role: 'Extensão / Coordenação',
    text: 'Preciso conectar meus alunos ao mercado com menos atrito, gerar relatórios e evidências, e fazer a extensão caber na operação acadêmica.',
    icon: School2,
    accent: 'var(--sky)',
  },
  {
    code: '03',
    label: 'VOZ // TALENTO',
    name: 'Usuário Final',
    role: 'Graduação / Recém-formado',
    text: 'Quero sair da teoria, entrar em projeto real, construir portfólio verificável e entender porque fui selecionado para aquele desafio.',
    icon: GraduationCap,
    accent: 'var(--sun)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const TestimonialsSection = () => {
  return (
    <section className="border-t border-white/[0.05] bg-[--paper] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-20 max-w-2xl"
        >
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
            PROVA_DE_VALOR // TRÊS_LADOS_DA_REDE
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            O que cada lado da rede
            <span className="font-light italic text-[--leaf]"> precisa enxergar</span>.
          </h2>
          <p className="mt-6 font-sans text-[15px] font-medium leading-relaxed text-[--ink]/40">
            Em vez de inflar prova social, a plataforma explicita o que empresa, universidade e talento querem validar para confiar no produto.
          </p>
        </motion.div>

        {/* Voices Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-0 md:grid-cols-3"
        >
          {voices.map((voice, index) => {
            const Icon = voice.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col border border-white/[0.05] p-10 hover:bg-white/[0.018] transition-colors duration-300"
                style={{ borderLeft: index > 0 ? 'none' : undefined }}
              >
                {/* Label */}
                <p className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                  {voice.label}
                </p>

                {/* Icon */}
                <div
                  className="mb-8 flex h-12 w-12 items-center justify-center border border-white/[0.07]"
                  style={{ color: voice.accent }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                {/* Quote */}
                <p className="mb-10 flex-1 font-sans text-[15px] font-medium italic leading-relaxed text-[--ink]/70">
                  "{voice.text}"
                </p>

                {/* Author */}
                <div className="border-t border-white/[0.05] pt-6">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[--ink]">
                    {voice.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[--ink]/28">
                    {voice.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
