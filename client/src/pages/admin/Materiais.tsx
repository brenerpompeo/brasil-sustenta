// 3. client/src/pages/admin/Materiais.tsx
import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Video, Download, Edit, Trash2, ExternalLink, GraduationCap, Plus, Loader2 } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminMateriais = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', 
    slug: '',
    description: '', 
    materialType: 'video' as 'video' | 'ebook' | 'infographic' | 'podcast' | 'webinar' | 'toolkit',
    fileUrl: '', 
    externalUrl: '', 
    status: 'published' as 'draft' | 'published', 
    hub: 'Global' as 'Global' | 'São Paulo (Estado)' | 'Rio de Janeiro (Estado)' | 'Campinas (Região)'
  });

  const generateSlug = (text: string) => {
    return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const { data: materialsData, refetch } = trpc.material.getAll.useQuery({ limit: 50 });
  const createMutation = trpc.material.create.useMutation({ onSuccess: () => { toast.success("Pronto"); setIsModalOpen(false); resetForm(); refetch(); } });
  const updateMutation = trpc.material.update.useMutation({ onSuccess: () => { toast.success("Atualizado"); setIsModalOpen(false); resetForm(); refetch(); } });

  const resetForm = () => {
    setEditingMaterial(null);
    setFormData({ title: '', slug: '', description: '', materialType: 'video', fileUrl: '', externalUrl: '', status: 'published', hub: 'Global' });
  };

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-ink font-display">Materiais de <span className="text-ink-4">Apoio</span></h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild><Button className="bg-ink text-white font-black uppercase text-xs h-12 px-6 rounded-xl"><Plus className="mr-2" /> Novo Material</Button></DialogTrigger>
            <DialogContent className="max-w-2xl bg-white rounded-3xl p-8 border-paper-3">
              <DialogHeader><DialogTitle>Material de Apoio</DialogTitle></DialogHeader>
              <form onSubmit={e => { e.preventDefault(); editingMaterial ? updateMutation.mutate({ id: editingMaterial.id, ...formData }) : createMutation.mutate(formData); }} className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Título</Label>
                    <Input 
                      value={formData.title} 
                      onChange={e => setFormData({ 
                        ...formData, 
                        title: e.target.value, 
                        slug: editingMaterial ? formData.slug : generateSlug(e.target.value) 
                      })} 
                      placeholder="Título do Material" 
                      required 
                      className="rounded-xl border-paper-3 h-11" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Slug (URL)</Label>
                    <Input 
                      value={formData.slug} 
                      onChange={e => setFormData({ ...formData, slug: generateSlug(e.target.value) })} 
                      placeholder="slug-do-material" 
                      required 
                      className="rounded-xl border-paper-3 h-11" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Hub Regional</Label>
                    <Select value={formData.hub} onValueChange={(v: 'Global' | 'São Paulo (Estado)' | 'Rio de Janeiro (Estado)' | 'Campinas (Região)') => setFormData({ ...formData, hub: v })}>
                      <SelectTrigger className="h-11 rounded-xl border-paper-3"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-white border-paper-3">
                        <SelectItem value="Global">🌐 Global</SelectItem>
                        <SelectItem value="Campinas (Região)">📍 HUB Campinas</SelectItem>
                        <SelectItem value="São Paulo (Estado)">📍 HUB São Paulo</SelectItem>
                        <SelectItem value="Rio de Janeiro (Estado)">📍 HUB Rio de Janeiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Tipo de Material</Label>
                    <Select value={formData.materialType} onValueChange={(v: any) => setFormData({ ...formData, materialType: v })}>
                      <SelectTrigger className="h-11 rounded-xl border-paper-3"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-white border-paper-3">
                        <SelectItem value="video">Vídeo</SelectItem>
                        <SelectItem value="ebook">E-book</SelectItem>
                        <SelectItem value="infographic">Infográfico</SelectItem>
                        <SelectItem value="podcast">Podcast</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="toolkit">Toolkit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">URL Externa / Arquivo</Label>
                  <Input value={formData.externalUrl || formData.fileUrl} onChange={e => setFormData({ ...formData, externalUrl: e.target.value })} placeholder="Link do YouTube ou PDF" className="rounded-xl border-paper-3 h-11" />
                </div>

                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="w-full bg-leaf hover:bg-leaf-2 text-white font-black rounded-xl h-12 shadow-lg shadow-leaf/20">
                  {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salvar Material'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white border border-paper-3 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full"><thead className="bg-paper-2"><tr><th className="px-8 py-4 text-left text-[11px] font-black uppercase text-ink-4">Material / Hub</th><th className="px-8 py-4 text-right text-[11px] font-black uppercase text-ink-4">Ações</th></tr></thead>
            <tbody className="divide-y divide-paper-3">
              {(materialsData || []).map(mat => (
                <tr key={mat.id} className="hover:bg-paper-2"><td className="px-8 py-4"><p className="font-bold text-ink">{mat.title}</p><span className="text-[10px] bg-paper-3 px-1.5 py-0.5 rounded text-leaf font-black">HUB {mat.hub || 'Global'}</span></td><td className="px-8 py-4 text-right"><Button variant="ghost" onClick={() => { setEditingMaterial(mat); setFormData({ title: mat.title, slug: mat.slug, description: mat.description || '', materialType: mat.materialType as any, fileUrl: mat.fileUrl || '', externalUrl: mat.externalUrl || '', status: mat.status as any, hub: (mat.hub || 'Global') as any }); setIsModalOpen(true); }}><Edit className="h-4 w-4" /></Button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMateriais;