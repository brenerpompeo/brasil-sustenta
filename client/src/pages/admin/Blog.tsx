import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Eye, Edit, Trash2, Star, CheckCircle2, Clock, Plus, Loader2 } from 'lucide-react';
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

const AdminBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Geral',
    status: 'draft' as 'draft' | 'published',
    isFeatured: false,
    territoryNodeId: null as number | null
  });

  // TRPC Hooks
  const { data: territories } = trpc.territory.admin.list.useQuery();
  const { data: postsData, isLoading, refetch } = trpc.blog.getAll.useQuery({ limit: 50 });
  
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Artigo criado com sucesso");
      setIsModalOpen(false);
      resetForm();
      refetch();
    },
    onError: (err) => toast.error(`Erro ao criar: ${err.message}`)
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Artigo atualizado com sucesso");
      setIsModalOpen(false);
      resetForm();
      refetch();
    },
    onError: (err) => toast.error(`Erro ao atualizar: ${err.message}`)
  });

  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Artigo excluído com sucesso");
      refetch();
    },
    onError: (err) => toast.error(`Erro ao excluir: ${err.message}`)
  });

  const toggleFeaturedMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Status de destaque atualizado");
      refetch();
    }
  });

  const toggleStatusMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Status do artigo atualizado");
      refetch();
    }
  });

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Geral',
      status: 'draft',
      isFeatured: false,
      territoryNodeId: null
    });
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'Geral',
      status: post.status,
      isFeatured: post.isFeatured || false,
      territoryNodeId: post.territoryNodeId
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const posts = useMemo(() => postsData || [], [postsData]);

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      draft: 'text-amber-600 bg-amber-50 border-amber-100',
      archived: 'text-ink-3 bg-paper-3 border-paper-4',
    };
    const labels = {
      published: 'Publicado',
      draft: 'Rascunho',
      archived: 'Arquivado',
    };
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles] || styles.draft}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (p.authorName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesStatus = filterStatus === 'todos' || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [posts, searchTerm, filterStatus]);

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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3 flex items-center gap-2">
               Central de Gestão de Conteúdo (CMS)
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Curadoria de <span className="italic font-light text-ink-4">Conteúdo</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Publique notícias, gerencie artigos e mantenha a comunidade Brasil Sustenta informada com cases de impacto real.
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in shadow-sm">
             <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if(!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                      <Plus className="w-4 h-4" />
                      Escrever Novo Artigo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white rounded-3xl border-paper-3 shadow-2xl p-0 overflow-hidden">
                  <DialogHeader className="p-8 pb-4 border-b border-paper-3 bg-paper-2">
                    <DialogTitle className="text-2xl font-black text-ink font-display tracking-tight">
                      {editingPost ? 'Editar Artigo' : 'Novo Artigo'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Título do Artigo</Label>
                        <Input 
                          required
                          value={formData.title} 
                          onChange={(e) => setFormData({...formData, title: e.target.value, slug: editingPost ? formData.slug : e.target.value.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')})}
                          placeholder="Ex: Sustentabilidade no Agronegócio"
                          className="h-11 rounded-xl border-paper-3 focus:ring-leaf-5 font-bold" 
                        />
                      </div>
                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Slug (URL)</Label>
                        <Input 
                          required
                          value={formData.slug} 
                          onChange={(e) => setFormData({...formData, slug: e.target.value})}
                          placeholder="sustentabilidade-no-agronegocio"
                          className="h-11 rounded-xl border-paper-3 focus:ring-leaf-5 font-bold" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Categoria</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(v) => setFormData({...formData, category: v})}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-paper-3 font-bold">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-paper-3 rounded-xl">
                            <SelectItem value="Geral">Geral</SelectItem>
                            <SelectItem value="ESG">ESG</SelectItem>
                            <SelectItem value="ODS">ODS</SelectItem>
                            <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                            <SelectItem value="Comunidade">Comunidade</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Status</Label>
                        <Select 
                          value={formData.status} 
                          onValueChange={(v: 'draft' | 'published') => setFormData({...formData, status: v})}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-paper-3 font-bold">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-paper-3 rounded-xl">
                            <SelectItem value="draft">Rascunho</SelectItem>
                            <SelectItem value="published">Publicar Imediatamente</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="space-y-2 mt-4">
                        <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Hub Regional</Label>
                        <Select 
                          value={formData.territoryNodeId?.toString() || "null"} 
                          onValueChange={(v) => setFormData({...formData, territoryNodeId: v === "null" ? null : parseInt(v)})}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-paper-3 font-bold">
                            <SelectValue placeholder="Selecione o Hub..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-paper-3 rounded-xl shadow-2xl">
                            <SelectItem value="null" className="text-leaf font-bold">🌐 Global / Nacional</SelectItem>
                            {territories?.map((t: NonNullable<typeof territories>[number]) => (
                               <SelectItem key={t.id} value={t.id.toString()}>📍 {t.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Resumo (Excerpt)</Label>
                      <Textarea 
                        value={formData.excerpt} 
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        placeholder="Um breve resumo do que trata o artigo..."
                        className="rounded-xl border-paper-3 focus:ring-leaf-5 font-medium resize-none h-20" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Conteúdo (Markdown/HTML)</Label>
                      <Textarea 
                        required
                        value={formData.content} 
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="Escreva seu artigo aqui..."
                        className="rounded-xl border-paper-3 focus:ring-leaf-5 font-medium min-h-[200px]" 
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-paper-3">
                       <Button 
                         type="button" 
                         variant="ghost" 
                         onClick={() => setIsModalOpen(false)}
                         className="h-12 px-6 rounded-xl text-ink-4 font-black uppercase tracking-widest"
                       >
                         Cancelar
                       </Button>
                       <Button 
                         type="submit" 
                         disabled={createMutation.isPending || updateMutation.isPending}
                         className="h-12 px-8 rounded-xl bg-leaf hover:bg-leaf-2 text-white font-black uppercase tracking-widest shadow-lg shadow-leaf/20 disabled:opacity-50"
                       >
                         {createMutation.isPending || updateMutation.isPending ? (
                           <Loader2 className="w-4 h-4 animate-spin" />
                         ) : (
                           editingPost ? 'Salvar Alterações' : 'Criar Artigo'
                         )}
                       </Button>
                    </div>
                  </form>
                </DialogContent>
             </Dialog>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col md:flex-row gap-2 animate-fade-in-up delay-100 shadow-sm">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
              <input 
                type="text" 
                placeholder="Buscar por Título ou Autor..." 
                className="w-full h-12 pl-12 bg-white border border-paper-3 rounded-xl text-sm font-bold text-ink placeholder:text-ink-4 focus:ring-4 focus:ring-leaf-5 focus:border-leaf-3 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex bg-white border border-paper-3 rounded-xl p-1 gap-1">
              {['todos', 'published', 'draft', 'archived'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 h-10 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                    filterStatus === s 
                    ? 'bg-ink text-white shadow-lg shadow-ink/20' 
                    : 'text-ink-4 hover:bg-paper-3 hover:text-ink'
                  }`}
                >
                  {s === 'todos' ? 'Status' : s === 'published' ? 'No Ar' : s === 'draft' ? 'Rascunhos' : 'Arquivo'}
                </button>
              ))}
           </div>
        </div>

        {/* Content Table */}
        <div className="bg-white border border-paper-3 rounded-[2.5rem] overflow-hidden shadow-sm animate-fade-in-up delay-200">
           <div className="p-8 border-b border-paper-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-black text-ink tracking-tight">Artigos e Publicações <span className="text-ink-4 font-normal text-sm ml-2">({filteredPosts.length})</span></h3>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-paper-2 border-b border-paper-3">
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Título do Conteúdo</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Autor / Data</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Categoria</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Vizualizações</th>
                   <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Status</th>
                   <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-ink-4">Operações</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-paper-3">
                 {filteredPosts.map((post) => (
                   <tr key={post.id} className="hover:bg-paper-2 transition-all group">
                     <td className="px-8 py-6 max-w-md">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-paper-3 flex-shrink-0 flex items-center justify-center text-ink border border-paper-4/50">
                              <FileText className="w-5 h-5" />
                           </div>
                           <div className="min-w-0">
                              <p className="text-[14px] font-bold text-ink group-hover:text-leaf transition-colors leading-tight truncate">{post.title}</p>
                              {post.isFeatured && (
                                <div className="flex items-center gap-1 mt-1">
                                   <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                   <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest">Destaque Home</span>
                                </div>
                              )}
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div>
                           <p className="text-[13px] font-bold text-ink-2 leading-none mb-1">{post.authorName || 'Autor Desconhecido'}</p>
                           <p className="text-[11px] font-black text-ink-4 uppercase tracking-tighter">
                             {post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR') : 'Sem data'}
                           </p>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className="px-2.5 py-0.5 rounded-md bg-paper-3 text-ink-3 text-[11px] font-black uppercase tracking-widest border border-paper-4">
                           {post.category || 'Geral'}
                        </span>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm font-black text-ink">
                           <Eye className="w-3.5 h-3.5 text-ink-4" />
                           {/* Views support can be added later */}
                           0
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        {getStatusBadge(post.status)}
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm" 
                             title="Destacar Artigo"
                             onClick={() => toggleFeaturedMutation.mutate({ id: post.id, isFeatured: !post.isFeatured })}
                           >
                              <Star className={`w-4 h-4 ${post.isFeatured ? 'text-amber-500 fill-amber-500' : 'text-ink-4'}`} />
                           </Button>
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm" 
                             title={post.status === 'published' ? 'Mover para Rascunho' : 'Publicar'}
                             onClick={() => toggleStatusMutation.mutate({ id: post.id, status: post.status === 'published' ? 'draft' : 'published' })}
                           >
                              {post.status === 'published' ? <Clock className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                           </Button>
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm"
                             onClick={() => handleEdit(post)}
                           >
                               <Edit className="w-4 h-4 text-ink-4" />
                           </Button>
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-500"
                             onClick={() => {
                               if (window.confirm("Tem certeza que deseja excluir este artigo?")) {
                                 deleteMutation.mutate({ id: post.id });
                               }
                             }}
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
