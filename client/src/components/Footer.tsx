import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#020202] py-24 lg:py-32">
      <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-24 px-8 lg:grid-cols-2 lg:gap-32 lg:px-24">
        {/* Left — Brand + portal CTAs */}
        <div>
          <h2 className="mb-16 font-display text-6xl font-black italic leading-none md:text-7xl lg:text-8xl">
            Inicializar
            <br />
            Protocolo.
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/para-jovens"
              className="group flex h-36 flex-col justify-center border border-white/10 p-8 transition-all hover:bg-[--sky] hover:text-black"
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/40 group-hover:text-black/60">
                01 // TALENTO
              </span>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-xl font-black group-hover:text-black">
                  Submeter Node
                </span>
                <ArrowRight className="h-5 w-5 text-[--ink]/30 transition-transform group-hover:translate-x-4 group-hover:text-black" />
              </div>
            </Link>
            <Link
              href="/para-empresas"
              className="group flex h-36 flex-col justify-center border border-white/10 p-8 transition-all hover:bg-[--sun] hover:text-black"
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/40 group-hover:text-black/60">
                02 // EMPRESA
              </span>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-xl font-black group-hover:text-black">
                  Deploy Squad
                </span>
                <ArrowRight className="h-5 w-5 text-[--ink]/30 transition-transform group-hover:translate-x-4 group-hover:text-black" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right — Links + newsletter + legal */}
        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-16 md:grid-cols-3">
            <div>
              <h4 className="mb-10 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/30">
                REDE
              </h4>
              <ul className="space-y-6">
                {[
                  { label: 'Manifesto', href: '/manifesto' },
                  { label: 'HUBs', href: '/quem-somos/hubs' },
                  { label: 'Comunidade', href: '/comunidade' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[--ink]/35 transition-colors hover:text-[--leaf]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-10 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/30">
                COMPLIANCE
              </h4>
              <ul className="space-y-6">
                {[
                  { label: 'Relatórios', href: '/relatorios' },
                  { label: 'Biblioteca', href: '/biblioteca' },
                  { label: 'Termos', href: '#' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[--ink]/35 transition-colors hover:text-[--sun]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <div className="flex h-24 w-24 items-center justify-center border border-white/10 p-4">
                <Shield className="h-full w-full text-[--ink]/10" />
              </div>
            </div>
          </div>

          {/* Newsletter inline */}
          <div className="mt-16 border-t border-white/[0.06] pt-10">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[--ink]/30">
              INTEL_FEED // NEWSLETTER
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="seu@email.com"
                className="h-12 flex-1 border border-white/10 bg-transparent px-5 font-mono text-[12px] text-[--ink] placeholder:text-[--ink]/20 focus:border-[--leaf]/40 focus:outline-none"
              />
              <button
                type="submit"
                className="h-12 bg-white px-8 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-black transition-colors hover:bg-[--leaf]"
              >
                Assinar
              </button>
            </form>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-sm font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.2em] text-white/20">
              © {currentYear} BRASIL SUSTENTA PROTOCOL // OPERATING IN SÃO PAULO, BR // ALL SYSTEMS NOMINAL.
            </p>
            <div className="flex gap-4">
              <div className="h-1 w-12 bg-[--leaf]" />
              <div className="h-1 w-12 bg-[--sun]" />
              <div className="h-1 w-12 bg-[--sky]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
