import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Download, Eye, FileText, Calendar, Search, Filter, ShieldCheck, PieChart } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Relatorios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTheme, setActiveTheme] = useState('Todos');

  const { data: reportsData, isLoading } = trpc.report.getLatest.useQuery({ limit: 50 });

  const themes = ['Todos', 'ESG', 'Impacto', 'ODS', 'Anual', 'Sustentabilidade'];

  const filteredReports = useMemo(() => {
    return (reportsData || []).filter((r: any) => {
      const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (r.summary && r.summary.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTheme = activeTheme === 'Todos' || r.reportType.toLowerCase() === activeTheme.toLowerCase();
      return matchesSearch && matchesTheme;
    }) as any[];
  }, [searchTerm, activeTheme, reportsData]);

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
      <section className="pt-40 pb-20 bg-white border-b border-paper-3 relative overflow-hidden">
        {/* Abstract grids */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] -z-0"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-ink-4 mb-4">Transparência & Governança</div>
            <h1 className="text-6xl md:text-8xl font-black text-ink font-display leading-[0.85] tracking-tight mb-8">
              Portal de <span className="italic font-light text-ink-4">Impacto</span>.
            </h1>
            <p className="text-xl md:text-2xl text-ink-3 font-medium mb-12 max-w-2xl leading-relaxed">
              Consulte nossos relatórios ESG, indicadores de ODS e a transparência de cada projeto acelerado por nossa rede.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4 group-focus-within:text-emerald-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Buscar relatórios ou anos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-6 bg-paper-2 border border-paper-3 rounded-xl text-sm font-bold text-ink transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5" 
                  />
               </div>
               <div className="flex gap-1.5 p-1 bg-paper-2 rounded-2xl border border-paper-3 overflow-x-auto scrollbar-hide max-w-full">
                  {themes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTheme(t)}
                      className={`whitespace-nowrap px-5 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTheme === t 
                        ? 'bg-ink text-white shadow-lg' 
                        : 'text-ink-4 hover:bg-paper-3'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-24 bg-paper">
        <div className="container">
           {filteredReports.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {filteredReports.map((rpt) => (
                   <div key={rpt.id} className="group relative bg-white border border-paper-3 rounded-[3rem] p-8 transition-all hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/5">
                      <div className="mb-8 flex items-center justify-between">
                         <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                            <BarChart3 className="w-6 h-6" />
                         </div>
                         <div className="text-right">
                            <span className="block text-[11px] font-black uppercase tracking-widest text-ink-4">{rpt.year || '2026'}</span>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{rpt.period || 'Anual'}</span>
                         </div>
                      </div>

                      <h3 className="text-2xl font-black text-ink font-display leading-[1.1] tracking-tight group-hover:text-emerald-700 transition-colors cursor-pointer mb-4">
                        {rpt.title}
                      </h3>
                      
                      <p className="text-sm text-ink-3 font-medium leading-relaxed line-clamp-3 mb-8 opacity-80">
                        {rpt.summary || 'Acompanhe os principais indicadores de desempenho e impacto social/ambiental deste período.'}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                         <span className="text-[9px] font-black uppercase bg-paper-3 px-2 py-1 rounded tracking-tighter text-ink-4">#{rpt.reportType}</span>
                         <span className="text-[9px] font-black uppercase bg-emerald-50 px-2 py-1 rounded tracking-tighter text-emerald-600 border border-emerald-100">DATA DRIVEN</span>
                      </div>

                      <div className="pt-6 border-t border-paper-3 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[11px] font-black text-ink-4">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Auditoria BS
                         </div>
                         <div className="flex gap-2">
                           <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl hover:bg-emerald-50 text-emerald-600">
                              <Eye className="w-4 h-4" />
                           </Button>
                           <Button 
                             className="h-10 px-4 rounded-xl bg-ink text-white text-[10px] font-black uppercase tracking-widest gap-2 shadow-xl hover:bg-emerald-600 transition-all"
                             disabled={!rpt.fileUrl}
                           >
                              PDF <Download className="w-3.5 h-3.5" />
                           </Button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           ) : (
              <div className="text-center py-32 bg-white rounded-[4rem] border border-paper-3 shadow-inner">
                 <PieChart className="w-20 h-20 text-ink-4 mx-auto mb-6 opacity-20" />
                 <h3 className="text-3xl font-black text-ink font-display mb-2">Dados em processamento.</h3>
                 <p className="text-ink-4 font-medium max-w-sm mx-auto">Não encontramos relatórios para este filtro no momento. Estamos preparando os novos dashboards anuais.</p>
                 <Button onClick={() => { setSearchTerm(''); setActiveTheme('Todos'); }} variant="outline" className="mt-8 rounded-2xl border-paper-3 font-black uppercase tracking-widest text-[11px]">Ver todos</Button>
              </div>
           )}
        </div>
      </section>

      {/* ESG Dashboard CTA Section */}
      <section className="py-24 bg-ink relative overflow-hidden">
         {/* Green glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-leaf/10 rounded-full blur-[150px] opacity-50"></div>
         
         <div className="container relative z-10">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-24 items-center">
               <div className="flex flex-col gap-8 order-2 md:order-1">
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { label: 'Relatórios Publicados', val: '450+', icon: FileText },
                       { label: 'KPIs Monitorados', val: '12k', icon: TrendingUp },
                       { label: 'Downloads Efetuados', val: '85k', icon: Download },
                       { label: 'Acurácia de Dados', val: '99%', icon: ShieldCheck },
                     ].map((stat, i) => (
                       <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm group hover:border-leaf/30 transition-all">
                          <stat.icon className="w-5 h-5 text-leaf-3 mb-4 opacity-50" />
                          <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                          <div className="text-[10px] font-black text-white/30 uppercase tracking-widest uppercase">{stat.label}</div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="space-y-8 order-1 md:order-2">
                  <h2 className="text-5xl md:text-7xl font-black text-white font-display tracking-tight leading-[0.85]">
                     Transparência <span className="italic font-light text-white/40">Real</span>.
                  </h2>
                  <p className="text-xl text-white/50 font-medium leading-relaxed">
                     Nossa metodologia de reporte segue os mais altos padrões de compliance ESG, garantindo que cada dado apresentado seja auditado e verificável.
                  </p>
                  <Button className="h-16 px-10 rounded-2xl bg-leaf hover:bg-leaf-1 text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-leaf/20 transition-all">
                     Acesse o Dashboard Interativo
                  </Button>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default Relatorios;
