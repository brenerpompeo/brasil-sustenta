import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, School, GraduationCap, MapPin, CheckCircle, Ban, Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, FileText, Globe, Key } from 'lucide-react';
import { toast } from 'sonner';

const AdminUniversidades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');

  const universidades = [
    { id: 1, name: 'USP - Universidade de São Paulo', type: 'Publica', students: 1240, status: 'active', region: 'Sudeste', agreement: 'Válido até 2026' },
    { id: 2, name: 'UFMG - Federal de Minas', type: 'Publica', students: 856, status: 'active', region: 'Sudeste', agreement: 'Válido até 2025' },
    { id: 3, name: 'PUC - Pontifícia Univ. Católica', type: 'Privada', students: 430, status: 'pending', region: 'Sudeste', agreement: 'Em renovação' },
    { id: 4, name: 'UFRJ - Federal do Rio', type: 'Publica', students: 920, status: 'inactive', region: 'Sudeste', agreement: 'Expirado' },
    { id: 5, name: 'Mackenzie', type: 'Privada', students: 310, status: 'active', region: 'Sudeste', agreement: 'Válido até 2027' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'text-violet-1 bg-violet-5/30 border-violet-2/20',
      pending: 'text-amber-600 bg-amber-50 border-amber-100',
      inactive: 'text-red-500 bg-red-50 border-red-100',
    };
    const labels = { active: 'Convênio Ativo', pending: 'Em Processamento', inactive: 'Acesso Restrito' };
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles]}`}>
        <div className={`w-1 h-1 rounded-full bg-current ${status === 'active' ? 'animate-pulse' : ''}`}></div>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredUniversidades = useMemo(() => {
    return universidades.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'todos' || u.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3 flex items-center gap-2">
               Portal de Alianças Acadêmicas
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Gestão de <span className="italic font-light text-ink-4">Universidades</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Gerencie convênios institucionais, valide acessos acadêmicos e analise o fluxo de talentos por campus.
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in">
             <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                Novo Convênio
             </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col md:flex-row gap-2 animate-fade-in-up delay-100 shadow-sm">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
              <input 
                type="text" 
                placeholder="Buscar Instituição ou Região..." 
                className="w-full h-12 pl-12 bg-white border border-paper-3 rounded-xl text-sm font-bold text-ink placeholder:text-ink-4 focus:ring-4 focus:ring-leaf-5 focus:border-leaf-3 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex bg-white border border-paper-3 rounded-xl p-1 gap-1">
              {['todos', 'Publica', 'Privada'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-4 h-10 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    filterType === t 
                    ? 'bg-ink text-white shadow-lg shadow-ink/20' 
                    : 'text-ink-4 hover:bg-paper-3 hover:text-ink'
                  }`}
                >
                  {t === 'todos' ? 'Natureza' : t === 'Publica' ? 'Pública' : 'Privada'}
                </button>
              ))}
           </div>
        </div>

        {/* Directory Table */}
        <div className="bg-white border border-paper-3 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in-up delay-200">
           <div className="p-8 border-b border-paper-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-black text-ink tracking-tight">Rede de Instituições <span className="text-ink-4 font-normal text-sm ml-2">({filteredUniversidades.length})</span></h3>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-paper-2 border-b border-paper-3">
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Instituição / Região</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Natureza</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Alunos Vinculados</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Validade Convênio</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Status</th>
                   <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-ink-4">Comandos</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-paper-3">
                 {filteredUniversidades.map((univ) => (
                   <tr key={univ.id} className="hover:bg-paper-2 transition-all group">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-violet/5 flex items-center justify-center text-violet shadow-sm border border-violet/10">
                              <School className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-[14px] font-bold text-ink group-hover:text-violet transition-colors leading-tight">{univ.name}</p>
                              <div className="flex items-center gap-1 mt-1">
                                 <MapPin className="w-2.5 h-2.5 text-ink-4" />
                                 <span className="text-[11px] font-black text-ink-4 uppercase tracking-widest">{univ.region}</span>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className="px-2.5 py-0.5 rounded-md bg-paper-3 text-ink-3 text-[11px] font-black uppercase tracking-widest border border-paper-4">
                           {univ.type}
                        </span>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-baseline gap-1.5">
                           <span className="text-sm font-black text-ink">{univ.students.toLocaleString()}</span>
                           <span className="text-[11px] font-black text-ink-4 uppercase tracking-widest">Inscritos</span>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-ink-3">
                           <FileText className="w-3.5 h-3.5 text-ink-4" />
                           {univ.agreement}
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        {getStatusBadge(univ.status)}
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm" title="Gerar Token de Acesso">
                              <Key className="w-4 h-4 text-violet-2" />
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

export default AdminUniversidades;
