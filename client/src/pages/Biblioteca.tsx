import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Library, Book, Video, Download, Podcast, Search, Clock, ArrowRight, Play, Globe, CheckCircle2, Eye } from 'lucide-react';
import { trpc } from '@/lib/trpc';

const Biblioteca = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFormat, setActiveFormat] = useState('Todos');

  const { data: materialsData, isLoading } = trpc.material.getLatest.useQuery({ limit: 48 });

  const formats = ['Todos', 'Video', 'Ebook', 'Infografico', 'Podcast', 'Toolkit'];

  const filteredMaterials = useMemo(() => {
    return (materialsData || []).filter((m: any) => {
      const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (m.description && m.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFormat = activeFormat === 'Todos' || m.materialType.toLowerCase() === activeFormat.toLowerCase();
      return matchesSearch && matchesFormat;
    }) as any[];
  }, [searchTerm, activeFormat, materialsData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-leaf"></div>
      </div>
    );
  }

  const getFormatIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'ebook': return <Book className="w-5 h-5" />;
      case 'podcast': return <Podcast className="w-5 h-5" />;
      default: return <Library className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden font-body selection:bg-leaf-3 selection:text-leaf">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-white relative overflow-hidden">
        {/* Sky blur effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[100px] -z-0 opacity-60"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-ink-4 mb-4">Recursos & Aceleração</div>
            <h1 className="text-6xl md:text-8xl font-black text-ink font-display leading-[0.85] tracking-tight mb-8">
              Biblioteca <span className="italic font-light text-ink-4">Brasil Sustenta</span>.
            </h1>
            <p className="text-xl md:text-2xl text-ink-3 font-medium mb-12 max-w-2xl leading-relaxed">
               Acesse gratuitamente nosso acervo de ferramentas práticas, videoaulas e guias para liderar a transição sustentável.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4 group-focus-within:text-sky-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="O que você quer aprender hoje?" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-6 bg-paper-2 border border-paper-3 rounded-xl text-sm font-bold text-ink transition-all outline-none focus:bg-white focus:ring-4 focus:ring-sky-500/5" 
                  />
               </div>
               <div className="flex gap-1.5 p-1 bg-paper-2 rounded-2xl border border-paper-3 overflow-x-auto scrollbar-hide max-w-full">
                  {formats.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFormat(f)}
                      className={`whitespace-nowrap px-5 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeFormat === f 
                        ? 'bg-ink text-white shadow-lg' 
                        : 'text-ink-4 hover:bg-paper-3'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Grid Filtered */}
      <section className="py-24 bg-paper">
         <div className="container">
            {filteredMaterials.length > 0 ? (
               <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filteredMaterials.map((mat) => (
                    <div key={mat.id} className="group relative bg-white border border-paper-3 rounded-[2.5rem] p-6 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/5 hover:border-sky-200 flex flex-col h-full">
                       <div className="aspect-video bg-paper-3 rounded-[1.5rem] overflow-hidden mb-6 relative border border-paper-3">
                          <img 
                            src={mat.coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop'} 
                            alt={mat.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl transform scale-50 group-hover:scale-100 transition-all duration-500">
                                {mat.materialType === 'video' ? <Play className="w-5 h-5 text-ink fill-ink ml-0.5" /> : <Eye className="w-5 h-5 text-ink" />}
                             </div>
                          </div>
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/50 text-ink shadow-sm">
                             {mat.materialType}
                          </div>
                       </div>

                       <div className="mb-4 flex items-center gap-2 text-[10px] font-black text-ink-4 uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5" /> {mat.duration || 'Livre'}
                       </div>

                       <h3 className="text-xl font-black text-ink font-display leading-[1.1] tracking-tight group-hover:text-sky-600 transition-colors mb-3 flex-1">
                         {mat.title}
                       </h3>
                       
                       <p className="text-xs text-ink-3 font-medium leading-relaxed line-clamp-2 mb-6 opacity-70">
                         {mat.description || 'Domine conceitos essenciais com este recurso prático curado por nosso time.'}
                       </p>

                       <div className="pt-6 border-t border-paper-3 mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <Globe className="w-3.5 h-3.5 text-sky-500" />
                             <span className="text-[10px] font-black text-ink-4 uppercase tracking-widest">Global</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl hover:bg-sky-50 text-sky-600 font-black uppercase tracking-widest text-[9px] gap-2">
                             Acessar <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                       </div>
                    </div>
                  ))}
               </div>
            ) : (
               <div className="text-center py-32 bg-white rounded-[4rem] border border-paper-3 max-w-4xl mx-auto shadow-sm">
                  <Library className="w-16 h-16 text-ink-4 mx-auto mb-6 opacity-20" />
                  <h3 className="text-2xl font-black text-ink font-display mb-2">Acervo em expansão.</h3>
                  <p className="text-ink-4 font-medium max-w-sm mx-auto">Estamos digitalizando novos conteúdos. Tente buscar por outros termos ou formatos.</p>
                  <Button onClick={() => { setSearchTerm(''); setActiveFormat('Todos'); }} variant="outline" className="mt-8 rounded-2xl border-paper-3 font-black uppercase tracking-widest text-[11px]">Limpar Busca</Button>
               </div>
            )}
         </div>
      </section>

      {/* Newsletter Integrated */}
      <section className="py-24 bg-white border-y border-paper-3">
         <div className="container">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-12">
                  <div className="bg-sky-600 rounded-[3.5rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left shadow-2xl shadow-sky-600/10">
                     <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -z-0"></div>
                     <div className="flex-1 relative z-10 space-y-6">
                        <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                           <Download className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white font-display tracking-tight leading-[0.9]">
                          Toolkit <span className="italic font-light text-white/50">Gratuito</span>.
                        </h2>
                        <p className="text-lg text-white/70 font-medium max-w-xl">
                          Receba mensalmente uma curadoria dos melhores materiais e resumos das videoaulas mais assistidas na rede.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                           <div className="flex items-center gap-2 text-white font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4 text-white/40" /> Sem Spam
                           </div>
                           <div className="flex items-center gap-2 text-white font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4 text-white/40" /> Conteúdo Auditado
                           </div>
                        </div>
                     </div>
                     <div className="w-full lg:w-[400px] bg-white rounded-[2.5rem] p-8 shadow-2xl relative z-10">
                        <h4 className="text- ink text-lg font-black font-display mb-6">Comece agora mesmo</h4>
                        <div className="space-y-4">
                           <input type="email" placeholder="Seu email institucional" className="w-full h-14 bg-paper-2 border border-paper-3 rounded-xl px-6 outline-none focus:ring-4 focus:ring-sky-500/5 font-bold text-ink text-sm" />
                           <Button className="w-full h-14 bg-ink hover:bg-ink-2 text-white font-black uppercase tracking-widest text-[11px] rounded-xl shadow-lg">Quero meus recursos</Button>
                        </div>
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

export default Biblioteca;
