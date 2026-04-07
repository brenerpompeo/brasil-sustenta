import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, ChevronDown, User, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: 'Visão Geral', href: '/' },
    { label: 'Empresas', href: '/para-empresas' },
    { label: 'Para Jovens', href: '/para-jovens' },
    { label: 'Universidades', href: '/para-universidades' },
    { label: 'Oportunidades', href: '/oportunidades' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center w-full px-4 ${
        scrolled ? 'py-4' : 'py-6'
      }`}>
        {/* Island Container */}
        <div className={`transition-all duration-500 ease-out overflow-hidden flex items-center justify-between w-full mx-auto relative
          ${scrolled 
            ? 'max-w-[1000px] h-14 bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2rem]' 
            : 'max-w-[1200px] h-16 bg-transparent border border-transparent rounded-none'
          } px-6 lg:px-8`}
        >
          {/* Subtle inner glow for the pill effect */}
          {scrolled && <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/50 pointer-events-none" />}

          {/* Logo Premium */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group relative z-10">
              <div className="font-display text-xl sm:text-2xl font-black text-ink tracking-tight leading-none group-hover:opacity-80 transition-opacity">
                Brasil<br /><span className="text-leaf-1">Sustenta</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 relative z-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[13px] font-bold tracking-wide transition-all duration-300 rounded-full px-4 py-2 ${
                  scrolled ? 'text-ink-3 hover:text-ink hover:bg-black/5' : 'text-ink-3 hover:text-ink hover:bg-black/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Login Access */}
          <div className="hidden lg:flex items-center gap-2 relative z-10">
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-[13px] font-bold text-ink hover:text-leaf-1 transition-colors px-3 py-2 rounded-full hover:bg-black/5">
                Entrar <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              
              {/* Dropdown Menu Glassmorphism */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-[0_20px_40px_rgb(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top-right group-hover:translate-y-0 translate-y-2">
                <div className="p-2">
                  <div className="text-[11px] font-bold tracking-widest uppercase text-ink-4 px-3 py-2">Acessar Portal</div>
                  <a href="/login/empresa" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-ink group/item border border-transparent hover:border-black/5 hover:bg-white/80 rounded-xl transition-all">
                    <Briefcase className="w-4 h-4 text-leaf-1 transition-transform group-hover/item:scale-110" /> Empresa
                  </a>
                  <a href="/login/jovem" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-ink group/item border border-transparent hover:border-black/5 hover:bg-white/80 rounded-xl transition-all">
                    <Sparkles className="w-4 h-4 text-sky-1 transition-transform group-hover/item:scale-110" /> Jovem Talento
                  </a>
                  <a href="/login/universidade" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-ink group/item border border-transparent hover:border-black/5 hover:bg-white/80 rounded-xl transition-all">
                    <GraduationCap className="w-4 h-4 text-earth-1 transition-transform group-hover/item:scale-110" /> Universidade
                  </a>
                </div>
              </div>
            </div>
            
            <a href="/login/empresa" className="flex items-center gap-2 bg-ink text-white text-[13px] font-semibold px-5 py-2 rounded-full hover:bg-ink-1 hover:scale-105 active:scale-95 transition-all shadow-md">
              <User className="w-4 h-4" /> Cadastre-se
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-ink hover:text-leaf-1 transition-colors rounded-full hover:bg-black/5 relative z-10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Overlay Glass */}
      <div className={`fixed inset-0 z-40 bg-white/70 backdrop-blur-3xl transition-all duration-500 ease-out lg:hidden ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col h-full pt-28 px-6 pb-8 overflow-y-auto">
          <nav className="flex flex-col space-y-1 flex-grow">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className="text-ink hover:text-leaf-1 transition-colors text-2xl font-bold py-4 px-4 flex items-center justify-between group rounded-2xl hover:bg-white/50 active:scale-[0.98]"
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="mt-8 space-y-4 px-2">
            <p className="text-[11px] font-bold tracking-widest uppercase text-ink-3">Acessos</p>
            <a href="/login/empresa" className="flex items-center justify-center gap-2 bg-ink text-white font-semibold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
              <Briefcase className="w-5 h-5" /> Acesso Empresa
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a href="/login/jovem" className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur text-ink font-semibold py-4 rounded-2xl border border-white shadow-sm active:scale-95 transition-transform">
                <Sparkles className="w-4 h-4 text-sky-1" /> Talento
              </a>
              <a href="/login/universidade" className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur text-ink font-semibold py-4 rounded-2xl border border-white shadow-sm active:scale-95 transition-transform">
                <GraduationCap className="w-4 h-4 text-earth-1" /> Instituição
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
