import { motion } from 'framer-motion';
import { BrainCircuit, Clock, FileStack, Layers3, Target, Users } from 'lucide-react';

const mainStats = [
  { icon: FileStack, value: '1', label: 'brief central por desafio', accent: 'var(--leaf)' },
  { icon: Users, value: '3', label: 'entradas dedicadas na rede', accent: 'var(--sky)' },
  { icon: Clock, value: '7–10', label: 'dias para formar um squad', accent: 'var(--sun)' },
  { icon: Target, value: '18', label: 'ODS e causas mapeáveis', accent: 'var(--ember)' },
];

const additionalStats = [
  { icon: BrainCircuit, value: 'IA Explicável', label: 'Justificativa de fit para shortlist e squad' },
  { icon: Layers3, value: 'Sprints', label: 'Entregas parciais com checkpoints e feedback' },
  { icon: FileStack, value: 'Relatório Final', label: 'Trilha de evidência para RH, ESG e inovação' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const StatsSection = () => {
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
            ARQUITETURA // SINAIS_DE_PRODUTO
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Estrutura visível de como
            <span className="font-light italic text-[--leaf]"> a plataforma opera</span>.
          </h2>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group border border-white/[0.05] p-10 hover:bg-white/[0.018] transition-colors duration-300"
                style={{ borderLeft: index > 0 ? 'none' : undefined }}
              >
                <div
                  className="mb-6 flex h-10 w-10 items-center justify-center border border-white/[0.07]"
                  style={{ color: stat.accent }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p
                  className="font-display font-bold leading-none tracking-tight"
                  style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: stat.accent }}
                >
                  {stat.value}
                </p>
                <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[--ink]/28">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {additionalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-5 border border-white/[0.05] px-8 py-6 hover:bg-white/[0.018] transition-colors duration-300"
                style={{ borderLeft: index > 0 ? 'none' : undefined }}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-white/[0.07] text-[--ink]/30">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-[1rem] font-bold tracking-tight text-[--ink]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[--ink]/30">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/18"
        >
          INDICADORES_DE_ARQUITETURA_E_JORNADA_DO_PRODUTO
        </motion.p>
      </div>
    </section>
  );
};

export default StatsSection;
