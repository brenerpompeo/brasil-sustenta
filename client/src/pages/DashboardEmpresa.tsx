import { useEffect, useState } from "react";
import DashboardLayout, { DashboardTheme, SidebarItem } from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import FormularioCriarProjeto from "@/components/FormularioCriarProjeto";
import ListagemProjetos from "@/components/ListagemProjetos";
import { AiMatchCard } from "@/components/ui/ai-match-card";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Briefcase, Users, Zap, User, Settings, Plus, Check, X, Eye, Sparkles } from "lucide-react";

export default function DashboardEmpresa() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const isPreview = searchParams.get('preview') === 'true';

  const auth = useAuth();
  let user = auth.user;
  let loading = auth.loading;

  if (isPreview) {
    user = { id: 1, userType: 'empresa', name: 'Mock Company' } as any;
    loading = false;
  }

  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const isUnauthorized = !loading && (!user || user.userType !== "empresa");

  useEffect(() => {
    if (!isPreview && isUnauthorized) {
      setLocation("/login/empresa");
    }
  }, [isPreview, isUnauthorized, setLocation]);

  // Redirecionar se não autenticado
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-foreground">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="opacity-60">Carregando interface corporativa...</p>
        </div>
      </div>
    );
  }

  if (!isPreview && isUnauthorized) {
    return null;
  }

  // Buscar dados da empresa e de projetos
  const { data: profileData } = trpc.profile.getMyProfile.useQuery();
  const { data: projectsData, isLoading: projectsLoading, refetch: refetchProjects } = trpc.company.getMyProjects.useQuery({ limit: 50, offset: 0 });

  const companyProfile = profileData?.type === "empresa" ? profileData.profile : null;
  const projects = projectsData?.projects || [];
  const companyName = profileData?.type === "empresa" && "companyName" in profileData.profile ? profileData.profile.companyName : user?.name;

  const { data: applicationsData, refetch: refetchApps } = trpc.company.getProjectApplications.useQuery(
    { projectId: selectedProjectId! },
    { enabled: !!selectedProjectId && activeTab === "candidatos" }
  );

  const { data: squadsData } = trpc.company.getMySquads.useQuery(
    { projectId: selectedProjectId! },
    { enabled: !!selectedProjectId && activeTab === "squads" }
  );

  // AI Match: busca os melhores talentos para o projeto selecionado
  const { data: aiMatchData, isLoading: aiMatchLoading } = trpc.ai.getTalentMatches.useQuery(
    { projectId: selectedProjectId! },
    { enabled: !!selectedProjectId && activeTab === "ai-match" }
  );

  const approveApp = trpc.company.approveApplication.useMutation({
    onSuccess: () => {
      toast.success("Candidato aprovado com sucesso!");
      refetchApps();
    }
  });

  const rejectApp = trpc.company.rejectApplication.useMutation({
    onSuccess: () => {
      toast.success("Candidato rejeitado.");
      refetchApps();
    }
  });

  const stats = {
    total: projectsData?.total || 0,
    draft: projects.filter(p => p.status === "draft").length,
    open: projects.filter(p => p.status === "open").length,
    inProgress: projects.filter(p => p.status === "in_progress").length,
  };

  const handleProjectCreated = () => {
    setShowCreateForm(false);
    refetchProjects();
    setActiveTab("projetos");
  };

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setActiveTab("candidatos");
  };

  const theme: DashboardTheme = {
    navBg: "bg-[#0A0A0A]",
    navBorder: "border-white/10",
    brandHighlightText: "text-[#00FF85]",
    brandSubtitleText: "text-white/40",
    activeText: "text-[#00FF85]",
    activeBg: "bg-[#00FF85]/10",
    activeBorder: "border-[#00FF85]",
    personaOuterBorder: "border-white/5",
    personaGradientFrom: "from-white/5",
    personaGradientTo: "to-transparent",
    personaTitleText: "text-white/30",
    personaSubtitleText: "text-white",
    avatarRing: "ring-white/10",
    avatarBg: "bg-[#00FF85]/20",
    avatarText: "text-[#00FF85]",
    pageSelectionTheme: "selection:bg-[#00FF85] selection:text-[#0A0A0A]"
  };

  const menuItems1: SidebarItem[] = [
    { id: "overview", label: "Resumo", icon: Home, onClick: () => { setActiveTab("overview"); setShowCreateForm(false); } },
    { id: "projetos", label: "Meus Briefs", icon: Briefcase, onClick: () => { setActiveTab("projetos"); setShowCreateForm(false); } },
    { id: "candidatos", label: "Shortlists", icon: Users, onClick: () => { setActiveTab("candidatos"); setShowCreateForm(false); } },
    { id: "squads", label: "Squads", icon: Zap, onClick: () => { setActiveTab("squads"); setShowCreateForm(false); } },
    { id: "ai-match", label: "Fit IA", icon: Sparkles, onClick: () => { setActiveTab("ai-match"); setShowCreateForm(false); } },
  ];

  const menuItems2: SidebarItem[] = [
    { id: "perfil", label: "Perfil Empresa", icon: User },
    { id: "config", label: "Configurações", icon: Settings }
  ];

  return (
    <DashboardLayout
      theme={theme}
      workspaceTitle={<>BRASIL<br /><span className="text-[#00FF85]">SUSTENTA</span></>}
      workspaceSubtitle="EMPLOYER FLOW // v4.0"
      menuSection1Title="Brief > Squad > Entrega" menuItems1={menuItems1}
      menuSection2Title="Conta e Gestão" menuItems2={menuItems2}
      personaTitle="Empresa Parceira" personaSubtitle="Comprando execucao, nao apenas acesso"
      userName={companyName} userDescription="Buyer RH / ESG / Inovacao" activeTab={activeTab}
    >
        {showCreateForm ? (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="font-display text-2xl font-bold mb-4">Novo Projeto ESG</div>
            <FormularioCriarProjeto onSuccess={handleProjectCreated} onCancel={() => setShowCreateForm(false)} />
          </div>
        ) : (
          <>
            {/* Título da Página Global (condicional conforme a aba) */}
            {activeTab === "overview" && (
              <div className="mb-12 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-[1px] bg-[#00FF85]"></span>
                  <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Employer Flow</div>
                </div>
                <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground mb-6 italic">Do brief ao squad.</h1>
                <p className="text-[18px] text-muted-foreground max-w-[650px] leading-relaxed font-body font-medium">Acompanhe seus desafios ativos, avance shortlists com contexto e transforme projetos ESG em squads com entrega observavel.</p>
              </div>
            )}
            {activeTab === "projetos" && (
              <div className="mb-12 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-[1px] bg-[#00FF85]"></span>
                  <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Brief Management</div>
                </div>
                <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground italic">Meus Briefs.</h1>
              </div>
            )}
            {activeTab === "candidatos" && (
              <div className="mb-12 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-[1px] bg-[#00FF85]"></span>
                  <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Contextual Shortlist</div>
                </div>
                <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground italic">Shortlists por Brief.</h1>
              </div>
            )}
            {activeTab === "squads" && (
              <div className="mb-12 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-[1px] bg-[#00FF85]"></span>
                  <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Squad Execution</div>
                </div>
                <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground italic">Squads em Execução.</h1>
              </div>
            )}
            {activeTab === "ai-match" && (
              <div className="mb-12 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-[1px] bg-[#00FF85]"></span>
                  <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Explainable Matching</div>
                </div>
                <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground flex items-center gap-3 italic">
                  Fit IA por Desafio.
                </h1>
                <p className="text-[18px] text-muted-foreground max-w-[650px] leading-relaxed font-body font-medium mt-6">Veja por que cada talento combina com o contexto, com o ODS e com o tipo de entrega esperado para o seu brief.</p>
              </div>
            )}


            {/* Tabs Content Equivalents */}
            {activeTab === "overview" && (
              <div className="animate-fade-in-up delay-100">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                   <div className="bg-card border border-border p-8 relative overflow-hidden group hover:bg-[#00FF85]/5 transition-all">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-[#00FF85] opacity-20"></div>
                    <div className="font-display text-5xl font-black tracking-tighter text-foreground leading-none italic">{stats.total}</div>
                    <div className="text-[10px] font-black text-muted-foreground mt-4 uppercase tracking-[0.2em]">Total de Briefs</div>
                    <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-primary group-hover:translate-x-1 transition-transform">
                      <Check className="w-3.5 h-3.5"/> NA OPERAÇÃO
                    </div>
                  </div>

                  <div className="bg-card border border-border p-8 relative overflow-hidden group hover:bg-sky/5 transition-all">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-sky opacity-20"></div>
                    <div className="font-display text-5xl font-black tracking-tighter text-foreground leading-none italic">{stats.open}</div>
                    <div className="text-[10px] font-black text-muted-foreground mt-4 uppercase tracking-[0.2em]">Shortlists Abertas</div>
                    <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-sky group-hover:translate-x-1 transition-transform">
                      <Plus className="w-3.5 h-3.5"/> EM TRIAGEM
                    </div>
                  </div>

                  <div className="bg-card border border-border p-8 relative overflow-hidden group hover:bg-violet/5 transition-all">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-violet opacity-20"></div>
                    <div className="font-display text-5xl font-black tracking-tighter text-foreground leading-none italic">{stats.inProgress}</div>
                    <div className="text-[10px] font-black text-muted-foreground mt-4 uppercase tracking-[0.2em]">Squads em Andamento</div>
                    <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-violet group-hover:translate-x-1 transition-transform">
                      <Zap className="w-3.5 h-3.5"/> COM ENTREGA
                    </div>
                  </div>

                  <div className="bg-card border border-border p-8 relative overflow-hidden group hover:bg-accent/5 transition-all">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-accent opacity-20"></div>
                    <div className="font-display text-5xl font-black tracking-tighter text-foreground leading-none italic">{stats.draft}</div>
                    <div className="text-[10px] font-black text-muted-foreground mt-4 uppercase tracking-[0.2em]">Briefs em Rascunho</div>
                    <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-accent group-hover:translate-x-1 transition-transform">
                      <Eye className="w-3.5 h-3.5"/> A REVISAR
                    </div>
                  </div>
                </div>

                {/* Hero Banner CTA */}
                <div className="p-10 md:p-16 bg-[#0A0A0A] border border-white/10 relative overflow-hidden mb-12 group">
                  <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 blur-[100px] -z-0"></div>
                  <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-primary/10 blur-[80px] -z-0"></div>
                  
                  <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black tracking-widest uppercase mb-8">
                       Categoria operacional ESG
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-[1] tracking-tighter mb-8 italic">
                      Abra um brief que <br /><span className="text-primary">vire squad e entrega.</span>
                    </h2>
                    <p className="text-[18px] text-white/50 mb-10 font-medium leading-relaxed">
                      O fluxo ideal comeca no desafio certo. A partir dele, a plataforma organiza shortlist, fit score, squad e evidencias finais para RH, ESG e inovacao.
                    </p>
                    
                    <button 
                      onClick={() => setShowCreateForm(true)}
                      className="inline-flex items-center justify-center gap-3 bg-primary text-white font-black text-[14px] uppercase tracking-widest px-10 py-5 hover:bg-primary/80 hover:scale-[1.05] transition-all"
                    >
                      <Plus className="w-5 h-5" /> Abrir Novo Brief
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projetos" && (
              <div className="animate-fade-in-up">
                <ListagemProjetos
                  projects={projects}
                  isLoading={projectsLoading}
                  onRefresh={refetchProjects}
                  onSelectProject={handleSelectProject}
                />
              </div>
            )}

            {activeTab === "candidatos" && (
              <div className="animate-fade-in-up">
                {!selectedProjectId ? (
                  <div className="bg-card border border-border rounded-2xl p-10 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">Shortlists</h3>
                    <p className="text-sm text-muted-foreground mb-5">Acesse "Meus Briefs" e selecione um desafio ativo para analisar a shortlist contextual daquele fluxo.</p>
                    <button 
                      onClick={() => setActiveTab("projetos")} 
                      className="text-sm font-semibold px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary-5"
                    >
                      Ver Briefs
                    </button>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="p-5 border-b border-border bg-secondary flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground leading-tight">Avaliar Shortlist</h3>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">Brief #{selectedProjectId}</p>
                      </div>
                      <button onClick={() => setSelectedProjectId(null)} className="text-xs font-semibold bg-card border border-border px-3 py-1.5 rounded-md hover:bg-background">✕ Limpar Seleção</button>
                    </div>

                    <div className="p-0">
                      {(!applicationsData?.applications || applicationsData.applications.length === 0) ? (
                        <div className="p-8 text-center text-muted-foreground text-sm">Nenhum talento na shortlist deste brief por enquanto. Quando houver candidaturas elegiveis, elas aparecerao aqui com contexto de fit.</div>
                      ) : (
                        <table className="w-full text-[12.5px] border-collapse">
                          <thead>
                            <tr className="bg-card border-b border-border">
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-muted-foreground p-3 pl-5">Talento</th>
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-muted-foreground p-3">Curso</th>
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-muted-foreground p-3">Skills</th>
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-muted-foreground p-3">Status</th>
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-muted-foreground p-3">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {applicationsData.applications.map((app) => (
                              <tr key={app.id} className="border-b border-border hover:bg-background last:border-b-0 transition-colors">
                                <td className="p-3 pl-5">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="w-8 h-8 ring-2 ring-white bg-sky-3 text-sky font-display font-bold text-xs flex items-center justify-center">
                                      {app.talent?.avatar ? <AvatarImage src={app.talent.avatar} /> : <div className="uppercase">{app.talent?.fullName?.substring(0,2) || "TL"}</div>}
                                    </Avatar>
                                    <div>
                                      <div className="font-bold text-foreground">{app.talent?.fullName}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3 text-muted-foreground">{app.talent?.course || "Graduação não informada"}</td>
                                <td className="p-3">
                                  <div className="flex flex-wrap gap-1">
                                    {app.talent?.skills?.slice(0, 3).map((skill: string) => (
                                      <span key={skill} className="bg-secondary border border-border text-muted-foreground px-2 py-0.5 rounded-full text-[11px] font-semibold">{skill}</span>
                                    ))}
                                    {app.talent?.skills && app.talent.skills.length > 3 && <span className="bg-background text-muted-foreground px-1 py-0.5 rounded-full text-[11px]">+{app.talent.skills.length - 3}</span>}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap
                                    ${app.status === 'accepted' ? 'bg-primary-5 text-primary' : ''}
                                    ${app.status === 'rejected' ? 'bg-ember-3 text-ember' : ''}
                                    ${app.status === 'pending' ? 'bg-sky-3 text-sky' : ''}
                                  `}>
                                    <span className={`w-1.5 h-1.5 rounded-full
                                      ${app.status === 'accepted' ? 'bg-primary' : ''}
                                      ${app.status === 'rejected' ? 'bg-ember' : ''}
                                      ${app.status === 'pending' ? 'bg-sky' : ''}
                                    `}></span>
                                    {app.status === 'accepted' && 'Aprovado'}
                                    {app.status === 'rejected' && 'Rejeitado'}
                                    {app.status === 'pending' && 'Pendente'}
                                  </span>
                                </td>
                                <td className="p-3">
                                  {app.status === "pending" ? (
                                    <div className="flex gap-1.5">
                                      <button 
                                        disabled={approveApp.isPending || rejectApp.isPending}
                                        onClick={() => approveApp.mutate({ applicationId: app.id })}
                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                                      >
                                        <Check className="w-4 h-4" />
                                      </button>
                                      <button 
                                        disabled={approveApp.isPending || rejectApp.isPending}
                                        onClick={() => rejectApp.mutate({ applicationId: app.id })}
                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-ember/10 text-ember hover:bg-ember hover:text-white transition-colors"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                      <button className="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-secondary transition-colors">
                                        <Eye className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button className="text-[11px] font-semibold text-primary hover:underline">Ver Histórico</button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "squads" && (
              <div className="animate-fade-in-up">
                {!selectedProjectId ? (
                  <div className="bg-card border border-border rounded-2xl p-10 text-center">
                    <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">Squads</h3>
                    <p className="text-sm text-muted-foreground mb-5">Selecione um brief ativo para acompanhar a composicao do squad, os papeis e o status de execucao.</p>
                    <button 
                      onClick={() => setActiveTab("projetos")} 
                      className="text-sm font-semibold px-6 py-2 border border-border shadow-none bg-background text-foreground rounded-lg hover:bg-secondary"
                    >
                      Selecionar Brief
                    </button>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground">Visão de Execução do Squad</h3>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5 font-bold">Brief #{selectedProjectId}</p>
                      </div>
                      <button onClick={() => setSelectedProjectId(null)} className="text-xs font-semibold bg-card border border-border px-3 py-1.5 rounded-md hover:bg-background">✕ Mudar Projeto</button>
                    </div>

                    {(!squadsData?.squads || squadsData.squads.length === 0) ? (
                      <div className="text-center py-10 border-2 border-dashed border-border bg-background rounded-xl">
                        <p className="font-semibold text-muted-foreground mb-1">Nenhum squad mapeado.</p>
                        <p className="text-xs text-muted-foreground">A shortlist ainda nao foi convertida em composicao ativa. Revise os talentos ou acelere a aprovacao do brief.</p>
                        <button onClick={() => setActiveTab("candidatos")} className="mt-4 px-4 py-2 bg-card border border-border rounded-md text-xs font-semibold hover:border-primary">Revisar Candidaturas</button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {squadsData.squads.map((squad) => (
                          <div key={squad.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-2xl hover:shadow-primary/5 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-display text-lg font-bold">{squad.name}</h4>
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase
                                ${squad.status === 'active' ? 'bg-violet-3 text-violet' : 'bg-background-3 text-muted-foreground'}
                              `}>
                                <span className={`w-1.5 h-1.5 rounded-full ${squad.status === 'active' ? 'bg-violet' : 'bg-ink-4'}`}></span>
                                {squad.status === 'active' ? 'Ativo' : squad.status === 'completed' ? 'Concluído' : 'Em formação'}
                              </span>
                            </div>
                            
                            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3 border-b border-border pb-1">Perfil dos Membros</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {squad.members.map((member) => (
                                <div key={member.id} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                                  <Avatar className="w-10 h-10 bg-sky-3 text-sky font-display font-bold flex items-center justify-center">
                                    {member.talent.avatar ? <AvatarImage src={member.talent.avatar} /> : <div>{member.talent.fullName?.substring(0, 2) || "TL"}</div>}
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-bold text-foreground">{member.talent.fullName}</p>
                                    <p className="text-xs text-muted-foreground">{member.role || member.talent.course}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {activeTab === "ai-match" && (
              <div className="animate-fade-in-up">
                {!selectedProjectId ? (
                  <div className="rounded-2xl p-10 text-center border-2 border-dashed border-primary/30 bg-gradient-to-br from-leaf/5 to-transparent">
                    <Sparkles className="w-14 h-14 text-primary mx-auto mb-4 opacity-50" />
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">Selecione um Brief</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      O motor de matching precisa de um desafio como referencia para explicar o fit e sugerir a melhor composicao de shortlist.
                    </p>
                    <button
                      onClick={() => setActiveTab("projetos")}
                      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-2 transition-all"
                    >
                      <Briefcase className="w-4 h-4" /> Escolher Brief
                    </button>
                  </div>
                ) : aiMatchLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-leaf animate-spin" />
                    <p className="text-sm text-muted-foreground font-medium">A IA esta calculando os fits e organizando a shortlist...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Header contextual */}
                    <div className="flex items-center justify-between p-4 bg-ink text-white rounded-xl">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-0.5">Brief Analisado</p>
                        <p className="font-display text-lg font-bold">{aiMatchData?.projectContext?.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/50 mb-0.5">Fits Calculados</p>
                        <p className="font-display text-2xl font-black text-primary">{aiMatchData?.matches?.length || 0}</p>
                      </div>
                    </div>

                    {/* Cards de Match */}
                    {aiMatchData?.matches?.length === 0 ? (
                      <div className="p-10 text-center rounded-xl border border-border">
                        <p className="text-muted-foreground text-sm">Nenhum talento elegivel encontrado. Ajuste o brief, amplie a captacao ou ative um HUB parceiro.</p>
                      </div>
                    ) : (
                      aiMatchData?.matches?.map((match, idx) => (
                        <AiMatchCard
                          key={match.talent.id}
                          talentName={match.talent.fullName}
                          avatarUrl={match.talent.avatar || undefined}
                          fitScore={match.aiFitScore}
                          reasoning={match.aiMatchReason}
                          skills={match.talent.skills || []}
                        />
                      ))
                    )}

                    <p className="text-[11px] text-center text-muted-foreground pt-2">Pontuacoes geradas pelo algoritmo de fit — skills, contexto ESG/ODS e aderencia ao desafio</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
    </DashboardLayout>
  );
}
