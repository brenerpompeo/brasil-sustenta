import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Briefcase, UserCheck, MessageSquare, CheckCircle, Ban, Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, LayoutGrid, Layers, Flag } from 'lucide-react';
import { toast } from 'sonner';

const AdminSquads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPhase, setFilterPhase] = useState('todos');

  const squads = [
    { id: 1, name: 'Squad Eco-Tech', project: 'Reciclagem Inteligente', lead: 'SmartCity', members: 4, phase: 'Desenvolvimento', health: 'Bom', launchDate: '20 Out 2025' },
    { id: 2, name: 'Squad Inclusão Digital', project: 'Website Acessível', lead: 'Inclusiva Tech', members: 3, phase: 'UI/UX', health: 'Alerta', launchDate: '15 Nov 2025' },
    { id: 3, name: 'Squad ESG Global', project: 'Sustentabilidade Corp.', lead: 'Tech Solutions', members: 5, phase: 'Estratégia', health: 'Crítico', launchDate: '30 Out 2025' },
    { id: 4, name: 'Squad Green Marketing', project: 'Campanha Verde', lead: 'EcoMark', members: 4, phase: 'Lançamento', health: 'Bom', launchDate: '10 Out 2025' },
  ];

  const getHealthBadge = (health: string) => {
    const styles = {
      Bom: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      Alerta: 'text-amber-600 bg-amber-50 border-amber-100',
      Crítico: 'text-red-600 bg-red-50 border-red-100',
    };
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[health as keyof typeof styles]}`}>
        <div className={`w-1 h-1 rounded-full bg-current ${health === 'Crítico' ? 'animate-pulse' : ''}`}></div>
        {health}
      </span>
    );
  };

  const filteredSquads = useMemo(() => {
    return squads.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           s.project.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPhase = filterPhase === 'todos' || s.phase === filterPhase;
      return matchesSearch && matchesPhase;
    });
  }, [searchTerm, filterPhase]);

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3 flex items-center gap-2">
               Orquestração de Times Multidisciplinares
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Gestão de <span className="italic font-light text-ink-4">Squads</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Monitore a saúde dos times, valide alocações de talentos e acompanhe as fases de entrega de cada squad ativo.
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in shadow-sm">
             <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                Formar Novo Squad
             </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col md:flex-row gap-2 animate-fade-in-up delay-100 shadow-sm">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
              <input 
                type="text" 
                placeholder="Buscar por Squad, Projeto ou Empresa..." 
                className="w-full h-12 pl-12 bg-white border border-paper-3 rounded-xl text-sm font-bold text-ink placeholder:text-ink-4 focus:ring-4 focus:ring-leaf-5 focus:border-leaf-3 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex bg-white border border-paper-3 rounded-xl p-1 gap-1">
              {['todos', 'Estratégia', 'UI/UX', 'Desenvolvimento', 'Lançamento'].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPhase(p)}
                  className={`px-4 h-10 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    filterPhase === p 
                    ? 'bg-ink text-white shadow-lg shadow-ink/20' 
                    : 'text-ink-4 hover:bg-paper-3 hover:text-ink'
                  }`}
                >
                  {p === 'todos' ? 'Fase' : p}
                </button>
              ))}
           </div>
        </div>

        {/* Squads Directory */}
        <div className="bg-white border border-paper-3 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in-up delay-200">
           <div className="p-8 border-b border-paper-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-black text-ink tracking-tight">Linha de Frente <span className="text-ink-4 font-normal text-sm ml-2">({filteredSquads.length})</span></h3>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-paper-2 border-b border-paper-3">
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Squad / Projeto</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Mentoria Lead</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Membros</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Fase de Entrega</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Saúde do Time</th>
                   <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-ink-4">Ações</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-paper-3">
                 {filteredSquads.map((s) => (
                   <tr key={s.id} className="hover:bg-paper-2 transition-all group">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-ink/5 flex items-center justify-center text-ink shadow-sm border border-ink/10">
                              <LayoutGrid className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-[14px] font-bold text-ink group-hover:text-leaf transition-colors leading-tight">{s.name}</p>
                              <div className="flex items-center gap-1 mt-1">
                                 <Briefcase className="w-3 h-3 text-ink-4" />
                                 <span className="text-[11px] font-black text-ink-4 uppercase tracking-widest">{s.project}</span>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           <UserCheck className="w-4 h-4 text-leaf-1" />
                           <span className="text-[11px] font-bold text-ink-3">{s.lead}</span>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-1.5 font-black text-ink text-sm">
                           {s.members}
                           <Users className="w-3.5 h-3.5 text-ink-4" />
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className="px-2.5 py-0.5 rounded-md bg-paper-3 text-ink-3 text-[11px] font-black uppercase tracking-widest border border-paper-4">
                           {s.phase}
                        </span>
                     </td>
                     <td className="px-8 py-6">
                        {getHealthBadge(s.health)}
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm" title="Mensagem Direta">
                              <MessageSquare className="w-4 h-4 text-sky" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm" title="Próxima Entrega">
                              <Flag className="w-4 h-4 text-amber-500" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm">
                              <Eye className="w-4 h-4 text-ink-4" />
                           </Button>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSquads;
