import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Sparkles, Zap, Heart, Globe, ArrowRight } from 'lucide-react';

export default function Manifesto() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black font-body overflow-x-hidden">
      <SEO 
        title="Manifesto Brasil Sustenta | Criatividade, ESG e ODS"
        description="Nosso manifesto sobre a união da Economia Criativa com os Objetivos de Desenvolvimento Sustentável. Transformando cultura em impacto real."
      />
      <Header />

      {/* Hero Section - High Impact Editorial */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--tw-gradient-from)_0%,transparent_50%)] from-primary/10 via-transparent to-transparent opacity-40"></div>
        <div className="container relative z-10 px-6">
          <div className="max-w-5xl">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 backdrop-blur-md rounded-full mb-12 animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5 text-primary mr-2" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary">Manifesto de Impacto Criativo</span>
            </div>
            
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.95] tracking-[ -0.04em] animate-fade-in-up mb-12">
              O Futuro é <span className="italic font-light font-serif text-primary text-glow-emerald">Criativo</span>, <br />
              Consciente e <span className="underline decoration-primary/20 underline-offset-8">Compartilhado</span>.
            </h1>
            
            <p className="max-w-2xl animate-fade-in-up delay-100 text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              Não existe futuro viável sem impacto mensurável. No Brasil Sustenta, acreditamos que a <span className="text-foreground">Economia Criativa</span> é o motor definitivo para a regeneração global.
            </p>
          </div>
        </div>
      </section>

      {/* The Crisis - Brutalist Split */}
      <section className="py-32 bg-secondary/5 relative overflow-hidden">
        <div className="container px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-8 italic font-light">A Crise da Superficialidade.</h2>
            <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
              <p>
                O mundo corporativo está saturado de relatórios frios. O <span className="text-foreground italic">Greenwashing</span> tornou-se uma névoa que cega o consumidor. Enquanto isso, o setor criativo opera muitas vezes alheio às métricas reais de impacto.
              </p>
              <p>
                Essa desconexão é o que impede a mudança sistêmica. O ESG não pode ser apenas uma planilha; ele precisa ser uma <span className="text-primary">narrativa viva</span>, vibrante e autêntica.
              </p>
            </div>
          </div>
          <div className="relative animate-slide-in-right group">
            <div className="aspect-[4/5] glass-emerald border border-primary/20 flex items-center justify-center p-12 rounded-[2rem] transition-all duration-700 group-hover:scale-[1.02]">
               <div className="text-center">
                  <span className="text-9xl font-display font-bold text-primary opacity-20 transition-all group-hover:opacity-100 group-hover:scale-110">?</span>
                  <p className="mt-12 font-bold tracking-[0.3em] uppercase text-[10px] text-primary">Impacto sem Narrativa é Invisível.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Creative ESG */}
      <section className="py-32 bg-background">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-8 leading-tight">Nossa <span className="text-primary italic font-serif font-light text-glow-emerald">Tese</span> de Valor.</h2>
            <p className="text-xl text-muted-foreground font-medium italic">Transformamos a Criatividade em um ativo de auditoria e regeneração.</p>
          </div>
 
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 glass border border-white/5 hover:border-primary/40 transition-all duration-500 group animate-fade-in-up delay-100 rounded-[2rem]">
              <Zap className="w-10 h-10 text-primary mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              <h3 className="text-2xl font-display font-bold tracking-tighter mb-6">Auditoria Criativa</h3>
              <p className="text-muted-foreground text-base leading-relaxed font-medium opacity-80">Validamos projetos de design, tech e comunicação sob a lente dos 18 Objetivos de Desenvolvimento Sustentável.</p>
            </div>
            
            <div className="p-10 glass border border-white/5 hover:border-primary/40 transition-all duration-500 group animate-fade-in-up delay-200 rounded-[2rem]">
              <Globe className="w-10 h-10 text-primary mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              <h3 className="text-2xl font-display font-bold tracking-tighter mb-6">Ecossistema ODS</h3>
              <p className="text-muted-foreground text-base leading-relaxed font-medium opacity-80">Mapeamos talentos não apenas por softwares, mas por causas. Encontramos o squad certo para o desafio planetário certo.</p>
            </div>
 
            <div className="p-10 glass border border-white/5 hover:border-primary/40 transition-all duration-500 group animate-fade-in-up delay-300 rounded-[2rem]">
              <Heart className="w-10 h-10 text-primary mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              <h3 className="text-2xl font-display font-bold tracking-tighter mb-6">Valor Compartilhado</h3>
              <p className="text-muted-foreground text-base leading-relaxed font-medium opacity-80">Geramos lucro que regenera. Quando um criativo atua em um projeto ESG, ele constrói sua carreira e o futuro de todos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-48 bg-primary text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container px-6 text-center relative z-10">
          <h2 className="font-display font-black text-5xl md:text-8xl tracking-tighter max-w-5xl mx-auto leading-[0.9] uppercase italic animate-fade-in mb-12">
            "A Criatividade é a última vantagem competitiva que <span className="underline decoration-black/20 underline-offset-8">regenera</span> o planeta."
          </h2>
          <div className="w-24 h-1 bg-black/20 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container relative z-10 px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter max-w-3xl mb-16 leading-tight">
            Faça parte desta <br /><span className="text-primary italic font-serif font-light text-glow-emerald">Revolução Cultural</span>.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-2xl">
            <a href="/login/empresa" className="flex-1 px-10 py-6 glass-emerald border border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-primary hover:text-black transition-all duration-500 shadow-xl shadow-primary/5 text-center">
              Empresas de Impacto
            </a>
            <a href="/login/jovem" className="flex-1 px-10 py-6 glass border border-white/10 hover:border-primary/30 text-foreground font-bold uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all duration-500 text-center">
              Talentos Criativos
            </a>
          </div>
          
          <a href="/" className="mt-16 text-muted-foreground hover:text-primary transition-all flex items-center gap-3 group font-bold uppercase tracking-[0.15em] text-[10px]">
            Voltar para o Ecossistema <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
