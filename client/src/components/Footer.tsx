import { ArrowRight, Shield } from "lucide-react";
import { Link } from "wouter";

const networkLinks = [
  { label: "Manifesto", href: "/manifesto" },
  { label: "HUBs", href: "/quem-somos/hubs" },
  { label: "Comunidade", href: "/comunidade" },
];

const complianceLinks = [
  { label: "Relatorios", href: "/relatorios" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Termos", href: "#" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/8 bg-[--paper]">
      <div className="editorial-grid mx-auto max-w-[100rem]">
        <div className="editorial-cell grid gap-10 px-8 py-16 lg:px-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="editorial-kicker mb-5">
              Brasil Sustenta // The Paper of Impact
            </p>
            <h2 className="mb-6 max-w-3xl font-display text-5xl font-black italic leading-[0.84] tracking-tight text-[--ink] md:text-7xl">
              Infraestrutura editorial para impacto, reputacao e operacao.
            </h2>
            <p className="max-w-2xl text-base font-medium leading-8 text-[--ink]/58 md:text-lg">
              A plataforma organiza talentos, buyers e instituicoes em torno de
              desafios reais. Menos ruido de category building. Mais contexto,
              entrega e evidencias.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/para-jovens"
              className="group editorial-cell flex min-h-[168px] flex-col justify-between px-7 py-8"
            >
              <span className="editorial-kicker text-[--sky]">
                01 // Talento
              </span>
              <div className="flex items-end justify-between gap-6">
                <span className="font-display text-2xl font-black italic text-[--ink]">
                  Entrar na rede
                </span>
                <ArrowRight className="h-5 w-5 text-[--ink]/35 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
            <Link
              href="/para-empresas"
              className="group editorial-cell flex min-h-[168px] flex-col justify-between px-7 py-8"
            >
              <span className="editorial-kicker text-[--sun]">
                02 // Organizacao
              </span>
              <div className="flex items-end justify-between gap-6">
                <span className="font-display text-2xl font-black italic text-[--ink]">
                  Publicar desafio
                </span>
                <ArrowRight className="h-5 w-5 text-[--ink]/35 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="editorial-cell px-8 py-12 lg:px-16 lg:py-16">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="editorial-kicker mb-5">Rede</p>
                <div className="space-y-4">
                  {networkLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm font-bold uppercase tracking-[0.18em] text-[--ink]/45 transition-colors hover:text-[--leaf-1]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="editorial-kicker mb-5">Compliance</p>
                <div className="space-y-4">
                  {complianceLinks.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-sm font-bold uppercase tracking-[0.18em] text-[--ink]/45 transition-colors hover:text-[--sky]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[--ink] px-8 py-12 text-[--paper] lg:px-16 lg:py-16">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/5">
              <Shield className="h-6 w-6 text-[--leaf]" />
            </div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
              Intel feed // newsletter
            </p>
            <p className="max-w-md text-sm font-medium leading-7 text-white/65">
              Receba sinais de mercado, repertorio de extensao e novos formatos
              de squads com leitura institucional.
            </p>

            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={event => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="seu@email.com"
                className="h-12 flex-1 rounded-full border border-white/12 bg-white/6 px-5 text-sm font-medium text-white placeholder:text-white/28 focus:border-[--leaf]/45 focus:outline-none"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-[--leaf] px-6 text-sm font-black uppercase tracking-[0.22em] text-[--foreground] transition-all hover:-translate-y-0.5"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>

        <div className="editorial-cell flex flex-col gap-4 px-8 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <p className="max-w-xl text-[10px] font-bold uppercase leading-relaxed tracking-[0.24em] text-[--ink]/35">
            © {currentYear} Brasil Sustenta. Plataforma editorial para talentos,
            organizacoes e instituicoes em rede nacional.
          </p>
          <div className="flex gap-3">
            <div className="h-[3px] w-14 bg-[--leaf]" />
            <div className="h-[3px] w-14 bg-[--sun]" />
            <div className="h-[3px] w-14 bg-[--sky]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
