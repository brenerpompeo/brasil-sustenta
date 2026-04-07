import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Video, ArrowRight, Share2, Star, Clock, Search, Filter } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Eventos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Próximos');
  const [selectedHub, setSelectedHub] = useState('Todos');

  const { data: eventsData, isLoading } = trpc.event.getLatest.useQuery({ limit: 50 });

  const filteredEvents = useMemo(() => {
    return (eventsData || []).filter((e: any) => {
      const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (e.subtitle && e.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = activeFilter === 'Todos' || 
                           (activeFilter === 'Próximos' && (e.status === 'upcoming' || e.status === 'ongoing')) ||
                           (activeFilter === 'Passados' && e.status === 'completed');
      const matchesHub = selectedHub === 'Todos' || e.hub === selectedHub;
      return matchesSearch && matchesFilter && matchesHub;
    }) as any[];
  }, [searchTerm, activeFilter, selectedHub, eventsData]);

  const featuredEvent = useMemo(() => {
    return filteredEvents.find(e => e.isFeatured) || filteredEvents[0];
  }, [filteredEvents]);

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
      <section className="pt-40 pb-20 bg-white border-b border-paper-3">
        <div className="container">
          <div className="max-w-4xl">
            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-ink-4 mb-4">Agenda & Impacto</div>
            <h1 className="text-6xl md:text-8xl font-black text-ink font-display leading-[0.85] tracking-tight mb-8">
              Eventos <span className="italic font-light text-ink-4">Sustentáveis</span>.
            </h1>
            <p className="text-xl md:text-2xl text-ink-3 font-medium mb-12 max-w-2xl leading-relaxed">
              Workshop, Palestras, Hackathons e Webinars focados na construção do amanhã regenerativo.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
               <div className="relative w-full md:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4 group-focus-within:text-ink transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Buscar eventos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-6 bg-paper-2 border border-paper-3 rounded-xl text-sm font-bold text-ink transition-all outline-none focus:bg-white focus:ring-4 focus:ring-leaf/5" 
                  />
               </div>
                <div className="flex gap-1.5 p-1 bg-paper-2 rounded-2xl border border-paper-3">
                  {['Próximos', 'Passados', 'Todos'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-5 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeFilter === f 
                        ? 'bg-ink text-white shadow-lg' 
                        : 'text-ink-4 hover:bg-paper-3'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
               </div>

               <div className="flex gap-1.5 p-1 bg-paper-2 rounded-2xl border border-paper-3">
                  {['Todos', 'Campinas', 'São Paulo', 'Rio de Janeiro'].map((h) => (
                    <button
                      key={h}
                      onClick={() => setSelectedHub(h)}
                      className={`px-4 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedHub === h 
                        ? 'bg-leaf text-white shadow-lg' 
                        : 'text-ink-4 hover:bg-paper-3'
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
      <section className="py-20 bg-paper">
        <div className="container">
           {featuredEvent && !searchTerm && (
             <div className="mb-24 group relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                   <div className="aspect-[16/9] bg-paper-3 rounded-[3rem] overflow-hidden shadow-2xl relative border border-paper-3 group-hover:shadow-leaf-1/10 transition-all duration-500">
                      <img 
                        src={featuredEvent.coverImage || 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1000&auto=format&fit=crop'} 
                        alt={featuredEvent.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md text-ink px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/50">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Evento em Destaque
                      </div>
                      <div className="absolute bottom-8 right-8 flex gap-2">
                         <Button variant="ghost" className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20">
                            <Share2 className="w-5 h-5" />
                         </Button>
                      </div>
                   </div>
                   <div className="space-y-6">
                       <div className="flex flex-wrap items-center gap-4 text-[11px] font-black uppercase tracking-widest text-ink-4">
                         <span className="text-leaf-1 bg-leaf-5/30 px-3 py-1 rounded-md border border-leaf-4/20 leading-none">
                            {featuredEvent.isOnline ? 'Online / Webinar' : featuredEvent.location}
                         </span>
                         <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featuredEvent.eventDate ? format(new Date(featuredEvent.eventDate), 'dd MMMM, EEEE', { locale: ptBR }) : 'Data a confirmar'}</span>
                         <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredEvent.eventTime || 'Horário Independente'}</span>
                      </div>
                      <h2 className="text-5xl md:text-6xl font-black text-ink font-display leading-[0.9] tracking-tight group-hover:text-leaf transition-colors">
                        {featuredEvent.title}
                      </h2>
                      <p className="text-xl text-ink-3 font-medium leading-relaxed line-clamp-3">
                        {featuredEvent.subtitle || 'Participe deste encontro transformador focado em inovação, sustentabilidade e tecnologias regenarativas.'}
                      </p>
                      <div className="pt-6">
                         <Button className="h-16 px-10 rounded-2xl bg-leaf hover:bg-leaf-1 text-white font-black uppercase tracking-widest text-[11px] gap-3 shadow-xl shadow-leaf/20 group/btn">
                            Inscrição Gratuita <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                         </Button>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* Event Grid */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.filter(e => !(e.id === featuredEvent?.id && !searchTerm)).map((event) => (
                <div key={event.id} className="group flex flex-col h-full bg-white border border-paper-3 rounded-[2.5rem] p-4 transition-all hover:border-leaf/20 hover:shadow-2xl hover:shadow-leaf/5">
                   <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 relative border border-paper-3">
                      <img 
                        src={event.coverImage || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000&auto=format&fit=crop'} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-ink px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/50 flex flex-col items-center">
                         <span className="text-[14px] leading-tight">{event.eventDate ? format(new Date(event.eventDate), 'dd') : '--'}</span>
                         <span className="text-[10px] opacity-60 leading-tight">{event.eventDate ? format(new Date(event.eventDate), 'MMM', { locale: ptBR }) : '---'}</span>
                      </div>
                   </div>
                   <div className="px-4 pb-8 space-y-4 flex flex-col flex-1">
                       <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-ink-4">
                         <div className="flex items-center gap-1.5">
                           {event.isOnline ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                           {event.isOnline ? 'Online' : event.location}
                         </div>
                         <div className="w-1 h-1 bg-paper-4 rounded-full"></div>
                         <div className="flex items-center gap-1.5">
                           <Clock className="w-3.5 h-3.5" /> {event.eventTime || 'Livre'}
                         </div>
                      </div>
                      <h3 className="text-2xl font-black text-ink font-display leading-tight group-hover:text-leaf transition-colors cursor-pointer flex-1">
                        {event.title}
                      </h3>
                      <div className="pt-4 flex items-center justify-between border-t border-paper-3 mt-auto">
                         <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                           event.status === 'upcoming' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                           event.status === 'ongoing' ? 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse' :
                           'bg-paper-3 text-ink-4 border border-paper-4'
                         }`}>
                           {event.status === 'upcoming' ? 'Inscrições Abertas' : event.status === 'ongoing' ? 'Acontecendo' : 'Encerrado'}
                         </span>
                         <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-leaf/5 hover:text-leaf">
                            <ArrowRight className="w-4 h-4" />
                         </Button>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Empty State */}
           {filteredEvents.length === 0 && (
             <div className="text-center py-32 bg-white rounded-[3.5rem] border border-paper-3 shadow-sm">
                <Calendar className="w-16 h-16 text-ink-4 mx-auto mb-6 opacity-20" />
                <h3 className="text-2xl font-black text-ink font-display mb-2">Nenhum evento encontrado.</h3>
                <p className="text-ink-4 font-medium mb-8 max-w-sm mx-auto">Em breve teremos novos workshops e hackathons programados. Fique atento!</p>
                <Button onClick={() => { setSearchTerm(''); setActiveFilter('Todos'); }} variant="outline" className="rounded-xl border-paper-3 font-black uppercase tracking-widest text-[11px]">Ver Todos os Eventos</Button>
             </div>
           )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-paper-3">
         <div className="container">
            <div className="bg-ink rounded-[4rem] p-12 lg:p-24 relative overflow-hidden text-center md:text-left shadow-2xl">
               {/* Abstract circles */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-leaf/10 rounded-full blur-[100px] -z-0"></div>
               
               <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                     <h2 className="text-4xl md:text-6xl font-black text-white font-display tracking-tight leading-[0.9] mb-6">
                        Traga seu projeto <span className="italic font-light text-white/40">para a rede</span>.
                     </h2>
                     <p className="text-xl text-white/50 font-medium mb-10 leading-relaxed">
                        Quer organizar um evento ou workshop em parceria com a Brasil Sustenta? Vamos construir juntos o futuro verde.
                     </p>
                     <Button className="h-16 px-10 rounded-2xl bg-white text-ink hover:bg-leaf hover:text-white font-black uppercase tracking-widest text-[11px] transition-all">
                        Seja um Parceiro
                     </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="aspect-square bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-3">
                        <span className="text-4xl font-black text-white">150+</span>
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] text-center">Eventos Realizados</span>
                     </div>
                     <div className="aspect-square bg-leaf/20 border border-leaf/30 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-3">
                        <span className="text-4xl font-black text-leaf-3">12k</span>
                        <span className="text-[10px] font-black text-leaf-3/40 uppercase tracking-[0.2em] text-center">Participantes</span>
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

export default Eventos;
