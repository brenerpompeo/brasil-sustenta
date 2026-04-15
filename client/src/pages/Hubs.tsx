import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Zap, Leaf, ArrowUpRight, Building2, GraduationCap, Users, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegionalMap, { hubs } from '@/components/RegionalMap';
import { SEO } from '@/components/SEO';

// ── Página de HUBs ────────────────────────────────────────────────────────────

export default function Hubs() {
  const activeHubs = hubs.filter((h) => h.status === 'ativo');
  const expansionHubs = hubs.filter((h) => h.status === 'expansao');

  return (
    <div className="min-h-screen bg-[--paper] text-[--ink]">
      <SEO
        title="HUBs Regionais — Brasil Sustenta"
        description="Conheça os polos regionais do Brasil Sustenta. Clusters universitários e corporativos operando em rede nacional com foco em ESG e economia criativa."
      />
      <Header />

      {/* ── Hero da página ── */}
      <section className="relative overflow-hidden border-b border-white/[0.05] pt-[calc(3.5rem+2rem)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="dot-grid absolute inset-0 opacity-[0.3]" />
          <div
            className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,255,133,0.05) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:px-8 lg:px-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/30">
              MAPA_OPERACIONAL // BRASIL_SUSTENTA
            </p>
            <h1
              className="max-w-3xl font-display font-bold leading-[0.88] tracking-tight text-[--ink]"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            >
              Operação em polos
              <span className="block font-light italic text-[--leaf]"> regionais</span>.
            </h1>
            <p className="mt-6 max-w-xl text-[14px] font-medium leading-[1.85] text-[--ink]/45">
              A plataforma cresce por clusters universitários e corporativos. Cada HUB é uma operação local conectada à rede nacional — curadoria de talentos, matching de empresas e entrega rastreável.
            </p>
          </motion.div>

          {/* Métricas gerais */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: `${activeHubs.length}`, label: 'HUBs ativos' },
              { value: `${hubs.reduce((a, h) => a + h.stats.talentos, 0)}+`, label: 'Talentos na rede' },
              { value: `${hubs.reduce((a, h) => a + h.stats.empresas, 0)}+`, label: 'Organizações' },
              { value: `${hubs.reduce((a, h) => a + h.stats.projetos, 0)}+`, label: 'Projetos entregues' },
            ].map(({ value, label }) => (
              <div key={label} className="border border-white/[0.06] bg-white/[0.02] px-4 py-4">
                <div className="font-display text-2xl font-black text-[--leaf]">{value}</div>
                <div className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[--ink]/30">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mapa interativo (full) ── */}
      <RegionalMap compact />

      {/* ── Cards detalhados por HUB ativo ── */}
      <section className="border-b border-white/[0.05]">
        <div className="mx-auto max-w-[1280px] px-6 py-14 sm:px-8 lg:px-14">
          <p className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
            POLOS_ATIVOS — DETALHAMENTO
          </p>
          <div className="grid gap-px bg-white/[0.05] sm:grid-cols-3">
            {activeHubs.map((hub, i) => {
              const Icon = hub.icon;
              return (
                <motion.div
                  key={hub.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group flex flex-col gap-6 bg-[--paper] p-7 transition-all duration-300 hover:bg-white/[0.02]"
                >
                  {/* Ícone + tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center"
                      style={{ background: `${hub.color}12`, border: `1px solid ${hub.color}28`, color: hub.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className="font-mono text-[9.5px] font-bold uppercase tracking-[0.22em]"
                      style={{ color: `${hub.color}80` }}
                    >
                      ATIVO
                    </span>
                  </div>

                  {/* Nome + especialidade */}
                  <div>
                    <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]"
                       style={{ color: `${hub.color}60` }}>
                      {hub.tag}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-[--ink]/85">{hub.name}</h3>
                    <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[--ink]/35">{hub.specialty}</p>
                  </div>

                  {/* Descrição */}
                  <p className="flex-1 text-[13px] leading-relaxed text-[--ink]/38">{hub.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 border-t border-white/[0.05] pt-5">
                    {[
                      { v: hub.stats.talentos, l: 'Talentos' },
                      { v: hub.stats.empresas, l: 'Empresas' },
                      { v: hub.stats.projetos, l: 'Projetos' },
                    ].map(({ v, l }) => (
                      <div key={l} className="text-center">
                        <div className="font-display text-lg font-black" style={{ color: hub.color }}>{v}</div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-[--ink]/28">{l}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/quem-somos/hubs/${hub.id}`}
                    className="group/link inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] transition-colors"
                    style={{ color: `${hub.color}55` }}
                  >
                    Ver detalhes do polo
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Expansão futura ── */}
      <section className="border-b border-white/[0.05]">
        <div className="mx-auto max-w-[1280px] px-6 py-14 sm:px-8 lg:px-14">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
                ROADMAP_EXPANSÃO — H2 2026 → 2027
              </p>
              <h2 className="font-display text-[2.2rem] font-bold leading-[0.9] tracking-tight text-[--ink]/70">
                Próximos polos
                <span className="font-light italic text-[--ember]/60"> em formação</span>.
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-px bg-white/[0.04] sm:grid-cols-2">
            {expansionHubs.map((hub, i) => {
              const Icon = hub.icon;
              return (
                <motion.div
                  key={hub.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-5 bg-[--paper] p-7"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-[--ember]/20 bg-[--ember]/[0.06] text-[--ember]/50">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-[--ember]/45">{hub.tag}</p>
                    <h3 className="mt-0.5 font-display text-xl font-bold text-[--ink]/55">{hub.name}</h3>
                    <p className="mt-0.5 text-[11.5px] text-[--ink]/28">{hub.specialty}</p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[--ink]/32">{hub.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA parceria de HUB ── */}
      <section className="border-b border-white/[0.05]">
        <div className="mx-auto max-w-[1280px] grid gap-px bg-white/[0.04] px-0 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Building2, label: 'Sou organização', sub: 'Quero publicar desafios ESG no meu polo regional', href: '/para-empresas/publicar' },
            { icon: GraduationCap, label: 'Sou IES', sub: 'Quero conectar minha universidade a um HUB', href: '/para-universidades/parceria' },
            { icon: Users, label: 'Sou talento', sub: 'Quero entrar na base do polo da minha cidade', href: '/para-jovens/oportunidades' },
          ].map(({ icon: Icon, label, sub, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between bg-[--paper] p-8 transition-all duration-200 hover:bg-white/[0.02]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 items-center justify-center border border-white/[0.07] bg-white/[0.03] text-[--ink]/40 transition-all group-hover:border-[--leaf]/20 group-hover:text-[--leaf]/60">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[--ink]/55 group-hover:text-[--ink]/80">{label}</p>
                  <p className="mt-0.5 max-w-[200px] text-[12px] text-[--ink]/30">{sub}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[--ink]/20 transition-all group-hover:text-[--leaf]/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
