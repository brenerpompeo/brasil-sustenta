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
             <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-paper-3 shadow-sm text-[11px] font-bold tracking-widest uppercase text-ink-3">
               <span className="w-2 h-2 rounded-full bg-leaf-1 animate-pulse"></span>
               Inovação Sustentável
             </span>
          </div>

          {/* Main Headline (Fraunces Display) */}
          <div className="animate-fade-in-up duration-700 delay-100 mb-8">
            <h1 className="font-display text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] font-black text-ink leading-[1.05] tracking-tight">
              Resultados ESG <span className="italic font-light text-leaf-1">Reais,</span><br />
              Entregues por <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-ink-3">Squads de Elite.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-[1.125rem] md:text-[1.375rem] text-ink-2 max-w-2xl mx-auto leading-relaxed animate-fade-in-up duration-700 delay-200 mb-12 font-medium">
            Sua empresa focada na estratégia, nossos talentos na execução. Alcance metas ESG e compliance de impacto formatando squads validados pelas melhores universidades do país.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2 animate-fade-in-up duration-700 delay-300">
            <Link href="/login/empresa" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-ink text-white font-bold px-8 py-4 rounded-xl hover:bg-ink-1 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              Quero Inovar na Empresa <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login/jovem" className="w-full sm:w-auto flex items-center justify-center bg-white border border-paper-3 text-ink font-bold px-8 py-4 rounded-xl hover:bg-paper hover:border-paper-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm">
              Sou Jovem Talento
            </Link>
          </div>

          {/* Icon Features */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-24 animate-fade-in-up duration-700 delay-500">
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 bg-white border border-paper-3 shadow-sm rounded-2xl flex items-center justify-center mb-4 group-hover:border-leaf-1 group-hover:shadow-[0_8px_30px_rgba(28,107,58,0.1)] transition-all duration-300">
                <Target className="w-7 h-7 text-ink" />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-ink-3 group-hover:text-ink transition-colors">Metas ODS</span>
            </div>
            
            <div className="flex flex-col items-center group cursor-default mt-4">
              <div className="w-16 h-16 bg-white border border-paper-3 shadow-sm rounded-2xl flex items-center justify-center mb-4 group-hover:border-sky-1 group-hover:shadow-[0_8px_30px_rgba(56,189,248,0.1)] transition-all duration-300">
                <Users className="w-7 h-7 text-ink" />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-ink-3 group-hover:text-ink transition-colors">Squads Elite</span>
            </div>

            <div className="flex flex-col items-center group cursor-default">
              <div className="w-16 h-16 bg-white border border-paper-3 shadow-sm rounded-2xl flex items-center justify-center mb-4 group-hover:border-earth-1 group-hover:shadow-[0_8px_30px_rgba(180,83,9,0.1)] transition-all duration-300">
                <Globe className="w-7 h-7 text-ink" />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-ink-3 group-hover:text-ink transition-colors">Impacto Real</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
