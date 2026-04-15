import { Link } from 'wouter';
import { Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  paraEmpresas: [
    { label: 'Para Empresas', href: '/para-empresas' },
    { label: 'Como Funciona', href: '/para-empresas' },
    { label: 'Login Empresa', href: '/login/empresa' },
    { label: 'Manifesto', href: '/manifesto' },
  ],
  paraTalentos: [
    { label: 'Para Jovens', href: '/para-jovens' },
    { label: 'Oportunidades', href: '/oportunidades' },
    { label: 'Comunidade', href: '/comunidade' },
    { label: 'Login Talento', href: '/login/jovem' },
  ],
  recursos: [
    { label: 'Blog', href: '/blog' },
    { label: 'Artigos', href: '/artigos' },
    { label: 'Biblioteca', href: '/biblioteca' },
    { label: 'Relatórios', href: '/relatorios' },
  ],
  suporte: [
    { label: 'Login', href: '/login' },
    { label: 'Para Universidades', href: '/para-universidades' },
    { label: 'Eventos', href: '/eventos' },
    { label: 'Manifesto', href: '/manifesto' },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.05] bg-[--paper]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="mb-6 inline-block cursor-pointer">
                <div className="font-display text-[1.5rem] font-bold leading-none tracking-tight text-[--ink]">
                  Brasil
                  <br />
                  <span style={{ color: 'var(--leaf)' }}>Sustenta</span>
                </div>
              </div>
            </Link>
            <p className="font-sans text-[13px] font-medium leading-relaxed text-[--ink]/40 max-w-[260px]">
              Plataforma AI-first que transforma desafios ESG em Squad Boxes universitários com curadoria, Entrega Auditável e trilha de evidência.
            </p>
            <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/20">
              SQUAD_AS_A_SERVICE // AI_FIRST
            </p>
          </div>

          {/* Links: Empresas */}
          <div>
            <h3 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
              Empresas
            </h3>
            <ul className="space-y-3">
              {footerLinks.paraEmpresas.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] font-medium text-[--ink]/40 hover:text-[--leaf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Talentos */}
          <div>
            <h3 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
              Talentos
            </h3>
            <ul className="space-y-3">
              {footerLinks.paraTalentos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] font-medium text-[--ink]/40 hover:text-[--leaf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Recursos */}
          <div>
            <h3 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
              Recursos
            </h3>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] font-medium text-[--ink]/40 hover:text-[--leaf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Suporte */}
          <div>
            <h3 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28">
              Suporte
            </h3>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] font-medium text-[--ink]/40 hover:text-[--leaf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Boxes */}
        <div className="mb-16 grid grid-cols-1 gap-0 md:grid-cols-2">
          <a
            href="/para-empresas"
            className="group flex items-start gap-5 border border-white/[0.05] p-7 hover:bg-white/[0.018] transition-colors duration-300"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-white/[0.07] text-[--leaf]">
              <Briefcase className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h4 className="mb-1.5 flex items-center gap-2 font-display text-[15px] font-bold text-[--ink]">
                Portal Empresas
                <ArrowUpRight className="h-4 w-4 text-[--ink]/20 group-hover:text-[--leaf] transition-colors" />
              </h4>
              <p className="font-sans text-[13px] font-medium leading-relaxed text-[--ink]/40">
                Publique um desafio, receba um Squad Box com fit score e acompanhe a execução com mais clareza.
              </p>
            </div>
          </a>

          <a
            href="/para-jovens"
            className="group flex items-start gap-5 border border-white/[0.05] border-l-0 p-7 hover:bg-white/[0.018] transition-colors duration-300"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-white/[0.07] text-[--sky]">
              <GraduationCap className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h4 className="mb-1.5 flex items-center gap-2 font-display text-[15px] font-bold text-[--ink]">
                Portal Jovem Talento
                <ArrowUpRight className="h-4 w-4 text-[--ink]/20 group-hover:text-[--sky] transition-colors" />
              </h4>
              <p className="font-sans text-[13px] font-medium leading-relaxed text-[--ink]/40">
                Entre em projetos reais, construa portfólio verificável e desenvolva sua empregabilidade.
              </p>
            </div>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.05] pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/18">
            © {currentYear} BRASIL SUSTENTA. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/manifesto"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28 hover:text-[--leaf] transition-colors"
            >
              Manifesto
            </Link>
            <Link
              href="/comunidade"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28 hover:text-[--leaf] transition-colors"
            >
              Comunidade
            </Link>
            <Link
              href="/relatorios"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[--ink]/28 hover:text-[--leaf] transition-colors"
            >
              Relatórios
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
