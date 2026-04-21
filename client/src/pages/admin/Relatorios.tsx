// 2. client/src/pages/admin/Relatorios.tsx
import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Edit, Trash2, Download, BarChart3, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSkeleton, EmptyState } from '@/components/ds';

const AdminRelatorios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    reportType: 'esg' as 'esg' | 'impact' | 'ods' | 'annual' | 'sustainability',
    year: new Date().getFullYear(),
    period: '',
    fileUrl: '',
    status: 'draft' as 'draft' | 'published',
    territoryNodeId: null as number | null
  });

  const { data: territories } = trpc.territory.admin.list.useQuery();

  const { data: reportsData, isLoading, refetch } = trpc.report.getAll.useQuery({ limit: 50 });

  const createMutation = trpc.report.create.useMutation({
    onSuccess: () => {
      toast.success("Relatório criado com sucesso");
      setIsModalOpen(false);
      resetForm();
      refetch();
    }
  });

  const updateMutation = trpc.report.update.useMutation({
    onSuccess: () => {
      toast.success("Relatório atualizado com sucesso");
      setIsModalOpen(false);
      resetForm();
      refetch();
    }
  });

  const deleteMutation = trpc.report.delete.useMutation({
    onSuccess: () => { toast.success("Excluído"); refetch(); }
  });

  const resetForm = () => {
    setEditingReport(null);
    setFormData({
      title: '', slug: '', summary: '', reportType: 'esg',
      year: new Date().getFullYear(), period: '', fileUrl: '',
      status: 'draft', territoryNodeId: null
    });
  };

  const handleEdit = (rpt: any) => {
    setEditingReport(rpt);
    setFormData({
      title: rpt.title, slug: rpt.slug, summary: rpt.summary || '',
      reportType: rpt.reportType, year: rpt.year || new Date().getFullYear(),
      period: rpt.period || '', fileUrl: rpt.fileUrl || '',
      status: rpt.status, territoryNodeId: rpt.territoryNodeId
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReport) updateMutation.mutate({ id: editingReport.id, ...formData } as any);
    else createMutation.mutate(formData as any);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <LoadingSkeleton variant="table" lines={6} className="p-8" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-ink font-display">Relatórios <span className="text-ink-4">Mensuráveis</span></h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild><Button className="bg-ink text-white font-black uppercase text-xs tracking-widest h-12 px-6 rounded-xl"><Plus className="mr-2 h-4 w-4" /> Novo Relatório</Button></DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border-paper-3 rounded-3xl p-8">
              <DialogHeader><DialogTitle>{editingReport ? 'Editar' : 'Novo'} Relatório</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Título</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="rounded-xl" /></div>
                  <div className="space-y-2"><Label>Hub Regional</Label>
                    <Select value={formData.territoryNodeId?.toString() || "null"} onValueChange={(v) => setFormData({ ...formData, territoryNodeId: v === "null" ? null : parseInt(v) })}>
                      <SelectTrigger className="rounded-xl h-11 border-paper-3 shadow-sm bg-white hover:bg-paper-2 transition-colors"><SelectValue placeholder="Selecione um território..." /></SelectTrigger>
                      <SelectContent className="bg-white border-paper-3 shadow-xl">
                        <SelectItem value="null">🌐 Global</SelectItem>
                        {territories?.map((t: NonNullable<typeof territories>[number]) => (
                           <SelectItem key={t.id} value={t.id.toString()}>📍 {t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-6"><Button type="submit" className="bg-leaf text-white font-black rounded-xl h-12 px-8">Salvar Relatório</Button></div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white border border-paper-3 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-paper-2"><tr><th className="px-8 py-4 text-left text-[11px] font-black uppercase text-ink-4">Relatório / Hub</th><th className="px-8 py-4 text-right text-[11px] font-black uppercase text-ink-4">Ações</th></tr></thead>
            <tbody className="divide-y divide-paper-3">
              {(!reportsData || reportsData.length === 0) ? (
                <tr>
                  <td colSpan={2} className="px-8 py-16">
                    <EmptyState
                      title="Nenhum relatório encontrado"
                      description="Nenhum relatório foi cadastrado ainda."
                    />
                  </td>
                </tr>
              ) : (
                reportsData.map(rpt => {
                  const terrName = territories?.find((t: NonNullable<typeof territories>[number]) => t.id === rpt.territoryNodeId)?.name || 'Global';
                  return (
                  <tr key={rpt.id} className="hover:bg-paper-2">
                    <td className="px-8 py-4"><p className="font-bold text-ink">{rpt.title}</p><span className="text-[10px] bg-paper-3 px-1.5 py-0.5 rounded text-leaf font-black uppercase">📍 {terrName}</span></td>
                    <td className="px-8 py-4 text-right"><Button variant="ghost" onClick={() => { setEditingReport(rpt); setFormData({ title: rpt.title, slug: rpt.slug, summary: rpt.summary || '', reportType: rpt.reportType as any, year: rpt.year || 2024, period: rpt.period || '', fileUrl: rpt.fileUrl || '', status: rpt.status as any, territoryNodeId: rpt.territoryNodeId }); setIsModalOpen(true); }}><Edit className="h-4 w-4" /></Button></td></tr>
                )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRelatorios;
