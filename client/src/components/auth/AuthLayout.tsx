import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

type AuthLayoutProps = {
  persona: "empresa" | "jovem" | "ies" | "embaixador";
  children: React.ReactNode;
};

const PERSONA_CONFIG = {
  empresa: {
    accent: "#00FF41",
    label: "CORP // ESG_FRAMEWORK",
    tagline: "Squads universitários para seus desafios ESG.",
  },
  jovem: {
    accent: "#00FF41",
    label: "TALENT // INIT_PHASE",
    tagline: "Seu fit score explicado. Seu impacto mensurável.",
  },
  ies: {
    accent: "#FFD700",
    label: "IES // UNIVERSITY_PARTNER",
    tagline: "Extensão universitária com trilha de evidência.",
  },
  embaixador: {
    accent: "#0047FF",
    label: "HUB // EMBAIXADOR",
    tagline: "Coordene uma cidade na rede Brasil Sustenta.",
  },
};

export function AuthLayout({ persona, children }: AuthLayoutProps) {
  const config = PERSONA_CONFIG[persona];

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Coluna esquerda — identidade visual */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden border-r border-white/8 p-12 lg:flex lg:w-[480px] xl:w-[560px]"
      >
        {/* Glow de fundo */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[120px]"
          style={{ backgroundColor: config.accent }}
        />

        {/* Logo */}
        <Link href="/">
          <div className="flex flex-col leading-[1.05] cursor-pointer">
            <span className="font-display text-[22px] font-black uppercase tracking-[-0.02em] text-white">
              Brasil
            </span>
            <span className="font-display text-[22px] font-black uppercase tracking-[-0.02em] text-white/25">
              Sustenta
            </span>
          </div>
        </Link>

        {/* Conteúdo central */}
        <div className="relative z-10">
          <span
            className="mb-6 inline-block font-mono text-[9px] font-black uppercase tracking-[0.32em]"
            style={{ color: config.accent }}
          >
            ✦ {config.label}
          </span>
          <h2
            className="font-display font-black uppercase leading-[0.82] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {config.tagline.split(".").map((line, i) => (
              <span key={i}>
                {line.trim()}{i < config.tagline.split(".").length - 2 ? "." : ""}
                {i < config.tagline.split(".").length - 2 && <br />}
              </span>
            ))}
          </h2>
          <div
            className="mt-6 h-[2px] w-16"
            style={{ backgroundColor: config.accent }}
          />
        </div>

        {/* Rodapé */}
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/15">
          Brasil Sustenta © 2025
        </div>
      </div>

      {/* Coluna direita — formulário */}
      <div className="flex flex-1 flex-col">
        {/* Top bar mobile */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4 lg:hidden">
          <Link href="/">
            <div className="flex flex-col leading-[1.05]">
              <span className="font-display text-[18px] font-black uppercase text-white">Brasil</span>
              <span className="font-display text-[18px] font-black uppercase text-white/25">Sustenta</span>
            </div>
          </Link>
          <Link href="/">
            <button type="button" className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Voltar
            </button>
          </Link>
        </div>

        {/* Voltar desktop */}
        <div className="hidden items-center border-b border-white/8 px-10 py-4 lg:flex">
          <Link href="/">
            <button type="button" className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 transition-colors hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
            </button>
          </Link>
        </div>

        {/* Conteúdo do form */}
        <div className="flex flex-1 items-start justify-center px-6 py-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
