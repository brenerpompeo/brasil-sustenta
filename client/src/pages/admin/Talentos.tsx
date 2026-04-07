import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, GraduationCap, School, MapPin, Award, CheckCircle, Ban, Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, FileUser, Star } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

const AdminTalentos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('todos');

  const { data, isLoading } = trpc.talent.getAll.useQuery({ limit: 50 });

  const talentos = useMemo(() => {
    return (data?.talents || []).map(t => ({
      id: t.id,
      name: t.fullName,
      course: t.course || 'Não informado',
      school: '—',
      progress: t.skills?.length ? Math.min(100, (t.skills.length * 15) + (t.semester ? t.semester * 5 : 0)) : 10,
      status: t.isAvailable ? 'active' : 'inactive',
      email: '',
      city: '',
      applicationCount: t.applicationCount,
    }));
  }, [data]);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'text-sky-1 bg-sky-5/30 border-sky-2/20',
      pending: 'text-amber-600 bg-amber-50 border-amber-100',
      inactive: 'text-red-500 bg-red-50 border-red-100',
    };
    const labels = { active: 'Perfil Ativo', pending: 'Aguardando Validação', inactive: 'Suspenso' };
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles]}`}>
        <div className={`w-1 h-1 rounded-full bg-current ${status === 'active' ? 'animate-pulse' : ''}`}></div>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const filteredTalentos = useMemo(() => {
    return talentos.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           t.school.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterCourse === 'todos' || t.course === filterCourse;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterCourse]);

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3 flex items-center gap-2">
               Central de Talentos Brasil Sustenta
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Gestão de <span className="italic font-light text-ink-4">Talentos</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Monitore o desenvolvimento dos jovens, valide competências e acompanhe o engajamento na plataforma.
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in shadow-sm">
             <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                Lançar Oportunidade
             </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col md:flex-row gap-2 animate-fade-in-up delay-100 shadow-sm">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
              <input 
                type="text" 
                placeholder="Nome, Instituição ou Cidade..." 
                className="w-full h-12 pl-12 bg-white border border-paper-3 rounded-xl text-sm font-bold text-ink placeholder:text-ink-4 focus:ring-4 focus:ring-leaf-5 focus:border-leaf-3 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex bg-white border border-paper-3 rounded-xl p-1 gap-1">
              {['todos', 'Design', 'Engenharia', 'Marketing', 'TI'].map((c) => (
                <button
                  key={c}
                  onClick={() => setFilterCourse(c)}
                  className={`px-4 h-10 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    filterCourse === c 
                    ? 'bg-ink text-white shadow-lg shadow-ink/20' 
                    : 'text-ink-4 hover:bg-paper-3 hover:text-ink'
                  }`}
                >
                  {c === 'todos' ? 'Cursos' : c}
                </button>
              ))}
           </div>
        </div>

        {/* Talent Directory */}
        <div className="bg-white border border-paper-3 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in-up delay-200">
           <div className="p-8 border-b border-paper-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-black text-ink tracking-tight">Base de Dados <span className="text-ink-4 font-normal text-sm ml-2">({filteredTalentos.length})</span></h3>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-paper-2 border-b border-paper-3">
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Membro / Localidade</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Instituição</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Perfil %</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Curso</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Status</th>
                   <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-ink-4">Controles</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-paper-3">
                 {filteredTalentos.map((t) => (
                   <tr key={t.id} className="hover:bg-paper-2 transition-all group">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-sky/5 flex items-center justify-center text-sky shadow-sm border border-sky/10">
                              <FileUser className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-[14px] font-bold text-ink group-hover:text-sky transition-colors leading-tight">{t.name}</p>
                              <div className="flex items-center gap-1 mt-1">
                                 <MapPin className="w-2.5 h-2.5 text-ink-4" />
                                 <span className="text-[11px] font-black text-ink-4 uppercase tracking-tighter">{t.city}</span>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           <School className="w-3.5 h-3.5 text-ink-4" />
                           <span className="text-[11px] font-bold text-ink-3">{t.school}</span>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <span className={`text-[11px] font-black ${t.progress === 100 ? 'text-emerald-500' : 'text-ink'}`}>{t.progress}%</span>
                           <div className="w-20 h-1.5 bg-paper-3 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-1000 ease-out ${t.progress === 100 ? 'bg-emerald-400' : 'bg-sky-1'}`} style={{ width: `${t.progress}%` }}></div>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className="px-2.5 py-0.5 rounded-md bg-paper-3 text-ink-2 text-[11px] font-black uppercase tracking-widest border border-paper-4">
                           {t.course}
                        </span>
                     </td>
                     <td className="px-8 py-6">
                        {getStatusBadge(t.status)}
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm" title="Premiar Talento">
                              <Star className="w-4 h-4 text-amber-500" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm">
                              <Eye className="w-4 h-4 text-ink-4" />
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
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

export default AdminTalentos;
