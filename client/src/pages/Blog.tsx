import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, ArrowRight, Share2, Star, Tag, Clock } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const { data: postsData, isLoading } = trpc.blog.getLatest.useQuery({
    category: activeCategory,
  });

  const categories = ['Todos', 'Estratégia', 'Educação', 'Notícias', 'Guia', 'Entrevista'];

  const filteredPosts = useMemo(() => {
    return (postsData || []).filter((p: any) => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (p.excerpt && p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    }) as any[];
  }, [searchTerm, postsData]);

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden">
      <Header />

      {/* Hero Section - Editorial Style */}
      <section className="pt-40 pb-20 bg-white border-b border-paper-3">
        <div className="container">
          <div className="max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-ink-4 mb-4">Editorial & Imprensa</div>
            <h1 className="text-6xl md:text-8xl font-black text-ink font-display leading-[0.85] tracking-tight mb-8">
              Portal de <span className="italic font-light text-ink-4">Impacto</span>.
            </h1>
            <p className="text-xl md:text-2xl text-ink-3 font-medium mb-12 max-w-2xl leading-relaxed">
              O ponto de encontro para notícias, guias e insights sobre a nova economia regenarativa no Brasil.
            </p>
            
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4 group-focus-within:text-ink transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Buscar artigos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-6 bg-paper-2 border border-paper-3 rounded-xl text-sm font-bold text-ink placeholder:text-ink-4 focus:bg-white focus:ring-4 focus:ring-leaf/5 transition-all outline-none" 
                  />
               </div>
               <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`px-5 h-12 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm ${
                        activeCategory === c 
                        ? 'bg-ink text-white shadow-xl shadow-ink/20 transform -translate-y-1' 
                        : 'bg-white text-ink-3 border border-paper-3 hover:bg-paper-2'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post (Visual only for first item) */}
      <section className="py-20 bg-paper">
        <div className="container">
           {filteredPosts.length > 0 && !searchTerm && activeCategory === 'Todos' && (
             <div className="mb-24 group relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                   <div className="aspect-[16/9] bg-paper-3 rounded-[3rem] overflow-hidden shadow-2xl relative border border-paper-3">
                      <img 
                        src={filteredPosts[0].coverImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop'} 
                        alt="Featured" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-8 left-8 bg-ink/90 text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-2">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Destaque da Semana
                      </div>
                   </div>
                   <div className="space-y-6">
                       <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-ink-4">
                         <span className="text-leaf-1 bg-leaf-5/30 px-3 py-1 rounded-md border border-leaf-4/20">{filteredPosts[0].category}</span>
                         <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {filteredPosts[0].publishedAt ? format(new Date(filteredPosts[0].publishedAt), 'dd MMM yyyy', { locale: ptBR }) : 'Recente'}</span>
                         <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 8 min</span>
                      </div>
                      <h2 className="text-5xl md:text-6xl font-black text-ink font-display leading-[0.9] tracking-tight hover:text-leaf transition-colors cursor-pointer">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-xl text-ink-3 font-medium leading-relaxed">
                        {filteredPosts[0].excerpt}
                      </p>
                      <div className="pt-6 flex items-center gap-8">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-paper-3 rounded-full border border-paper-4 overflow-hidden">
                               <div className="w-full h-full flex items-center justify-center bg-ink-4 text-white font-black text-sm">
                                  {(filteredPosts[0].authorName || 'BS').split(' ').map((n: string) => n[0]).join('')}
                               </div>
                            </div>
                            <div className="leading-tight">
                               <span className="block text-xs font-black text-ink uppercase tracking-widest">{filteredPosts[0].authorName}</span>
                               <span className="text-[11px] font-medium text-ink-4">Editor Sênior</span>
                            </div>
                         </div>
                         <Button className="h-14 px-8 rounded-2xl bg-ink hover:bg-ink-2 text-white font-black uppercase tracking-widest text-[11px] gap-3">
                            Ler Artigo Completo <ArrowRight className="w-4 h-4" />
                         </Button>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* Post Grid */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredPosts.filter((_, i) => !(i === 0 && !searchTerm && activeCategory === 'Todos')).map((post) => (
                <div key={post.id} className="group flex flex-col h-full bg-white border border-paper-3 rounded-[2.5rem] p-4 transition-all hover:border-leaf/20 hover:shadow-2xl hover:shadow-leaf/5">
                   <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 relative border border-paper-3">
                      <img src={post.coverImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop'} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-ink px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest border border-white/50">
                         {post.category}
                      </div>
                   </div>
                   <div className="px-4 pb-8 space-y-4 flex flex-col flex-1">
                       <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-ink-4">
                         <div className="flex items-center gap-2">
                           <Calendar className="w-3 h-3" /> {post.publishedAt ? format(new Date(post.publishedAt), 'dd MMM yyyy', { locale: ptBR }) : 'Recente'}
                         </div>
                         <div className="flex items-center gap-2">
                           <Clock className="w-3 h-3" /> 5 min
                         </div>
                      </div>
                      <h3 className="text-2xl font-black text-ink font-display leading-tight group-hover:text-leaf transition-colors cursor-pointer flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-ink-3 font-medium line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 flex items-center justify-between border-t border-paper-3 mt-auto">
                         <span className="text-[11px] font-black text-ink uppercase tracking-widest">{post.authorName || 'Brasil Sustenta'}</span>
                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg hover:bg-paper-2">
                               <Share2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg hover:bg-paper-2 text-leaf">
                               <ArrowRight className="w-4 h-4" />
                            </Button>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Empty State */}
           {filteredPosts.length === 0 && (
             <div className="text-center py-32 bg-white rounded-[3.5rem] border border-paper-3 shadow-sm">
                <Search className="w-16 h-16 text-ink-4 mx-auto mb-6 opacity-20" />
                <h3 className="text-2xl font-black text-ink font-display mb-2">Nenhum artigo encontrado.</h3>
                <p className="text-ink-4 font-medium mb-8 max-w-sm mx-auto">Tente buscar por termos como "ESG", "Sustentabilidade" ou outras categorias.</p>
                <Button onClick={() => { setSearchTerm(''); setActiveCategory('Todos'); }} variant="outline" className="rounded-xl border-paper-3 font-black uppercase tracking-widest text-[11px]">Ver Todos os Artigos</Button>
             </div>
           )}
        </div>
      </section>

      {/* Newsletter Section Integrated */}
      <section className="py-24 bg-leaf relative overflow-hidden">
        <div className="container relative z-10">
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white/5 border border-white/10 backdrop-blur-md rounded-[3rem] p-12 shadow-2xl shadow-leaf-1/20">
              <div className="flex-1 text-center md:text-left text-white">
                 <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight leading-[0.9] mb-4">Impacto no seu <span className="italic font-light text-white opacity-80">Inbox</span>.</h2>
                 <p className="text-white/70 font-medium leading-relaxed">Inscreva-se para receber resumos semanais das melhores oportunidades e tendências ESG.</p>
              </div>
              <div className="w-full md:w-96 space-y-3">
                 <Input className="h-14 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:ring-white/30" placeholder="Seu melhor email" />
                 <Button className="w-full h-14 rounded-xl bg-white text-leaf hover:bg-paper font-black uppercase tracking-widest text-[11px] shadow-xl">Cadastrar Gratuitamente</Button>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
