import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  UsersRound,
  FileText,
  Calendar,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  Search,
  BookOpen,
  BarChart3,
  Library,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Usuários", href: "/admin/usuarios" },
    { icon: Building2, label: "Empresas", href: "/admin/empresas" },
    { icon: GraduationCap, label: "Talentos", href: "/admin/talentos" },
    { icon: UsersRound, label: "Universidades", href: "/admin/universidades" },
    { icon: Briefcase, label: "Projetos", href: "/admin/projetos" },
    { icon: UsersRound, label: "Squads", href: "/admin/squads" },
    { icon: FileText, label: "Conteúdo Blog", href: "/admin/blog" },
    { icon: BookOpen, label: "Artigos e Opinião", href: "/admin/artigos" },
    { icon: Calendar, label: "Eventos", href: "/admin/eventos" },
    { icon: BarChart3, label: "Relatórios ESG", href: "/admin/relatorios" },
    { icon: Library, label: "Biblioteca Kit", href: "/admin/biblioteca" },
    { icon: Bell, label: "Notificações", href: "/admin/notificacoes" },
  ];

  return (
    <div className="min-h-screen bg-background flex overflow-hidden font-body selection:bg-primary/30 selection:text-foreground">
      {/* ── SIDEBAR (LEFT RAIL) ── */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 border-r border-black/8 bg-white lg:static
        transform transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        shadow-2xl lg:shadow-none
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Branding */}
          <div className="h-24 flex items-center justify-between border-b border-black/8 px-8">
            <Link href="/admin">
              <div className="flex items-center gap-4 cursor-pointer group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/8 bg-foreground text-background transition-colors group-hover:bg-primary">
                  <span className="text-sm font-black tracking-tighter">
                    BS
                  </span>
                </div>
                <div>
                  <span className="mb-1 block font-display text-lg font-bold leading-none tracking-tighter text-foreground transition-colors group-hover:text-primary">
                    Brasil Sustenta
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Centro de Comando
                  </span>
                </div>
              </div>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-muted-foreground hover:text-foreground lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Summary (Sidebar) */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-4 rounded-[1.75rem] border border-black/8 bg-secondary/60 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary to-sky-500 font-bold text-foreground shadow-xl shadow-primary/20">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground tracking-tighter truncate">
                  Administrador
                </p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate">
                  Root Access
                </p>
              </div>
            </div>
          </div>

          {/* Section Label */}
          <div className="px-8 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Menu de Operações
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
            <div className="space-y-1">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold
                        transition-all duration-300 cursor-pointer group
                        ${
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                            : "text-muted-foreground hover:bg-black/[0.03] hover:text-foreground border border-transparent"
                        }
                      `}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-primary" : "group-hover:text-foreground"}`}
                      />
                      <span className="tracking-tight">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(30,215,96,1)]"></div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-border px-4 space-y-1">
              <Link href="/admin/configuracoes">
                <div
                  className={`
                     flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold text-muted-foreground hover:bg-black/[0.03] hover:text-foreground border border-transparent transition-all cursor-pointer group
                     ${location === "/admin/configuracoes" ? "bg-primary/10 text-primary border-primary/20" : ""}
                 `}
                >
                  <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  <span>Configurações</span>
                </div>
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold text-muted-foreground hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 border border-transparent transition-all group">
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Encerrar Sessão</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="relative flex min-w-0 flex-1 flex-col overflow-y-auto bg-background">
        {/* Top Header / Search Bar */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-black/8 bg-white/85 px-8 backdrop-blur-xl">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="-ml-2 rounded-lg p-2 text-foreground transition-colors hover:bg-black/[0.03] lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Global Search Bar */}
            <div className="group hidden w-80 items-center gap-3 rounded-xl border border-black/8 bg-white px-4 py-2 shadow-sm transition-all focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 md:flex">
              <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Buscar usuário, squad..."
                className="bg-transparent border-none outline-none text-sm font-semibold text-foreground placeholder:text-muted-foreground w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Quick Stats in Header */}
            <div className="hidden items-center gap-8 border-r border-black/8 pr-8 xl:flex">
              <div className="text-right">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Servidor
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-primary">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(30,215,96,0.6)] animate-pulse"></div>
                  Online
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Uptime
                </span>
                <span className="text-xs font-bold text-foreground">99.9%</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/8 bg-white text-foreground shadow-sm transition-all hover:border-primary/50 hover:bg-primary/5">
                <Bell className="w-4 h-5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border border-white bg-primary shadow-[0_0_8px_rgba(30,215,96,0.8)]"></span>
              </button>

              <div className="hidden sm:block">
                <h2 className="font-display text-sm font-bold text-foreground leading-none mb-0.5 tracking-tighter">
                  Admin Central
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Nível de Acesso Root
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Render Area */}
        <main className="flex-1 p-8 lg:p-12 relative">
          {/* Abstract Background for content area */}
          <div className="pointer-events-none absolute -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent blur-[120px] top-0 right-0"></div>

          <div className="max-w-[1400px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
