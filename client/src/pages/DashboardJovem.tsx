import { useState } from "react";
import DashboardLayout, { DashboardTheme, SidebarItem } from "@/components/DashboardLayout";
import FormPerfilTalento from "@/components/FormPerfilTalento";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Compass, FileText, Zap, User, Settings, Plus, Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function DashboardJovem() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const isPreview = searchParams.get("preview") === "true";

  const auth = useAuth();
  let user = auth.user;
  let loading = auth.loading;

  if (isPreview) {
    user = { id: 2, userType: "jovem", name: "Mock Talent" } as any;
    loading = false;
  }

  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-foreground">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky mx-auto mb-4"></div>
          <p className="font-body opacity-60">Carregando interface do talento...</p>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== "jovem") {
    setLocation("/login/jovem");
    return null;
  }

  const { data: profileData } = trpc.profile.getMyProfile.useQuery();
  const { data: openProjectsData, isLoading: projectsLoading } = trpc.talent.getOpenProjects.useQuery({ limit: 50, offset: 0 });
  const { data: applicationsData } = trpc.talent.getMyApplications.useQuery();
  const { data: squadsData } = trpc.talent.getMySquads.useQuery();

  const applyMutation = trpc.talent.applyToProject.useMutation({
    onSuccess: () => {
      toast.success("Candidatura enviada com sucesso!");
    }
  });

  const userName = profileData?.type === "talento" && "fullName" in profileData.profile ? profileData.profile.fullName : user?.name;
  const course = profileData?.type === "talento" && "course" in profileData.profile ? profileData.profile.course : "Engenharia de Software";

  const stats = {
    totalApplications: applicationsData?.total || 3,
    activeSquads: squadsData?.total || 1,
    impactHours: (squadsData?.total || 1) * 120,
  };

  const theme: DashboardTheme = {
    navBg: "bg-card", navBorder: "border-border",
    brandHighlightText: "text-primary", brandSubtitleText: "text-muted-foreground",
    activeText: "text-primary", activeBg: "bg-primary/10", activeBorder: "border-primary",
    personaOuterBorder: "border-transparent", personaGradientFrom: "from-primary/20", personaGradientTo: "to-primary/5",
    personaTitleText: "text-muted-foreground", personaSubtitleText: "text-foreground",
    avatarRing: "ring-border", avatarBg: "bg-primary/20", avatarText: "text-primary",
    pageSelectionTheme: "selection:bg-primary selection:text-primary-foreground"
  };

  const menuItems1: SidebarItem[] = [
    { id: "overview", label: "Visão Geral", icon: Home, onClick: () => setActiveTab("overview") },
    { id: "oportunidades", label: "Oportunidades", icon: Compass, onClick: () => setActiveTab("oportunidades") },
    { id: "candidaturas", label: "Candidaturas", icon: FileText, onClick: () => setActiveTab("candidaturas") },
    { id: "squads", label: "Squads", icon: Zap, onClick: () => setActiveTab("squads") }
  ];

  const menuItems2: SidebarItem[] = [
    { id: "perfil", label: "Perfil Profissional", icon: User, onClick: () => setActiveTab("perfil") },
    { id: "config", label: "Conta", icon: Settings, onClick: () => setActiveTab("config") }
  ];

  const mockProjects = [
    { id: 1, title: "Plataforma de Rastreamento ODS", company: "Ambev ESG", category: "Tecnologia", budget: "Remunerado", requiredSkills: ["React", "TypeScript", "Node.js"] },
    { id: 2, title: "Análise de Dados Climáticos", company: "Natura Cosmeticos", category: "Data Science", budget: "Voluntariado", requiredSkills: ["Python", "Pandas", "Estatística"] },
    { id: 3, title: "Comunidade de Energia Solar", company: "Enel Brasil", category: "Social", budget: "Remunerado", requiredSkills: ["Comunicação", "Design", "Gestão"] },
    { id: 4, title: "Otimização de Rotas Verdes", company: "Mercado Livre", category: "Logística", budget: "Remunerado", requiredSkills: ["Pesquisa Operacional", "Python"] },
  ];

  /* If preview, inject mock data to replace unloaded data */
  const displayProjects = isPreview ? mockProjects : (openProjectsData?.projects || []);

  return (
    <DashboardLayout
      theme={theme}
      workspaceTitle={<>Brasil<br /><span className="text-primary text-2xl drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">Sustenta</span></>}
      workspaceSubtitle="Portal do Talento"
      menuSection1Title="Menu Principal" menuItems1={menuItems1}
      menuSection2Title="Meu Desenvolvimento" menuItems2={menuItems2}
      personaTitle="Céu Universitário" personaSubtitle="Pronto para Impactar"
      userName={userName} userDescription={course} activeTab={activeTab}
    >
        {/* Header Condicional */}
        {activeTab === "overview" && (
          <div className="mb-10 animate-fade-in-up">
            <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary mb-2">Engajamento Diário</div>
            <h1 className="font-display text-[2.5rem] leading-[1.1] font-black tracking-tighter text-foreground mb-3 relative inline-block">
              Seu Dashboard
              <div className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary opacity-50 rounded-full"></div>
            </h1>
            <p className="text-[16px] text-muted-foreground max-w-[600px] leading-relaxed">
              Acompanhe suas métricas de desenvolvimento profissional e oportunidade de gerar impacto real no mundo corporativo combinando ESG com suas habilidades acadêmicas.
            </p>
          </div>
        )}
        {activeTab === "oportunidades" && (
          <div className="mb-10 animate-fade-in-up">
            <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary mb-2">Sourcing</div>
            <h1 className="font-display text-[2.5rem] leading-[1.1] font-black tracking-tighter text-foreground">Oportunidades em Aberto</h1>
            <p className="text-[16px] text-muted-foreground mt-3">Projetos alinhados com seu perfil</p>
          </div>
        )}
        {activeTab === "candidaturas" && (
          <div className="mb-10 animate-fade-in-up">
            <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary mb-2">Tracking</div>
            <h1 className="font-display text-[2.5rem] leading-[1.1] font-black tracking-tighter text-foreground">Minhas Candidaturas</h1>
          </div>
        )}
        {activeTab === "squads" && (
          <div className="mb-10 animate-fade-in-up">
            <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary mb-2">Engajamento</div>
            <h1 className="font-display text-[2.5rem] leading-[1.1] font-black tracking-tighter text-foreground">Meus Squads Ativos</h1>
          </div>
        )}

        {/* Tab Visões */}
        {activeTab === "overview" && (
          <div className="animate-fade-in-up delay-100">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>
                <div className="font-display text-[2.5rem] font-black tracking-tighter text-foreground leading-none">{stats.totalApplications}</div>
                <div className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">Candidaturas</div>
                <div className="text-[12px] font-medium mt-3 text-primary flex items-center gap-1.5"><Zap className="w-3.5 h-3.5"/> Em revisão pelas empresas</div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-violet"></div>
                <div className="font-display text-[2.5rem] font-black tracking-tighter text-foreground leading-none">{stats.activeSquads}</div>
                <div className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">Squads Ativos</div>
                <div className="text-[12px] font-medium mt-3 text-violet flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> Projetos em andamento</div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F59E0B]"></div>
                <div className="font-display text-[2.5rem] font-black tracking-tighter text-foreground leading-none">{stats.impactHours} <span className="text-2xl opacity-60">h</span></div>
                <div className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-widest">Horas de Impacto</div>
                <div className="text-[12px] font-medium mt-3 text-[#F59E0B] flex items-center gap-1.5"><Compass className="w-3.5 h-3.5"/> Extensão creditada</div>
              </div>
            </div>

            {/* Hero Banner CTA - Vibrante e Premium */}
            <div className="rounded-[2rem] p-8 md:px-12 md:py-12 bg-card relative overflow-hidden shadow-2xl mb-10 border border-border">
              <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-r from-transparent to-sky-1/20 pointer-events-none"></div>
              <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary/20 blur-[80px] pointer-events-none"></div>
              <div className="absolute bottom-0 right-32 w-64 h-64 rounded-full bg-violet/20 blur-[60px] pointer-events-none"></div>
              
              <div className="relative z-10 max-w-xl">
                <span className="inline-block px-3 py-1 bg-card/10 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-white/10 backdrop-blur-md">
                  Seu Futuro Agora
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight mb-5">
                  Conecte sua paixão<br />com <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-4 to-violet-3">propósitos reais</span>
                </h2>
                <p className="text-[16px] text-white/70 mb-8 font-medium leading-relaxed">
                  Aplique seus conhecimentos universitários em projetos ESG de empresas renomadas. Construa um portfólio de impacto enquanto muda o mundo.
                </p>
                
                <button 
                  onClick={() => setActiveTab("oportunidades")}
                  className="inline-flex items-center justify-center gap-2 bg-card text-foreground font-bold text-[15px] px-8 py-3.5 rounded-xl shadow-lg shadow-white/10 hover:bg-background hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Compass className="w-5 h-5" /> Encontrar Projetos ESG
                </button>
              </div>
            </div>
          </div>
        )}

        {/* OPORTUNIDADES COM PREMIUM CARDS */}
        {activeTab === "oportunidades" && (
          <div className="animate-fade-in-up">
            {projectsLoading && !isPreview ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-card border text-transparent border-border p-8 rounded-[1.5rem] h-60 animate-pulse flex flex-col justify-between">
                    <div className="w-3/4 h-8 bg-background-3 rounded-md"></div>
                    <div className="w-1/2 h-5 bg-secondary rounded-md"></div>
                    <div className="w-full h-12 bg-background-3 rounded-xl mt-4"></div>
                  </div>
                ))}
              </div>
            ) : displayProjects?.length ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {displayProjects.map(project => (
                  <div key={project.id} className="group relative bg-card border border-border hover:border-sky-1/40 rounded-[1.5rem] p-8 transition-all overflow-hidden flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110"></div>
                    
                    <div className="relative z-10 flex flex-wrap justify-between items-start gap-4 mb-4">
                      <span className="bg-secondary text-foreground px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-sm border border-border">
                        {project.category}
                      </span>
                      <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap">
                        {project.budget}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2 leading-tight relative z-10">{project.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-6 relative z-10">
                      <Briefcase className="w-4 h-4 text-primary" /> {project.company}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                      {(project.requiredSkills || []).map(s => (
                        <span key={s} className="bg-secondary border border-border text-muted-foreground px-3 py-1 rounded-lg text-xs font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto relative z-10">
                      <button 
                         disabled={applyMutation.isPending}
                         onClick={() => applyMutation.mutate({ projectId: project.id as never })}
                         className="w-full flex items-center justify-center gap-2 bg-[#0A1128] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:bg-primary transition-all group-hover:shadow-primary/25"
                      >
                         Trabalhar neste Projeto <Plus className="w-5 h-5"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-12 rounded-[2rem] border border-border text-center shadow-sm">
                <Compass className="w-16 h-16 text-primary/20 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Sem oportunidades no radar</h3>
                <p className="text-muted-foreground font-semibold">Não há novos projetos ESG abertos para o seu perfil no momento.</p>
              </div>
            )}
          </div>
        )}

        {/* CANDIDATURAS REFINADO */}
        {activeTab === "candidaturas" && (
          <div className="bg-card rounded-[1.5rem] border border-border overflow-hidden shadow-sm animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
                <thead className="bg-secondary/50 border-b border-border text-muted-foreground">
                  <tr>
                    <th className="px-6 py-5 text-[11px] font-bold tracking-widest uppercase">Projeto</th>
                    <th className="px-6 py-5 text-[11px] font-bold tracking-widest uppercase">Empresa</th>
                    <th className="px-6 py-5 text-[11px] font-bold tracking-widest uppercase">Status</th>
                    <th className="px-6 py-5 text-[11px] font-bold tracking-widest uppercase text-right">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-paper-3">
                  {applicationsData?.applications.map(app => (
                    <tr key={app.id} className="hover:bg-secondary/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-5 font-bold text-foreground group-hover:text-primary transition-colors">{app.project.title}</td>
                      <td className="px-6 py-5 font-medium text-muted-foreground">{app.project.company}</td>
                      <td className="px-6 py-5">
                        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest">
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-semibold text-xs text-muted-foreground">Há 2 dias</td>
                    </tr>
                  ))}
                  {!applicationsData?.applications?.length && !isPreview && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center">
                         <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-background mb-4 text-muted-foreground">
                           <FileText className="w-6 h-6" />
                         </div>
                         <p className="text-muted-foreground font-semibold">Nenhuma candidatura enviada.<br/>Explore a aba Oportunidades.</p>
                      </td>
                    </tr>
                  )}
                  {isPreview && (
                    <tr className="hover:bg-secondary/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-5 font-bold text-foreground group-hover:text-primary transition-colors">Plataforma de Rastreamento ODS</td>
                      <td className="px-6 py-5 font-medium text-muted-foreground">Ambev ESG</td>
                      <td className="px-6 py-5">
                        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest">
                          Em Análise
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-semibold text-xs text-muted-foreground">Hoje, 10:23</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PERFIL PROFISSIONAL */}
        {activeTab === "perfil" && (
          <div className="max-w-4xl">
            <div className="mb-10 animate-fade-in-up">
              <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary mb-2">Curriculum Digital</div>
              <h1 className="font-display text-[2.5rem] leading-[1.1] font-black tracking-tighter text-foreground mb-3 relative inline-block">
                Meu Perfil Profissional
                <div className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary opacity-50 rounded-full"></div>
              </h1>
              <p className="text-[16px] text-muted-foreground">
                Mantenha suas informações atualizadas para melhorar seu Fit Score no Dashboard das empresas.
              </p>
            </div>
            
            <FormPerfilTalento 
              initialData={profileData?.type === "jovem" ? profileData.profile : {}} 
              onSuccess={() => {
                // Opcional: Recarregar dados ou scroll para o topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* CONFIGURAÇÕES (Placeholder/Conta) */}
        {activeTab === "config" && (
          <div className="bg-card border border-border rounded-[2rem] p-16 text-center animate-fade-in-up shadow-sm">
            <div className="w-20 h-20 bg-ink/5 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-ink/5">
              <Settings className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Configurações de Conta</h3>
            <p className="text-[15px] font-medium text-muted-foreground max-w-md mx-auto">Em breve: gestão de notificações, segurança e preferências de privacidade.</p>
          </div>
        )}

    </DashboardLayout>
  );
}
