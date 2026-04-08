import { useState } from "react";
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

  if (!user || user.userType !== "empresa") {
    setLocation("/login/empresa");
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
    navBg: "bg-ink", navBorder: "border-white/5",
    brandHighlightText: "text-leaf-3", brandSubtitleText: "text-white/35",
    activeText: "text-white", activeBg: "bg-white/5", activeBorder: "border-leaf-3",
    personaOuterBorder: "border-transparent", personaGradientFrom: "from-[#1C6B3A80]", personaGradientTo: "to-[#2D965533]",
    personaTitleText: "text-white/50", personaSubtitleText: "text-white",
    avatarRing: "ring-white/10", avatarBg: "bg-leaf-5", avatarText: "text-leaf"
  };

  const menuItems1: SidebarItem[] = [
    { id: "overview", label: "Visão Geral", icon: Home, onClick: () => { setActiveTab("overview"); setShowCreateForm(false); } },
    { id: "projetos", label: "Meus Projetos", icon: Briefcase, onClick: () => { setActiveTab("projetos"); setShowCreateForm(false); } },
    { id: "candidatos", label: "Candidatos", icon: Users, onClick: () => { setActiveTab("candidatos"); setShowCreateForm(false); } },
    { id: "squads", label: "Meus Squads", icon: Zap, onClick: () => { setActiveTab("squads"); setShowCreateForm(false); } },
    { id: "ai-match", label: "✨ Talentos IA", icon: Sparkles, onClick: () => { setActiveTab("ai-match"); setShowCreateForm(false); } },
  ];

  const menuItems2: SidebarItem[] = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "config", label: "Configurações", icon: Settings }
  ];

  return (
    <DashboardLayout
      theme={theme}
      workspaceTitle={<>Brasil<br /><span className="text-leaf-3">Sustenta</span></>}
      workspaceSubtitle="Workspace Corporativo"
      menuSection1Title="Menu Principal" menuItems1={menuItems1}
      menuSection2Title="Conta" menuItems2={menuItems2}
      personaTitle="Persona Ativa" personaSubtitle="Empresa ESG"
      userName={companyName} userDescription="Empresa" activeTab={activeTab}
    >
        {showCreateForm ? (
          <div className="bg-white border border-paper-3 rounded-2xl p-6">
            <div className="font-display text-2xl font-bold mb-4">Novo Projeto ESG</div>
            <FormularioCriarProjeto onSuccess={handleProjectCreated} onCancel={() => setShowCreateForm(false)} />
          </div>
        ) : (
          <>
            {/* Título da Página Global (condicional conforme a aba) */}
            {activeTab === "overview" && (
              <div className="mb-8 animate-fade-in-up">
                <div className="text-[11px] font-bold tracking-widest uppercase text-leaf mb-2">Visão Corporativa</div>
                <h1 className="font-display text-4xl leading-none font-black text-ink mb-2">Dashboard da Empresa</h1>
                <p className="text-[15px] text-ink-3 max-w-[560px]">Visão completa de todos os seus projetos sociais e ambientais ativos, assim como análise de talentos.</p>
              </div>
            )}
            {activeTab === "projetos" && (
              <div className="mb-8 animate-fade-in-up">
                <div className="text-[11px] font-bold tracking-widest uppercase text-leaf mb-2">Gestão de Projetos</div>
                <h1 className="font-display text-4xl leading-none font-black text-ink">Meus Projetos</h1>
              </div>
            )}
            {activeTab === "candidatos" && (
              <div className="mb-8 animate-fade-in-up">
                <div className="text-[11px] font-bold tracking-widest uppercase text-leaf mb-2">Sourcing Escalonável</div>
                <h1 className="font-display text-4xl leading-none font-black text-ink">Verificação de Candidatos</h1>
              </div>
            )}
            {activeTab === "squads" && (
              <div className="mb-8 animate-fade-in-up">
                <div className="text-[11px] font-bold tracking-widest uppercase text-leaf mb-2">Engajamento e Impacto</div>
                <h1 className="font-display text-4xl leading-none font-black text-ink">Meus Squads</h1>
              </div>
            )}
            {activeTab === "ai-match" && (
              <div className="mb-8 animate-fade-in-up">
                <div className="text-[11px] font-bold tracking-widest uppercase text-leaf mb-2">Inteligência Artificial</div>
                <h1 className="font-display text-4xl leading-none font-black text-ink flex items-center gap-3">
                  Talentos Recomendados
                  <span className="text-sm font-semibold bg-leaf text-white px-3 py-1 rounded-full">GenAI Powered</span>
                </h1>
                <p className="text-[15px] text-ink-3 max-w-[560px] mt-2">O Segundo Cérebro analisou todos os perfis disponíveis e ranqueou os mais compatíveis com o seu projeto.</p>
              </div>
            )}


            {/* Tabs Content Equivalents */}
            {activeTab === "overview" && (
              <div className="animate-fade-in-up delay-100">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {/* Stat - Green */}
                  <div className="bg-white border border-paper-3 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-leaf"></div>
                    <div className="font-display text-3xl font-black text-ink leading-none">{stats.total}</div>
                    <div className="text-[11px] font-semibold text-ink-3 mt-1.5 uppercase tracking-wider">Total Projetos</div>
                    <div className="text-[11px] font-semibold mt-2 text-leaf">↑ Ativos</div>
                  </div>

                  <div className="bg-white border border-paper-3 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-sky"></div>
                    <div className="font-display text-3xl font-black text-ink leading-none">{stats.open}</div>
                    <div className="text-[11px] font-semibold text-ink-3 mt-1.5 uppercase tracking-wider">Abertos (Vagas)</div>
                    <div className="text-[11px] font-semibold mt-2 text-sky">↑ Em captação</div>
                  </div>

                  <div className="bg-white border border-paper-3 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-violet"></div>
                    <div className="font-display text-3xl font-black text-ink leading-none">{stats.inProgress}</div>
                    <div className="text-[11px] font-semibold text-ink-3 mt-1.5 uppercase tracking-wider">Em Andamento</div>
                    <div className="text-[11px] font-semibold mt-2 text-violet">↑ Squads Ativos</div>
                  </div>

                  <div className="bg-white border border-paper-3 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-sun"></div>
                    <div className="font-display text-3xl font-black text-ink leading-none">{stats.draft}</div>
                    <div className="text-[11px] font-semibold text-ink-3 mt-1.5 uppercase tracking-wider">Rascunhos</div>
                    <div className="text-[11px] font-semibold mt-2 text-ink-4">— Requerem revisão</div>
                  </div>
                </div>

                {/* Hero Banner CTA */}
                <div className="rounded-2xl p-7 md:px-10 md:py-8 bg-gradient-to-br from-ink-2 to-leaf relative overflow-hidden shadow-2xl shadow-leaf/10 mb-8">
                  <div className="absolute -right-5 -top-5 w-40 h-40 rounded-full bg-white/5 pointer-events-none"></div>
                  <div className="absolute right-20 -bottom-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none"></div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-2 relative z-10">Crie projetos que<br />transformam o Brasil</h2>
                  <p className="text-[13px] text-white/75 mb-6 max-w-md relative z-10">Conecte sua empresa a jovens talentos universitários engajados em gerar impacto real, certificado pelas metas dos Objetivos de Desenvolvimento Sustentável.</p>
                  
                  <button 
                    onClick={() => setShowCreateForm(true)}
                    className="inline-flex relative z-10 items-center justify-center gap-2 bg-white text-leaf border-none font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-paper-2 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Criar Novo Projeto →
                  </button>
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
                  <div className="bg-white border border-paper-3 rounded-2xl p-10 text-center">
                    <Users className="w-12 h-12 text-ink-4 mx-auto mb-4" />
                    <h3 className="font-display text-lg font-bold text-ink mb-1">Candidatos</h3>
                    <p className="text-sm text-ink-3 mb-5">Por favor, acesse "Meus Projetos" e selecione um projeto ativo para visualizar seus candidatos pendentes e avaliar seu squad.</p>
                    <button 
                      onClick={() => setActiveTab("projetos")} 
                      className="text-sm font-semibold px-6 py-2 border-2 border-leaf text-leaf rounded-lg hover:bg-leaf-5"
                    >
                      Pesquisar Projetos
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-paper-3 rounded-2xl overflow-hidden">
                    <div className="p-5 border-b border-paper-3 bg-paper-2 flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-lg font-bold text-ink leading-tight">Avaliar Candidatos</h3>
                        <p className="text-[11px] text-ink-3 uppercase tracking-wider font-semibold">Proj. #{selectedProjectId}</p>
                      </div>
                      <button onClick={() => setSelectedProjectId(null)} className="text-xs font-semibold bg-white border border-paper-3 px-3 py-1.5 rounded-md hover:bg-paper">✕ Limpar Seleção</button>
                    </div>

                    <div className="p-0">
                      {(!applicationsData?.applications || applicationsData.applications.length === 0) ? (
                        <div className="p-8 text-center text-ink-4 text-sm">Nenhum candidato para este projeto no momento. As candidaturas abertas aparecerão aqui em tempo real.</div>
                      ) : (
                        <table className="w-full text-[12.5px] border-collapse">
                          <thead>
                            <tr className="bg-white border-b border-paper-3">
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-ink-4 p-3 pl-5">Talento</th>
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-ink-4 p-3">Curso</th>
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-ink-4 p-3">Skills</th>
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-ink-4 p-3">Status</th>
                              <th className="text-left font-bold text-[11px] tracking-wider uppercase text-ink-4 p-3">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {applicationsData.applications.map((app) => (
                              <tr key={app.id} className="border-b border-paper-3 hover:bg-paper last:border-b-0 transition-colors">
                                <td className="p-3 pl-5">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="w-8 h-8 ring-2 ring-white bg-sky-3 text-sky font-display font-bold text-xs flex items-center justify-center">
                                      {app.talent?.avatar ? <AvatarImage src={app.talent.avatar} /> : <div className="uppercase">{app.talent?.fullName?.substring(0,2) || "TL"}</div>}
                                    </Avatar>
                                    <div>
                                      <div className="font-bold text-ink">{app.talent?.fullName}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3 text-ink-2">{app.talent?.course || "Graduação não informada"}</td>
                                <td className="p-3">
                                  <div className="flex flex-wrap gap-1">
                                    {app.talent?.skills?.slice(0, 3).map((skill: string) => (
                                      <span key={skill} className="bg-paper-2 border border-paper-3 text-ink-2 px-2 py-0.5 rounded-full text-[11px] font-semibold">{skill}</span>
                                    ))}
                                    {app.talent?.skills && app.talent.skills.length > 3 && <span className="bg-paper text-ink-4 px-1 py-0.5 rounded-full text-[11px]">+{app.talent.skills.length - 3}</span>}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap
                                    ${app.status === 'accepted' ? 'bg-leaf-5 text-leaf' : ''}
                                    ${app.status === 'rejected' ? 'bg-ember-3 text-ember' : ''}
                                    ${app.status === 'pending' ? 'bg-sky-3 text-sky' : ''}
                                  `}>
                                    <span className={`w-1.5 h-1.5 rounded-full
                                      ${app.status === 'accepted' ? 'bg-leaf' : ''}
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
                                        className="w-7 h-7 flex items-center justify-center rounded-md bg-leaf/10 text-leaf hover:bg-leaf hover:text-white transition-colors"
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
                                      <button className="w-7 h-7 flex items-center justify-center rounded-md border border-paper-3 text-ink-2 hover:bg-paper-2 transition-colors">
                                        <Eye className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button className="text-[11px] font-semibold text-leaf hover:underline">Ver Histórico</button>
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
                  <div className="bg-white border border-paper-3 rounded-2xl p-10 text-center">
                    <Zap className="w-12 h-12 text-ink-4 mx-auto mb-4" />
                    <h3 className="font-display text-lg font-bold text-ink mb-1">Squads</h3>
                    <p className="text-sm text-ink-3 mb-5">Você precisa selecionar um projeto ativo para visualizar os squads de desenvolvimento ESG vinculados a ele.</p>
                    <button 
                      onClick={() => setActiveTab("projetos")} 
                      className="text-sm font-semibold px-6 py-2 border border-paper-3 shadow-none bg-paper text-ink rounded-lg hover:bg-paper-2"
                    >
                      Selecionar Projeto
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-paper-3 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-paper-3 pb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-ink">Visão do Squad Ativo</h3>
                        <p className="text-[11px] uppercase tracking-wider text-ink-4 mt-0.5 font-bold">Projeto #{selectedProjectId}</p>
                      </div>
                      <button onClick={() => setSelectedProjectId(null)} className="text-xs font-semibold bg-white border border-paper-3 px-3 py-1.5 rounded-md hover:bg-paper">✕ Mudar Projeto</button>
                    </div>

                    {(!squadsData?.squads || squadsData.squads.length === 0) ? (
                      <div className="text-center py-10 border-2 border-dashed border-paper-3 bg-paper rounded-xl">
                        <p className="font-semibold text-ink-2 mb-1">Nenhum squad mapeado.</p>
                        <p className="text-xs text-ink-4">Aguarde o engajamento dos talentos ou agilize o processo aprovando candidaturas pendentes.</p>
                        <button onClick={() => setActiveTab("candidatos")} className="mt-4 px-4 py-2 bg-white border border-paper-3 rounded-md text-xs font-semibold hover:border-leaf">Revisar Candidaturas</button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {squadsData.squads.map((squad) => (
                          <div key={squad.id} className="bg-white border border-paper-3 rounded-xl p-5 hover:shadow-2xl hover:shadow-leaf/5 transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-display text-lg font-bold">{squad.name}</h4>
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase
                                ${squad.status === 'active' ? 'bg-violet-3 text-violet' : 'bg-paper-3 text-ink-3'}
                              `}>
                                <span className={`w-1.5 h-1.5 rounded-full ${squad.status === 'active' ? 'bg-violet' : 'bg-ink-4'}`}></span>
                                {squad.status === 'active' ? 'Ativo' : squad.status === 'completed' ? 'Concluído' : 'Em formação'}
                              </span>
                            </div>
                            
                            <div className="text-[11px] font-bold text-ink-4 uppercase tracking-widest mb-3 border-b border-paper-3 pb-1">Perfil dos Membros</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {squad.members.map((member) => (
                                <div key={member.id} className="flex items-center gap-3 p-3 bg-paper rounded-lg border border-paper-3">
                                  <Avatar className="w-10 h-10 bg-sky-3 text-sky font-display font-bold flex items-center justify-center">
                                    {member.talent.avatar ? <AvatarImage src={member.talent.avatar} /> : <div>{member.talent.fullName?.substring(0, 2) || "TL"}</div>}
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-bold text-ink">{member.talent.fullName}</p>
                                    <p className="text-xs text-ink-3">{member.role || member.talent.course}</p>
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
                  <div className="rounded-2xl p-10 text-center border-2 border-dashed border-leaf/30 bg-gradient-to-br from-leaf/5 to-transparent">
                    <Sparkles className="w-14 h-14 text-leaf mx-auto mb-4 opacity-50" />
                    <h3 className="font-display text-xl font-bold text-ink mb-2">Selecione um Projeto</h3>
                    <p className="text-sm text-ink-3 mb-6 max-w-sm mx-auto">
                      O Segundo Cérebro precisa de um projeto como referência para calcular o Fit Score e recomendar os melhores talentos.
                    </p>
                    <button
                      onClick={() => setActiveTab("projetos")}
                      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 bg-leaf text-white rounded-lg hover:bg-leaf-2 transition-all"
                    >
                      <Briefcase className="w-4 h-4" /> Escolher Projeto
                    </button>
                  </div>
                ) : aiMatchLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-leaf/20 border-t-leaf animate-spin" />
                    <p className="text-sm text-ink-3 font-medium">O Segundo Cérebro está calculando os matches...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Header contextual */}
                    <div className="flex items-center justify-between p-4 bg-ink text-white rounded-xl">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-leaf mb-0.5">Projeto Analisado</p>
                        <p className="font-display text-lg font-bold">{aiMatchData?.projectContext?.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/50 mb-0.5">Talentos Analisados</p>
                        <p className="font-display text-2xl font-black text-leaf">{aiMatchData?.matches?.length || 0}</p>
                      </div>
                    </div>

                    {/* Cards de Match */}
                    {aiMatchData?.matches?.length === 0 ? (
                      <div className="p-10 text-center rounded-xl border border-paper-3">
                        <p className="text-ink-3 text-sm">Nenhum talento disponível encontrado. Divulgue o projeto para atrair mais candidatos.</p>
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

                    <p className="text-[11px] text-center text-ink-4 pt-2">Pontuações geradas pelo algoritmo híbrido de Match — Hard Skills + Contexto ESG/ODS</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
    </DashboardLayout>
  );
}
