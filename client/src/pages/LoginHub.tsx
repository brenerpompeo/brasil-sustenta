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
    <div className="min-h-screen bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
      <SEO
        title="Acesso por Persona | Brasil Sustenta"
        description="Escolha o portal da sua operação: talento, empresa, IES, prefeitura ou liderança territorial."
      />
      <Header />

      <main className="pt-[4.75rem]">
        <section className="container-editorial section-y border-b border-[color:var(--color-border)]">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] xl:items-end">
            <div className="space-y-6">
              <p className="text-eyebrow-bright">Acesso por persona</p>
              <h1 className="max-w-[12ch] text-display">
                Uma entrada clara para cada operação.
              </h1>
              <p className="max-w-3xl text-lede">
                O hub de acesso organiza a jornada por buyer, campus, juventude,
                município e liderança local. Cada portal abre uma leitura própria
                de produto, linguagem e próxima ação.
              </p>
            </div>

            <div className="surface-ink overflow-hidden rounded-[2rem] border border-white/10 p-8">
              <p className="text-eyebrow text-white/60">Operating brief</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,3vw,3.2rem)] font-black leading-[0.92] tracking-[-0.045em] text-white">
                Cinco portas, uma operação coordenada.
              </h2>
              <div className="mt-7 grid gap-3">
                {[
                  "Brief, curadoria, sprint e relatório como linguagem comum.",
                  "Persona-first para reduzir ruído de navegação e copy.",
                  "Rotas /auth/* como entrada canônica para cada stakeholder.",
                ].map(item => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/72"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {AUTH_PERSONA_ORDER.map(key => {
              const persona = AUTH_PERSONAS[key];
              const Icon = persona.icon;
              const accent = accentClasses[persona.tone];

              return (
                <article
                  key={persona.key}
                  className={cn(
                    "rounded-[2rem] border border-[color:var(--color-border)] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(10,10,10,0.08)]",
                    accent.card
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em]",
                        accent.badge
                      )}
                    >
                      {persona.hubEyebrow}
                    </span>
                    <span
                      className={cn(
                        "inline-flex size-12 items-center justify-center rounded-[1.1rem]",
                        accent.icon
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <h2 className="mt-6 font-display text-[2rem] font-black leading-[0.94] tracking-[-0.04em] text-[color:var(--color-ink)]">
                    {persona.portalLabel}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-[color:var(--color-ink-3)]">
                    {persona.hubDescription}
                  </p>

                  <div className="mt-5 grid gap-2.5">
                    {persona.hubBullets.map(bullet => (
                      <div
                        key={bullet}
                        className="rounded-[1.2rem] border border-[color:var(--color-border)] bg-[color:var(--color-paper-2)] px-4 py-3 text-sm leading-6 text-[color:var(--color-ink-3)]"
                      >
                        {bullet}
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    size="lg"
                    variant={accent.button}
                    className="mt-6 w-full justify-between rounded-[1.1rem] text-[0.75rem] font-black uppercase tracking-[0.22em]"
                  >
                    <Link href={persona.href}>
                      Entrar no portal
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
