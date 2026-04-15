import { useEffect, useState } from "react";
import DashboardLayout, { DashboardTheme, SidebarItem } from "@/components/DashboardLayout";
import FormPerfilTalento from "@/components/FormPerfilTalento";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Compass, FileText, Zap, User, Settings, Plus, Briefcase, Sparkles } from "lucide-react";
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
  const isUnauthorized = !loading && (!user || user.userType !== "jovem");

  useEffect(() => {
    if (!isPreview && isUnauthorized) {
      setLocation("/login/jovem");
    }
  }, [isPreview, isUnauthorized, setLocation]);

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

  if (!isPreview && isUnauthorized) {
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
    { id: "overview", label: "Resumo", icon: Home, onClick: () => setActiveTab("overview") },
    { id: "oportunidades", label: "Matches", icon: Compass, onClick: () => setActiveTab("oportunidades") },
    { id: "candidaturas", label: "Candidaturas", icon: FileText, onClick: () => setActiveTab("candidaturas") },
    { id: "squads", label: "Squads", icon: Zap, onClick: () => setActiveTab("squads") }
  ];

  const menuItems2: SidebarItem[] = [
    { id: "perfil", label: "Perfil Profissional", icon: User, onClick: () => setActiveTab("perfil") },
    { id: "config", label: "Configurações", icon: Settings, onClick: () => setActiveTab("config") }
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
      workspaceTitle={<>BRASIL<br /><span className="text-[#00FF85]">SUSTENTA</span></>}
      workspaceSubtitle="TALENT FLOW // v4.0"
      menuSection1Title="Match > Squad > Portfolio" menuItems1={menuItems1}
      menuSection2Title="Conta e Perfil" menuItems2={menuItems2}
      personaTitle="Talento em Movimento" personaSubtitle="Portfolio observavel em projeto real"
      userName={userName} userDescription={course} activeTab={activeTab}
    >
        {/* Header Condicional */}
        {activeTab === "overview" && (
          <div className="mb-12 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-[#00FF85]"></span>
              <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Talent Flow</div>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground mb-6 italic">
              Do match ao portfolio.
            </h1>
            <p className="text-[18px] text-muted-foreground max-w-[650px] leading-relaxed font-body font-medium">
              Entenda quais desafios fazem sentido para voce, acompanhe suas candidaturas e construa repertorio em squads com entrega real.
            </p>
          </div>
        )}
        {activeTab === "oportunidades" && (
          <div className="mb-12 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-[#00FF85]"></span>
              <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Contextual Matching</div>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground mb-4 italic">Matches para voce.</h1>
            <p className="text-[18px] text-muted-foreground font-medium">Projetos priorizados pela IA com base no seu perfil, repertorio e contexto de entrega.</p>
          </div>
        )}
        {activeTab === "candidaturas" && (
          <div className="mb-12 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-[#00FF85]"></span>
              <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Application Tracking</div>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground italic">Candidaturas com contexto.</h1>
          </div>
        )}
        {activeTab === "squads" && (
          <div className="mb-12 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-[#00FF85]"></span>
              <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00FF85]">Execution Layer</div>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9] font-black tracking-tighter text-foreground italic">Squads e repertorio.</h1>
          </div>
        )}

        {/* Tab Visões */}
        {activeTab === "overview" && (
          <div className="animate-fade-in-up delay-100">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card border border-border p-8 relative overflow-hidden group hover:bg-[#00FF85]/5 transition-all">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#00FF85] opacity-20"></div>
                <div className="font-display text-5xl font-black tracking-tighter text-foreground leading-none italic">{stats.totalApplications}</div>
                <div className="text-[10px] font-black text-muted-foreground mt-4 uppercase tracking-[0.2em]">Candidaturas Ativas</div>
                <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-primary group-hover:translate-x-1 transition-transform">
                  <Zap className="w-3.5 h-3.5"/> COM CONTEXTO
                </div>
              </div>

              <div className="bg-card border border-border p-8 relative overflow-hidden group hover:bg-sky/5 transition-all">
                <div className="absolute top-0 right-0 w-2 h-full bg-sky opacity-20"></div>
                <div className="font-display text-5xl font-black tracking-tighter text-foreground leading-none italic">{stats.activeSquads}</div>
                <div className="text-[10px] font-black text-muted-foreground mt-4 uppercase tracking-[0.2em]">Squads Ativos</div>
                <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-sky group-hover:translate-x-1 transition-transform">
                   <User className="w-3.5 h-3.5"/> ENTREGA REAL
                </div>
              </div>

              <div className="bg-card border border-border p-8 relative overflow-hidden group hover:bg-accent/5 transition-all">
                <div className="absolute top-0 right-0 w-2 h-full bg-accent opacity-20"></div>
                <div className="font-display text-5xl font-black tracking-tighter text-foreground leading-none italic">{stats.impactHours} <span className="text-2xl opacity-40">H</span></div>
                <div className="text-[10px] font-black text-muted-foreground mt-4 uppercase tracking-[0.2em]">Horas e Portfolio</div>
                <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-accent group-hover:translate-x-1 transition-transform">
                  <Compass className="w-3.5 h-3.5"/> EVIDENCIA GERADA
                </div>
              </div>
            </div>

            {/* Hero Banner CTA - Vibrante e Premium */}
            <div className="p-10 md:p-16 bg-[#0A0A0A] border border-white/10 relative overflow-hidden mb-12 group">
              <div className="absolute right-0 top-0 w-1/2 h-full bg-[#00FF85]/5 blur-[100px] -z-0"></div>
              <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-primary/10 blur-[80px] -z-0"></div>
              
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF85]/10 border border-[#00FF85]/20 rounded-full text-[#00FF85] text-[10px] font-black tracking-widest uppercase mb-8">
                  <Sparkles className="w-3 h-3" /> IA com explicacao de fit
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-[1] tracking-tighter mb-8 italic">
                  Entre em desafios que <span className="text-[#00FF85]">fazem sentido para voce.</span>
                </h2>
                <p className="text-[18px] text-white/50 mb-10 font-medium leading-relaxed">
                  O objetivo aqui nao e aplicar no escuro. A plataforma organiza matches com contexto para voce construir portfolio, repertorio e empregabilidade em projeto real.
                </p>
                
                <button 
                  onClick={() => setActiveTab("oportunidades")}
                  className="inline-flex items-center justify-center gap-3 bg-[#00FF85] text-[#0A0A0A] font-black text-[14px] uppercase tracking-widest px-10 py-5 hover:bg-[#CCFF00] hover:scale-[1.05] transition-all"
                >
                  <Compass className="w-5 h-5" /> Ver Matches
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MATCHES COM PREMIUM CARDS */}
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
                         Entrar neste Match <Plus className="w-5 h-5"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-12 rounded-[2rem] border border-border text-center shadow-sm">
                <Compass className="w-16 h-16 text-primary/20 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Sem matches no radar</h3>
                <p className="text-muted-foreground font-semibold">Nao ha novos desafios com aderencia forte ao seu perfil neste momento.</p>
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
                         <p className="text-muted-foreground font-semibold">Nenhuma candidatura enviada.<br/>Explore a aba Matches.</p>
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
              <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary mb-2">Portfolio em construcao</div>
              <h1 className="font-display text-[2.5rem] leading-[1.1] font-black tracking-tighter text-foreground mb-3 relative inline-block">
                Meu Perfil Profissional
                <div className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary opacity-50 rounded-full"></div>
              </h1>
              <p className="text-[16px] text-muted-foreground">
                Atualize repertorio, skills e ODS de afinidade para melhorar seu match score e a leitura do seu portfolio.
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
