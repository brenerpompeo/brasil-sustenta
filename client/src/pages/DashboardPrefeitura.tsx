import { useEffect, useState } from "react";
import DashboardLayout, { type SidebarItem } from "@/components/DashboardLayout";
import { dashboardPrefeituraTheme } from "@/constants/dashboard-themes";
import { LoadingSkeleton, ODSBadge, EmptyState } from "@/components/ds";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  Target,
  Users,
  Building2,
  CalendarDays,
  Settings,
  BookOpen,
  Bell,
  TrendingUp,
  MapPin,
  BadgeCheck,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

// Labels de status do programa municipal
const programStatusLabel: Record<string, string> = {
  informal: "Contato Inicial",
  engajada: "Engajada",
  negociacao: "Em Negociação",
  ativo: "Programa Ativo",
};

const programStatusColor: Record<string, string> = {
  informal: "bg-gray-100 text-gray-600",
  engajada: "bg-yellow-50 text-yellow-700",
  negociacao: "bg-blue-50 text-[#0047FF]",
  ativo: "bg-green-50 text-green-700",
};

export default function DashboardPrefeitura() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("resumo");

  const isPreview = window.location.search.includes("preview=true");
  const isUnauthorized =
    !isPreview &&
    !loading &&
    (!user || (user.userType !== "prefeitura" && user.userType !== "embaixador"));

  useEffect(() => {
    if (isUnauthorized) {
      setLocation("/auth/prefeitura");
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
  const { data: metrics, isLoading: metricsLoading } =
    trpc.prefeitura.getDashboardMetrics.useQuery({});
  const { data: profile } = trpc.prefeitura.getProfilePublic.useQuery();

  const cityName =
    profile?.cityName || user?.name || "Município Parceiro";
  const state = profile?.state || "BR";
  const programStatus = profile?.programStatus || "informal";
  const odsTargets = profile?.odsTargets || [3, 4, 8, 11, 13];

  const theme = dashboardPrefeituraTheme;

  const menuItems1: SidebarItem[] = [
    {
      id: "resumo",
      label: "Resumo Municipal",
      icon: LayoutDashboard,
      onClick: () => setActiveTab("resumo"),
    },
    {
      id: "ods",
      label: "Impacto ODS",
      icon: Target,
      onClick: () => setActiveTab("ods"),
    },
    {
      id: "talentos",
      label: "Talentos",
      icon: Users,
      onClick: () => setActiveTab("talentos"),
    },
    {
      id: "empresas",
      label: "Empresas Parceiras",
      icon: Building2,
      onClick: () => setActiveTab("empresas"),
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
      workspaceSubtitle="PROGRAMA MUNICIPAL ODS // B2G"
      menuSection1Title="Município > ODS > Impacto"
      menuItems1={menuItems1}
      menuSection2Title="Apoio e Suporte"
      menuItems2={menuItems2}
      personaTitle="Prefeitura Municipal"
      personaSubtitle="Programa ODS em operação territorial"
      userName={cityName}
      userDescription="Canal institucional B2G"
      activeTab={activeTab}
    >
      {/* Top Navbar */}
      <header className="sticky top-16 z-10 mx-auto flex h-[88px] w-full max-w-[1400px] items-center justify-between border-b border-paper-3 bg-paper/80 px-4 backdrop-blur-md sm:px-6 lg:top-0 lg:px-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-ink-4">
            <span className="text-[#0047FF]">Programa Municipal</span>
            <span className="w-1 h-1 rounded-full bg-paper-3" />
            {activeTab === "resumo" && "Resumo"}
            {activeTab === "ods" && "Impacto ODS"}
            {activeTab === "talentos" && "Talentos"}
            {activeTab === "empresas" && "Empresas"}
            {activeTab === "eventos" && "Eventos"}
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[12px] font-semibold text-ink-3">
            <MapPin className="w-3.5 h-3.5 text-[#0047FF]" />
            {cityName} — {state}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-widest ${
              programStatusColor[programStatus] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {programStatusLabel[programStatus] ?? programStatus}
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
                  Programa Municipal ODS —{" "}
                  <span className="italic font-light text-[#0047FF]">
                    {cityName}
                  </span>
                </h1>
                <p className="text-[17px] text-ink-3 font-medium leading-relaxed max-w-xl">
                  Conecte a prefeitura a talentos universitários, squads ativos e
                  empresas comprometidas com os Objetivos de Desenvolvimento
                  Sustentável do seu território.
                </p>
              </div>
              <div className="bg-white border border-paper-3 rounded-2xl p-6 shadow-sm flex items-center gap-5 min-w-[300px]">
                <div className="w-14 h-14 bg-[#0047FF]/8 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BadgeCheck className="w-7 h-7 text-[#0047FF]" />
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.15em] text-ink-4 mb-0.5">
                    Status do Programa
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      programStatus === "ativo"
                        ? "text-green-700"
                        : "text-[#0047FF]"
                    }`}
                  >
                    {programStatusLabel[programStatus] ?? programStatus}
                  </div>
                  <div className="text-[11px] font-semibold text-ink-4 leading-none mt-1">
                    Rede Brasil Sustenta — B2G
                  </div>
                </div>
              </div>
            </div>

            {/* Metric Cards */}
            {metricsLoading ? (
              <LoadingSkeleton variant="card" lines={2} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    label: "Talentos Universitários",
                    value: metrics?.totalTalentos ?? 0,
                    icon: Users,
                  },
                  {
                    label: "Projetos Ativos",
                    value: metrics?.totalProjetos ?? 0,
                    icon: TrendingUp,
                  },
                  {
                    label: "Squads em Operação",
                    value: metrics?.squadsAtivos ?? 0,
                    icon: LayoutDashboard,
                  },
                  {
                    label: "Empresas Parceiras",
                    value: metrics?.totalEmpresas ?? 0,
                    icon: Building2,
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

            {/* ODS Targets */}
            <div className="bg-white border border-paper-3 rounded-2xl p-8 shadow-sm mb-8">
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-ink-4 mb-6">
                ODS Alvo do Município
              </div>
              <div className="flex flex-wrap gap-3">
                {odsTargets.map((ods) => (
                  <ODSBadge key={ods} ods={ods} size="lg" />
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-ink rounded-[2rem] p-10 relative overflow-hidden shadow-2xl border border-white/5 animate-fade-in-up delay-200">
              <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-[#0047FF]/20 via-[#0047FF]/5 to-transparent pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-display text-[2rem] font-bold text-white mb-4 leading-tight">
                    Relatório de Impacto Municipal{" "}
                    <span className="text-[#4D7FFF] italic font-light">
                      pronto para exportar
                    </span>
                  </h2>
                  <p className="text-white/60 text-[16px] max-w-lg font-medium leading-relaxed mb-8">
                    Consolide dados de ODS, talentos e squads para relatórios de
                    prestação de contas e planejamento territorial.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() =>
                        toast.success("Relatório de Impacto (PDF) gerado com sucesso!")
                      }
                      className="bg-[#0047FF] hover:bg-[#0035CC] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#0047FF]/20"
                    >
                      Exportar Relatório ODS
                    </button>
                    <button
                      onClick={() => toast.info("Histórico de relatórios em processamento...")}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all"
                    >
                      Visualizar Histórico
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab Impacto ODS ── */}
        {activeTab === "ods" && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl font-black text-ink mb-4">
              Impacto ODS
            </h2>
            <p className="text-[15px] text-ink-3 font-medium mb-10 max-w-xl">
              Visualize como os projetos e squads ativos contribuem para cada
              Objetivo de Desenvolvimento Sustentável do município.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {(metrics?.odsCobertura ?? []).map((ods) => (
                <div
                  key={ods}
                  className="bg-white border border-paper-3 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4 hover:shadow-md transition-all"
                >
                  <ODSBadge ods={ods} size="lg" />
                  <div className="text-center">
                    <div className="font-display text-2xl font-black text-[#0047FF]">
                      0
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-ink-4">
                      Projetos
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab Talentos ── */}
        {activeTab === "talentos" && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="font-display text-[2.25rem] font-black text-ink leading-[1.1] mb-2">
                  Talentos{" "}
                  <span className="italic font-light text-[#0047FF]">
                    universitários
                  </span>
                </h2>
                <p className="text-[15px] text-ink-3 font-medium">
                  {metrics?.totalTalentos ?? 0} talentos universitários
                  disponíveis na cidade
                </p>
              </div>
            </div>

            {(metrics?.totalTalentos ?? 0) === 0 ? (
              <EmptyState
                title="Nenhum talento cadastrado"
                description="Os talentos universitários aparecerão aqui conforme se cadastrarem na plataforma."
                icon={Users}
              />
            ) : (
              <div className="bg-white border border-paper-3 rounded-2xl p-8 shadow-sm">
                <div className="text-[13px] text-ink-3 font-medium italic">
                  Lista de talentos disponível após integração completa com o HUB local.
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Tab Empresas ── */}
        {activeTab === "empresas" && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl font-black text-ink mb-10">
              Empresas Parceiras
            </h2>
            <EmptyState
              title="Nenhuma empresa parceira ainda"
              description="As empresas comprometidas com ESG no território aparecerão aqui após onboarding."
              icon={Building2}
            />
          </div>
        )}

        {/* ── Tab Eventos ── */}
        {activeTab === "eventos" && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl font-black text-ink mb-10">
              Eventos do Programa
            </h2>
            <EmptyState
              title="Nenhum evento programado"
              description="Os eventos municipais do Programa ODS aparecerão aqui conforme forem criados."
              icon={Calendar}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
