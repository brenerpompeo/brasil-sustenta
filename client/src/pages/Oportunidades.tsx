import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Rocket, Target, Users, Calendar, ArrowRight, Zap, Star } from 'lucide-react';
import { trpc } from '@/lib/trpc';

import { SEO } from '@/components/SEO';

const Oportunidades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');

  const { data: projetosData, isLoading } = trpc.project.getAllPublic.useQuery({
    search: searchTerm,
    category: selectedArea,
  });

  const areas = ['Todas', 'Tecnologia', 'Meio Ambiente', 'Social', 'Governança', 'Educação'];

  const filteredProjetos = useMemo(() => {
    return (projetosData || []) as any[];
  }, [projetosData]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Oportunidades de Projetos Sustentáveis",
    "description": "Lista de projetos de impacto social e ambiental buscando talentos ativos corporativos e estudantes universitários.",
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/30">
      <SEO 
        title="Oportunidades ESG - Brasil Sustenta"
        description="Encontre projetos desafiadores alinhados à ODS para potencializar seu currículo e ingressar nas maiores empresas corporativas do país."
        structuredData={jsonLd}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-background border-b border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 origin-top translate-x-1/4 pointer-events-none blur-3xl"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-primary/20 animate-fade-in-up">
               <Rocket className="w-3.5 h-3.5" />
               Hub de Oportunidades
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-foreground leading-[0.9] tracking-tighter mb-10 animate-fade-in-up">
              Encontre seu <span className="italic font-light text-primary">Próximo</span> Desafio.
            </h1>
            <p className="text-[1.125rem] text-muted-foreground font-medium mb-12 max-w-2xl leading-relaxed animate-fade-in-up delay-100">
              Explore projetos ESG reais de empresas que buscam sua visão inovadora. Filtre por área, impacto ODS ou remuneração e comece sua jornada estratégica.
            </p>
            
            {/* Search Bar Premium */}
            <div className="bg-secondary/10 p-2 rounded-[24px] border border-border flex flex-col md:flex-row gap-3 max-w-2xl animate-fade-in-up delay-200">
               <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40" />
                  <input 
                    type="text" 
                    placeholder="Busque por projeto ou empresa..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-14 pl-14 pr-6 bg-card border border-border rounded-2xl text-[14px] font-bold text-foreground placeholder:text-muted-foreground/30 focus:border-primary/50 transition-all outline-none" 
                  />
               </div>
               <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-primary/10 transition-all active:scale-95">
                  Buscar Agora
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Oportunidades */}
      <section className="py-24 bg-background">
        <div className="container">
          {/* Filters Line */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-16 pb-8 border-b border-border">
             <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mr-2 flex items-center gap-2">
                  <Filter className="w-3 h-3" /> Filtro:
                </span>
                {areas.map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedArea(a)}
                    className={`px-6 h-11 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                      selectedArea === a 
                      ? 'bg-primary text-black shadow-lg shadow-primary/10' 
                      : 'bg-secondary/10 text-muted-foreground border border-border hover:border-primary/30 hover:text-primary'
                    }`}
                  >
                    {a}
                  </button>
                ))}
             </div>
             <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
                <span className="text-foreground">{filteredProjetos.length}</span> Projetos Ativos
             </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjetos.map((projeto) => (
              <div key={projeto.id} className="bg-card border border-border rounded-[2rem] p-8 group hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden flex flex-col animate-fade-in-up">
                {/* ODS Badges */}
                <div className="flex gap-2 mb-8">
                   {(projeto.ods as number[] || []).map((o: number) => (
                     <div key={o} className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground group-hover:border-primary/20 transition-colors">
                        {o}
                     </div>
                   ))}
                </div>

                <div className="mb-8 flex-1">
                   <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors tracking-tighter">{projeto.title}</h3>
                   <div className="flex items-center gap-3 text-muted-foreground mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">{projeto.company}</span>
                      <span className="w-1 h-1 rounded-full bg-border"></span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/40">{projeto.area}</span>
                   </div>
                   <p className="text-[14px] text-muted-foreground font-medium leading-relaxed line-clamp-3">{projeto.description}</p>
                </div>

                <div className="pt-8 border-t border-border mt-auto space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                            <Zap className="w-4 h-4 fill-current" />
                         </div>
                         <div className="leading-tight">
                            <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">Bolsa / Mês</span>
                            <span className="text-[13px] font-bold text-foreground tracking-tighter">{projeto.remuneration}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground/60">
                            <Users className="w-4 h-4" />
                         </div>
                         <div className="leading-tight">
                            <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mb-1">Vagas</span>
                            <span className="text-[13px] font-bold text-foreground tracking-tighter">{projeto.spots}</span>
                         </div>
                      </div>
                   </div>

                   <Link href={`/login/jovem?redirect=projeto-${projeto.id}`}>
                      <Button className="w-full h-12 rounded-xl bg-secondary border border-border hover:bg-primary hover:text-black hover:border-primary text-foreground text-[10px] font-bold uppercase tracking-[0.2em] transition-all">
                        Candidatar-se <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                   </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjetos.length === 0 && (
            <div className="text-center py-32 bg-card rounded-[3.5rem] border border-border border-dashed animate-fade-in-up">
               <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-border">
                  <Search className="w-10 h-10 text-muted-foreground/30" />
               </div>
               <h3 className="font-display text-2xl font-bold text-foreground mb-2 tracking-tighter">Nenhum projeto encontrado.</h3>
               <p className="text-muted-foreground font-medium mb-8">Tente ajustar seus filtros ou mude o termo de busca.</p>
               <Button onClick={() => { setSearchTerm(''); setSelectedArea('Todas'); }} variant="outline" className="rounded-xl border-border text-foreground font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 transition-all">Limpar Todos os Filtros</Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
        </div>
        <div className="container relative z-10 text-center animate-fade-in-up">
          <h2 className="font-display text-4xl md:text-7xl font-bold text-foreground tracking-tighter leading-[0.95] mb-12">
            Mais que um currículo.<br />Sua <span className="italic font-light text-primary">Marca</span> no Mundo.
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center max-w-xl mx-auto">
             <Link href="/auth/jovem" className="flex-1">
                <Button className="w-full h-16 rounded-[20px] bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02]">
                  Criar Meu Perfil de Talento
                </Button>
             </Link>
             <Link href="/para-jovens" className="flex-1">
                <Button variant="outline" className="w-full h-16 rounded-[20px] border border-border hover:bg-white/5 text-foreground font-bold uppercase tracking-widest text-[11px] transition-all">
                  Saber mais sobre o Programa
                </Button>
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Oportunidades;
