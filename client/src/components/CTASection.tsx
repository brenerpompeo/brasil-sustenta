import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container px-6 lg:px-8 max-w-[900px] mx-auto relative z-10">
        <div className="text-center animate-fade-in-up">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground/40 mb-6">O Futuro é Agora</div>
          
          <h2 className="font-display text-[2.5rem] md:text-[4rem] font-bold text-foreground leading-[1.05] mb-8 tracking-tighter">
            Pronto para gerar<br /><span className="italic font-light text-primary">impacto real</span>?
          </h2>

          <p className="text-[1.125rem] text-muted-foreground font-medium mb-12 max-w-xl mx-auto">
            Seja empresa ou talento universitário, a plataforma Brasil Sustenta é o seu próximo passo estratégico.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/login/empresa" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-black font-bold px-10 py-4 rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/10">
              Sou Empresa <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login/jovem" className="w-full sm:w-auto flex items-center justify-center border border-border text-foreground font-bold px-10 py-4 rounded-xl hover:bg-white/5 hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Sou Jovem Talento
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
