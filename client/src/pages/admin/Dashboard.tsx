import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, GraduationCap, Briefcase, TrendingUp, UserCheck, Clock, CheckCircle, ChevronRight, ArrowUpRight, Plus, Download, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { trpc } from '@/lib/trpc';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Dashboard = () => {
  const { data: statsData, isLoading: statsLoading } = trpc.dashboard.getStats.useQuery();
  const { data: activityData, isLoading: activityLoading } = trpc.dashboard.getRecentActivity.useQuery();

  const stats = [
    { 
      icon: GraduationCap, 
      label: 'Universidades Parceiras', 
      value: statsData?.universities?.toLocaleString() || '0', 
      change: 'Ativas', 
      color: 'text-leaf', 
      accent: 'bg-leaf',
      unit: 'Instituições'
    },
    { 
      icon: Users, 
      label: 'Talentos Cadastrados', 
      value: statsData?.talents?.toLocaleString() || '0', 
      change: 'Total', 
      color: 'text-sky', 
      accent: 'bg-sky',
      unit: 'Jovens'
    },
    { 
      icon: Building2, 
      label: 'Empresas Associadas', 
      value: statsData?.companies?.toLocaleString() || '0', 
      change: 'Ativas', 
      color: 'text-violet', 
      accent: 'bg-violet',
      unit: 'Ecossistema'
    },
    { 
      icon: Zap, 
      label: 'HUB mais ativo', 
      value: statsData?.activeHub || 'Global', 
      change: 'Este mês', 
      color: 'text-emerald-500', 
      accent: 'bg-emerald-500',
      unit: 'Regional'
    },
    { 
      icon: UserCheck, 
      label: 'Squads Formados', 
      value: statsData?.squads?.toLocaleString() || '0', 
      change: 'Em execução', 
      color: 'text-leaf-3', 
      accent: 'bg-leaf',
      unit: 'Equipes'
    },
    { 
      icon: CheckCircle, 
      label: 'Projetos Completos', 
      value: statsData?.completedProjects?.toLocaleString() || '0', 
      change: 'Entregues', 
      color: 'text-ink-2', 
      accent: 'bg-ink',
      unit: 'Sucesso'
    },
    { 
      icon: TrendingUp, 
      label: 'R$ Movimentado', 
      value: statsData?.totalValue ? `R$ ${statsData.totalValue.toLocaleString()}` : 'R$ 0', 
      change: 'Economia Circular', 
      color: 'text-emerald-600', 
      accent: 'bg-emerald-600',
      unit: 'Investimento'
    },
  ];

  const recentProjects = (activityData?.projects || []).map(p => ({
    id: p.id,
    title: p.title,
    company: 'Empresa Parceira', //join opcional depois
    status: p.status,
    applicants: 0, // mock por enquanto
    date: p.createdAt ? formatDistanceToNow(new Date(p.createdAt), { addSuffix: true, locale: ptBR }) : 'Recentemente'
  }));

  const pendingApprovals = [
    { type: 'empresa', name: 'Brasil Sustenta V2 Staging', date: 'Agora' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-emerald-100 text-emerald-700 border-emerald-200/50',
      in_progress: 'bg-blue-100 text-blue-700 border-blue-200/50',
      completed: 'bg-paper-3 text-ink-3 border-paper-4',
    };
    const labels = {
      open: 'Aberto',
      in_progress: 'Em Execução',
      completed: 'Finalizado',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="animate-fade-in-up">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-4 mb-3 flex items-center gap-2">
               <div className="w-1 h-1 bg-leaf-1 rounded-full animate-pulse"></div>
               Sincronizado com rede global
            </div>
            <h1 className="text-[2.75rem] font-black text-ink font-display leading-[0.9] tracking-tight">
              Visão Geral <span className="italic font-light text-ink-4">Plataforma</span>.
            </h1>
            <p className="max-w-xl text-[15px] text-ink-3 font-medium mt-4 leading-relaxed">
              Gerencie o ecossistema Brasil Sustenta, valide parceiros e acompanhe o fluxo de impacto em tempo real.
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in">
             <Button variant="outline" className="h-12 px-6 rounded-xl border-paper-3 bg-white text-xs font-black uppercase tracking-widest hover:bg-paper gap-2">
                <Download className="w-3.5 h-3.5" />
                Exportar KPI
             </Button>
             <Button className="h-12 px-6 rounded-xl bg-ink hover:bg-ink-2 text-white text-xs font-black uppercase tracking-widest gap-2 shadow-xl shadow-ink/10">
                <Plus className="w-3.5 h-3.5" />
                Novo Administrador
             </Button>
          </div>
        </div>

        {/* Stats Grid - High Density */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up delay-100">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative bg-white border border-paper-3 p-6 rounded-[2rem] hover:border-ink/20 transition-all hover:shadow-2xl hover:shadow-ink/5 overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 ${stat.accent}/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform`}></div>
                
                <div className="relative z-10 flex items-center justify-between mb-6">
                   <div className={`w-12 h-12 rounded-2xl ${stat.accent}/10 border border-${stat.accent.split('-')[1]}/20 flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                   </div>
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                      <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                      <span className="text-[11px] font-black text-emerald-700">{stat.change}</span>
                   </div>
                </div>

                <div className="relative z-10">
                   <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-2xl font-black text-ink truncate max-w-full">{stat.value}</h3>
                      <span className="text-[9px] font-black uppercase tracking-widest text-ink-3 shrink-0">{stat.unit}</span>
                   </div>
                   <p className="text-xs font-bold text-ink-4 tracking-tight uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Section: Projects & Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
          {/* Recent Activity Table style Card */}
          <div className="lg:col-span-2 bg-white border border-paper-3 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-paper-3 flex items-center justify-between">
              <div>
                 <h3 className="font-display text-xl font-black text-ink tracking-tight">Atividade Recente</h3>
                 <p className="text-xs font-bold text-ink-3 mt-1 underline decoration-leaf-3/50 underline-offset-4">Monitoramento de Projetos Ativos</p>
              </div>
              <Button variant="ghost" className="text-[11px] font-black uppercase tracking-[0.2em] text-ink-4 hover:text-ink">
                 Ver Log Completo
              </Button>
            </div>
            
            <div className="p-2">
              <div className="space-y-1">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-paper-2 transition-all group border border-transparent hover:border-paper-3">
                    <div className="flex items-center gap-5">
                       <div className="hidden sm:flex w-12 h-12 rounded-xl bg-paper-2 flex items-center justify-center text-ink-4">
                          <Briefcase className="w-5 h-5" />
                       </div>
                       <div className="flex-1 min-w-0">
                         <h4 className="font-bold text-ink text-[15px] mb-1 group-hover:text-ink-2 transition-colors">{project.title}</h4>
                         <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-tighter">{project.company}</span>
                            <span className="text-[11px] text-ink-4 font-bold flex items-center gap-1">
                               <Clock className="w-3 h-3" />
                               {project.date}
                            </span>
                         </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-6 ml-4">
                      <div className="hidden md:block text-right">
                        <p className="text-sm font-black text-ink">{project.applicants} <span className="text-[11px] text-ink-4 font-bold uppercase tracking-widest">Cands.</span></p>
                      </div>
                      {getStatusBadge(project.status)}
                      <button className="p-2 rounded-lg text-ink-4 hover:bg-white hover:shadow-sm transition-all group-hover:text-ink">
                         <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Approvals Control List */}
          <div className="bg-ink p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-leaf/20 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 mb-10">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-leaf-1 rounded-full animate-pulse shadow-glow shadow-leaf-1"></div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">Fila de Prioridade</span>
               </div>
               <h3 className="font-display text-2xl font-black text-white leading-tight">Aprovações de Credenciamento</h3>
            </div>

            <div className="relative z-10 space-y-4">
              {pendingApprovals.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.type === 'empresa' ? 'bg-leaf/20 text-leaf-3' :
                    item.type === 'talento' ? 'bg-sky/20 text-sky-2' :
                    'bg-violet/20 text-violet-3'
                  }`}>
                    {item.type === 'empresa' ? <Building2 className="w-4 h-4" /> :
                     item.type === 'talento' ? <GraduationCap className="w-4 h-4" /> :
                     <Users className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-[13px] group-hover:text-leaf-3 transition-colors truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                       <span className="text-[11px] font-black uppercase tracking-[0.1em] text-white/40">{item.type}</span>
                       <span className="text-[11px] text-white/20">•</span>
                       <span className="text-[11px] font-bold text-white/40">{item.date}</span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowUpRight className="w-4 h-4 text-leaf-3" />
                  </div>
                </div>
              ))}
            </div>

            <Button className="relative z-10 w-full mt-10 h-14 bg-white text-ink hover:bg-paper font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl">
               Processar Credenciais
            </Button>
          </div>
        </div>

        {/* Quick Actions Control Strip */}
        <div className="bg-paper-2 border border-paper-3 p-10 rounded-[3rem] animate-fade-in-up delay-300">
           <div className="flex items-center gap-2 mb-8">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-3">Ações Rápidas</span>
              <div className="flex-1 h-px bg-paper-3"></div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: UserCheck, title: "Autorizar Empresas", color: "text-leaf", desc: "Acessar pedidos pendentes" },
                { icon: TrendingUp, title: "Publicar Notícia", color: "text-sky", desc: "CMS Brasil Sustenta" },
                { icon: CheckCircle, title: "Relatórios ESG", color: "text-emerald-500", desc: "Download de consolidados" },
                { icon: Settings, title: "Sistemas Core", color: "text-violet", desc: "Configurações de rede" }
              ].map((action, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-paper-3 hover:border-ink/10 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1">
                   <action.icon className={`w-8 h-8 ${action.color} mb-4 group-hover:scale-110 transition-transform`} />
                   <h4 className="font-display text-lg font-black text-ink mb-1">{action.title}</h4>
                   <p className="text-[11px] font-bold text-ink-4 uppercase tracking-widest">{action.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
