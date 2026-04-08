import { Link } from 'wouter';
import { Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  paraEmpresas: [
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Projetos ESG', href: '#projetos' },
    { label: 'Encontrar Talentos', href: '#talentos' },
    { label: 'Cases de Sucesso', href: '#cases' },
  ],
  paraTalentos: [
    { label: 'Oportunidades', href: '#oportunidades' },
    { label: 'Como Participar', href: '#participar' },
    { label: 'Comunidade', href: '#comunidade' },
    { label: 'Certificações', href: '#certificacoes' },
  ],
  recursos: [
    { label: 'Blog ESG', href: '#blog' },
    { label: 'Guias', href: '#guias' },
    { label: 'Webinars', href: '#webinars' },
    { label: 'Newsletter', href: '#newsletter' },
  ],
  suporte: [
    { label: 'Central de Ajuda', href: '#ajuda' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
    { label: 'Suporte', href: '#suporte' },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="cursor-pointer mb-6 inline-block">
                <div className="font-display text-2xl font-bold text-foreground tracking-tighter leading-none">
                  Brasil<br /><span className="text-primary">Sustenta</span>
                </div>
              </div>
            </Link>
            <p className="text-[14px] text-muted-foreground font-medium leading-relaxed max-w-[280px]">
              Conectamos empresas e jovens talentos para acelerar a
              transformação ESG no Brasil através do modelo Squad as a Service.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/50 mb-5">Empresas</h3>
            <ul className="space-y-3">
              {footerLinks.paraEmpresas.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/50 mb-5">Talentos</h3>
            <ul className="space-y-3">
              {footerLinks.paraTalentos.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/50 mb-5">Recursos</h3>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/50 mb-5">Suporte</h3>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          <a href="/para-empresas" className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 transition-all group flex items-start space-x-5 shadow-sm">
            <div className="w-12 h-12 bg-leaf/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-leaf-3" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[15px] text-foreground mb-1.5 flex items-center gap-2">
                Portal Empresas <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
                Transforme seus desafios ESG em oportunidades de impacto com talentos universitários de ponta.
              </p>
            </div>
          </a>

          <a href="/para-jovens" className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 transition-all group flex items-start space-x-5 shadow-sm">
            <div className="w-12 h-12 bg-sky/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-sky-1" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[15px] text-foreground mb-1.5 flex items-center gap-2">
                Portal Jovem Talento <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
                Desenvolva sua carreira ESG com projetos reais de grandes empresas brasileiras.
              </p>
            </div>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] font-bold text-muted-foreground/40 tracking-[0.2em]">
              © {currentYear} BRASIL SUSTENTA. TODOS OS DIREITOS RESERVADOS.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#privacidade" className="text-[12px] font-bold text-muted-foreground/40 hover:text-primary transition-colors tracking-widest uppercase">
                Privacidade
              </a>
              <a href="#termos" className="text-[12px] font-bold text-muted-foreground/40 hover:text-primary transition-colors tracking-widest uppercase">
                Termos
              </a>
              <a href="#cookies" className="text-[12px] font-bold text-muted-foreground/40 hover:text-primary transition-colors tracking-widest uppercase">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
