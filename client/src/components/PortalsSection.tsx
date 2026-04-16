import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const portals = [
  {
    label: 'CORP_ALLIANCE',
    heading: 'EMPRESAS',
    description:
      'Publique um desafio ESG e receba um squad universitário com fit score explicável, curadoria humana e entrega auditável.',
    href: '/para-empresas',
    accentColor: '#00FF85',
    imgSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
  },
  {
    label: 'TALENT_NODE',
    heading: 'TALENTOS',
    description:
      'Entre em projetos reais, construa portfólio verificável e ganhe experiência que vai além de currículo e dinâmica de grupo.',
    href: '/para-jovens',
    accentColor: '#2E5BFF',
    imgSrc: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070',
  },
  {
    label: 'KNOWLEDGE_GRID',
    heading: 'IES',
    description:
      'Ative extensão com dados, visibilidade institucional, conexão com empresas e compliance com Resolução MEC 7/2018.',
    href: '/para-universidades',
    accentColor: '#F5FF00',
    imgSrc: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070',
  },
];

/** Animated letter that reveals colored version on parent hover */
const AnimatedLetter = ({ letter, color }: { letter: string; color: string }) => (
  <div className="inline-block h-[42px] overflow-hidden font-display text-4xl font-black uppercase italic leading-none md:h-[60px] md:text-6xl">
    <motion.span
      className="flex flex-col"
      variants={{ hover: { y: '-50%' } }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span>{letter === ' ' ? '\u00A0' : letter}</span>
      <span style={{ color }}>{letter === ' ' ? '\u00A0' : letter}</span>
    </motion.span>
  </div>
);

const PortalsSection = () => {
  return (
    <section className="relative z-10 border-t border-white/10 bg-[--paper] overflow-hidden">
      {/* Section header */}
      <div className="max-w-[100rem] mx-auto px-8 py-20 lg:px-16 lg:py-28">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-8 flex gap-2">
              <div className="h-1 w-8 bg-[--leaf]" />
              <div className="h-1 w-8 bg-[--sun]" />
              <div className="h-1 w-8 bg-[--sky]" />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--leaf] mb-6 block animate-pulse">
              [02] LEVERAGE_VECTORS // BR_SOVEREIGNTY
            </span>
            <h2 className="font-display text-5xl font-black italic leading-[0.85] md:text-7xl lg:text-8xl">
              Soberania
              <br />
              Estratégica.
            </h2>
          </div>
          <p className="max-w-md font-body text-lg leading-relaxed text-[--ink]/40 lg:text-xl">
            Onde a criatividade acadêmica encontra a infraestrutura do capital para regenerar biomas e setores.
          </p>
        </div>
      </div>

      {/* Portal cards grid */}
      <div className="grid grid-cols-1 border-t border-l border-white/10 md:grid-cols-3">
        {portals.map((portal) => (
          <motion.div
            key={portal.label}
            initial="initial"
            whileHover="hover"
            className="group relative h-[480px] w-full cursor-pointer overflow-hidden border-r border-b border-white/10 bg-[--paper]"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 opacity-10 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-30 group-hover:grayscale-0"
              style={{
                backgroundImage: `url(${portal.imgSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

            {/* Glow on hover */}
            <div
              className="pointer-events-none absolute -inset-20 opacity-0 blur-[100px] transition-opacity duration-1000 group-hover:opacity-20"
              style={{ background: `radial-gradient(circle at 50% 50%, ${portal.accentColor}, transparent)` }}
            />

            <Link
              href={portal.href}
              className="relative z-20 flex h-full flex-col justify-between p-10 md:p-12"
            >
              {/* Top: label + arrow */}
              <div className="flex items-start justify-between">
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]"
                  style={{ color: `${portal.accentColor}cc` }}
                >
                  {portal.label}
                </span>
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden border border-white/10 transition-all duration-500">
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ backgroundColor: portal.accentColor }}
                  />
                  <ArrowUpRight className="relative z-10 h-6 w-6 text-white transition-all duration-500 group-hover:rotate-45 group-hover:text-black" />
                </div>
              </div>

              {/* Bottom: animated heading + description */}
              <div>
                <h4 className="mb-8 flex flex-wrap">
                  {portal.heading.split('').map((letter, index) => (
                    <AnimatedLetter key={index} letter={letter} color={portal.accentColor} />
                  ))}
                </h4>
                <div
                  className="mb-8 h-[2px] w-0 shadow-2xl transition-all duration-1000 group-hover:w-full"
                  style={{ backgroundColor: portal.accentColor }}
                />
                <p className="max-w-[90%] font-body text-base leading-relaxed text-[--ink]/40 transition-colors duration-500 group-hover:text-white md:text-lg">
                  {portal.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PortalsSection;
