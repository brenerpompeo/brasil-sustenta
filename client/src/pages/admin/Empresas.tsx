import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Building2, Globe, FileText, CheckCircle, Ban, Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, ExternalLink, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

const AdminEmpresas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSize, setFilterSize] = useState('todos');
  const [sortColumn, setSortColumn] = useState<'name' | 'projects' | 'status' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { data, isLoading } = trpc.company.getAll.useQuery({ limit: 50 });

  const empresas = useMemo(() => {
    return (data?.companies || []).map(c => ({
      id: c.id,
      name: c.companyName,
      cnpj: c.cnpj || '—',
      size: c.size || 'media',
      status: 'active',
      projects: c.projectCount,
      website: c.website || '',
    }));
  }, [data]);

  const getSizeBadge = (size: string) => {
    const labels = { pequena: 'Pequena', media: 'Média', grande: 'Grande' };
    return (
      <span className="px-2 py-0.5 rounded bg-paper-3 text-ink-3 text-[11px] font-black uppercase tracking-widest border border-paper-4">
        {labels[size as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'text-leaf-1 bg-leaf-5/30 border-leaf-3/20',
      pending: 'text-amber-600 bg-amber-50 border-amber-100',
      inactive: 'text-red-500 bg-red-50 border-red-100',
    };
    const labels = { active: 'Homologada', pending: 'Em Análise', inactive: 'Bloqueada' };
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles]}`}>
        <div className={`w-1 h-1 rounded-full bg-current ${status === 'active' ? 'animate-pulse' : ''}`}></div>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredEmpresas = useMemo(() => {
    return empresas.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           emp.cnpj.includes(searchTerm);
      const matchesFilter = filterSize === 'todos' || emp.size === filterSize;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterSize]);

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3 flex items-center gap-2">
               Rede de Parceiros Corporativos
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Gestão de <span className="italic font-light text-ink-4">Empresas</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Consolide parcerias, valide credenciais fiscais e monitore a entrega de projetos ESG.
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in">
             <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                Nova Empresa
             </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col md:flex-row gap-2 animate-fade-in-up delay-100 shadow-sm">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
              <input 
                type="text" 
                placeholder="Buscar por Nome ou CNPJ..." 
                className="w-full h-12 pl-12 bg-white border border-paper-3 rounded-xl text-sm font-bold text-ink placeholder:text-ink-4 focus:ring-4 focus:ring-leaf-5 focus:border-leaf-3 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex bg-white border border-paper-3 rounded-xl p-1 gap-1">
              {['todos', 'pequena', 'media', 'grande'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterSize(s)}
                  className={`px-4 h-10 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    filterSize === s 
                    ? 'bg-ink text-white shadow-lg shadow-ink/20' 
                    : 'text-ink-4 hover:bg-paper-3 hover:text-ink'
                  }`}
                >
                  {s === 'todos' ? 'Portes' : s}
                </button>
              ))}
           </div>
        </div>

        {/* Directory Table */}
        <div className="bg-white border border-paper-3 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in-up delay-200">
           <div className="p-8 border-b border-paper-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-black text-ink tracking-tight">Portfólio de Organizações <span className="text-ink-4 font-normal text-sm ml-2">({filteredEmpresas.length})</span></h3>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-paper-2 border-b border-paper-3">
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Empresa / CNPJ</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Porte</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Projetos</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Website</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Status</th>
                   <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-ink-4">Ações</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-paper-3">
                 {filteredEmpresas.map((emp) => (
                   <tr key={emp.id} className="hover:bg-paper-2 transition-all group">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-leaf/5 flex items-center justify-center text-leaf shadow-sm border border-leaf/10">
                              <Building2 className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-[14px] font-bold text-ink group-hover:text-leaf transition-colors leading-tight">{emp.name}</p>
                              <p className="text-[11px] font-black text-ink-4 tracking-tighter mt-1">{emp.cnpj}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        {getSizeBadge(emp.size)}
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-black text-ink">{emp.projects}</span>
                           <div className="w-16 h-1.5 bg-paper-3 rounded-full overflow-hidden">
                              <div className="h-full bg-leaf-1" style={{ width: `${Math.min(emp.projects * 10, 100)}%` }}></div>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <a href={`https://${emp.website}`} target="_blank" className="flex items-center gap-2 text-[11px] font-black text-sky hover:underline">
                           {emp.website}
                           <ExternalLink className="w-3 h-3" />
                        </a>
                     </td>
                     <td className="px-8 py-6">
                        {getStatusBadge(emp.status)}
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm" title="Validar Credenciais">
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm">
                              <Edit className="w-4 h-4 text-ink-4" />
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

export default AdminEmpresas;
