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
               Inovação Sustentável
             </span>
          </div>

          {/* Main Headline (Fraunces Display) */}
          <div className="animate-fade-in-up duration-700 delay-100 mb-8">
            <h1 className="font-display text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-bold text-foreground leading-[1.02] tracking-tighter">
              Resultados ESG <span className="italic font-light text-primary">Reais,</span><br />
              Entregues por <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">Squads de Elite.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-[1.125rem] md:text-[1.25rem] text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up duration-700 delay-200 mb-12 font-medium">
            Sua empresa focada na estratégia, nossos talentos na execução. Alcance metas ESG e compliance de impacto formatando squads validados pelas melhores universidades do país.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-24 animate-fade-in-up duration-700 delay-500">
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-4 group-hover:border-primary/50 group-hover:shadow-[0_8px_30px_rgba(30,215,96,0.1)] transition-all duration-300">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">Metas ODS</span>
            </div>
            
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-4 group-hover:border-primary/50 group-hover:shadow-[0_8px_30px_rgba(30,215,96,0.1)] transition-all duration-300">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">Squads Elite</span>
            </div>

            <div className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-4 group-hover:border-primary/50 group-hover:shadow-[0_8px_30px_rgba(30,215,96,0.1)] transition-all duration-300">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">Impacto Real</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
