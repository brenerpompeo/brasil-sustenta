import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, Users, Building2, GraduationCap, Briefcase, 
  UsersRound, FileText, Calendar, Bell, Settings, Menu, X, LogOut, Search,
  BookOpen, BarChart3, Library
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Usuários', href: '/admin/usuarios' },
    { icon: Building2, label: 'Empresas', href: '/admin/empresas' },
    { icon: GraduationCap, label: 'Talentos', href: '/admin/talentos' },
    { icon: UsersRound, label: 'Universidades', href: '/admin/universidades' },
    { icon: Briefcase, label: 'Projetos', href: '/admin/projetos' },
    { icon: UsersRound, label: 'Squads', href: '/admin/squads' },
    { icon: FileText, label: 'Conteúdo Blog', href: '/admin/blog' },
    { icon: BookOpen, label: 'Artigos e Opinião', href: '/admin/artigos' },
    { icon: Calendar, label: 'Eventos', href: '/admin/eventos' },
    { icon: BarChart3, label: 'Relatórios ESG', href: '/admin/relatorios' },
    { icon: Library, label: 'Biblioteca Kit', href: '/admin/biblioteca' },
    { icon: Bell, label: 'Notificações', href: '/admin/notificacoes' },
  ];

  return (
    <div className="min-h-screen bg-paper flex font-body selection:bg-leaf-3 selection:text-leaf">
      {/* ── SIDEBAR (LEFT RAIL) ── */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-ink border-r border-white/5
        transform transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-2xl lg:shadow-none
      `}>
        <div className="flex flex-col h-full">
          {/* Logo / Branding */}
          <div className="h-24 flex items-center justify-between px-8 border-b border-white/5">
            <Link href="/admin">
              <div className="flex items-center gap-4 cursor-pointer group">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <span className="text-white font-black text-sm tracking-tighter">BS</span>
                </div>
                <div>
                  <span className="text-white font-display text-lg font-black block leading-none mb-1 group-hover:text-leaf-3 transition-colors">Brasil Sustenta</span>
                  <span className="text-[11px] text-white/40 font-black uppercase tracking-[0.2em]">Centro de Comando</span>
                </div>
              </div>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Summary (Sidebar) */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-leaf to-sky border-2 border-ink flex items-center justify-center font-bold text-white shadow-xl">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-white truncate">Administrador</p>
                <p className="text-[11px] font-bold text-white/30 truncate">Logado como Root</p>
              </div>
            </div>
          </div>

          {/* Section Label */}
          <div className="px-8 mb-4">
             <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20">Menu de Operações</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold
                        transition-all duration-300 cursor-pointer group
                        ${isActive 
                          ? 'bg-leaf text-white shadow-lg shadow-leaf/10' 
                          : 'text-white/40 hover:bg-white/5 hover:text-white'
                        }
                      `}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'group-hover:text-leaf-3'}`} />
                      <span className="tracking-tight">{item.label}</span>
                      {isActive && <div className="ml-auto w-1 h-1 bg-white rounded-full"></div>}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 px-4 space-y-1">
               <Link href="/admin/configuracoes">
                <div className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold text-white/40 hover:bg-white/5 hover:text-white transition-all cursor-pointer group
                    ${location === '/admin/configuracoes' ? 'bg-white/10 text-white' : ''}
                `}>
                  <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  <span>Configurações</span>
                </div>
              </Link>
              <button 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all group"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Encerrar Sessão</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header / Search Bar */}
        <header className="h-20 bg-paper/80 backdrop-blur-xl border-b border-paper-3 sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-ink p-2 -ml-2 hover:bg-paper-3 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Global Search Bar */}
            <div className="hidden md:flex items-center gap-3 bg-paper-2 border border-paper-3 px-4 py-2 rounded-xl group focus-within:border-leaf-3/30 focus-within:ring-4 focus-within:ring-leaf-5 transition-all w-80">
              <Search className="w-4 h-4 text-ink-4 group-focus-within:text-leaf" />
              <input 
                type="text" 
                placeholder="Buscar usuário, squad..." 
                className="bg-transparent border-none outline-none text-sm font-bold text-ink placeholder:text-ink-4 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Quick Stats in Header */}
            <div className="hidden xl:flex items-center gap-8 border-r border-paper-3 pr-8">
               <div className="text-right">
                  <span className="block text-[11px] font-black uppercase tracking-widest text-ink-4">Servidor</span>
                  <span className="flex items-center gap-2 text-xs font-black text-emerald-500">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    Online
                  </span>
               </div>
               <div className="text-right">
                  <span className="block text-[11px] font-black uppercase tracking-widest text-ink-4">Uptime</span>
                  <span className="text-xs font-black text-ink">99.9%</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="relative w-10 h-10 bg-white border border-paper-3 rounded-xl flex items-center justify-center text-ink hover:border-leaf shadow-sm transition-all group">
                <Bell className="w-4 h-5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-leaf-1 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="hidden sm:block">
                 <h2 className="text-xs font-black text-ink leading-none mb-0.5">Admin Central</h2>
                 <p className="text-[11px] font-bold text-ink-4">Nível de Acesso Root</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Render Area */}
        <main className="flex-1 p-8 lg:p-12 bg-paper relative overflow-x-hidden">
           {/* Abstract Background for content area */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-leaf/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
           
           <div className="max-w-[1400px] mx-auto animate-fade-in">
             {children}
           </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
