import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Para Empresas', href: '/para-empresas' },
    { label: 'Para Jovens', href: '#jovens' },
    { label: 'Blog', href: '#blog' },
    { label: 'Eventos', href: '#eventos' },
    { label: 'Projetos', href: '#projetos' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">BS</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                Brasil Sustenta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Login Button with Dropdown */}
          <div className="hidden lg:block relative group">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-black font-semibold flex items-center gap-2">
              Login
              <ChevronDown className="w-4 h-4" />
            </Button>
            <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <a href="/login/empresa" className="block px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  Para Empresas
                </a>
                <a href="/login/jovem" className="block px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  Para Jovens
                </a>
                <a href="/login/universidade" className="block px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                  Para Universidades
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <p className="text-sm text-muted-foreground mb-2">Fazer login como:</p>
              <a href="/login/empresa" className="block">
                <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold">
                  Empresa
                </Button>
              </a>
              <a href="/login/jovem" className="block">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  Jovem Talento
                </Button>
              </a>
              <a href="/login/universidade" className="block">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  Universidade
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
