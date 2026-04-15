import { motion } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, School2 } from 'lucide-react';
import { Link } from 'wouter';

const portals = [
  {
    code: '01',
    label: 'PORTAL // EMPRESA',
    icon: Building2,
    title: 'Empresa',
    description: 'Publicar desafio, ver shortlist com fit score e acompanhar Entrega Auditável.',
    cta: 'Entrar como empresa',
    href: '/login/empresa',
    accent: 'var(--leaf)',
  },
  {
    code: '02',
    label: 'PORTAL // UNIVERSIDADE',
    icon: School2,
    title: 'Universidade',
    description: 'Ativar extensão com dados, visibilidade institucional e conexão com empresas.',
    cta: 'Entrar como IES',
    href: '/login/universidade',
    accent: 'var(--sky)',
  },
  {
    code: '03',
    label: 'PORTAL // TALENTO',
    icon: GraduationCap,
    title: 'Talento',
    description: 'Construir portfólio verificável, entrar em squads e ganhar experiência observável.',
    cta: 'Entrar como talento',
    href: '/login/jovem',
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

const CTASection = () => {
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
            ENTRADA // ESCOLHA_SEU_PORTAL
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight text-[--ink]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            A proposta é uma só.
            <br />
            <span className="font-light italic text-[--leaf]">A porta muda por buyer</span>.
          </h2>
          <p className="mt-6 font-sans text-[15px] font-medium leading-relaxed text-[--ink]/40">
            Empresas compram execução, universidades ativam extensão e talentos entram em projetos reais. A experiência já começa segmentada.
          </p>
        </motion.div>

        {/* Portal Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-0 md:grid-cols-3"
        >
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col border border-white/[0.05] p-10 hover:bg-white/[0.018] transition-colors duration-300"
                style={{ borderLeft: index > 0 ? 'none' : undefined }}
              >
                <p className="mb-7 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                  {portal.label}
                </p>

                <div
                  className="mb-7 flex h-12 w-12 items-center justify-center border border-white/[0.07]"
                  style={{ color: portal.accent }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <h3 className="mb-4 font-display text-[1.5rem] font-bold tracking-tight text-[--ink]">
                  {portal.title}
                </h3>

                <p className="mb-10 flex-1 font-sans text-[14px] font-medium leading-relaxed text-[--ink]/50">
                  {portal.description}
                </p>

                <Link
                  href={portal.href}
                  className="inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] transition-colors"
                  style={{ color: portal.accent }}
                >
                  {portal.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
