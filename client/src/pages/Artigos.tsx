import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, ArrowRight, Share2, Eye, Calendar, Search, Filter, Hash } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Artigos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('Todos');
  const [selectedHub, setSelectedHub] = useState('Todos');

  const { data: articlesData, isLoading } = trpc.article.getLatest.useQuery({ limit: 50 });

  const types = ['Todos', 'Academic', 'Opinion', 'Case Study', 'Whitepaper'];

  const filteredArticles = useMemo(() => {
    return (articlesData || []).filter((a: any) => {
      const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (a.abstract && a.abstract.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = activeType === 'Todos' || a.articleType.toLowerCase() === activeType.toLowerCase().replace(' ', '_');
      const matchesHub = selectedHub === 'Todos' || a.hub === selectedHub;
      return matchesSearch && matchesType && matchesHub;
    }) as any[];
  }, [searchTerm, activeType, selectedHub, articlesData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-leaf"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden font-body selection:bg-leaf-3 selection:text-leaf">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-ink">
        <div className="container relative overflow-hidden">
          {/* Abstract geometric shapes */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] -z-0"></div>
          
          <div className="max-w-4xl relative z-10">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">Produção Intelectual & Pensamento Crítico</div>
            <h1 className="text-6xl md:text-8xl font-black text-white font-display leading-[0.85] tracking-tight mb-8">
              Artigos <span className="italic font-light text-white/40">& Insights</span>.
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-medium mb-12 max-w-2xl leading-relaxed">
              O repositório de conhecimento da Brasil Sustenta. Explore pesquisas, colunas de opinião e estudos de caso que moldam a economia verde.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Buscar por títulos ou temas..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-6 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white transition-all outline-none focus:bg-white/10 focus:ring-4 focus:ring-white/5" 
                  />
               </div>
               <div className="flex gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto scrollbar-hide max-w-full">
                  {types.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveType(t)}
                      className={`whitespace-nowrap px-5 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeType === t 
                        ? 'bg-white text-ink shadow-lg' 
                        : 'text-white/40 hover:bg-white/5 hover:text-white/60'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
               </div>

               <div className="flex gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto scrollbar-hide max-w-full">
                  {['Todos', 'Campinas', 'São Paulo', 'Rio de Janeiro'].map((h) => (
                    <button
                      key={h}
                      onClick={() => setSelectedHub(h)}
                      className={`whitespace-nowrap px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedHub === h 
                        ? 'bg-leaf text-white shadow-lg' 
                        : 'text-white/40 hover:bg-white/5 hover:text-white/60'
                      }`}
                    >
                      {h === 'Todos' ? 'Brasil' : h}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-paper">
        <div className="container">
           {/* Academic Grid Layout */}
           <div className="grid lg:grid-cols-12 gap-16">
              
              {/* Sidebar / Categories (Hidden on mobile) */}
              <div className="hidden lg:block lg:col-span-3 space-y-12">
                 <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-6">Filtros de Pesquisa</h3>
                    <div className="space-y-2">
                       {['Sustentabilidade', 'ESG', 'Economia', 'Liderança', 'Tecnologia'].map(tag => (
                         <div key={tag} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white border border-transparent hover:border-paper-3 cursor-pointer group transition-all">
                            <Hash className="w-3.5 h-3.5 text-ink-4 group-hover:text-leaf transition-colors" />
                            <span className="text-sm font-bold text-ink-3 group-hover:text-ink">{tag}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="p-8 bg-ink rounded-[2.5rem] text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-leaf/20 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                       <GraduationCap className="w-10 h-10 text-leaf mb-6" />
                       <h4 className="text-xl font-black font-display leading-[1.1] mb-4">Publique sua Pesquisa</h4>
                       <p className="text-xs text-white/50 font-medium mb-6 leading-relaxed">É pesquisador ou acadêmico? Submeta seu artigo para nossa rede de especialistas.</p>
                       <Button className="w-full h-12 bg-white text-ink hover:bg-leaf hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                          Ver Critérios
                       </Button>
                    </div>
                 </div>
              </div>

              {/* Articles Feed */}
              <div className="lg:col-span-9 space-y-12">
                 {filteredArticles.length > 0 ? (
                    filteredArticles.map((art) => (
                      <div key={art.id} className="group bg-white border border-paper-3 rounded-[3.5rem] p-8 lg:p-12 hover:border-leaf/20 hover:shadow-2xl hover:shadow-leaf/5 transition-all duration-500">
                         <div className="flex flex-col md:flex-row gap-12">
                            <div className="flex-1 space-y-4">
                               <div className="flex flex-wrap items-center gap-4 text-[11px] font-black uppercase tracking-widest text-ink-4">
                                  <span className="text-sky-600 bg-sky-50 px-3 py-1 rounded-md border border-sky-100 uppercase tracking-[0.2em]">{art.articleType.replace('_', ' ')}</span>
                                  <span className="text-leaf-1 bg-leaf-5/30 px-3 py-1 rounded-md border border-leaf-4/20 uppercase tracking-[0.2em]">HUB {art.hub || 'Global'}</span>
                                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {art.publishedAt ? format(new Date(art.publishedAt), 'dd MMM yyyy', { locale: ptBR }) : 'Recent'}</span>
                                  <span className="flex items-center gap-1.5 text-ink-2"><GraduationCap className="w-3.5 h-3.5" /> {art.institution || 'Autônomo'}</span>
                               </div>
                               <h2 className="text-3xl md:text-4xl font-black text-ink font-display leading-[1.1] tracking-tight group-hover:text-leaf transition-colors cursor-pointer">
                                 {art.title}
                               </h2>
                               <p className="text-sm md:text-base text-ink-3 font-medium leading-relaxed line-clamp-3 italic opacity-80">
                                 "{art.abstract}"
                               </p>
                               <div className="pt-6 flex items-center justify-between">
                                  <div className="flex -space-x-2">
                                     <div className="w-8 h-8 rounded-full bg-paper-3 border-2 border-white flex items-center justify-center text-[10px] font-black text-ink">B</div>
                                     <div className="w-8 h-8 rounded-full bg-leaf-5 border-2 border-white flex items-center justify-center text-[10px] font-black text-leaf">S</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                     <Button variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-paper-2 text-ink-4">
                                        <Share2 className="w-4 h-4" />
                                     </Button>
                                     <Button className="h-12 px-6 rounded-2xl bg-ink hover:bg-ink-2 text-white text-[10px] font-black uppercase tracking-widest gap-3 shadow-xl group/btn">
                                        Ler Artigo <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                     </Button>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))
                 ) : (
                    <div className="text-center py-32 bg-white rounded-[3.5rem] border border-paper-3 mt-12 shadow-sm">
                       <BookOpen className="w-16 h-16 text-ink-4 mx-auto mb-6 opacity-20" />
                       <h3 className="text-2xl font-black text-ink font-display mb-2">Página em Branco.</h3>
                       <p className="text-ink-4 font-medium max-w-xs mx-auto">Não encontramos artigos com esses critérios. Tente outra combinação ou veja os mais recentes.</p>
                       <Button onClick={() => { setSearchTerm(''); setActiveType('Todos'); }} variant="outline" className="mt-8 rounded-xl border-paper-3 font-black uppercase tracking-widest text-[11px]">Ver Tudo</Button>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </section>

      {/* Journal Invite Section */}
      <section className="py-24 bg-white border-y border-paper-3 overflow-hidden relative">
         <div className="container">
            <div className="grid md:grid-cols-2 gap-24 items-center">
               <div className="space-y-8 animate-fade-in">
                  <div className="w-20 h-2 bg-leaf-3 rounded-full"></div>
                  <h2 className="text-5xl md:text-7xl font-black text-ink font-display tracking-tight leading-[0.85]">
                     Sua voz, nosso <span className="italic font-light text-leaf">Eco</span>.
                  </h2>
                  <p className="text-xl text-ink-3 font-medium leading-relaxed max-w-lg">
                     Acreditamos que o conhecimento deve ser compartilhado para gerar ação. Escreva para a Brasil Sustenta.
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-4">
                     <div>
                        <span className="block text-3xl font-black text-ink mb-1 group-hover:text-leaf transition-colors">240+</span>
                        <span className="text-[10px] font-black text-ink-4 uppercase tracking-widest">Especialistas</span>
                     </div>
                     <div>
                        <span className="block text-3xl font-black text-ink mb-1 group-hover:text-leaf transition-colors">45k</span>
                        <span className="text-[10px] font-black text-ink-4 uppercase tracking-widest">Leitores/Mês</span>
                     </div>
                  </div>
               </div>
               <div className="relative">
                  <div className="aspect-square bg-paper-2 rounded-[4rem] flex items-center justify-center p-12 lg:p-24 shadow-inner relative">
                     <div className="absolute inset-0 bg-gradient-to-br from-leaf/5 to-sky/5 rounded-[4rem]"></div>
                     <BookOpen className="w-full h-full text-ink opacity-10" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl border border-paper-3 animate-bounce-slow">
                        <ArrowRight className="w-8 h-8 text-leaf rotate-90" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default Artigos;
