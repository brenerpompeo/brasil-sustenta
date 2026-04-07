import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Rocket, Target, Users, Calendar, ArrowRight, Zap, Star } from 'lucide-react';
import { trpc } from '@/lib/trpc';

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

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-white border-b border-paper-3 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sky/5 skew-x-[-15deg] origin-top translate-x-1/2 pointer-events-none"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sky/5 text-sky px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 border border-sky/10">
               <Rocket className="w-3.5 h-3.5" />
               Hub de Oportunidades
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-ink font-display leading-[0.85] tracking-tight mb-8">
              Encontre seu <span className="italic font-light text-sky">Próximo</span> Desafio.
            </h1>
            <p className="text-xl text-ink-3 font-medium mb-10 max-w-2xl leading-relaxed">
              Explore projetos ESG reais de empresas que buscam sua visão inovadora. Filtre por área, impacto ODS ou remuneração e comece sua jornada.
            </p>
            
            {/* Search Bar Premium */}
            <div className="bg-paper-2 p-2 rounded-3xl border border-paper-3 shadow-xl shadow-sky/5 flex flex-col md:flex-row gap-2 max-w-2xl">
               <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-4" />
                  <input 
                    type="text" 
                    placeholder="Busque por projeto ou empresa..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-14 pl-14 pr-6 bg-white border border-paper-3 rounded-2xl text-sm font-bold text-ink placeholder:text-ink-4 focus:ring-4 focus:ring-sky/10 transition-all outline-none" 
                  />
               </div>
               <Button className="h-14 px-8 rounded-2xl bg-sky hover:bg-sky-1 text-white font-black uppercase tracking-widest text-[11px] shadow-lg shadow-sky/20 transition-all active:scale-95">
                  Buscar Agora
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Oportunidades */}
      <section className="py-20 bg-paper">
        <div className="container">
          {/* Filters Line */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-8 border-b border-paper-3">
             <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <span className="text-[11px] font-black uppercase tracking-widest text-ink-4 mr-2"><Filter className="w-3 h-3 inline mr-1" /> Área:</span>
                {areas.map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedArea(a)}
                    className={`px-5 h-10 rounded-xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                      selectedArea === a 
                      ? 'bg-ink text-white shadow-lg shadow-ink/20' 
                      : 'bg-white text-ink-3 border border-paper-3 hover:border-sky/30 hover:text-sky'
                    }`}
                  >
                    {a}
                  </button>
                ))}
             </div>
             <div className="text-[11px] font-black uppercase tracking-[0.2em] text-ink-4">
                Mostrando <span className="text-ink font-black">{filteredProjetos.length}</span> Projetos Ativos
             </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjetos.map((projeto) => (
              <div key={projeto.id} className="bg-white border border-paper-3 rounded-[2.5rem] p-8 group hover:border-sky/30 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-sky/5 relative overflow-hidden flex flex-col">
                {/* ODS Badges */}
                <div className="flex gap-1.5 mb-6">
                   {(projeto.ods as number[] || []).map((o: number) => (
                     <div key={o} className="w-8 h-8 rounded-lg bg-paper-3 flex items-center justify-center text-[11px] font-black text-ink-3 border border-paper-4 group-hover:border-sky/20 transition-colors">
                        {o}
                     </div>
                   ))}
                </div>

                <div className="mb-6 flex-1">
                   <h3 className="text-xl font-bold text-ink mb-2 leading-tight group-hover:text-sky transition-colors">{projeto.title}</h3>
                   <div className="flex items-center gap-2 text-ink-4 mb-4">
                      <span className="text-[11px] font-black uppercase tracking-widest text-ink">{projeto.company}</span>
                      <span className="w-1 h-1 rounded-full bg-paper-4 lowercase"></span>
                      <span className="text-[11px] font-black uppercase tracking-tighter">{projeto.area}</span>
                   </div>
                   <p className="text-sm text-ink-3 font-medium leading-relaxed">{projeto.description}</p>
                </div>

                <div className="pt-6 border-t border-paper-3 mt-auto space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                         <div className="w-8 h-8 rounded-full bg-sky/5 flex items-center justify-center text-sky">
                            <Zap className="w-4 h-4 fill-current" />
                         </div>
                         <div className="leading-tight">
                            <span className="block text-[8px] font-black uppercase tracking-widest text-ink-4">Bolsa / Mês</span>
                            <span className="text-xs font-black text-ink">{projeto.remuneration}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <div className="w-8 h-8 rounded-full bg-paper-3 flex items-center justify-center text-ink-4">
                            <Users className="w-4 h-4" />
                         </div>
                         <div className="leading-tight">
                            <span className="block text-[8px] font-black uppercase tracking-widest text-ink-4">Vagas</span>
                            <span className="text-xs font-black text-ink">{projeto.spots}</span>
                         </div>
                      </div>
                   </div>

                   <Link href={`/login/jovem?redirect=projeto-${projeto.id}`}>
                      <Button className="w-full h-12 rounded-xl bg-paper-2 hover:bg-sky hover:text-white text-ink text-[11px] font-black uppercase tracking-widest transition-all">
                        Candidatar-se <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                   </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjetos.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3.5rem] border border-paper-3 border-dashed">
               <div className="w-20 h-20 bg-paper-2 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-ink-4" />
               </div>
               <h3 className="text-2xl font-black text-ink font-display mb-2">Nenhum projeto encontrado.</h3>
               <p className="text-ink-4 font-medium mb-8">Tente ajustar seus filtros ou mude o termo de busca.</p>
               <Button onClick={() => { setSearchTerm(''); setSelectedArea('Todas'); }} variant="outline" className="rounded-xl border-paper-3 font-black uppercase tracking-widest text-[11px]">Limpar Todos os Filtros</Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-ink text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,var(--tw-gradient-from)_0%,transparent_50%)] from-sky pointer-events-none"></div>
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight leading-[0.9] mb-10">
            Mais que um currículo.<br />Sua <span className="italic font-light text-sky">Marca</span> no Mundo.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
             <Link href="/login/jovem" className="flex-1">
                <Button className="w-full h-16 rounded-2xl bg-sky hover:bg-sky-1 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-sky/30">
                  Criar Meu Perfil de Talento
                </Button>
             </Link>
             <Link href="/para-jovens" className="flex-1">
                <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-white/20 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs">
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
