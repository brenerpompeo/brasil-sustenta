import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, MapPin, Video, Edit, Trash2, Clock, Star, CheckCircle2, Plus, Loader2 } from 'lucide-react';
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

const AdminEventos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    isOnline: false,
    eventDate: '',
    eventTime: '',
    maxParticipants: 100,
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
    isFeatured: false,
    territoryNodeId: null as number | null
  });

  // TRPC Hooks
  const { data: territories } = trpc.territory.admin.list.useQuery();
  const { data: eventsData, isLoading, refetch } = trpc.event.getAll.useQuery({ limit: 50 });

  const createMutation = trpc.event.create.useMutation({
    onSuccess: () => {
      toast.success("Evento criado com sucesso");
      setIsModalOpen(false);
      resetForm();
      refetch();
    },
    onError: (err) => toast.error(`Erro ao criar: ${err.message}`)
  });

  const updateMutation = trpc.event.update.useMutation({
    onSuccess: () => {
      toast.success("Evento atualizado com sucesso");
      setIsModalOpen(false);
      resetForm();
      refetch();
    },
    onError: (err) => toast.error(`Erro ao atualizar: ${err.message}`)
  });

  const deleteMutation = trpc.event.delete.useMutation({
    onSuccess: () => {
      toast.success("Evento excluído com sucesso");
      refetch();
    }
  });

  const toggleFeaturedMutation = trpc.event.update.useMutation({
    onSuccess: () => {
      toast.success("Status de destaque atualizado");
      refetch();
    }
  });

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      isOnline: false,
      eventDate: '',
      eventTime: '',
      maxParticipants: 100,
      status: 'upcoming',
      isFeatured: false,
      territoryNodeId: null
    });
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      location: event.location || '',
      isOnline: event.isOnline || false,
      eventDate: event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : '',
      eventTime: event.eventTime || '',
      maxParticipants: event.maxParticipants || 100,
      status: event.status,
      isFeatured: event.isFeatured || false,
      territoryNodeId: event.territoryNodeId
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined
    };
    if (editingEvent) {
      updateMutation.mutate({ id: editingEvent.id, ...payload } as any);
    } else {
      createMutation.mutate(payload as any);
    }
  };

  const events = useMemo(() => eventsData || [], [eventsData]);

  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: 'text-sky-600 bg-sky-50 border-sky-100',
      ongoing: 'text-red-600 bg-red-50 border-red-100',
      completed: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      cancelled: 'text-ink-4 bg-paper-3 border-paper-4',
    };
    const labels = {
      upcoming: 'Agendado',
      ongoing: 'Ao Vivo',
      completed: 'Finalizado',
      cancelled: 'Cancelado',
    };
    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const filteredEventos = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.location?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesStatus = filterStatus === 'todos' || e.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [events, searchTerm, filterStatus]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3">
              Gestão de Eventos e Comunidade
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Calendário <span className="italic font-light text-ink-4">de Experiências</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Organize webinars, workshops e encontros para potencializar o match entre talentos e empresas.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                  <Plus className="w-4 h-4" />
                  Criar Novo Evento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white rounded-3xl border-paper-3 shadow-2xl p-0 overflow-hidden">
                <DialogHeader className="p-8 pb-4 border-b border-paper-3 bg-paper-2">
                  <DialogTitle className="text-2xl font-black text-ink font-display tracking-tight">
                    {editingEvent ? 'Editar Evento' : 'Novo Evento'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Nome do Evento</Label>
                    <Input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Workshop ESG e Carreira"
                      className="h-11 rounded-xl border-paper-3 focus:ring-leaf-5 font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Hub Regional</Label>
                      <Select
                        value={formData.territoryNodeId?.toString() || "null"}
                        onValueChange={(v) => setFormData({ ...formData, territoryNodeId: v === "null" ? null : parseInt(v) })}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-paper-3 font-bold text-ink">
                          <SelectValue placeholder="Selecione o Hub..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-paper-3 rounded-xl shadow-2xl">
                          <SelectItem value="null">🌐 Global / Nacional</SelectItem>
                          {territories?.map((t: NonNullable<typeof territories>[number]) => (
                            <SelectItem key={t.id} value={t.id.toString()}>📍 {t.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Status do Evento</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(v: 'upcoming' | 'ongoing' | 'completed' | 'cancelled') => setFormData({ ...formData, status: v })}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-paper-3 font-bold text-ink">
                          <SelectValue placeholder="Status..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-paper-3 rounded-xl shadow-2xl">
                          <SelectItem value="upcoming">Agendado</SelectItem>
                          <SelectItem value="ongoing">Ao Vivo</SelectItem>
                          <SelectItem value="completed">Finalizado</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Data</Label>
                      <Input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="h-11 rounded-xl border-paper-3 focus:ring-leaf-5 font-bold"
                      />
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Horário</Label>
                      <Input
                        placeholder="19:00"
                        value={formData.eventTime}
                        onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                        className="h-11 rounded-xl border-paper-3 focus:ring-leaf-5 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Formato</Label>
                      <div className="flex items-center gap-4 h-11 px-4 bg-paper-2 border border-paper-3 rounded-xl mt-1">
                        <label className="flex items-center gap-2 text-xs font-bold text-ink-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isOnline}
                            onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
                            className="w-4 h-4 accent-leaf"
                          />
                          Evento Online
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Limite Participantes</Label>
                      <Input
                        type="number"
                        value={formData.maxParticipants}
                        onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                        className="h-11 rounded-xl border-paper-3 focus:ring-leaf-5 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Local / Link</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder={formData.isOnline ? "Link do Meet/Zoom" : "Endereço físico"}
                      className="h-11 rounded-xl border-paper-3 focus:ring-leaf-5 font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-ink-4">Descrição</Label>
                    <Textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detalhes do evento..."
                      className="rounded-xl border-paper-3 focus:ring-leaf-5 font-medium min-h-[120px]"
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
                        editingEvent ? 'Salvar Alterações' : 'Criar Evento'
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-paper-2 border border-paper-3 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-4" />
            <input
              type="text"
              placeholder="Buscar por Título..."
              className="w-full h-12 pl-12 bg-white border border-paper-3 rounded-xl text-sm font-bold text-ink"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white border border-paper-3 rounded-xl p-1 gap-1">
            {['todos', 'upcoming', 'ongoing', 'completed'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 h-10 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${filterStatus === s ? 'bg-ink text-white shadow-lg' : 'text-ink-4 hover:bg-paper-3'
                  }`}
              >
                {s === 'todos' ? 'Status' : s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-paper-3 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-paper-3 flex items-center justify-between">
            <h3 className="font-display text-xl font-black text-ink tracking-tight">Agenda de Eventos <span className="text-ink-4 font-normal text-sm ml-2">({filteredEventos.length})</span></h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-paper-2 border-b border-paper-3">
                  <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Evento / Canal / Hub</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Data / Horário</th>
                  <th className="px-8 py-5 text-left text-[11px] font-black uppercase tracking-widest text-ink-4">Status</th>
                  <th className="px-8 py-5 text-right text-[11px] font-black uppercase tracking-widest text-ink-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-3">
                {filteredEventos.map((event) => {
                  const terrName = territories?.find((t: NonNullable<typeof territories>[number]) => t.id === event.territoryNodeId)?.name || 'Global';
                  return (
                  <tr key={event.id} className="hover:bg-paper-2 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-ink/5 flex items-center justify-center text-ink shadow-sm border border-ink/10">
                          {event.isOnline ? <Video className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-ink group-hover:text-sky transition-colors leading-tight">{event.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-[11px] font-black text-ink-4 uppercase tracking-widest">{event.location || 'Online'}</p>
                            <span className="text-[10px] bg-paper-3 px-1.5 py-0.5 rounded text-leaf font-black">📍 {terrName}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-ink-2">{event.eventDate ? new Date(event.eventDate).toLocaleDateString('pt-BR') : 'Sem data'}</span>
                        <span className="text-[11px] font-black text-ink-4 uppercase mt-1">{event.eventTime || '--:--'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 rounded-lg hover:bg-white"
                          onClick={() => toggleFeaturedMutation.mutate({ id: event.id, isFeatured: !event.isFeatured })}
                        >
                          <Star className={`w-4 h-4 ${event.isFeatured ? 'text-amber-500 fill-amber-500' : 'text-ink-4'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 rounded-lg hover:bg-white"
                          onClick={() => handleEdit(event)}
                        >
                          <Edit className="w-4 h-4 text-ink-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-500"
                          onClick={() => {
                            if (window.confirm("Excluir este evento?")) deleteMutation.mutate({ id: event.id });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEventos;