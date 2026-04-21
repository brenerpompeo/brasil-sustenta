// 1. client/src/pages/admin/Artigos.tsx
import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Eye, Edit, Trash2, GraduationCap, Link as LinkIcon, BookOpen, Plus, Loader2 } from 'lucide-react';
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
import { LoadingSkeleton } from '@/components/ds';

const AdminArtigos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<{ id: number; title: string; slug: string; abstract: string | null; content: string | null; articleType: string | null; status: 'draft' | 'published'; territoryNodeId: number | null } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    abstract: '',
    content: '',
    articleType: 'academic' as 'academic' | 'opinion' | 'case_study' | 'whitepaper',
    status: 'draft' as 'draft' | 'published',
    territoryNodeId: null as number | null
  });

  const { data: territories } = trpc.territory.admin.list.useQuery();

  const { data: articlesData, isLoading, refetch } = trpc.article.getAll.useQuery({ limit: 50 });

  const createMutation = trpc.article.create.useMutation({
    onSuccess: () => {
      toast.success("Artigo criado com sucesso");
      setIsModalOpen(false);
      resetForm();
      refetch();
    }
  });

  const updateMutation = trpc.article.update.useMutation({
    onSuccess: () => {
      toast.success("Artigo atualizado com sucesso");
      setIsModalOpen(false);
      resetForm();
      refetch();
    }
  });

  const deleteMutation = trpc.article.delete.useMutation({
    onSuccess: () => {
      toast.success("Artigo excluído com sucesso");
      refetch();
    }
  });

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      abstract: '',
      content: '',
      articleType: 'academic',
      status: 'draft',
      territoryNodeId: null
    });
  };

  const handleEdit = (art: Exclude<typeof articlesData, undefined>[number]) => {
    setEditingPost({
      id: art.id,
      title: art.title,
      slug: art.slug,
      abstract: art.abstract,
      content: art.content,
      articleType: art.articleType as any,
      status: art.status as any,
      territoryNodeId: art.territoryNodeId
    });
    setFormData({
      title: art.title,
      slug: art.slug,
      abstract: art.abstract || '',
      content: art.content || '',
      articleType: (art.articleType || 'academic') as any,
      status: art.status as any,
      territoryNodeId: art.territoryNodeId
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, ...formData } as any);
    } else {
      createMutation.mutate(formData as any);
    }
  };

  const filteredArticles = useMemo(() => {
    return (articlesData || []).filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articlesData, searchTerm]);

  if (isLoading) return <LoadingSkeleton variant="table" lines={5} className="p-8" />;

  const getTerritoryName = (id: number | null) => {
    if (!id) return 'Global';
    return territories?.find((t: NonNullable<typeof territories>[number]) => t.id === id)?.name || 'Desconhecido';
  };

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-ink font-display">Artigos <span className="text-ink-4">Científicos</span></h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ink text-white font-black uppercase text-xs tracking-widest h-12 px-6 rounded-xl">
                <Plus className="w-4 h-4 mr-2" /> Novo Artigo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border-paper-3 rounded-3xl p-8">
              <DialogHeader><DialogTitle>{editingPost ? 'Editar' : 'Novo'} Artigo</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} required className="rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Hub Regional</Label>
                    <Select value={formData.territoryNodeId?.toString() || "null"} onValueChange={(v) => setFormData({ ...formData, territoryNodeId: v === "null" ? null : parseInt(v) })}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Selecione um território..." /></SelectTrigger>
                      <SelectContent className="bg-white border-paper-3">
                        <SelectItem value="null">🌐 Global</SelectItem>
                        {territories?.map((t: NonNullable<typeof territories>[number]) => (
                          <SelectItem key={t.id} value={t.id.toString()}>📍 {t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(v: any) => setFormData({ ...formData, status: v })}>
                      <SelectTrigger className="rounded-xl h-11 border-paper-3 shadow-sm bg-white hover:bg-paper-2 transition-colors"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-white border-paper-3 shadow-xl">
                        <SelectItem value="draft">🚀 Rascunho</SelectItem>
                        <SelectItem value="published">✅ Publicado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Resumo / Abstract</Label>
                  <Textarea value={formData.abstract} onChange={e => setFormData({ ...formData, abstract: e.target.value })} className="rounded-xl h-24" />
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <Button type="submit" className="bg-leaf hover:bg-leaf-2 text-white font-black rounded-xl h-12 px-8">Salvar Artigo</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white border border-paper-3 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead><tr className="bg-paper-2 border-b border-paper-3">
              <th className="px-8 py-4 text-left text-[11px] font-black uppercase text-ink-4">Artigo / Hub</th>
              <th className="px-8 py-4 text-left text-[11px] font-black uppercase text-ink-4">Status</th>
              <th className="px-8 py-4 text-right text-[11px] font-black uppercase text-ink-4">Ações</th>
            </tr></thead>
            <tbody className="divide-y divide-paper-3">
              {filteredArticles.map(art => (
                <tr key={art.id} className="hover:bg-paper-2">
                  <td className="px-8 py-4">
                    <p className="font-bold text-ink">{art.title}</p>
                    <span className="text-[10px] bg-paper-3 px-1.5 py-0.5 rounded text-leaf font-black">📍 {getTerritoryName(art.territoryNodeId)}</span>
                  </td>
                  <td className="px-8 py-4 uppercase text-[10px] font-black text-leaf">{art.status}</td>
                  <td className="px-8 py-4 text-right">
                    <Button variant="ghost" onClick={() => handleEdit(art)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" onClick={() => deleteMutation.mutate({ id: art.id })}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminArtigos;
