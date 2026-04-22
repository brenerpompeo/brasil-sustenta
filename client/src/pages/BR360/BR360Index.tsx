import ControlPlaneLayout from "@/components/ControlPlaneLayout";
import { DSCard, MetricBlock } from "@/components/ds";
import { BarChart3, Target, Globe, MapPin } from "lucide-react";

export default function BR360Index() {
  return (
    <ControlPlaneLayout 
      eyebrow="B2B_BI_ENGINE // BR_CEO_SOVEREIGN" 
      title="BR360 Market Intelligence"
    >
      <div className="grid gap-6 md:grid-cols-3 mb-10">
        <MetricBlock label="Market Leads" value="124" sub="Detected by ODS Fit" icon={Target} variant="dark" />
        <MetricBlock label="Active Hubs" value="01" sub="Campinas Node" icon={MapPin} variant="dark" />
        <MetricBlock label="Territorial Reach" value="2.4k" sub="Companies Analyzed" icon={Globe} variant="dark" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         <DSCard className="bg-white/5 border-white/10 p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
               <BarChart3 className="size-4 text-[color:var(--color-sun)]" />
               Regional_Growth_Matrix
            </h3>
            <div className="aspect-video bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop')] bg-cover grayscale" />
               <p className="relative z-10 font-mono text-[10px] text-white/40 uppercase tracking-widest animate-pulse">
                 Injesting Real-time territorial data...
               </p>
            </div>
         </DSCard>

         <DSCard className="bg-white/5 border-white/10 p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
               <Target className="size-4 text-[color:var(--color-leaf)]" />
               ODS_Conversion_Opportunities
            </h3>
            <div className="space-y-4 font-mono text-xs">
               {[
                 { sector: "Agribusiness", focus: "ODS 15", score: "92%" },
                 { sector: "Tech Labs", focus: "ODS 9", score: "88%" },
                 { sector: "Clean Energy", focus: "ODS 7", score: "85%" },
               ].map((item) => (
                 <div key={item.sector} className="p-4 border border-white/10 flex justify-between items-center hover:bg-white hover:text-black transition-colors group">
                    <div>
                       <span className="block font-bold">{item.sector}</span>
                       <span className="text-[10px] opacity-40 group-hover:opacity-100">{item.focus} Baseline</span>
                    </div>
                    <span className="text-lg font-black">{item.score}</span>
                 </div>
               ))}
            </div>
         </DSCard>
      </div>
    </ControlPlaneLayout>
  );
}
