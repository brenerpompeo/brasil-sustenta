import ControlPlaneLayout from "@/components/ControlPlaneLayout";
import { DSCard, MetricBlock } from "@/components/ds";
import { Activity, Brain, Globe, Database, Network } from "lucide-react";
import { motion } from "framer-motion";

const boardMetrics = [
  { label: "Agentes Ativos", value: "40", sub: "Operational Pool", icon: Brain },
  { label: "ODS Coverage", value: "82%", sub: "Global Alignment", icon: Globe },
  { label: "Memory Blobs", value: "1.2k", sub: "MemPalace Graph", icon: Database },
  { label: "System Pulse", value: "99.9%", sub: "Live Infrastructure", icon: Network },
];

export default function BoardIndex() {
  return (
    <ControlPlaneLayout 
      eyebrow="SOVEREIGN_PLANE // CONSELHO_DE_IMPACTO" 
      title="Consul-Brain Overview"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {boardMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <MetricBlock
              label={m.label}
              value={m.value}
              sub={m.sub}
              icon={m.icon}
              variant="dark"
            />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Status da Suzely */}
        <div className="lg:col-span-12">
          <DSCard className="bg-white/5 border-white/10 p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-[color:var(--color-leaf)] mb-2">Protocolo_SUZELY_v3.0</h3>
                <p className="text-white/60 text-sm max-w-2xl font-sans">
                  Otimização semântica ativa. 1,432 talentos vetorizados. 
                  Último match gerado há 12 minutos para o projeto "Crédito de Carbono Local".
                </p>
              </div>
              <div className="flex gap-2">
                 <div className="size-1.5 rounded-full bg-[color:var(--color-leaf)] animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-leaf)]">Operational</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
               <div className="p-4 border border-white/10 bg-black/40">
                  <span className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">RRF_Score_Avg</span>
                  <span className="text-2xl font-bold">0.894</span>
               </div>
               <div className="p-4 border border-white/10 bg-black/40">
                  <span className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Vector_Dimensions</span>
                  <span className="text-2xl font-bold">1536d</span>
               </div>
               <div className="p-4 border border-white/10 bg-black/40">
                  <span className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Rerank_Latency</span>
                  <span className="text-2xl font-bold">842ms</span>
               </div>
            </div>
          </DSCard>
        </div>

        {/* Logs de Operação */}
        <div className="lg:col-span-8">
          <DSCard className="bg-white/5 border-white/10 p-0 h-[400px] flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
               <h3 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                 <Activity className="size-4 text-white/40" />
                 Sovereign_Logs
               </h3>
               <span className="text-[10px] text-white/40">Real-time sequence</span>
            </div>
            <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-2 bg-black/20">
               {[
                 { t: "03:12:44", m: "ATLAS initiated sync sequence...", c: "white/40" },
                 { t: "03:12:45", m: "AUTH_IES: Partnership request from UNICAMP validated.", c: "var(--color-leaf)" },
                 { t: "03:12:48", m: "SUZELY: Vectorizing talent pool candidate #1,432...", c: "var(--color-atlantic)" },
                 { t: "03:12:51", m: "MEM_PALACE: Memory blob [ODS_7_IMPACT] synchronized.", c: "var(--color-leaf)" },
                 { t: "03:12:55", m: "CERBERUS: Security audit completed. 0 anomalies detected.", c: "white/40" },
                 { t: "03:13:02", m: "BR360: Fetching territorial data for HUB_CAMPINAS...", c: "var(--color-sun)" },
               ].map((log, i) => (
                 <div key={i} className="flex gap-4">
                    <span className="text-white/20">[{log.t}]</span>
                    <span style={{ color: log.c }}>{log.m}</span>
                 </div>
               ))}
               <div className="animate-pulse flex gap-2 items-center">
                  <span className="text-white/20">[{new Date().toLocaleTimeString()}]</span>
                  <span className="size-1.5 bg-white/40" />
               </div>
            </div>
          </DSCard>
        </div>

        {/* Territory Status */}
        <div className="lg:col-span-4">
          <DSCard className="bg-white/5 border-white/10 p-6 flex flex-col h-full">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Territory_Health</h3>
            <div className="space-y-6 flex-1">
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                    <span>Campinas_HUB</span>
                    <span className="text-[color:var(--color-leaf)]">OPEN_PHASE</span>
                  </div>
                  <div className="h-1 bg-white/10"><div className="h-full bg-[color:var(--color-leaf)] w-1/5" /></div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                    <span>Recife_HUB</span>
                    <span className="text-white/40">PLANNED</span>
                  </div>
                  <div className="h-1 bg-white/10"><div className="h-full bg-white/20 w-0" /></div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                    <span>BH_HUB</span>
                    <span className="text-white/40">PLANNED</span>
                  </div>
                  <div className="h-1 bg-white/10"><div className="h-full bg-white/20 w-0" /></div>
               </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
               <p className="text-[10px] text-white/40 leading-relaxed font-sans uppercase tracking-widest">
                 A infraestrutura territorial está sendo ativada por polos estrategicamente localizados junto a universidades IES-Parceiras.
               </p>
            </div>
          </DSCard>
        </div>
      </div>
    </ControlPlaneLayout>
  );
}
