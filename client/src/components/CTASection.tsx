import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-ink relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-leaf-1/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-sky-1/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container px-6 lg:px-8 max-w-[900px] mx-auto relative z-10">
        <div className="text-center animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-6">O Futuro é Agora</div>
          
          <h2 className="font-display text-[2.5rem] md:text-[4rem] font-black text-white leading-[1.05] mb-8">
            Pronto para gerar<br /><span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-leaf-3 to-sky-4">impacto real</span>?
          </h2>

          <p className="text-[1.125rem] text-white/60 font-medium mb-12 max-w-xl mx-auto">
            Seja empresa ou talento universitário, a plataforma Brasil Sustenta é o seu próximo passo estratégico.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/login/empresa" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-ink font-bold px-10 py-4 rounded-xl hover:bg-paper hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-white/10">
              Sou Empresa <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login/jovem" className="w-full sm:w-auto flex items-center justify-center border border-white/20 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/5 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Sou Jovem Talento
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
