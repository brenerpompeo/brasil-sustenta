import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Para Empresas', href: '#empresas' },
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

          {/* Desktop Login Button */}
          <div className="hidden lg:block">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-black font-semibold">
              Login
            </Button>
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
            <div className="pt-4 border-t border-border">
              <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold">
                Login
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
