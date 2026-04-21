import { useEffect, useState } from "react";
import DashboardLayout, { type SidebarItem } from "@/components/DashboardLayout";
import { dashboardUniversidadeTheme } from "@/constants/dashboard-themes";
import { LoadingSkeleton } from "@/components/ds";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Settings, 
  LayoutDashboard,
  ShieldCheck,
  Search,
  Bell,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardUniversidade() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<number | undefined>(undefined);

  // Support for ?preview=true
  const isPreview = window.location.search.includes("preview=true");
  const isUnauthorized = !isPreview && !loading && (!user || user.userType !== "universidade");

  useEffect(() => {
    if (isUnauthorized) {
      setLocation("/auth/ies");
    }
  }, [isUnauthorized, setLocation]);

  if (loading && !isPreview) {
    return (
      <div className="min-h-screen bg-[color:var(--color-paper)] flex items-center justify-center p-10">
        <LoadingSkeleton variant="card" lines={4} />
      </div>
    );
  }

  // Auth bypass for preview
  if (isUnauthorized) {
    return null;
  }

  // Data fetching
  const { data: statusData } = trpc.university.getPartnershipStatus.useQuery();
  const { data: impactData } = trpc.university.getImpactReport.useQuery();
  const { data: studentsData } = trpc.university.getStudentsInProjects.useQuery({ 
    limit: 50, 
    offset: 0,
    search: search === "" ? undefined : search,
    semester: semesterFilter as any
  });

  const uniName = statusData?.universityName || user?.name || "Instituição Parceira";

  const theme = dashboardUniversidadeTheme;

  const menuItems1: SidebarItem[] = [
    { id: "overview", label: "Resumo Institucional", icon: LayoutDashboard, onClick: () => setActiveTab("overview") },
    { id: "convenio", label: "Parceria", icon: ShieldCheck, onClick: () => setActiveTab("convenio") },
    { id: "alunos", label: "Talentos Alocados", icon: Users, onClick: () => setActiveTab("alunos") },
    { id: "reports", label: "Horas e Evidências", icon: FileText, onClick: () => setActiveTab("reports") }
  ];

  const menuItems2: SidebarItem[] = [
    { id: "config", label: "Configurações", icon: Settings },
    { id: "ajuda", label: "Base de Conhecimento", icon: BookOpen }
  ];

  return (
    <DashboardLayout
      theme={theme}
      workspaceTitle={<>Brasil<br /><span className="text-violet-3">Sustenta</span></>}
      workspaceSubtitle="UNIVERSITY FLOW // v4.0"
      menuSection1Title="Parceria > Talentos > Evidências" menuItems1={menuItems1}
      menuSection2Title="Apoio e Suporte" menuItems2={menuItems2}
      personaTitle="IES Parceira" personaSubtitle="Extensao e empregabilidade em operacao"
      userName={uniName} userDescription="Canal institucional da rede" activeTab={activeTab}
    >
        {/* Top Navbar: Context & Notifications */}
        <header className="sticky top-16 z-10 mx-auto flex h-[88px] w-full max-w-[1400px] items-center justify-between border-b border-paper-3 bg-paper/80 px-4 backdrop-blur-md sm:px-6 lg:top-0 lg:px-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-ink-4">
              <span className="text-violet-2">University Flow</span>
              <span className="w-1 h-1 rounded-full bg-paper-3"></span>
              {activeTab === "overview" && "Resumo"}
              {activeTab === "convenio" && "Parceria"}
              {activeTab === "alunos" && "Talentos"}
              {activeTab === "reports" && "Evidências"}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-4 group-focus-within:text-violet-2 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar por RA ou Nome..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-paper-2 border border-transparent focus:border-violet-2/30 focus:bg-white rounded-xl pl-11 pr-6 py-2.5 text-xs font-bold text-ink w-[280px] transition-all outline-none"
              />
            </div>
            <button className="w-11 h-11 rounded-xl bg-paper-2 border border-transparent hover:border-violet/20 flex items-center justify-center text-ink relative transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-ember-2 rounded-full ring-2 ring-paper"></span>
            </button>
          </div>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 p-10 max-w-[1400px] mx-auto w-full overflow-y-auto">
          {/* Dynamic Content Mapping */}
          {activeTab === "overview" && (
            <div className="animate-fade-in-up">
              {/* Header Hero Area */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="max-w-2xl">
                  <h1 className="font-display text-[3rem] font-black text-ink leading-[1.05] mb-4">
                    Parceria e <span className="italic font-light text-violet-2">evidências institucionais</span>
                  </h1>
                  <p className="text-[17px] text-ink-3 font-medium leading-relaxed max-w-xl">
                    A universidade entra como parte da operacao: ativa talentos, acompanha desafios, consolida horas e transforma extensao em prova concreta.
                  </p>
                </div>
                <div className="bg-white border border-paper-3 rounded-2xl p-6 shadow-sm flex items-center gap-5 min-w-[320px]">
                  <div className="w-14 h-14 bg-violet/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-7 h-7 text-violet-2" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.15em] text-ink-4 mb-0.5">Atividade Recente</div>
                    <div className="text-sm font-bold text-ink">+14 talentos ativados hoje</div>
                    <div className="text-[11px] font-semibold text-leaf leading-none mt-1">Status: Normalizado</div>
                  </div>
                </div>
              </div>

              {/* Advanced Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { label: "Horas Consolidadas", value: `${impactData?.totalHours || 0}h`, icon: TrendingUp, color: "leaf" },
                  { label: "Taxa de Conversão", value: `${impactData?.conversionRate || 0}%`, icon: Sparkles, color: "sky" },
                  { label: "Talentos Alocados", value: impactData?.totalStudents || "0", icon: Users, color: "sky" },
                  { label: "Desafios Ativos", value: impactData?.totalProjects || "0", icon: LayoutDashboard, color: "sun" },
                ].map((stat, i) => (
                  <div key={i} className={`bg-white border border-paper-3 border-t-[3px] border-t-${stat.color}-1 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group pointer-events-none`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 bg-paper rounded-lg group-hover:bg-white transition-colors`}>
                        <stat.icon className={`w-5 h-5 text-ink-3`} />
                      </div>
                    </div>
                    <div className="font-display text-4xl font-black text-ink leading-none mb-2">{stat.value}</div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-ink-4">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Banner: Reports */}
              <div className="bg-ink rounded-[2rem] p-10 relative overflow-hidden shadow-2xl border border-white/5 mb-12 animate-fade-in-up delay-200">
                <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-violet-2/20 via-sky/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <h2 className="font-display text-[2rem] font-bold text-white mb-4 leading-tight">
                      Horas, evidências e relatórios<br /><span className="text-violet-3 italic font-light leading-none">extensão em formato operacional</span>
                    </h2>
                    <p className="text-white/60 text-[16px] max-w-lg font-medium leading-relaxed mb-8">
                      Consolide a atividade dos talentos alocados, gere evidências institucionais e leve a extensão para uma camada mais rastreável.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => toast.success("Relatório MEC (CSV) gerado com sucesso!")}
                        className="bg-violet-2 hover:bg-violet text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-violet/20"
                      >
                        Exportar Evidências
                      </button>
                      <button 
                        onClick={() => toast.info("Histórico de exportações em processamento...")}
                        className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all"
                      >
                        Visualizar Histórico
                      </button>
                    </div>
                  </div>
                  <div className="hidden lg:flex justify-center items-center">
                    <div className="w-48 h-48 bg-violet/10 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-0 border-2 border-dashed border-violet/20 rounded-full animate-spin-slow"></div>
                      <FileText className="w-16 h-16 text-violet-3/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "convenio" && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-4xl font-black text-ink mb-10">Status da Parceria</h2>
              <div className="bg-white border border-paper-3 rounded-[2rem] p-10 max-w-3xl shadow-sm">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-20 h-20 bg-leaf-5 rounded-3xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-10 h-10 text-leaf" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink leading-tight mb-1">Parceria Ativa & Homologada</h3>
                    <p className="text-[12px] text-ink-3 uppercase tracking-widest font-black flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-leaf animate-pulse"></span>
                      Registro institucional: PG-2025-BR-V3
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { label: "Razão Social", value: statusData?.universityName || user?.name || "Instituição Cadastrada" },
                    { label: "Inicio da Parceria", value: statusData?.partnerSince ? new Date(statusData.partnerSince).toLocaleDateString("pt-BR") : "01/01/2025" },
                    { label: "Representante Legal", value: "Dr. Roberto Albuquerque" },
                    { label: "Nivel da Rede", value: "Diamante (Acima de 200 alunos)" },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-paper-3 pb-4">
                      <div className="text-[11px] font-black text-ink-4 uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-[15px] font-bold text-ink leading-tight">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 bg-paper p-6 rounded-2xl border border-paper-3 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-[13px] font-medium text-ink-3 italic">"Sua instituicao esta apta a operar talentos, horas e evidencias dentro da rede Brasil Sustenta."</div>
                  <button 
                    onClick={() => toast.success("Download do contrato iniciando...")}
                    className="text-leaf-1 font-bold text-sm hover:underline flex-shrink-0"
                  >
                    Baixar termo institucional →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "alunos" && (
            <div className="animate-fade-in-up">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div className="max-w-xl">
                  <h2 className="font-display text-[2.25rem] font-black text-ink leading-[1.1] mb-3">Talentos <span className="italic font-light text-leaf-1">alocados</span></h2>
                  <p className="text-[15px] text-ink-3 font-medium">Acompanhe quem entrou em desafio real, em qual empresa e com quanta evidencia gerada para extensao.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <select 
                    className="h-12 bg-white border border-paper-3 rounded-xl px-5 text-[11px] font-black uppercase tracking-widest text-ink outline-none focus:ring-4 focus:ring-leaf-5 transition-all"
                    value={semesterFilter || ""}
                    onChange={(e) => setSemesterFilter(e.target.value === "" ? undefined : Number(e.target.value))}
                  >
                    <option value="">Semestre (Todos)</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(s => (
                      <option key={s} value={s}>{s}º Semestre</option>
                    ))}
                  </select>
                  <button className="bg-ink text-white px-6 py-3 rounded-xl text-[13px] font-bold hover:bg-ink-2 transition-all shadow-lg shadow-ink/10">
                    Exportar Talentos CSV
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[1.5rem] border border-paper-3 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-paper text-ink-4 uppercase text-[11px] font-black tracking-widest">
                      <th className="px-8 py-5 border-b border-paper-3">Talento</th>
                      <th className="px-8 py-5 border-b border-paper-3">Desafio / Empresa</th>
                      <th className="px-8 py-5 border-b border-paper-3">Horas e Evidência</th>
                      <th className="px-8 py-5 border-b border-paper-3 text-center">Situação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-paper-3">
                                {(studentsData?.students || []).map((std: any) => (
                      <tr key={std.id} className="hover:bg-paper/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="font-bold text-[15px] text-ink group-hover:text-violet-2 transition-colors">{std.name}</div>
                          <div className="text-[11px] font-bold text-ink-4 uppercase tracking-[0.05em] mt-0.5 flex items-center gap-2">
                            <span>RA: {std.ra || "N/A"}</span>
                            <span className="w-1 h-1 rounded-full bg-paper-3"></span>
                            <span>{std.course}</span>
                            <span className="w-1 h-1 rounded-full bg-paper-3"></span>
                            <span>{std.semester}º Sem.</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-ink-2 font-bold text-[14px] leading-tight mb-1">{std.project}</div>
                          <div className="text-[11px] font-semibold text-ink-3 opacity-60">Empresa: {std.company}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="font-display text-lg font-black text-ink">{std.hours || "0h"}</div>
                          <div className="text-[11px] font-bold text-ink-4 uppercase tracking-tighter">Consolidadas pela parceria</div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="inline-flex items-center gap-1.5 bg-leaf-5 text-leaf-1 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-[0.05em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-leaf-1 scale-100 group-hover:scale-125 transition-transform duration-300"></span>
                            Ativo
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
    </DashboardLayout>
  );
}
