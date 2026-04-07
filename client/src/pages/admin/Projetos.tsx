import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Briefcase, Globe, FileText, CheckCircle, Ban, Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, ExternalLink, ShieldCheck, Target, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

const AdminProjetos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const { data, isLoading, refetch } = trpc.project.getAll.useQuery({ limit: 50, status: filterStatus !== 'todos' ? filterStatus : undefined });
  const approveMutation = trpc.project.approve.useMutation({
    onSuccess: () => { toast.success("Projeto aprovado!"); refetch(); }
  });

  const projects = useMemo(() => {
    return (data?.projects || []).map(p => ({
      id: p.id,
      title: p.title,
      company: p.companyName,
      status: p.status,
      ods: p.category?.replace('_', ' ').toUpperCase() || '—',
      applicants: p.applicantCount,
      budget: p.budget ? `R$ ${(p.budget / 100).toLocaleString('pt-BR')}` : 'Voluntário',
      deadline: p.endDate ? new Date(p.endDate).toLocaleDateString('pt-BR') : '—',
    }));
  }, [data]);

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'text-leaf-1 bg-leaf-5/30 border-leaf-3/20',
      in_progress: 'text-sky-1 bg-sky-5/30 border-sky-2/20',
      completed: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      cancelled: 'text-red-500 bg-red-50 border-red-100',
    };
    const labels = {
      open: 'Aberto para Inscrições',
      in_progress: 'Em Execução (Squad)',
      completed: 'Impacto Entregue',
      cancelled: 'Cancelado',
    };
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles]}`}>
        <div className={`w-1 h-1 rounded-full bg-current ${status === 'in_progress' ? 'animate-pulse' : ''}`}></div>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'todos' || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3 flex items-center gap-2">
               Curadoria de Projetos de Impacto
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Gestão de <span className="italic font-light text-ink-4">Projetos</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Monitore o ciclo de vida dos projetos ESG, valide propostas de empresas e acompanhe as métricas de ODS da rede.
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in">
             <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                Lançar Campanha ODS
             </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col md:flex-row gap-2 animate-fade-in-up delay-100 shadow-sm">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
              <input 
                type="text" 
                placeholder="Buscar por Título, Empresa ou ODS..." 
                className="w-full h-12 pl-12 bg-white border border-paper-3 rounded-xl text-sm font-bold text-ink placeholder:text-ink-4 focus:ring-4 focus:ring-leaf-5 focus:border-leaf-3 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex bg-white border border-paper-3 rounded-xl p-1 gap-1">
              {['todos', 'open', 'in_progress', 'completed'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 h-10 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    filterStatus === s 
                    ? 'bg-ink text-white shadow-lg shadow-ink/20' 
                    : 'text-ink-4 hover:bg-paper-3 hover:text-ink'
                  }`}
                >
                  {s === 'todos' ? 'Status' : s === 'open' ? 'Abertos' : s === 'in_progress' ? 'Em Curso' : 'Entregues'}
                </button>
              ))}
           </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white border border-paper-3 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in-up delay-200">
           <div className="p-8 border-b border-paper-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-black text-ink tracking-tight">Oportunidades de Impacto <span className="text-ink-4 font-normal text-sm ml-2">({filteredProjects.length})</span></h3>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-paper-2 border-b border-paper-3">
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Projeto / Organização</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">ODS Alvo</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Envolvimento</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Prazo Final</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Status Atual</th>
                   <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-ink-4">Comandos</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-paper-3">
                 {filteredProjects.map((p) => (
                   <tr key={p.id} className="hover:bg-paper-2 transition-all group">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-paper-3 flex items-center justify-center text-ink shadow-sm border border-paper-4/50">
                              <Briefcase className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-[14px] font-bold text-ink group-hover:text-leaf transition-colors leading-tight">{p.title}</p>
                              <p className="text-[11px] font-black text-ink-4 uppercase tracking-widest mt-1">{p.company}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-paper-3 text-leaf-1 text-[11px] font-black uppercase tracking-widest border border-paper-4">
                           <Target className="w-3 h-3" />
                           ODS {p.ods}
                        </span>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           <Users className="w-3.5 h-3.5 text-ink-4" />
                           <span className="text-sm font-black text-ink">{p.applicants} <span className="text-[11px] text-ink-4 font-bold uppercase tracking-widest ml-1">Inscritos</span></span>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-ink-3">
                           <Clock className="w-3.5 h-3.5 text-ink-4" />
                           {p.deadline}
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        {getStatusBadge(p.status)}
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm" title="Analisar Squad">
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm">
                              <Eye className="w-4 h-4 text-ink-4" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
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

export default AdminProjetos;
