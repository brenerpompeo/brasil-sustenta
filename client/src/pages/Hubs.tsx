import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  Users,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegionalMap from "@/components/RegionalMap";
import { SEO } from "@/components/SEO";
import { hubs, statusConfig } from "@/lib/hubs";
import { editorialViewport, staggeredFadeUp } from "@/lib/motion";

const fadeUp = staggeredFadeUp(0.08, 20, 0.5);

export default function Hubs() {
  const aberturaHubs = hubs.filter(h => h.status === "abertura");
  const planejamentoHubs = hubs.filter(h => h.status === "planejamento");
  const expansaoHubs = hubs.filter(h => h.status === "expansao");

  const allOperational = [...aberturaHubs, ...planejamentoHubs];

  return (
    <div className="min-h-screen bg-[--paper] text-[--ink]">
      <SEO
        title="HUBs Regionais — Brasil Sustenta"
        description="Polos regionais do Brasil Sustenta. Clusters universitários e corporativos operando em rede nacional com foco em ESG e economia criativa."
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-black/8 pt-[calc(3.5rem+2rem)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="dot-grid absolute inset-0 opacity-[0.28]" />
          <div
            className="absolute -left-40 -top-20 h-[560px] w-[560px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,133,0.048) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 py-16 sm:px-8 lg:px-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/28">
              MAPA_OPERACIONAL // BRASIL_SUSTENTA
            </p>
            <h1
              className="max-w-3xl font-display font-black italic leading-[0.88] tracking-tight text-[--ink]"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
            >
              Operação em polos
              <span className="block font-light italic text-[--leaf-1]">
                {" "}
                regionais
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-[13.5px] font-medium leading-[1.9] text-[--ink]/42">
              A plataforma cresce por clusters universitários e corporativos.
              Cada HUB é uma operação local conectada à rede nacional —
              curadoria de talentos, matching de empresas e entrega rastreável.
            </p>
          </motion.div>

          {/* Status pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {(Object.entries(statusConfig) as any[]).map(([key, sc]: any) => {
              const count = hubs.filter(h => h.status === key).length;
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 border border-black/8 bg-white px-3.5 py-2"
                >
                  <span className="relative flex h-2 w-2">
                    {key === "abertura" && (
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                        style={{ background: sc.labelColor }}
                      />
                    )}
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{
                        background: sc.labelColor,
                        opacity: key === "expansao" ? 0.45 : 1,
                      }}
                    />
                  </span>
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{
                      color:
                        key === "expansao"
                          ? "rgba(250,250,250,0.28)"
                          : sc.labelColor + "aa",
                    }}
                  >
                    {sc.label}
                  </span>
                  <span className="font-mono text-[10px] text-[--ink]/25">
                    ({count})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mapa interativo ── */}
      <RegionalMap compact />

      {/* ── Polos operacionais (abertura + planejamento) ── */}
      <section className="border-b border-black/8">
        <div className="mx-auto max-w-[1280px] px-6 py-14 sm:px-8 lg:px-14">
          <p className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/25">
            POLOS_OPERACIONAIS — {allOperational.length} HUBs
          </p>
          <div className="grid gap-px bg-black/8 sm:grid-cols-3">
            {allOperational.map((hub, i) => {
              const Icon = hub.icon;
              const sc = statusConfig[hub.status];
              return (
                <motion.div
                  key={hub.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={editorialViewport}
                  className="group flex flex-col gap-5 bg-white p-7 transition-all duration-300 hover:bg-black/[0.02]"
                >
                  {/* Header do card */}
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center"
                      style={{
                        background: `${hub.color}10`,
                        border: `1px solid ${hub.color}22`,
                        color: hub.color + "cc",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className="flex items-center gap-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]"
                      style={{
                        color:
                          sc.labelColor +
                          (hub.status === "planejamento" ? "80" : "cc"),
                      }}
                    >
                      {hub.status === "abertura" && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full"
                            style={{ background: sc.labelColor, opacity: 0.6 }}
                          />
                          <span
                            className="relative inline-flex h-1.5 w-1.5 rounded-full"
                            style={{ background: sc.labelColor }}
                          />
                        </span>
                      )}
                      {sc.label}
                    </span>
                  </div>

                  {/* Identidade */}
                  <div>
                    <p
                      className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: hub.color + "55" }}
                    >
                      {hub.tag}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-[--ink]/82">
                      {hub.name}
                    </h3>
                    <p className="mt-0.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[--ink]/32">
                      {hub.specialty}
                    </p>
                  </div>

                  <p className="flex-1 text-[12.5px] leading-[1.85] text-[--ink]/35">
                    {hub.description}
                  </p>

                  {/* Barra inferior */}
                  <div
                    className="h-px w-full transition-all duration-500 group-hover:opacity-80"
                    style={{
                      background: `linear-gradient(90deg, ${hub.color}40 0%, transparent 100%)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Expansão futura ── */}
      <section className="border-b border-white/[0.05]">
        <div className="mx-auto max-w-[1280px] px-6 py-14 sm:px-8 lg:px-14">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/25">
            ROADMAP — EXPANSÃO 2027+
          </p>
          <h2
            className="mb-8 font-display font-bold leading-[0.92] tracking-tight text-[--ink]/55"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            Próximos polos
            <span className="font-light italic" style={{ color: "#FF6B3560" }}>
              {" "}
              em formação
            </span>
            .
          </h2>

          <div className="grid gap-px bg-black/8 sm:grid-cols-2">
            {expansaoHubs.map((hub, i) => {
              const Icon = hub.icon;
              return (
                <motion.div
                  key={hub.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={editorialViewport}
                  className="flex items-start gap-5 bg-white p-7"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-[--ember]/15 bg-[--ember]/[0.05] text-[--ember]/40">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-[--ember]/40">
                      {hub.tag}
                    </p>
                    <h3 className="mt-0.5 font-display text-xl font-bold text-[--ink]/45">
                      {hub.name}
                    </h3>
                    <p className="mt-0.5 text-[11.5px] text-[--ink]/25">
                      {hub.specialty}
                    </p>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-[--ink]/30">
                      {hub.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA por tipo de usuário ── */}
      <section>
        <div className="mx-auto grid max-w-[1280px] border-t border-black/8 sm:grid-cols-3">
          {[
            {
              icon: Building2,
              label: "Sou organização",
              sub: "Quero publicar desafios ESG no polo da minha cidade",
              href: "/para-empresas/publicar",
            },
            {
              icon: GraduationCap,
              label: "Sou IES",
              sub: "Quero conectar minha universidade a um HUB",
              href: "/para-universidades/parceria",
            },
            {
              icon: Users,
              label: "Sou talento",
              sub: "Quero entrar na base do polo mais próximo",
              href: "/para-jovens/oportunidades",
            },
          ].map(({ icon: Icon, label, sub, href }, i) => (
            <Link
              key={href}
              href={href}
              className="group flex cursor-pointer items-start justify-between border-b border-r border-black/8 bg-white p-8 transition-all duration-200 last:border-r-0 hover:bg-black/[0.02] sm:border-b-0"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-white/[0.06] bg-white/[0.02] text-[--ink]/35 transition-all duration-200 group-hover:border-[--leaf]/18 group-hover:text-[--leaf]/55">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[--ink]/50 transition-colors group-hover:text-[--ink]/75">
                    {label}
                  </p>
                  <p className="mt-0.5 max-w-[180px] text-[11.5px] text-[--ink]/28">
                    {sub}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[--ink]/18 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[--leaf]/45" />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
