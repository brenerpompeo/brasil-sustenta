import { type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SEO } from "@/components/SEO";
import {
  AUTH_PERSONAS,
  AUTH_PERSONA_ORDER,
  type AccentTone,
} from "@/constants/auth-personas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const accentClasses: Record<
  AccentTone,
  {
    badge: string;
    icon: string;
    card: string;
    button: "leaf" | "atlantic" | "sun";
  }
> = {
  green: {
    badge:
      "border-[color:var(--color-leaf)]/20 bg-[color:var(--color-leaf-soft)] text-[color:var(--color-leaf-deep)]",
    icon: "bg-[color:var(--color-leaf-soft)] text-[color:var(--color-leaf-deep)]",
    card: "hover:border-[color:var(--color-leaf)]/25",
    button: "leaf",
  },
  blue: {
    badge:
      "border-[color:var(--color-atlantic)]/20 bg-[color:var(--color-atlantic-soft)] text-[color:var(--color-atlantic-deep)]",
    icon: "bg-[color:var(--color-atlantic-soft)] text-[color:var(--color-atlantic-deep)]",
    card: "hover:border-[color:var(--color-atlantic)]/25",
    button: "atlantic",
  },
  yellow: {
    badge:
      "border-[color:var(--color-sun-deep)]/20 bg-[color:var(--color-sun-soft)] text-[color:var(--color-sun-deep)]",
    icon: "bg-[color:var(--color-sun-soft)] text-[color:var(--color-sun-deep)]",
    card: "hover:border-[color:var(--color-sun-deep)]/25",
    button: "sun",
  },
};

export default function LoginHub() {
  return (
    <div className="min-h-screen bg-[color:var(--color-paper)] text-[color:var(--color-ink)] selection:bg-[color:var(--color-leaf-soft)] selection:text-[color:var(--color-leaf-deep)]">
      <SEO
        title="Portais de Acesso | Brasil Sustenta"
        description="Cinco portas de entrada, uma única infraestrutura de impacto. Escolha sua operação: Jovem, Empresa, IES, Embaixador ou Prefeitura."
      />
      <Header />

      <main className="pt-[4.75rem]">
        <section className="container-editorial section-y border-b border-[color:var(--color-border)]">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.8fr)] xl:items-end">
            <div className="space-y-8">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--color-leaf-deep)]">
                Access_Protocol // Phase_One
              </p>
              <h1 className="max-w-[15ch] font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.88] tracking-[-0.05em] text-[color:var(--color-ink)] text-balance">
                Cinco portas paralelas, uma infraestrutura comum.
              </h1>
              <p className="max-w-2xl text-balance font-body text-xl leading-relaxed text-[color:var(--color-ink-3)] md:text-2xl">
                O hub de acesso organiza a jornada soberana de cada stakeholder. 
                Cada portal ativa uma leitura própria de produto, linguagem e entrega de impacto territorial.
              </p>
            </div>

            <div className="surface-ink relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[color:var(--color-ink)] p-8 shadow-2xl md:p-10">
              <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full border border-white/10 bg-white/5 p-20 blur-3xl" />
              
              <div className="relative z-10 space-y-8">
                <div>
                  <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/40">
                    System_Log // Authentication
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-black leading-[0.92] tracking-[-0.04em] text-white">
                    Sovereign entry.
                  </h2>
                </div>
                
                <div className="grid gap-3">
                  {[
                    "Briefing, curadoria e sprint auditável em tempo real.",
                    "Soberania de dados por persona e território.",
                    "Relatórios de evidência gerados na camada BS_INFRA.",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 px-5 py-4 text-sm font-medium leading-relaxed text-white/70"
                    >
                      <span className="font-mono text-[0.625rem] font-bold text-[color:var(--color-leaf-bright)]">
                        [0{i + 1}]
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {AUTH_PERSONA_ORDER.map((key, idx) => {
              const persona = AUTH_PERSONAS[key];
              const Icon = persona.icon;
              const accent = accentClasses[persona.tone];

              return (
                <article
                  key={persona.key}
                  // View Transition: native browser shared-element morph to auth card
                  style={{ viewTransitionName: `persona-card-${persona.key}` } as CSSProperties}
                  className={cn(
                    "group relative flex flex-col rounded-[2.5rem] border border-[color:var(--color-border)] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[color:var(--color-leaf)] hover:shadow-[0_32px_64px_-16px_rgba(33,48,22,0.12)]",
                    accent.card
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 font-mono text-[0.6rem] font-black uppercase tracking-[0.2em]",
                        accent.badge
                      )}
                    >
                      Portal 0{idx + 1}
                    </span>
                    <span
                      className={cn(
                        "inline-flex size-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110",
                        accent.icon
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <div className="mt-8 flex-1">
                    <h2 className="font-display text-3xl font-black leading-[0.9] tracking-[-0.04em] text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-leaf-deep)]">
                      {persona.portalLabel}
                    </h2>
                    <p className="mt-4 font-body text-sm leading-relaxed text-[color:var(--color-ink-3)]">
                      {persona.hubDescription}
                    </p>

                    <div className="mt-6 space-y-2">
                      {persona.hubBullets.slice(0, 2).map((bullet, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 font-mono text-[0.625rem] font-bold uppercase tracking-widest text-[color:var(--color-ink)]/40"
                        >
                          <span className="text-[color:var(--color-leaf)]">•</span>
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    variant={accent.button}
                    className="mt-10 w-full justify-between rounded-2xl py-7 font-mono text-[0.65rem] font-black uppercase tracking-[0.25em] shadow-none"
                  >
                    <Link href={persona.href}>
                      Acessar
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
