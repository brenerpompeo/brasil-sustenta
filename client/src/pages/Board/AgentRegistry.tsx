import ControlPlaneLayout from "@/components/ControlPlaneLayout";
import { DSCard } from "@/components/ds";
import { Shield, Brain, Zap, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const agents = [
  { id: "CB_CEO_CERBERUS", name: "Cerberus", role: "Sovereign Governance", status: "Active", type: "Orchestrator", color: "var(--color-ink)" },
  { id: "BS_CEO_ATLAS", name: "Atlas", role: "Operational Execution", status: "Active", type: "Manager", color: "var(--color-leaf)" },
  { id: "SUZELY_MATCH_01", name: "Suzely", role: "Semantic Matching", status: "Active", type: "Intelligence", color: "var(--color-atlantic)" },
  { id: "PG_CEO_LEGACY", name: "Legacy", role: "Protocol & Compliance", status: "Active", type: "Auditor", color: "var(--color-sun)" },
  { id: "BR_CEO_SOVEREIGN", name: "Sovereign BI", role: "Market Intelligence", status: "Standby", type: "Analyst", color: "var(--color-clay)" },
];

export default function AgentRegistry() {
  return (
    <ControlPlaneLayout 
      eyebrow="C-SUITE_REGISTRY // AGENT_POOL_v40" 
      title="Board Agent Registry"
    >
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-10">
         <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Filter by Agent ID, Role or Protocol..." 
              className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm font-mono focus:outline-none focus:border-white transition-colors"
            />
         </div>
         <div className="flex gap-2">
            <Button variant="ghost" className="text-white/40 hover:text-white gap-2 font-mono text-[10px] uppercase tracking-widest">
               <Filter className="size-3" />
               Filter_Active
            </Button>
            <Button variant="outline" className="border-white/20 text-white/60 hover:bg-white hover:text-black font-mono text-[10px] uppercase tracking-widest px-6">
               Export_List
            </Button>
         </div>
      </div>

      <div className="grid gap-px bg-white/10 border border-white/10">
         {/* Table Header */}
         <div className="grid grid-cols-12 bg-white/5 p-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            <div className="col-span-1">Ref</div>
            <div className="col-span-3">Agent_ID</div>
            <div className="col-span-3">Role_Assignment</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Access</div>
         </div>

         {agents.map((agent, i) => (
           <div key={agent.id} className="grid grid-cols-12 p-5 bg-black hover:bg-white hover:text-black transition-all group items-center">
              <div className="col-span-1 font-mono text-xs opacity-40">{String(i + 1).padStart(2, '0')}</div>
              <div className="col-span-3 flex items-center gap-3">
                 <div className="size-8 border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-black group-hover:text-white">
                    {agent.name === "Suzely" ? <Zap className="size-4" /> : <Shield className="size-4" />}
                 </div>
                 <div>
                    <span className="block text-sm font-bold tracking-tight">{agent.name}</span>
                    <span className="block text-[9px] opacity-40 font-mono tracking-tighter">{agent.id}</span>
                 </div>
              </div>
              <div className="col-span-3 text-xs opacity-60 font-mono italic">{agent.role}</div>
              <div className="col-span-2">
                 <span className="text-[10px] font-bold border border-current px-2 py-0.5 rounded-full opacity-60">
                   {agent.type}
                 </span>
              </div>
              <div className="col-span-2">
                 <div className="flex items-center gap-2">
                    <div className={cn("size-1.5 rounded-full", agent.status === 'Active' ? 'bg-[color:var(--color-leaf)]' : 'bg-white/20')} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{agent.status}</span>
                 </div>
              </div>
              <div className="col-span-1 text-right">
                 <div className="inline-flex size-6 border border-white/20 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="size-3" />
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="mt-12">
         <DSCard className="bg-white/5 border-dashed border-white/20 p-12 text-center">
            <p className="text-sm text-white/40 font-mono uppercase tracking-[0.2em] mb-4">
              Restraining pool 35/40 agents in standby...
            </p>
            <Button variant="outline" className="border-white/10 text-white/40 hover:text-white hover:border-white">
               Initialize Bulk Activation
            </Button>
         </DSCard>
      </div>
    </ControlPlaneLayout>
  );
}
