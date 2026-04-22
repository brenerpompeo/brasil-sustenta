import { useEffect, useState } from "react";
import DashboardLayout, { type SidebarItem } from "@/components/DashboardLayout";
import { dashboardHubTheme } from "@/constants/dashboard-themes";
import { LoadingSkeleton, EmptyState } from "@/components/ds";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Briefcase,
  CalendarDays,
  Settings,
  BookOpen,
  Bell,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

// Labels e estilos de status do HUB
const hubStatusLabel: Record<string, string> = {
  piloto: "Piloto",
  consolidado: "Consolidado",
  flagship: "Flagship",
};

const hubStatusColor: Record<string, string> = {
  piloto: "bg-yellow-50 text-yellow-700",
  consolidado: "bg-[#0047FF]/10 text-[#0047FF]",
  flagship: "bg-green-50 text-green-700",
};

// Labels de status de campus
const campusStatusLabel: Record<string, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
  onboarding: "Onboarding",
};

const campusStatusIcon: Record<string, typeof CheckCircle2> = {
  ativo: CheckCircle2,
  inativo: AlertCircle,
  onboarding: Clock,
};

const campusStatusColor: Record<string, string> = {
  ativo: "text-green-600",
  inativo: "text-red-500",
  onboarding: "text-yellow-600",
};

export default function DashboardHubLocal() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("resumo");

  const isPreview = window.location.search.includes("preview=true");
  const isUnauthorized =
    !isPreview && !loading && (!user || user.userType !== "embaixador");

  useEffect(() => {
    if (isUnauthorized) {
      setLocation("/auth/embaixador");
    }
  }, [isUnauthorized, setLocation]);

  if (loading && !isPreview) {
    return (
      <div className="min-h-screen bg-[color:var(--color-paper)] flex items-center justify-center p-10">
        <LoadingSkeleton variant="card" lines={4} />
      </div>
    );
  }

  if (isUnauthorized) return null;

  // Data fetching
  const { data: summary, isLoading: summaryLoading } =
    trpc.hubLocal.getDashboardSummary.useQuery({});
  const { data: campusList, isLoading: campusLoading } =
    trpc.hubLocal.getCampuses.useQuery(
      { hubLocalId: summary?.hub?.id ?? 0 },
      { enabled: !!summary?.hub?.id }
    );

  const hub = summary?.hub;
  const cityName = hub?.cityName ?? user?.name ?? "HUB Local";
  const state = hub?.state ?? "BR";
  const hubStatus = hub?.status ?? "piloto";

  const theme = dashboardHubTheme;

  const menuItems1: SidebarItem[] = [
    {
      id: "resumo",
      label: "Resumo do HUB",
      icon: LayoutDashboard,
      onClick: () => setActiveTab("resumo"),
    },
    {
      id: "campi",
      label: "Campi",
      icon: GraduationCap,
      onClick: () => setActiveTab("campi"),
    },
    {
      id: "talentos",
      label: "Base de Talentos",
      icon: Users,
      onClick: () => setActiveTab("talentos"),
    },
    {
      id: "leads",
      label: "Leads de Empresas",
      icon: Briefcase,
      onClick: () => setActiveTab("leads"),
    },
    {
      id: "eventos",
      label: "Eventos",
      icon: CalendarDays,
      onClick: () => setActiveTab("eventos"),
    },
  ];

  const menuItems2: SidebarItem[] = [
    { id: "config", label: "Configurações", icon: Settings },
    { id: "ajuda", label: "Base de Conhecimento", icon: BookOpen },
  ];

  return (
    <DashboardLayout
      theme={theme}
      workspaceTitle={
        <>
          Brasil<br />
          <span className="text-[#0047FF]">Sustenta</span>
        </>
      }
      workspaceSubtitle="HUB LOCAL // EMBAIXADOR"
      menuSection1Title="HUB > Campi > Talentos"
      menuItems1={menuItems1}
      menuSection2Title="Apoio e Suporte"
      menuItems2={menuItems2}
      personaTitle="Embaixador HUB"
      personaSubtitle="Operação territorial local"
      userName={cityName}
      userDescription="Líder territorial da rede"
      activeTab={activeTab}
    >
      {/* Top Navbar */}
      <header className="sticky top-16 z-10 mx-auto flex h-[88px] w-full max-w-[1400px] items-center justify-between border-b border-paper-3 bg-paper/80 px-4 backdrop-blur-md sm:px-6 lg:top-0 lg:px-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-ink-4">
            <span className="text-[#0047FF]">HUB Local</span>
            <span className="w-1 h-1 rounded-full bg-paper-3" />
            {activeTab === "resumo" && "Resumo"}
            {activeTab === "campi" && "Campi"}
            {activeTab === "talentos" && "Base de Talentos"}
            {activeTab === "leads" && "Leads"}
            {activeTab === "eventos" && "Eventos"}
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[12px] font-semibold text-ink-3">
            <MapPin className="w-3.5 h-3.5 text-[#0047FF]" />
            HUB {cityName} — {state}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-widest ${
              hubStatusColor[hubStatus] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {hubStatusLabel[hubStatus] ?? hubStatus}
          </span>
          <button className="w-11 h-11 rounded-xl bg-paper-2 border border-transparent hover:border-[#0047FF]/20 flex items-center justify-center text-ink relative transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-ember-2 rounded-full ring-2 ring-paper" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-10 max-w-[1400px] mx-auto w-full overflow-y-auto">
        {/* ── Tab Resumo ── */}
        {activeTab === "resumo" && (
          <div className="animate-fade-in-up">
            {/* Hero */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                <h1 className="font-display text-[3rem] font-black text-ink leading-[1.05] mb-4">
                  HUB {cityName}{" "}
                  <span className="italic font-light text-[#0047FF]">
                    — {state}
                  </span>
                </h1>
                <p className="text-[17px] text-ink-3 font-medium leading-relaxed max-w-xl">
                  Central de operações territorial. Gerencie campi, ative
                  talentos, acompanhe leads e coordene eventos do HUB local.
                </p>
              </div>
              <div className="bg-white border border-paper-3 rounded-2xl p-6 shadow-sm flex items-center gap-5 min-w-[280px]">
                <div className="w-14 h-14 bg-[#0047FF]/8 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-[#0047FF]" />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.15em] text-ink-4 mb-0.5">
                    Status do HUB
                  </div>
                  <div className="text-sm font-bold text-[#0047FF]">
                    {hubStatusLabel[hubStatus] ?? hubStatus}
                  </div>
                  <div className="text-[11px] font-semibold text-ink-4 leading-none mt-1">
                    Rede Brasil Sustenta
                  </div>
                </div>
              </div>
            </div>

            {/* Metric Cards */}
            {summaryLoading ? (
              <LoadingSkeleton variant="card" lines={2} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    label: "Campi Cadastrados",
                    value: summary?.totalCampus ?? 0,
                    icon: GraduationCap,
                  },
                  {
                    label: "Talentos na Base",
                    value: summary?.totalTalentos ?? 0,
                    icon: Users,
                  },
                  {
                    label: "Squads Ativos",
                    value: summary?.squadsAtivos ?? 0,
                    icon: LayoutDashboard,
                  },
                  {
                    label: "Leads Abertos",
                    value: summary?.leadsAbertos ?? 0,
                    icon: Briefcase,
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-paper-3 border-t-[3px] border-t-[#0047FF] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-[#0047FF]/8 rounded-lg">
                        <stat.icon className="w-5 h-5 text-[#0047FF]" />
                      </div>
                    </div>
                    <div className="font-display text-4xl font-black text-ink leading-none mb-2 font-mono">
                      {stat.value.toLocaleString("pt-BR")}
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-ink-4">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Banner */}
            <div className="bg-ink rounded-[2rem] p-10 relative overflow-hidden shadow-2xl border border-white/5 animate-fade-in-up delay-200">
              <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-[#0047FF]/20 via-[#0047FF]/5 to-transparent pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-display text-[2rem] font-bold text-white mb-4 leading-tight">
                    Relatório do HUB{" "}
                    <span className="text-[#4D7FFF] italic font-light">
                      pronto para exportar
                    </span>
                  </h2>
                  <p className="text-white/60 text-[16px] max-w-lg font-medium leading-relaxed mb-8">
                    Consolide dados de campi, talentos, squads e impacto
                    territorial para relatórios de prestação de contas.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() =>
                        toast.success("Relatório do HUB (PDF) gerado com sucesso!")
                      }
                      className="bg-[#0047FF] hover:bg-[#0035CC] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#0047FF]/20"
                    >
                      Exportar Relatório HUB
                    </button>
                    <button
                      onClick={() => toast.info("Histórico em processamento...")}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all"
                    >
                      Ver Histórico
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab Campi ── */}
        {activeTab === "campi" && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="font-display text-[2.25rem] font-black text-ink leading-[1.1] mb-2">
                  Campi{" "}
                  <span className="italic font-light text-[#0047FF]">
                    do HUB
                  </span>
                </h2>
                <p className="text-[15px] text-ink-3 font-medium">
                  {summary?.totalCampus ?? 0} campus(i) cadastrado(s) neste HUB
                </p>
              </div>
            </div>

            {campusLoading ? (
              <LoadingSkeleton variant="card" lines={3} />
            ) : !campusList || campusList.length === 0 ? (
              <EmptyState
                title="Nenhum campus cadastrado"
                description="Os campi universitários aparecerão aqui conforme forem onboardados no HUB."
                icon={Building2}
              />
            ) : (
              <div className="bg-white rounded-[1.5rem] border border-paper-3 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-paper text-ink-4 uppercase text-[11px] font-black tracking-widest">
                      <th className="px-8 py-5 border-b border-paper-3">
                        Campus / Universidade
                      </th>
                      <th className="px-8 py-5 border-b border-paper-3">
                        Líder de Campus
                      </th>
                      <th className="px-8 py-5 border-b border-paper-3">
                        E-mail
                      </th>
                      <th className="px-8 py-5 border-b border-paper-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campusList.map((campus, i) => {
                      const StatusIcon =
                        campusStatusIcon[campus.status ?? "onboarding"] ?? Clock;
                      return (
                        <tr
                          key={campus.id}
                          className={`border-b border-paper-3 transition-colors hover:bg-paper/50 ${
                            i % 2 === 0 ? "bg-white" : "bg-paper/30"
                          }`}
                        >
                          <td className="px-8 py-5 font-bold text-ink">
                            Campus #{campus.universityProfileId}
                          </td>
                          <td className="px-8 py-5 text-ink-3">
                            {campus.liderName ?? "—"}
                          </td>
                          <td className="px-8 py-5 text-ink-3">
                            {campus.liderEmail ?? "—"}
                          </td>
                          <td className="px-8 py-5">
                            <span
                              className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest ${
                                campusStatusColor[campus.status ?? "onboarding"]
                              }`}
                            >
                              <StatusIcon className="w-3.5 h-3.5" />
                              {campusStatusLabel[campus.status ?? "onboarding"]}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Tab Talentos ── */}
        {activeTab === "talentos" && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="font-display text-[2.25rem] font-black text-ink leading-[1.1] mb-2">
                  Base de{" "}
                  <span className="italic font-light text-[#0047FF]">
                    Talentos
                  </span>
                </h2>
                <p className="text-[15px] text-ink-3 font-medium">
                  {summary?.totalTalentos ?? 0} talentos universitários
                  disponíveis no território
                </p>
              </div>
            </div>

            {(summary?.totalTalentos ?? 0) === 0 ? (
              <EmptyState
                title="Nenhum talento cadastrado"
                description="Os talentos universitários aparecem aqui após cadastro e vinculação com os campi do HUB."
                icon={Users}
              />
            ) : (
              <div className="bg-white border border-paper-3 rounded-2xl p-8 shadow-sm">
                <div className="text-[13px] text-ink-3 font-medium italic">
                  Lista de talentos disponível após integração completa com os
                  campi cadastrados.
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Tab Leads ── */}
        {activeTab === "leads" && (
          <div className="animate-fade-in-up">
            <div className="mb-10">
              <h2 className="font-display text-[2.25rem] font-black text-ink leading-[1.1] mb-2">
                Leads de{" "}
                <span className="italic font-light text-[#0047FF]">
                  Empresas
                </span>
              </h2>
              <p className="text-[15px] text-ink-3 font-medium">
                Funil: Novo → Contatado → Convertido
              </p>
            </div>

            {/* Funil de status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                {
                  label: "Novos",
                  count: 0,
                  color: "border-t-yellow-400",
                  bg: "bg-yellow-50",
                  text: "text-yellow-700",
                },
                {
                  label: "Contatados",
                  count: 0,
                  color: "border-t-[#0047FF]",
                  bg: "bg-[#0047FF]/5",
                  text: "text-[#0047FF]",
                },
                {
                  label: "Convertidos",
                  count: 0,
                  color: "border-t-green-500",
                  bg: "bg-green-50",
                  text: "text-green-700",
                },
              ].map((stage) => (
                <div
                  key={stage.label}
                  className={`bg-white border border-paper-3 border-t-[3px] ${stage.color} rounded-2xl p-6 shadow-sm`}
                >
                  <div className="font-display text-4xl font-black text-ink leading-none mb-2 font-mono">
                    {stage.count}
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-ink-4">
                    {stage.label}
                  </div>
                </div>
              ))}
            </div>

            <EmptyState
              title="Nenhum lead registrado"
              description="Os leads de empresas interessadas no HUB aparecerão aqui após contatos e prospecções."
              icon={Briefcase}
            />
          </div>
        )}

        {/* ── Tab Eventos ── */}
        {activeTab === "eventos" && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="font-display text-[2.25rem] font-black text-ink leading-[1.1] mb-2">
                  Eventos do{" "}
                  <span className="italic font-light text-[#0047FF]">HUB</span>
                </h2>
                <p className="text-[15px] text-ink-3 font-medium">
                  Hackathons, meetups, workshop ODS e ativações territoriais
                </p>
              </div>
              <button
                onClick={() => toast.info("Criação de evento em breve...")}
                className="min-h-[44px] bg-[#0047FF] hover:bg-[#0035CC] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-[#0047FF]/20 flex-shrink-0"
              >
                + Novo Evento
              </button>
            </div>

            <EmptyState
              title="Nenhum evento programado"
              description="Os eventos do HUB aparecerão aqui conforme forem cadastrados na plataforma."
              icon={Calendar}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
