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

import { SEO } from '@/components/SEO';

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Brasil Sustenta Blog - Sustentabilidade e ESG",
    "description": "Artigos, guias corporativos e diretrizes do mundo corporativo sobre tendências e práticas sustentáveis (ESG).",
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/30">
      <SEO 
        title="Blog Editorial - Insights ESG & Sustentabilidade"
        description="O melhor conteúdo corporativo para práticas sustentáveis do pacto global. Insights, ferramentas, notícias e reportagens do Brasil Sustenta."
        structuredData={jsonLd}
      />
      <Header />

      {/* Hero Section - Editorial Style */}
      <section className="pt-40 pb-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,var(--tw-gradient-from)_0%,transparent_50%)] from-primary/5 pointer-events-none"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40 mb-6">Editorial & Imprensa</div>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-foreground leading-[0.9] tracking-tighter mb-10 animate-fade-in-up">
              Portal de <span className="italic font-light text-primary">Impacto</span>.
            </h1>
            <p className="text-[1.25rem] md:text-[1.5rem] text-muted-foreground font-medium mb-12 max-w-2xl leading-relaxed animate-fade-in-up delay-100">
              O ponto de encontro para notícias, guias e insights sobre a nova economia regenerativa no Brasil.
            </p>
            
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-5 items-center animate-fade-in-up delay-200">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Buscar artigos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-6 bg-secondary/10 border border-border rounded-xl text-[14px] font-bold text-foreground placeholder-muted-foreground/20 focus:border-primary/50 transition-all outline-none" 
                  />
               </div>
               <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`px-6 h-12 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                        activeCategory === c 
                        ? 'bg-primary text-black shadow-xl shadow-primary/10 transform -translate-y-1' 
                        : 'bg-secondary/10 text-muted-foreground border border-border hover:bg-white/5'
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
      <section className="py-24 bg-background border-b border-border">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
           {filteredPosts.length > 0 && !searchTerm && activeCategory === 'Todos' && (
             <div className="mb-24 group relative animate-fade-in-up">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                   <div className="aspect-[16/10] bg-card rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-border group-hover:border-primary/20 transition-all duration-500">
                      <img 
                        src={filteredPosts[0].coverImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop'} 
                        alt="Featured" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                      />
                      <div className="absolute top-8 left-8 bg-background/80 text-foreground px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md flex items-center gap-2 border border-border/50">
                        <Star className="w-3.5 h-3.5 text-primary fill-primary" /> Destaque da Semana
                      </div>
                   </div>
                   <div className="space-y-8">
                       <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                         <span className="text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">{filteredPosts[0].category}</span>
                         <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {filteredPosts[0].publishedAt ? format(new Date(filteredPosts[0].publishedAt), 'dd MMM yyyy', { locale: ptBR }) : 'Recente'}</span>
                         <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 8 min</span>
                      </div>
                      <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[0.95] tracking-tighter hover:text-primary transition-colors cursor-pointer">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-[1.125rem] text-muted-foreground font-medium leading-relaxed">
                        {filteredPosts[0].excerpt}
                      </p>
                      <div className="pt-8 flex items-center gap-8 border-t border-border">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-secondary border border-border rounded-2xl overflow-hidden flex items-center justify-center font-display font-bold text-primary italic">
                               {(filteredPosts[0].authorName || 'BS').split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className="leading-tight">
                               <span className="block text-sm font-bold text-foreground uppercase tracking-widest">{filteredPosts[0].authorName}</span>
                               <span className="text-[11px] font-medium text-muted-foreground/40">Editor Sênior</span>
                            </div>
                         </div>
                         <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest text-[10px] gap-3 shadow-xl shadow-primary/10 transition-all hover:scale-[1.02]">
                            Ler Artigo Completo <ArrowRight className="w-4 h-4" />
                         </Button>
                      </div>
                   </div>
                </div>
             </div>
           )}

      {/* Articles Grid */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.slice(searchTerm || activeCategory !== 'Todos' ? 0 : 1).map((post) => (
              <div key={post.id} className="group cursor-pointer animate-fade-in-up">
                <div className="aspect-[16/10] bg-card rounded-[2rem] overflow-hidden mb-8 relative border border-border group-hover:border-primary/20 transition-all duration-500">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-background/90 text-foreground px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-border/50">
                    {post.category}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.publishedAt ? format(new Date(post.publishedAt), 'dd MMM', { locale: ptBR }) : 'Hoje'}</span>
                    <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> 5 min</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground leading-[1.1] tracking-tighter group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center font-display font-bold text-primary italic text-xs">
                           {(post.authorName || 'BS').split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">{post.authorName}</span>
                     </div>
                     <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

           {/* Empty State */}
           {filteredPosts.length === 0 && (
             <div className="text-center py-32 bg-card rounded-[3.5rem] border border-border shadow-sm">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
                <h3 className="text-2xl font-black text-foreground font-display mb-2">Nenhum artigo encontrado.</h3>
                <p className="text-muted-foreground font-medium mb-8 max-w-sm mx-auto">Tente buscar por termos como "ESG", "Sustentabilidade" ou outras categorias.</p>
                <Button onClick={() => { setSearchTerm(''); setActiveCategory('Todos'); }} variant="outline" className="rounded-xl border-border font-black uppercase tracking-widest text-[11px]">Ver Todos os Artigos</Button>
             </div>
           )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 lg:py-32 bg-secondary/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container relative z-10 px-6 lg:px-8 max-w-[800px] mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tighter mb-8 leading-[1.05]">
              Assine nossa <span className="italic font-light text-primary">Newsletter</span>.
            </h2>
            <p className="text-[1.125rem] text-muted-foreground font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Receba semanalmente os melhores insights sobre sustentabilidade, ESG e carreiras de impacto no Brasil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-card p-2 rounded-[24px] border border-border animate-fade-in-up">
               <input 
                 type="email" 
                 placeholder="Seu melhor e-mail..." 
                 className="flex-1 h-14 bg-transparent border-none px-6 text-[14px] font-bold text-foreground placeholder:text-muted-foreground/20 focus:outline-none"
               />
               <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-primary/10 transition-all hover:scale-[1.02]">
                  Inscrever-se
               </Button>
            </div>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30">
               Zero spam. Apenas conteúdo de valor.
            </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
