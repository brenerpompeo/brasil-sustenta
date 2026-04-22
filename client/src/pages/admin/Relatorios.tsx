import { useState, useMemo } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trpc } from '@/lib/trpc';
import { LoadingSkeleton } from '@/components/ds';
import { Download, Link2, FileText, MapPin, Users, Building2, Target, BarChart3, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

// ─── Utilitários ──────────────────────────────────────────────────────────────

const formatDate = (d: string | Date | null | undefined) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('pt-BR');
};

const diffDays = (start: string | Date | null | undefined, end: string | Date | null | undefined) => {
  if (!start || !end) return '—';
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return `${Math.max(1, Math.round(ms / 86400000))} dias`;
};

const ODS_LABELS: Record<string, string> = {
  ods_1: 'ODS 1 — Erradicação da Pobreza',
  ods_2: 'ODS 2 — Fome Zero',
  ods_3: 'ODS 3 — Saúde e Bem-Estar',
  ods_4: 'ODS 4 — Educação de Qualidade',
  ods_5: 'ODS 5 — Igualdade de Gênero',
  ods_6: 'ODS 6 — Água Potável',
  ods_7: 'ODS 7 — Energia Limpa',
  ods_8: 'ODS 8 — Trabalho Decente',
  ods_9: 'ODS 9 — Indústria e Inovação',
  ods_10: 'ODS 10 — Redução das Desigualdades',
  ods_11: 'ODS 11 — Cidades Sustentáveis',
  ods_12: 'ODS 12 — Consumo Responsável',
  ods_13: 'ODS 13 — Ação Climática',
  ods_14: 'ODS 14 — Vida na Água',
  ods_15: 'ODS 15 — Vida Terrestre',
  ods_16: 'ODS 16 — Paz e Justiça',
  ods_17: 'ODS 17 — Parcerias e Meios de Implementação',
};

// ─── Tab: Relatório de Projeto ─────────────────────────────────────────────

const RelatorioProjetoTab = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  const { data: projectsData, isLoading: loadingProjects } = trpc.project.getAll.useQuery(
    { status: 'completed', limit: 100, offset: 0 },
    { retry: 1 }
  );

  const allProjects = projectsData?.projects ?? [];

  const selectedProject = useMemo(
    () => allProjects.find((p) => String(p.id) === selectedProjectId) ?? null,
    [allProjects, selectedProjectId]
  );

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href + `?projeto=${selectedProjectId}`);
    toast.success('Link copiado para a área de transferência');
  };

  const odsAlinhados: string[] = useMemo(() => {
    const p = selectedProject as any;
    if (!p) return [];
    const raw = p.odsPrimary || p.odsAlignment || p.ods_primary || [];
    return Array.isArray(raw) ? raw : [];
  }, [selectedProject]);

  if (loadingProjects) {
    return <LoadingSkeleton variant="card" lines={5} />;
  }

  return (
    <div className="space-y-8">
      {/* Seleção do Projeto */}
      <div className="bg-[#0A0A0A] border border-white/8 rounded-2xl p-6 space-y-4 print:hidden">
        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
          Selecionar Projeto Concluído
        </label>
        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
          <SelectTrigger className="h-12 bg-black border-white/10 text-white font-bold rounded-xl focus:ring-[#00FF41]/20">
            <SelectValue placeholder="Escolha um projeto concluído..." />
          </SelectTrigger>
          <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
            {allProjects.length === 0 ? (
              <SelectItem value="__none__" disabled>Nenhum projeto concluído encontrado</SelectItem>
            ) : (
              allProjects.map((p) => (
                <SelectItem key={p.id} value={String(p.id)} className="focus:bg-white/5">
                  {(p as any).title ?? `Projeto #${p.id}`}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {selectedProject && (
          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handlePrint}
              className="h-11 px-6 bg-[#00FF41] hover:bg-[#00FF41]/80 text-black font-black text-xs uppercase tracking-widest rounded-xl gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="h-11 px-6 border-white/10 text-white hover:bg-white/5 font-black text-xs uppercase tracking-widest rounded-xl gap-2"
            >
              <Link2 className="w-4 h-4" />
              Copiar Link
            </Button>
          </div>
        )}
      </div>

      {/* Preview do Relatório */}
      {selectedProject ? (
        <div
          id="relatorio-projeto-preview"
          className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-paper-3 print:shadow-none print:rounded-none print:border-0"
        >
          {/* Cabeçalho */}
          <div className="bg-[#050505] text-white p-10 print:p-8">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00FF41] mb-3">
              Brasil Sustenta — Relatório de Impacto ESG
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight mb-1">
              {(selectedProject as any).title}
            </h1>
            <p className="text-white/50 text-sm font-medium">
              Emitido em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Corpo */}
          <div className="p-10 print:p-8 space-y-8">

            {/* Linha 1: Empresa + Duração */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-paper-2 border border-paper-3 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-ink-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-ink-4">Empresa</span>
                </div>
                <p className="text-lg font-black text-ink">{(selectedProject as any).companyName ?? '—'}</p>
                <p className="text-sm text-ink-3 font-medium mt-1">{(selectedProject as any).category ?? ''}</p>
              </div>
              <div className="bg-paper-2 border border-paper-3 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-ink-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-ink-4">Duração</span>
                </div>
                <p className="text-lg font-black text-ink">
                  {diffDays((selectedProject as any).startDate, (selectedProject as any).endDate ?? (selectedProject as any).updatedAt)}
                </p>
                <p className="text-sm text-ink-3 font-medium mt-1">
                  {formatDate((selectedProject as any).startDate)} → {formatDate((selectedProject as any).endDate ?? (selectedProject as any).updatedAt)}
                </p>
              </div>
            </div>

            {/* Linha 2: Squad + Fit Score */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-paper-2 border border-paper-3 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-ink-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-ink-4">Squad</span>
                </div>
                <p className="text-2xl font-black text-ink mb-1">
                  {(selectedProject as any).appCount ?? (selectedProject as any).squadSize ?? '—'}
                </p>
                <p className="text-sm text-ink-3 font-medium">jovens universitários</p>
              </div>
              <div className="bg-[#050505] border border-[#00FF41]/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-[#00FF41]" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#00FF41]/70">Fit Score Médio</span>
                </div>
                <p className="text-3xl font-black text-[#00FF41]">
                  {(selectedProject as any).fitScoreAvg != null
                    ? `${Math.round((selectedProject as any).fitScoreAvg)}%`
                    : '—'}
                </p>
                <p className="text-sm text-white/30 font-medium mt-1">compatibilidade do squad</p>
              </div>
            </div>

            {/* ODS Alinhados */}
            {odsAlinhados.length > 0 && (
              <div className="border border-paper-3 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-ink-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-ink-4">ODS Alinhados</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {odsAlinhados.map((ods: string) => (
                    <span
                      key={ods}
                      className="px-3 py-1.5 bg-leaf/10 text-leaf border border-leaf/20 rounded-full text-[11px] font-black uppercase tracking-widest"
                    >
                      {ODS_LABELS[ods] ?? ods}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Descrição / Entregáveis */}
            <div className="border border-paper-3 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-4 h-4 text-ink-4" />
                <span className="text-[11px] font-black uppercase tracking-widest text-ink-4">Descrição do Desafio</span>
              </div>
              <p className="text-ink-2 text-sm font-medium leading-relaxed">
                {(selectedProject as any).description ?? 'Sem descrição disponível.'}
              </p>
            </div>

            {/* Rodapé */}
            <div className="border-t border-paper-3 pt-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-ink-4 mb-1">Brasil Sustenta</p>
                <p className="text-xs text-ink-4">Plataforma de Squads ESG Universitários</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-widest text-ink-4 mb-1">Documento Oficial</p>
                <p className="text-xs text-ink-4">Gerado em {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] border border-white/8 rounded-2xl p-16 text-center">
          <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 font-bold text-sm">Selecione um projeto concluído para visualizar o relatório</p>
        </div>
      )}
    </div>
  );
};

// ─── Tab: Relatório Municipal ──────────────────────────────────────────────

const RelatorioMunicipalTab = () => {
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string>('');

  const { data: territories, isLoading: loadingTerr } = trpc.territory.admin.list.useQuery();
  const { data: statsData } = trpc.dashboard.getStats.useQuery();

  const selectedTerritory = useMemo(
    () => territories?.find((t: NonNullable<typeof territories>[number]) => String(t.id) === selectedTerritoryId) ?? null,
    [territories, selectedTerritoryId]
  );

  const handlePrint = () => window.print();

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href + `?hub=${selectedTerritoryId}`);
    toast.success('Link copiado para a área de transferência');
  };

  if (loadingTerr) return <LoadingSkeleton variant="card" lines={4} />;

  return (
    <div className="space-y-8">
      {/* Seleção do Hub */}
      <div className="bg-[#0A0A0A] border border-white/8 rounded-2xl p-6 space-y-4 print:hidden">
        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
          Selecionar Hub Regional
        </label>
        <Select value={selectedTerritoryId} onValueChange={setSelectedTerritoryId}>
          <SelectTrigger className="h-12 bg-black border-white/10 text-white font-bold rounded-xl">
            <SelectValue placeholder="Escolha um hub/cidade..." />
          </SelectTrigger>
          <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
            {(!territories || territories.length === 0) ? (
              <SelectItem value="__none__" disabled>Nenhum hub cadastrado</SelectItem>
            ) : (
              territories.map((t: NonNullable<typeof territories>[number]) => (
                <SelectItem key={t.id} value={String(t.id)} className="focus:bg-white/5">
                  📍 {t.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {selectedTerritory && (
          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handlePrint}
              className="h-11 px-6 bg-[#00FF41] hover:bg-[#00FF41]/80 text-black font-black text-xs uppercase tracking-widest rounded-xl gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="h-11 px-6 border-white/10 text-white hover:bg-white/5 font-black text-xs uppercase tracking-widest rounded-xl gap-2"
            >
              <Link2 className="w-4 h-4" />
              Copiar Link
            </Button>
          </div>
        )}
      </div>

      {/* Preview do Relatório Municipal */}
      {selectedTerritory ? (
        <div
          id="relatorio-municipal-preview"
          className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-paper-3 print:shadow-none print:rounded-none print:border-0"
        >
          {/* Cabeçalho */}
          <div className="bg-[#050505] text-white p-10 print:p-8">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFD700] mb-3">
              Brasil Sustenta — Relatório Municipal de Impacto ODS
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight mb-1">
              {(selectedTerritory as any).name}
            </h1>
            <p className="text-white/50 text-sm font-medium">
              {(selectedTerritory as any).nodeType === 'state_hub' ? 'Hub Estadual' :
               (selectedTerritory as any).nodeType === 'city_hub' ? 'Hub Municipal' : 'Hub Campus'}
              {' · '}Emitido em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Métricas globais (proxy) */}
          <div className="p-10 print:p-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Talentos Cadastrados', value: statsData?.talents?.toLocaleString() ?? '—', icon: Users, color: 'text-sky-600' },
                { label: 'Universidades Ativas', value: statsData?.universities?.toLocaleString() ?? '—', icon: Building2, color: 'text-violet-600' },
                { label: 'Squads Formados', value: statsData?.squads?.toLocaleString() ?? '—', icon: BarChart3, color: 'text-leaf' },
                { label: 'Projetos Entregues', value: statsData?.completedProjects?.toLocaleString() ?? '—', icon: CheckSquare, color: 'text-emerald-600' },
                { label: 'Hub Mais Ativo', value: statsData?.activeHub ?? '—', icon: MapPin, color: 'text-amber-600' },
                { label: 'Investimento Gerado', value: statsData?.totalValue ? `R$ ${statsData.totalValue.toLocaleString()}` : '—', icon: Target, color: 'text-ink' },
              ].map((m) => (
                <div key={m.label} className="bg-paper-2 border border-paper-3 rounded-2xl p-5">
                  <div className={`flex items-center gap-2 mb-3 ${m.color}`}>
                    <m.icon className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-ink-4">{m.label}</span>
                  </div>
                  <p className={`text-2xl font-black ${m.color}`}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Hub info */}
            <div className="border border-paper-3 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-ink-4" />
                <span className="text-[11px] font-black uppercase tracking-widest text-ink-4">Informações do Hub</span>
              </div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {[
                  ['Tipo', (selectedTerritory as any).nodeType === 'state_hub' ? 'Hub Estadual' : (selectedTerritory as any).nodeType === 'city_hub' ? 'Hub Municipal' : 'Hub Campus'],
                  ['Status', (selectedTerritory as any).status ?? '—'],
                  ['Estado', (selectedTerritory as any).state ?? '—'],
                  ['Cidade', (selectedTerritory as any).city ?? '—'],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <dt className="text-ink-4 font-black text-[10px] uppercase tracking-widest mb-0.5">{k}</dt>
                    <dd className="text-ink font-bold capitalize">{v || '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Rodapé */}
            <div className="border-t border-paper-3 pt-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-ink-4 mb-1">Brasil Sustenta</p>
                <p className="text-xs text-ink-4">Plataforma de Squads ESG Universitários</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black uppercase tracking-widest text-ink-4 mb-1">Documento Oficial</p>
                <p className="text-xs text-ink-4">Gerado em {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] border border-white/8 rounded-2xl p-16 text-center">
          <MapPin className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 font-bold text-sm">Selecione um hub regional para visualizar o relatório municipal</p>
        </div>
      )}
    </div>
  );
};

// ─── Componente Principal ──────────────────────────────────────────────────

type TabKey = 'projeto' | 'municipal';

const AdminRelatorios = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('projeto');

  return (
    <AdminLayout>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #relatorio-projeto-preview, #relatorio-projeto-preview *,
          #relatorio-municipal-preview, #relatorio-municipal-preview * { visibility: visible; }
          #relatorio-projeto-preview, #relatorio-municipal-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      <div className="space-y-10 pb-20">
        {/* Header */}
        <div className="animate-fade-in-up">
          <div className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30 mb-3">
            Gerador de Relatórios
          </div>
          <h1 className="text-[2.75rem] font-black text-white font-display leading-[0.9] tracking-tight">
            Relatórios <span className="italic font-light text-white/30">ESG / PDF</span>.
          </h1>
          <p className="max-w-xl text-[15px] text-white/40 font-medium mt-4 leading-relaxed">
            Gere relatórios de impacto para projetos concluídos e dashboards municipais de ODS com exportação em PDF.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#0A0A0A] border border-white/8 rounded-2xl p-1.5 gap-1.5 w-fit print:hidden">
          {([
            { key: 'projeto' as TabKey, label: 'Relatório de Projeto', icon: FileText },
            { key: 'municipal' as TabKey, label: 'Relatório Municipal', icon: MapPin },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${
                activeTab === key
                  ? 'bg-[#00FF41] text-black shadow-lg shadow-[#00FF41]/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'projeto' ? <RelatorioProjetoTab /> : <RelatorioMunicipalTab />}
      </div>
    </AdminLayout>
  );
};

export default AdminRelatorios;
