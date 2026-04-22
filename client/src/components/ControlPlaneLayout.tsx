import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Activity,
  ShieldCheck,
  Cpu,
  Database,
  Users2,
  Network,
  Clock,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ControlPlaneLayoutProps {
  children: ReactNode;
  eyebrow?: string;
  title: string;
}

const ControlPlaneLayout = ({ children, eyebrow, title }: ControlPlaneLayoutProps) => {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Activity, label: "Overview", href: "/board" },
    { icon: Users2, label: "C-Suite Registry", href: "/board/registry" },
    { icon: Cpu, label: "Intel Assets", href: "/board/assets" },
    { icon: Network, label: "Memória KG", href: "/board/knowledge" },
    { icon: Activity, label: "SysStatus", href: "/board/status" },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--color-ink)] text-white flex overflow-hidden font-mono selection:bg-white selection:text-black">
      {/* ── SIDEBAR ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-black/40 backdrop-blur-xl lg:static transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="h-24 flex items-center justify-between px-8 border-b border-white/10">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="p-2 border border-white/20 bg-white text-black group-hover:bg-[color:var(--color-leaf)] transition-colors">
                  <ShieldCheck className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-tighter uppercase">Consul-Brain</span>
                  <span className="text-[10px] font-bold text-white/40 tracking-[0.2em]">CONTROL_PLANE</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
            <div className="space-y-1">
               <p className="px-4 mb-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Governance_Routes</p>
               {menuItems.map((item) => {
                 const Icon = item.icon;
                 const isActive = location === item.href;
                 return (
                   <Link key={item.href} href={item.href}>
                     <div className={cn(
                       "flex items-center gap-4 px-4 py-3 border transition-all cursor-pointer group",
                       isActive 
                        ? "bg-white text-black border-white" 
                        : "border-transparent text-white/50 hover:text-white hover:bg-white/5"
                     )}>
                       <Icon className={cn("size-4 transition-transform group-hover:scale-110", isActive ? "text-black" : "text-white/40")} />
                       <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                       {isActive && <ChevronRight className="ml-auto size-3" />}
                     </div>
                   </Link>
                 );
               })}
            </div>

            <div className="space-y-4">
              <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">System_Status</p>
              <div className="px-4 py-3 bg-white/5 border border-white/10 space-y-3">
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                   <span className="text-white/40">Suzely_Sync</span>
                   <span className="text-[color:var(--color-leaf)]">Active</span>
                 </div>
                 <div className="w-full h-1 bg-white/10 overflow-hidden">
                    <div className="h-full bg-[color:var(--color-leaf)] w-3/4 animate-pulse" />
                 </div>
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                   <span className="text-white/40">MemPalace</span>
                   <span className="text-[color:var(--color-sun)]">Locked</span>
                 </div>
              </div>
            </div>
          </nav>

          {/* Footer Nav */}
          <div className="p-6 border-t border-white/10">
             <Button asChild variant="ghost" className="w-full justify-start gap-3 text-white/40 hover:text-white hover:bg-white/5 font-mono text-[10px] uppercase tracking-widest">
               <Link href="/">
                 <ArrowLeft className="size-3" />
                 Return to Public Plane
               </Link>
             </Button>
          </div>
        </div>
      </aside>

      {/* ── CONTENT ── */}
      <main className="flex-1 flex flex-col min-w-0 bg-black overflow-y-auto relative">
        {/* Abstract Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

        {/* Header */}
        <header className="sticky top-0 z-40 h-24 flex items-center justify-between px-8 bg-black/60 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-6">
             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-white/60 hover:text-white">
                <Menu className="size-6" />
             </button>
             <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                   <div className="size-2 bg-[color:var(--color-leaf)] animate-pulse" />
                   <span className="text-[0.6rem] font-bold text-white/50 uppercase tracking-[0.3em]">{eyebrow || "SOVEREIGN_PLANE // ACCESS_LVL_02"}</span>
                </div>
                <h1 className="text-xl font-bold uppercase tracking-tight">{title}</h1>
             </div>
          </div>

          <div className="hidden xl:flex items-center gap-10">
             <div className="flex flex-col items-end">
                <span className="text-[0.6rem] font-bold text-white/40 uppercase tracking-widest">Latency</span>
                <span className="text-xs font-bold text-[color:var(--color-leaf)]">12ms</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[0.6rem] font-bold text-white/40 uppercase tracking-widest">Identity</span>
                <span className="text-xs font-bold">CERBERUS_ADMIN</span>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 lg:p-12 relative z-10">
           <div className="max-w-6xl mx-auto">
              {children}
           </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
};

export default ControlPlaneLayout;
