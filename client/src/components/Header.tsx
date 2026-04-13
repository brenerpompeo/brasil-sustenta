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

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center w-full px-4 ${
        scrolled ? 'py-4' : 'py-6'
      }`}>
        {/* Island Container */}
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex items-center justify-between w-full mx-auto relative
          ${scrolled 
            ? 'max-w-[1000px] h-14 glass shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-full' 
            : 'max-w-[1240px] h-20 bg-transparent border-none'
          } px-8`}
        >
          {/* Subtle inner glow for the pill effect */}
          {scrolled && <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/50 pointer-events-none" />}

          {/* Logo Premium */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group relative z-10 w-fit">
              <div className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tighter leading-[0.9] group-hover:opacity-80 transition-opacity">
                Brasil<br /><span className="text-primary text-glow-emerald">Sustenta</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 relative z-10">
            <a href="/" className={`text-[12px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full px-4 py-2 ${scrolled ? 'text-muted-foreground hover:text-primary hover:bg-white/5' : 'text-foreground/70 hover:text-primary hover:bg-white/5'}`}>Home</a>
            <a href="/manifesto" className={`text-[12px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full px-4 py-2 ${scrolled ? 'text-muted-foreground hover:text-primary hover:bg-white/5' : 'text-foreground/70 hover:text-primary hover:bg-white/5'}`}>Manifesto</a>
            
            {/* Stakeholders Dropdown */}
            <div className="relative group">
              <button className={`flex items-center gap-1 text-[12px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full px-4 py-2 ${scrolled ? 'text-muted-foreground hover:text-primary hover:bg-white/5' : 'text-foreground/70 hover:text-primary hover:bg-white/5'}`}>
                Hubs <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              <div className="absolute left-0 top-full mt-4 w-60 glass border border-primary/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                <div className="p-2 flex flex-col">
                  <a href="/para-jovens" className="flex items-center gap-3 px-4 py-3 text-xs font-bold tracking-widest uppercase text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all">Para Jovem</a>
                  <a href="/para-universidades" className="flex items-center gap-3 px-4 py-3 text-xs font-bold tracking-widest uppercase text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all">Para Universidade</a>
                  <a href="/para-empresas" className="flex items-center gap-3 px-4 py-3 text-xs font-bold tracking-widest uppercase text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all">Para Empresa</a>
                </div>
              </div>
            </div>
            
            <a href="/oportunidades" className={`text-[12px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full px-4 py-2 ${scrolled ? 'text-muted-foreground hover:text-primary hover:bg-white/5' : 'text-foreground/70 hover:text-primary hover:bg-white/5'}`}>Matching</a>
            <a href="/comunidade" className={`text-[12px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full px-4 py-2 ${scrolled ? 'text-muted-foreground hover:text-primary hover:bg-white/5' : 'text-foreground/70 hover:text-primary hover:bg-white/5'}`}>Blog</a>
          </nav>

          {/* Desktop Login Access */}
          <div className="hidden lg:flex items-center relative z-10">
            <div className="relative group">
              <button className="flex items-center gap-2 bg-primary text-black text-[13px] font-bold px-5 py-2.5 rounded-full hover:opacity-90 transition-all shadow-lg">
                <User className="w-4 h-4" /> Entrar / Cadastre-se <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-56 bg-card/90 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top-right group-hover:translate-y-0 translate-y-2">
                <div className="p-2">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-3 py-2">Acessos da Plataforma</div>
                  <a href="/login/jovem" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-foreground group/item border border-transparent hover:border-primary/20 hover:bg-white/5 rounded-xl transition-all">
                    <Sparkles className="w-4 h-4 text-sky-400 transition-transform group-hover/item:scale-110" /> Para Jovens
                  </a>
                  <a href="/login/universidade" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-foreground group/item border border-transparent hover:border-primary/20 hover:bg-white/5 rounded-xl transition-all">
                    <GraduationCap className="w-4 h-4 text-primary transition-transform group-hover/item:scale-110" /> Para Universidades
                  </a>
                  <a href="/login/empresa" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-foreground group/item border border-transparent hover:border-primary/20 hover:bg-white/5 rounded-xl transition-all">
                    <Briefcase className="w-4 h-4 text-primary transition-transform group-hover/item:scale-110" /> Para Empresas
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-ink hover:text-leaf-1 transition-colors rounded-full hover:bg-ink/5 relative z-10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} className="text-foreground" /> : <Menu size={20} className="text-foreground" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Overlay Glass */}
      <div className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 ease-out lg:hidden ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col h-full pt-28 px-6 pb-8 overflow-y-auto">
          <nav className="flex flex-col space-y-1 flex-grow">
            <a href="/" className="text-foreground hover:text-primary transition-colors text-xl font-bold py-3 px-4 flex items-center justify-between rounded-xl hover:bg-white/5 active:scale-[0.98]" onClick={toggleMenu}>Home</a>
            <a href="/sobre-nos" className="text-foreground hover:text-primary transition-colors text-xl font-bold py-3 px-4 flex items-center justify-between rounded-xl hover:bg-white/5 active:scale-[0.98]" onClick={toggleMenu}>Sobre Nós</a>
            
            <div className="py-2">
               <p className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground px-4 mb-2">Stakeholders</p>
               <a href="/para-jovens" className="text-muted-foreground hover:text-primary transition-colors text-lg font-bold py-2 px-6 flex rounded-xl hover:bg-white/5" onClick={toggleMenu}>Para Jovens</a>
               <a href="/para-universidades" className="text-muted-foreground hover:text-primary transition-colors text-lg font-bold py-2 px-6 flex rounded-xl hover:bg-white/5" onClick={toggleMenu}>Para Universidades</a>
               <a href="/para-empresas" className="text-muted-foreground hover:text-primary transition-colors text-lg font-bold py-2 px-6 flex rounded-xl hover:bg-white/5" onClick={toggleMenu}>Para Empresas</a>
            </div>

            <div className="py-2 border-t border-white/5">
               <p className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground px-4 mb-2">Comunidade</p>
               <a href="/comunidade" className="text-muted-foreground hover:text-primary transition-colors text-lg font-bold py-2 px-6 flex rounded-xl hover:bg-white/5" onClick={toggleMenu}>Visão Geral</a>
               <a href="/comunidade#embaixadores" className="text-muted-foreground hover:text-primary transition-colors text-lg font-bold py-2 px-6 flex rounded-xl hover:bg-white/5" onClick={toggleMenu}>Embaixadores Locais</a>
               <a href="/comunidade#hubs" className="text-muted-foreground hover:text-primary transition-colors text-lg font-bold py-2 px-6 flex rounded-xl hover:bg-white/5" onClick={toggleMenu}>HUBs Universitários</a>
               <a href="/comunidade#voluntarios" className="text-muted-foreground hover:text-primary transition-colors text-lg font-bold py-2 px-6 flex rounded-xl hover:bg-white/5" onClick={toggleMenu}>Voluntariado</a>
            </div>

            <a href="/oportunidades" className="text-foreground hover:text-primary transition-colors text-xl font-bold py-3 px-4 flex items-center justify-between rounded-xl hover:bg-white/5 active:scale-[0.98]" onClick={toggleMenu}>Oportunidades</a>
            <a href="/eventos" className="text-foreground hover:text-primary transition-colors text-xl font-bold py-3 px-4 flex items-center justify-between rounded-xl hover:bg-white/5 active:scale-[0.98]" onClick={toggleMenu}>Eventos</a>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors text-xl font-bold py-3 px-4 flex items-center justify-between rounded-xl hover:bg-white/5 active:scale-[0.98]" onClick={toggleMenu}>Blog</a>
          </nav>
          
          <div className="mt-8 space-y-4 px-2 pb-6 border-t border-border pt-6">
            <p className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">Entrar / Cadastre-se</p>
            <div className="grid gap-3">
              <a href="/login/jovem" className="flex items-center justify-center gap-2 bg-secondary text-foreground font-semibold py-4 rounded-2xl border border-border shadow-sm active:scale-95 transition-transform">
                <Sparkles className="w-4 h-4 text-sky-400" /> Para Jovens
              </a>
              <a href="/login/universidade" className="flex items-center justify-center gap-2 bg-secondary text-foreground font-semibold py-4 rounded-2xl border border-border shadow-sm active:scale-95 transition-transform">
                <GraduationCap className="w-4 h-4 text-primary" /> Para Universidades
              </a>
              <a href="/login/empresa" className="flex items-center justify-center gap-2 bg-primary text-black font-semibold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
                <Briefcase className="w-5 h-5" /> Para Empresas
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
