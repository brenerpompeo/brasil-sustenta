import { Target, Users, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper pt-24 pb-16">
      {/* Background Premium Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-sky-2/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-leaf-2/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container relative z-10 px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Tag */}
          <div className="animate-fade-in-up mb-8">
             <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border shadow-sm text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
               Inovação Criativa & ESG
             </span>
          </div>

          {/* Main Headline (Fraunces Display) */}
          <div className="animate-fade-in-up duration-700 delay-100 mb-8">
            <h1 className="font-display text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] font-bold text-foreground leading-[0.95] tracking-tighter">
              A Criatividade é o <br />
              <span className="italic font-light text-primary text-glow-emerald">Motor</span> do Impacto.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-[1.125rem] md:text-[1.35rem] text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up duration-700 delay-200 mb-12 font-medium">
            O **Brasil Sustenta** operacionaliza a economia criativa para escalar o impacto ESG. Conectamos talentos consciênciais a organizações que buscam gerar <span className="text-foreground">Valor Compartilhado</span> através de squads de elite e auditoria ODS.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2 animate-fade-in-up duration-700 delay-300">
            <Link href="/login/empresa" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-black font-bold px-8 py-4 rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg">
              Quero Inovar na Empresa <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login/jovem" className="w-full sm:w-auto flex items-center justify-center bg-card border border-border text-foreground font-bold px-8 py-4 rounded-xl hover:bg-white/5 hover:border-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Sou Jovem Talento
            </Link>
          </div>

          {/* Icon Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto pt-24 animate-fade-in-up duration-700 delay-500">
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 glass-emerald border border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary transition-colors">Auditoria ODS</span>
            </div>
            
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 glass-emerald border border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary transition-colors">Squads Criativos</span>
            </div>

            <div className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 glass-emerald border border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary transition-colors">Cultura ESG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
