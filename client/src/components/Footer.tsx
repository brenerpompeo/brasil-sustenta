import { Link } from 'wouter';
import { Briefcase, GraduationCap } from 'lucide-react';

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
    <footer className="bg-card border-t border-border">
      <div className="container px-4 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center space-x-3 mb-4 cursor-pointer">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-xl">BS</span>
                </div>
                <span className="text-white font-bold text-xl">
                  Brasil Sustenta
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Conectamos empresas e jovens talentos para acelerar a
              transformação ESG no Brasil através do modelo Squad as a Service.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Para Empresas</h3>
            <ul className="space-y-2">
              {footerLinks.paraEmpresas.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Para Talentos</h3>
            <ul className="space-y-2">
              {footerLinks.paraTalentos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Empresas CTA */}
          <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">Empresas</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Transforme seus desafios ESG em oportunidades de impacto com
                  talentos universitários.
                </p>
                <button className="text-sm text-primary hover:underline font-medium">
                  Criar Projeto Grátis →
                </button>
              </div>
            </div>
          </div>

          {/* Talentos CTA */}
          <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Talentos Jovens
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Desenvolva sua carreira ESG com projetos reais de grandes
                  empresas brasileiras.
                </p>
                <button className="text-sm text-accent hover:underline font-medium">
                  Criar Perfil Grátis →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Brasil Sustenta. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#privacidade"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidade
              </a>
              <a
                href="#termos"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Termos
              </a>
              <a
                href="#cookies"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
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
