import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, Ban, CheckCircle, ArrowUpDown, ArrowUp, ArrowDown, Users, Building2, GraduationCap, School, ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmationModal from '@/components/ConfirmationModal';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<'name' | 'email' | 'createdAt' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: 'delete' | 'deactivate' | 'activate' | null;
    userId: number | null;
    userName: string;
  }>({ isOpen: false, action: null, userId: null, userName: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const { data, isLoading, refetch } = trpc.user.getAll.useQuery({ 
    search: searchTerm,
    userType: filterType as any
  });

  const users = data?.users || [];
  
  const statusMutation = trpc.user.updateStatus.useMutation({
    onSuccess: () => {
      toast.success('Status atualizado!');
      refetch();
    },
    onSettled: () => setIsProcessing(false)
  });

  const deleteMutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      toast.success('Usuário removido!');
      refetch();
    },
    onSettled: () => setIsProcessing(false)
  });

  const getTypeBadge = (type: string) => {
    const styles = {
      empresa: 'bg-leaf-5/30 text-leaf-1 border-leaf-3/20',
      jovem: 'bg-sky-5/30 text-sky-1 border-sky-2/20',
      universidade: 'bg-violet-5/30 text-violet-1 border-violet-2/20',
    };
    const labels = {
      empresa: 'Empresa',
      jovem: 'Talento',
      universidade: 'Instituição',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider border ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels] || type}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      pending: 'text-amber-600 bg-amber-50 border-amber-100',
      inactive: 'text-red-500 bg-red-50 border-red-100',
    };
    const labels = {
      active: 'Ativo',
      pending: 'Pendente',
      inactive: 'Bloqueado',
    };
    return (
      <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles]}`}>
        <div className={`w-1 h-1 rounded-full bg-current ${status === 'active' ? 'animate-pulse' : ''}`}></div>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = [...users];

    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        let aValue: any = a[sortColumn as keyof typeof a];
        let bValue: any = b[sortColumn as keyof typeof b];

        if (sortColumn === 'createdAt') {
           aValue = new Date(aValue).getTime();
           bValue = new Date(bValue).getTime();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, sortColumn, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const handleFilterChange = (newFilter: string) => {
    setFilterType(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSort = (column: 'name' | 'email' | 'createdAt') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDeleteClick = (userId: number, userName: string) => {
    setConfirmModal({ isOpen: true, action: 'delete', userId, userName });
  };

  const handleStatusClick = (userId: number, userName: string, currentStatus: string) => {
    setConfirmModal({
      isOpen: true,
      action: currentStatus === 'active' ? 'deactivate' : 'activate',
      userId,
      userName,
    });
  };

  const handleConfirmAction = async () => {
    if (!confirmModal.userId || !confirmModal.action) return;
    
    setIsProcessing(true);
    if (confirmModal.action === 'delete') {
      deleteMutation.mutate({ userId: confirmModal.userId });
    } else {
      statusMutation.mutate({ 
        userId: confirmModal.userId, 
        status: confirmModal.action === 'activate' ? 'active' : 'inactive' 
      });
    }
    setConfirmModal({ isOpen: false, action: null, userId: null, userName: '' });
  };

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* ── HEADER SECTION ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3 flex items-center gap-2">
               Gerenciamento de Identidades
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Base de <span className="italic font-light text-ink-4">Usuários</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Visualize, autorize e gerencie todos os perfis ativos no ecossistema Brasil Sustenta.
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in shadow-sm">
             <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                Adicionar Usuário
             </Button>
          </div>
        </div>

        {/* ── STATS CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-100">
           {[
            { icon: Users, label: 'Geral', val: users.length, color: 'text-ink-2' },
            { icon: Building2, label: 'Empresas', val: users.filter(u => u.userType === 'empresa').length, color: 'text-leaf-1' },
            { icon: GraduationCap, label: 'Talentos', val: users.filter(u => u.userType === 'jovem').length, color: 'text-sky-1' },
            { icon: School, label: 'Instituições', val: users.filter(u => u.userType === 'universidade').length, color: 'text-violet-2' },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-paper-3 p-6 rounded-2xl flex items-center gap-4 group hover:border-paper-4 transition-all">
               <div className="w-10 h-10 rounded-xl bg-paper-2 flex items-center justify-center">
                  <s.icon className={`w-5 h-5 ${s.color} group-hover:scale-110 transition-transform`} />
               </div>
               <div>
                  <p className="text-2xl font-black text-ink leading-tight">{s.val}</p>
                  <p className="text-[11px] font-black uppercase tracking-widest text-ink-4">{s.label}</p>
               </div>
            </div>
          ))}
        </div>

        {/* ── FILTERS & SEARCH ── */}
        <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col md:flex-row gap-2 animate-fade-in-up delay-200 shadow-sm">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
              <input 
                type="text" 
                placeholder="Pesquisar por nome ou e-mail corporativo..." 
                className="w-full h-12 pl-12 bg-white border border-paper-3 rounded-xl text-sm font-bold text-ink placeholder:text-ink-4 focus:ring-4 focus:ring-leaf-5 focus:border-leaf-3 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
           </div>
           <div className="flex bg-white border border-paper-3 rounded-xl p-1 gap-1">
              {['todos', 'empresa', 'jovem', 'universidade'].map((t) => (
                <button
                  key={t}
                  onClick={() => handleFilterChange(t)}
                  className={`px-4 h-10 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    filterType === t 
                    ? 'bg-ink text-white shadow-lg shadow-ink/20' 
                    : 'text-ink-4 hover:bg-paper-3 hover:text-ink'
                  }`}
                >
                  {t === 'todos' ? 'Todos' : t === 'jovem' ? 'Talentos' : t === 'universidade' ? 'Instituições' : 'Empresas'}
                </button>
              ))}
           </div>
        </div>

        {/* ── USERS TABLE ── */}
        <div className="bg-white border border-paper-3 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in-up delay-300">
           <div className="p-8 border-b border-paper-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-black text-ink tracking-tight">Diretório de Membros <span className="text-ink-4 font-normal text-sm ml-2">({filteredAndSortedUsers.length})</span></h3>
              <div className="flex items-center gap-2">
                 <span className="text-[11px] font-black text-ink-3 uppercase tracking-widest">Exibir:</span>
                 <select 
                   className="bg-paper-2 border border-paper-3 rounded-lg px-2 h-8 text-[11px] font-bold text-ink outline-none"
                   value={itemsPerPage}
                   onChange={(e) => setItemsPerPage(Number(e.target.value))}
                 >
                    {[5, 10, 20, 50].map(v => <option key={v} value={v}>{v}</option>)}
                 </select>
              </div>
           </div>

           <div className="overflow-x-auto overflow-y-hidden">
             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-paper-2 border-b border-paper-3">
                   <th className="group px-8 py-5 text-left cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-ink-4 group-hover:text-ink transition-colors">
                        Membro {sortColumn === 'name' ? (sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-leaf" /> : <ArrowDown className="w-3 h-3 text-leaf" />) : <ArrowUpDown className="w-3 h-3 opacity-20" />}
                      </div>
                   </th>
                   <th className="group px-8 py-5 text-left cursor-pointer" onClick={() => handleSort('email')}>
                      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-ink-4 group-hover:text-ink transition-colors">
                        E-mail {sortColumn === 'email' ? (sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-leaf" /> : <ArrowDown className="w-3 h-3 text-leaf" />) : <ArrowUpDown className="w-3 h-3 opacity-20" />}
                      </div>
                   </th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Perfil</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Ação</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Status</th>
                   <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-ink-4">Controles</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-paper-3">
                 {paginatedUsers.map((user: any) => (
                   <tr key={user.id} className="hover:bg-paper-2 transition-all group">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-9 h-9 rounded-full bg-paper-3 flex items-center justify-center font-black text-[11px] text-ink-2">
                              {user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '??'}
                           </div>
                           <p className="text-[14px] font-bold text-ink group-hover:text-leaf transition-colors">{user.name}</p>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <p className="text-[13px] font-medium text-ink-3">{user.email}</p>
                     </td>
                     <td className="px-8 py-6">
                        {getTypeBadge(user.userType)}
                     </td>
                     <td className="px-8 py-6">
                        <span className="text-[11px] font-bold text-ink-4">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}</span>
                     </td>
                     <td className="px-8 py-6">
                        {getStatusBadge(user.status)}
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             className="h-9 w-9 rounded-lg hover:bg-emerald-50 hover:text-emerald-500"
                             onClick={() => handleStatusClick(user.id, user.name, user.status)}
                             title="Alterar Status"
                           >
                              <CheckCircle className="w-4 h-4" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm">
                              <Edit className="w-4 h-4 text-ink-4" />
                           </Button>
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-500"
                             onClick={() => handleDeleteClick(user.id, user.name)}
                           >
                              <Trash2 className="w-4 h-4" />
                           </Button>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           {/* ── PAGINATION ── */}
           {totalPages > 1 && (
             <div className="px-8 py-6 bg-paper-2 border-t border-paper-3 flex items-center justify-between">
                <p className="text-xs font-bold text-ink-4">Exibindo {startIndex + 1}-{Math.min(endIndex, filteredAndSortedUsers.length)} de {filteredAndSortedUsers.length}</p>
                <div className="flex items-center gap-1">
                   <Button 
                     variant="outline" 
                     className="h-10 w-10 p-0 rounded-xl border-paper-3 bg-white"
                     disabled={currentPage === 1}
                     onClick={() => setCurrentPage(prev => prev - 1)}
                   >
                      <ChevronLeft className="w-4 h-4" />
                   </Button>
                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                     <Button 
                       key={p} 
                       variant={currentPage === p ? 'default' : 'ghost'} 
                       className={`h-10 w-10 text-xs font-black rounded-xl ${currentPage === p ? 'bg-ink text-white' : 'text-ink-4'}`}
                       onClick={() => setCurrentPage(p)}
                     >
                        {p}
                     </Button>
                   ))}
                   <Button 
                     variant="outline" 
                     className="h-10 w-10 p-0 rounded-xl border-paper-3 bg-white"
                     disabled={currentPage === totalPages}
                     onClick={() => setCurrentPage(prev => prev + 1)}
                   >
                      <ChevronRight className="w-4 h-4" />
                   </Button>
                </div>
             </div>
           )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={handleConfirmAction}
        isLoading={isProcessing}
        title={confirmModal.action === 'delete' ? 'Excluir Usuário' : 'Alterar Status'}
        description={`Tem certeza que deseja ${confirmModal.action === 'delete' ? 'excluir' : 'alterar o status de'} "${confirmModal.userName}"?`}
        confirmText="Confirmar"
        variant={confirmModal.action === 'delete' ? 'danger' : 'warning'}
      />
    </AdminLayout>
  );
};

export default Usuarios;
